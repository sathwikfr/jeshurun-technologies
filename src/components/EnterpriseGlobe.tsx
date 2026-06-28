"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────
   Dynamic Globe import — SSR disabled
───────────────────────────────────────────────────────────────── */
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
    </div>
  ),
});

/* ─────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────── */
interface LocationNode {
  name: string;
  lat: number;
  lng: number;
  isHQ: boolean;
}

type ParticleKind = "continent" | "atmosphere";

interface ParticleData {
  lat: number;
  lng: number;
  altitude: number;
  size: number;
  baseBrightness: number;
  phase: number;
  speed: number;
  colorHex: string;
  kind: ParticleKind;
}

/* ─────────────────────────────────────────────────────────────────
   Static city & route data
───────────────────────────────────────────────────────────────── */
const locations: LocationNode[] = [
  { name: "Dublin",    lat: 53.3498, lng: -6.2603,   isHQ: true  },
  { name: "London",    lat: 51.5074, lng: -0.1278,   isHQ: false },
  { name: "New York",  lat: 40.7128, lng: -74.0060,  isHQ: false },
  { name: "Dubai",     lat: 25.2048, lng: 55.2708,   isHQ: false },
  { name: "Singapore", lat: 1.3521,  lng: 103.8198,  isHQ: false },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867,   isHQ: false },
];

const routes = [
  { startLat: 53.3498, startLng: -6.2603, endLat: 51.5074, endLng: -0.1278,  destName: "London"    },
  { startLat: 53.3498, startLng: -6.2603, endLat: 40.7128, endLng: -74.0060, destName: "New York"  },
  { startLat: 53.3498, startLng: -6.2603, endLat: 25.2048, endLng: 55.2708,  destName: "Dubai"     },
  { startLat: 53.3498, startLng: -6.2603, endLat: 1.3521,  endLng: 103.8198, destName: "Singapore" },
  { startLat: 53.3498, startLng: -6.2603, endLat: 17.3850, endLng: 78.4867,  destName: "Hyderabad" },
];

/* Network node colour palette */
const NODE_COLORS = ["#60a5fa", "#38bdf8", "#93c5fd", "#ffffff"];

