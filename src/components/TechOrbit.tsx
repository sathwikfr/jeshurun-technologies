"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbitRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Tilt the orbit system to view it at an angle
      groupRef.current.rotation.x = Math.PI / 2.5;
      // Slowly rotate the entire system
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Hub Node */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>
      {/* Central Hub Glow */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.15} />
      </mesh>

      {/* Orbit Rings & Satellites */}
      {[2.5, 4.0, 5.5, 7.0].map((radius, idx) => (
        <group key={idx}>
          {/* Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.015, 16, 100]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.2} />
          </mesh>
          
          {/* Orbiting Satellite Node 1 */}
          <OrbitingNode radius={radius} speed={0.15 + idx * 0.05} offset={idx * Math.PI} size={0.12 + (idx % 2) * 0.04} />
          
          {/* Orbiting Satellite Node 2 (only on some rings) */}
          {idx % 2 === 0 && (
            <OrbitingNode radius={radius} speed={0.15 + idx * 0.05} offset={idx * Math.PI + Math.PI} size={0.08} />
          )}
        </group>
      ))}
    </group>
  );
}

function OrbitingNode({ radius, speed, offset, size }: { radius: number; speed: number; offset: number; size: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      // Move in a circle along the ring
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t) * radius; // y instead of z because the ring is rotated
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color="#06B6D4" />
    </mesh>
  );
}

export function TechOrbit() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] relative overflow-hidden pointer-events-none select-none">
      {/* Atmospheric Glow Behind Orbit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#3B82F6] rounded-full blur-[100px] opacity-10 dark:opacity-[0.15] z-0" />
      
      <Canvas
        camera={{ position: [0, -8, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <OrbitRings />
      </Canvas>
    </div>
  );
}
