"use client";

import React, { useState, useMemo } from "react";

interface SplineChartProps {
  data: { label: string; value: number }[];
  title?: string;
  color?: string;
}

export function SplineChart({ data, title, color = "#0057D9" }: SplineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 600;
  const height = 240;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };

  // Calculate coordinates
  const points = useMemo(() => {
    if (data.length === 0) return [];
    
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const values = data.map(d => d.value);
    const maxVal = Math.max(...values, 10);
    const minVal = Math.min(...values, 0);
    const range = maxVal - minVal;

    return data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - ((d.value - minVal) / range) * chartHeight;
      return [x, y] as [number, number];
    });
  }, [data, padding.left, padding.right, padding.top, padding.bottom]);

  // Spline calculations
  const line = (ax: number, ay: number, bx: number, by: number) => {
    const lengthX = bx - ax;
    const lengthY = by - ay;
    return {
      length: Math.sqrt(lengthX * lengthX + lengthY * lengthY),
      angle: Math.atan2(lengthY, lengthX)
    };
  };

  const controlPoint = (
    current: [number, number],
    previous: [number, number],
    next: [number, number],
    reverse?: boolean
  ) => {
    const p = previous || current;
    const n = next || current;
    const o = line(p[0], p[1], n[0], n[1]);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * 0.15;
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  };

  const bezierCommand = (point: [number, number], i: number, a: [number, number][]) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point);
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
  };

  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, point, i, a) => 
      i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${bezierCommand(point, i, a)}`
    , "");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const chartHeight = height - padding.bottom;
    const startX = points[0][0];
    const endX = points[points.length - 1][0];
    return `${linePath} L ${endX},${chartHeight} L ${startX},${chartHeight} Z`;
  }, [points, linePath, padding.bottom]);

  return (
    <div className="w-full bg-card border border-border rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-shadow duration-300 relative select-none">
      {title && (
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground mb-6">{title}</h3>
      )}
      
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color} stopOpacity="0.00" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor={color} floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Grid lines */}
          <g stroke="#F1F5F9" strokeWidth="1">
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const y = padding.top + pct * (height - padding.top - padding.bottom);
              return <line key={i} x1={padding.left} y1={y} x2={width - padding.right} y2={y} />;
            })}
          </g>

          {/* Gradient area */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Outline curve path */}
          <path 
            d={linePath} 
            fill="none" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            filter="url(#glow)"
          />

          {/* Interactive mouse capture targets */}
          {points.map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="16"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {hoveredIndex === i && (
                <>
                  <circle cx={x} cy={y} r="7" fill={color} opacity="0.2" />
                  <circle cx={x} cy={y} r="4" fill="#ffffff" stroke={color} strokeWidth="2.5" />
                </>
              )}
            </g>
          ))}

          {/* X labels */}
          <g fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">
            {data.map((d, i) => {
              if (i % Math.ceil(data.length / 5) !== 0 && i !== data.length - 1) return null;
              const x = points[i] ? points[i][0] : 0;
              return (
                <text key={i} x={x} y={height - 8}>
                  {d.label}
                </text>
              );
            })}
          </g>

          {/* Y labels */}
          <g fill="#94A3B8" fontSize="9" fontWeight="bold" textAnchor="end">
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const values = data.map(d => d.value);
              const maxVal = Math.max(...values, 10);
              const minVal = Math.min(...values, 0);
              const val = maxVal - pct * (maxVal - minVal);
              const y = padding.top + pct * (height - padding.top - padding.bottom);
              return (
                <text key={i} x={padding.left - 10} y={y + 3}>
                  {Math.round(val)}
                </text>
              );
            })}
          </g>
        </svg>

        {/* Floating tooltip overlay */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div 
            className="absolute bg-card/95 border border-border shadow-2xl rounded-xl p-3 text-xs min-w-[100px] pointer-events-none select-none animate-in fade-in zoom-in-95 duration-150 z-20"
            style={{
              left: `${(points[hoveredIndex][0] / width) * 100}%`,
              top: `${(points[hoveredIndex][1] / height) * 100 - 24}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="font-bold text-[#0A1F44]">{data[hoveredIndex].label}</div>
            <div className="font-extrabold text-[#0057D9] mt-0.5">{data[hoveredIndex].value} leads</div>
          </div>
        )}
      </div>
    </div>
  );
}