/* ─────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────── */
export function EnterpriseGlobe({
  onLocationHover,
  onCoordsUpdate,
}: {
  onLocationHover?: (name: string | null) => void;
  onCoordsUpdate?: (coords: Record<string, { x: number; y: number; isFacing: boolean }>) => void;
}) {
  const globeRef     = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [isDark, setIsDark]           = useState(false);
  const [dimensions, setDimensions]   = useState({ width: 820, height: 820 });
  const [dotProducts, setDotProducts] = useState<Record<string, number>>({});
  const [cityCoords, setCityCoords]   = useState<Record<string, { x: number; y: number; isFacing: boolean }>>({});
  const [particles, setParticles]     = useState<ParticleData[]>([]);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  /* Breathing atmosphere: 0 → 2π over ~10 s */
  const breathRef = useRef(0);

  /* ── Theme detection ── */
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* ── GeoJSON ── */
  useEffect(() => {
    fetch("/datasets/countries.geojson")
      .then((r) => r.json())
      .then(setGeoJsonData)
      .catch(console.error);
  }, []);

  /* ── Continent + atmosphere particle generation ── */
  useEffect(() => {
    if (!geoJsonData) return;
    const features = geoJsonData.features ?? [];
    if (!features.length) return;

    const pts: ParticleData[] = [];

    /* 2 000 continent network nodes */
    for (let i = 0; i < 2000; i++) {
      const feat = features[Math.floor(Math.random() * features.length)];
      if (!feat?.geometry) continue;
      const geom = feat.geometry;
      let ring: any = null;
      if (geom.type === "Polygon")      ring = geom.coordinates[0];
      else if (geom.type === "MultiPolygon") {
        const poly = geom.coordinates[Math.floor(Math.random() * geom.coordinates.length)];
        ring = poly?.[0] ?? null;
      }
      if (!ring?.length) continue;
      const vtx = ring[Math.floor(Math.random() * ring.length)];
      if (!vtx || vtx.length < 2) continue;
      pts.push({
        lat:            vtx[1] + (Math.random() - 0.5) * 5,
        lng:            vtx[0] + (Math.random() - 0.5) * 5,
        altitude:       0.001 + Math.random() * 0.012,
        size:           0.07  + Math.random() * 0.15,
        baseBrightness: 0.25  + Math.random() * 0.75,
        phase:          Math.random() * Math.PI * 2,
        speed:          0.4   + Math.random() * 2.8,
        colorHex:       NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        kind:           "continent",
      });
    }

    /* 400 atmospheric floating dust particles */
    for (let i = 0; i < 400; i++) {
      pts.push({
        lat:            (Math.random() - 0.5) * 180,
        lng:            (Math.random() - 0.5) * 360,
        altitude:       0.12 + Math.random() * 0.60,
        size:           0.04,
        baseBrightness: 0.05 + Math.random() * 0.12,
        phase:          Math.random() * Math.PI * 2,
        speed:          0.2  + Math.random() * 0.6,
        colorHex:       "#60a5fa",
        kind:           "atmosphere",
      });
    }

    setParticles(pts);
  }, [geoJsonData]);

  /* ── Resize observer ── */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        const size = Math.min(width, height) || 820;
        setDimensions({ width: size, height: size });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── OrbitControls ── */
  useEffect(() => {
    const c = globeRef.current?.controls?.();
    if (!c) return;
    c.autoRotate      = true;
    c.autoRotateSpeed = 0.4;
    c.enableZoom      = false;
  }, [geoJsonData, dimensions]);

  /* ── Camera → 2-D projection loop ── */
  useEffect(() => {
    let rafId: number;
    const update = () => {
      if (globeRef.current) {
        const camera = globeRef.current.camera?.();
        if (camera) {
          const camPos = camera.position;
          const newDots:   Record<string, number> = {};
          const newCoords: Record<string, { x: number; y: number; isFacing: boolean }> = {};
          for (const loc of locations) {
            const p3 = globeRef.current.getCoords(loc.lat, loc.lng);
            const pt = new THREE.Vector3(p3.x, p3.y, p3.z);
            const dot = pt.clone().normalize().dot(camPos.clone().normalize());
            newDots[loc.name] = dot;
            const proj = pt.clone().project(camera);
            newCoords[loc.name] = {
              x:        (proj.x * 0.5 + 0.5) * dimensions.width,
              y:        (-(proj.y * 0.5) + 0.5) * dimensions.height,
              isFacing: dot > -0.15,
            };
          }
          setDotProducts(newDots);
          setCityCoords(newCoords);
          onCoordsUpdate?.(newCoords);
        }
      }
      rafId = requestAnimationFrame(update);
    };
    const tid = setTimeout(update, 150);
    return () => { cancelAnimationFrame(rafId); clearTimeout(tid); };
  }, [dimensions, onCoordsUpdate]);

  /* ── Derived visibility ── */
  const visibleLocations = useMemo(
    () => locations.filter((l) => (dotProducts[l.name] ?? 1) > -0.15),
    [dotProducts],
  );

  const visibleRoutes = useMemo(() => {
    return routes.filter((r) => (dotProducts[r.destName] ?? 1) > -0.15);
  }, [dotProducts]);

  /* ── Focus-mode: which cities / routes are "active" ── */
  const activeDestNames = useMemo<Set<string>>(() => {
    if (!hoveredCity) return new Set(); // no focus — all equally visible
    if (hoveredCity === "Dublin") return new Set(routes.map((r) => r.destName)); // Dublin: highlight all
    return new Set([hoveredCity]); // other city: highlight only its route
  }, [hoveredCity]);

  /* ── Arc colour — focus mode dims unrelated routes ── */
  const getArcColor = useCallback(
    (arc: any): string => {
      const dest = arc.destName as string;
      const dot  = dotProducts[dest] ?? 1;

      let baseOpacity: number;
      if (dot > 0.15)       baseOpacity = 0.95;
      else if (dot > -0.15) baseOpacity = 0.30;
      else                  baseOpacity = 0;

      /* Focus dimming */
      if (hoveredCity && !activeDestNames.has(dest)) {
        baseOpacity *= 0.12; // dim unrelated arcs strongly
      }
      if (hoveredCity && activeDestNames.has(dest)) {
        baseOpacity = Math.max(baseOpacity, 0.98); // boost active arc
      }

      return `rgba(96,165,250,${baseOpacity.toFixed(2)})`;
    },
    [dotProducts, hoveredCity, activeDestNames],
  );

  /* ── Arc stroke ── */
  const getArcStroke = useCallback(
    (arc: any): number => {
      if (hoveredCity && activeDestNames.has(arc.destName)) return 2.4;
      if (hoveredCity) return 0.5;
      return 1.4;
    },
    [hoveredCity, activeDestNames],
  );

  /* ── Animate time (speed up active arcs on hover) ── */
  const getArcAnimTime = useCallback(
    (arc: any): number => {
      if (hoveredCity && activeDestNames.has(arc.destName)) return 2000;
      return 3400;
    },
    [hoveredCity, activeDestNames],
  );

  /* ── Point colour & size (focus mode) ── */
  const getPointColor = useCallback(
    (d: any): string => {
      const isHQ      = d.isHQ as boolean;
      const isHovered = hoveredCity === d.name;
      const isDimmed  = hoveredCity && hoveredCity !== "Dublin" && d.name !== hoveredCity && d.name !== "Dublin";
      if (isDimmed)   return "rgba(59,130,246,0.2)";
      if (isHQ)       return isHovered ? "#ffffff" : "#e0f2fe";
      return isHovered ? "#93c5fd" : "#3b82f6";
    },
    [hoveredCity],
  );

  const getPointRadius = useCallback(
    (d: any): number => {
      const isHovered = hoveredCity === d.name;
      const isDimmed  = hoveredCity && hoveredCity !== "Dublin" && d.name !== hoveredCity && d.name !== "Dublin";
      if (isDimmed) return 0.10;
      if (d.isHQ)  return isHovered ? 0.50 : 0.38;
      return isHovered ? 0.30 : 0.20;
    },
    [hoveredCity],
  );

  /* ── Ring settings ── */
  const getRingColor = useCallback(
    (d: any): string => {
      const isHovered = hoveredCity === d.name;
      const isDimmed  = hoveredCity && hoveredCity !== "Dublin" && d.name !== hoveredCity && d.name !== "Dublin";
      if (isDimmed) return "rgba(59,130,246,0.04)";
      if (d.isHQ)   return isHovered ? "rgba(255,255,255,1.0)" : "rgba(255,255,255,0.72)";
      return isHovered ? "rgba(147,197,253,0.95)" : "rgba(59,130,246,0.38)";
    },
    [hoveredCity],
  );

  const getRingMaxRadius = useCallback(
    (d: any): number => {
      const isHovered = hoveredCity === d.name;
      if (d.isHQ)  return isHovered ? 5.0 : 3.2;
      return isHovered ? 3.0 : 1.6;
    },
    [hoveredCity],
  );

  /* ── Globe material ── */
  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color:       "#020617",
        transparent: true,
        opacity:     0.97,
        shininess:   12,
      }),
    [],
  );

  /* ── Custom THREE particle factory ── */
  const getParticleMesh = useCallback((d: any) => {
    const p      = d as ParticleData;
    const isAtmo = p.kind === "atmosphere";
    const geo    = new THREE.SphereGeometry(isAtmo ? 0.09 : 0.13, 3, 3);
    const mat    = new THREE.MeshBasicMaterial({
      color:       new THREE.Color(p.colorHex ?? "#60a5fa"),
      transparent: true,
      opacity:     isAtmo ? 0.10 : 0.75,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    });
    return new THREE.Mesh(geo, mat);
  }, []);

  /* ── Per-frame twinkling + breathing ── */
  const updateParticleMesh = useCallback((obj: any, d: any) => {
    const p    = d as ParticleData;
    const t    = performance.now() * 0.001;
    const wave = (Math.sin(t * p.speed + p.phase) + 1) * 0.5;
    if (!obj.material) return;
    if (p.kind === "atmosphere") {
      obj.material.opacity = p.baseBrightness * (0.4 + 0.6 * wave);
    } else {
      obj.material.opacity = Math.min(1, 0.08 + wave * p.baseBrightness * 0.92);
    }
  }, []);

  /* ── Hex polygon colour ── */
  const hexColor        = isDark ? "rgba(147,197,253,0.12)" : "rgba(59,130,246,0.07)";
  const atmosphereColor = isDark ? "#60a5fa" : "#3b82f6";

  /* ── Hover handler ── */
  const handleHover = useCallback(
    (name: string | null) => {
      setHoveredCity(name);
      onLocationHover?.(name);
    },
    [onLocationHover],
  );

  /* ── Dublin screen position for energy core overlay ── */
  const dublinCoords = cityCoords["Dublin"];

  /* ── Atmosphere altitude (breathing) ── */
  const [atmoAlt, setAtmoAlt] = useState(0.22);
  useEffect(() => {
    let rafId: number;
    const breathe = () => {
      breathRef.current += 0.0006; // ~10 s period
      const alt = 0.20 + Math.sin(breathRef.current) * 0.025;
      setAtmoAlt(alt);
      rafId = requestAnimationFrame(breathe);
    };
    rafId = requestAnimationFrame(breathe);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-transparent overflow-hidden"
    >
      <style>{`
        @keyframes hqFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        .animate-label-float { animation: hqFloat 5.5s ease-in-out infinite; }

        @keyframes dublinPulse {
          0%,100% { opacity:0.18; transform:translate(-50%,-50%) scale(1); }
          50%      { opacity:0.38; transform:translate(-50%,-50%) scale(1.08); }
        }
        .dublin-energy-core { animation: dublinPulse 3s ease-in-out infinite; }

        @keyframes orbitSpin {
          from { transform:translate(-50%,-50%) rotateX(70deg) rotateZ(0deg); }
          to   { transform:translate(-50%,-50%) rotateX(70deg) rotateZ(360deg); }
        }
      `}</style>

      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>

        {/* ── Globe ── */}
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          showGlobe={true}
          globeMaterial={globeMaterial}
          showAtmosphere={true}
          atmosphereColor={atmosphereColor}
          atmosphereAltitude={atmoAlt}

          /* Continent hex polygons */
          hexPolygonsData={geoJsonData?.features ?? []}
          hexPolygonColor={() => hexColor}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}

          /* City markers */
          pointsData={visibleLocations}
          pointLat="lat"
          pointLng="lng"
          pointColor={getPointColor}
          pointRadius={getPointRadius}
          pointAltitude={0.016}
          onPointHover={(point: any) => handleHover(point?.name ?? null)}

          /* Pulse rings — multi-wave */
          ringsData={visibleLocations}
          ringLat="lat"
          ringLng="lng"
          ringColor={getRingColor}
          ringMaxRadius={getRingMaxRadius}
          ringPropagationSpeed={(d: any) => (d.isHQ ? 1.5 : 1.0)}
          ringRepeatPeriod={(d: any) => (d.isHQ ? 1000 : 1600)}

          /* Arc routes — 5-6 simultaneous data signals per route */
          arcsData={visibleRoutes}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={getArcColor}
          arcStroke={getArcStroke}
          arcAltitude={0.28}
          arcDashLength={0.06}
          arcDashGap={0.13}
          arcDashAnimateTime={getArcAnimTime}

          /* Custom particles: continent nodes + atmosphere dust */
          customLayerData={particles}
          customThreeObject={getParticleMesh}
          customThreeObjectUpdate={updateParticleMesh}
        />

        {/* ── Dublin energy core overlay ── */}
        {dublinCoords?.isFacing && (
          <div
            className="absolute pointer-events-none dublin-energy-core"
            style={{
              left:         dublinCoords.x,
              top:          dublinCoords.y,
              width:        130,
              height:       130,
              background:   "radial-gradient(circle, rgba(96,165,250,0.60) 0%, rgba(56,189,248,0.28) 35%, rgba(96,165,250,0.08) 65%, transparent 100%)",
              borderRadius: "50%",
              zIndex:       25,
              filter:       "blur(3px)",
            }}
          />
        )}

        {/* ── Orbital signal rings (CSS perspective rings) ── */}
        {[
          { size: "96%", duration: "40s", opacity: 0.040, border: "1px solid #60a5fa",  delay: "0s"   },
          { size: "88%", duration: "55s", opacity: 0.028, border: "1px solid #38bdf8",  delay: "-10s" },
          { size: "80%", duration: "70s", opacity: 0.022, border: "1px dashed #93c5fd", delay: "-22s" },
        ].map((ring, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top:          "50%",
              left:         "50%",
              width:        ring.size,
              height:       ring.size,
              border:       ring.border,
              borderRadius: "50%",
              opacity:      ring.opacity,
              animation:    `orbitSpin ${ring.duration} linear infinite`,
              animationDelay: ring.delay,
              zIndex:       5,
            }}
          />
        ))}

        {/* ── City label overlays ── */}
        {locations.map((loc) => {
          const coords    = cityCoords[loc.name];
          if (!coords) return null;
          const isDublin  = loc.isHQ;
          const isHovered = hoveredCity === loc.name;
          const isDimmed  = !!(hoveredCity && hoveredCity !== "Dublin" && loc.name !== hoveredCity && loc.name !== "Dublin");

          return (
            <div
              key={loc.name}
              className="absolute cursor-pointer select-none transition-all duration-300 ease-out"
              style={{
                left:          `${coords.x}px`,
                top:           `${coords.y}px`,
                transform:     "translate(-50%, -100%) translateY(-14px)",
                zIndex:        isDublin ? 35 : 30,
                opacity:       coords.isFacing ? (isDimmed ? 0.22 : 1) : 0,
                pointerEvents: coords.isFacing ? "auto" : "none",
                filter:        isHovered ? "drop-shadow(0 0 10px rgba(96,165,250,0.75))" : "none",
                transition:    "opacity 0.3s ease, filter 0.2s ease",
              }}
              onMouseEnter={() => handleHover(loc.name)}
              onMouseLeave={() => handleHover(null)}
            >
              <div
                className={`backdrop-blur-md border rounded-lg px-2.5 py-1 text-center transition-all duration-200 ${
                  isDublin
                    ? "bg-[#091128]/95 border-blue-400/50 shadow-[0_4px_20px_rgba(96,165,250,0.40)] animate-label-float"
                    : isHovered
                    ? "bg-[#091128]/90 border-blue-400/40 shadow-[0_4px_14px_rgba(96,165,250,0.28)]"
                    : "bg-[#091128]/80 border-blue-400/20 shadow-sm"
                }`}
              >
                <span
                  className={`text-[9px] block uppercase ${
                    isDublin
                      ? "font-black text-white tracking-widest"
                      : isHovered
                      ? "font-bold text-white tracking-wider"
                      : "font-semibold text-slate-300 tracking-wider"
                  }`}
                >
                  {loc.name}
                </span>
                {isDublin && (
                  <span className="text-[6px] font-black text-[#60a5fa] uppercase tracking-wider block mt-0.5">
                    Global Headquarters
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
