"use client";

import { useRef, useState, ReactNode, MouseEvent, CSSProperties } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlightColor?: string;
  borderColor?: string;
  borderColorHover?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  style,
  spotlightColor = "rgba(205,242,0,0.10)",
  borderColor = "rgba(255,255,255,0.05)",
  borderColorHover,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: -9999, y: -9999 });
  const [opacity, setOpacity] = useState(0);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl transition-colors duration-300 ${className}`}
      style={{
        border: `1px solid ${opacity > 0 && borderColorHover ? borderColorHover : borderColor}`,
        ...style,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
