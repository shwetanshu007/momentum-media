"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  type: "lime" | "purple" | "pine";
  pulse: number;
  pulseSpeed: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 110;
    const CONNECT = 160;
    let particles: Particle[] = [];
    let W = 0, H = 0;

    const COLORS = { lime: "#cdf200", purple: "#deb7ff", pine: "#9bd0cc" };

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      particles = Array.from({ length: COUNT }, () => {
        const r = Math.random();
        const type: Particle["type"] = r < 0.6 ? "lime" : r < 0.8 ? "pine" : "purple";
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.3) * 0.5,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 0.8,
          opacity: Math.random() * 0.55 + 0.2,
          type,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Ambient radial glow — lime tinted
      const grad = ctx.createRadialGradient(W * 0.65, H * 0.35, 0, W * 0.65, H * 0.35, W * 0.55);
      grad.addColorStop(0, "rgba(205,242,0,0.05)");
      grad.addColorStop(0.5, "rgba(155,208,204,0.02)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Purple corner glow
      const pgrad = ctx.createRadialGradient(W * 0.1, H * 0.85, 0, W * 0.1, H * 0.85, W * 0.4);
      pgrad.addColorStop(0, "rgba(222,183,255,0.05)");
      pgrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = pgrad;
      ctx.fillRect(0, 0, W, H);

      const t = Date.now() * 0.001;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Mouse attract subtle
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > 1.8) { p.vx /= spd / 1.8; p.vy /= spd / 1.8; }
        }

        const pulse = Math.sin(p.pulse) * 0.2 + 0.8;
        const col = COLORS[p.type];

        // Glow aura for lime particles
        if (p.type === "lime") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(205,242,0,${0.04 * pulse})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.globalAlpha = p.opacity * pulse;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            const alpha = (1 - d / CONNECT) * 0.12;
            const col = a.type === "lime" || b.type === "lime"
              ? `rgba(205,242,0,${alpha})`
              : `rgba(155,208,204,${alpha * 0.7})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = col;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Floating hexagon wireframes
      const hexes = [
        { x: W * 0.88, y: H * 0.15, size: 70, rot: t * 0.2, col: "rgba(205,242,0,0.06)" },
        { x: W * 0.08, y: H * 0.75, size: 50, rot: -t * 0.15, col: "rgba(155,208,204,0.05)" },
        { x: W * 0.7, y: H * 0.82, size: 38, rot: t * 0.3, col: "rgba(222,183,255,0.05)" },
        { x: W * 0.3, y: H * 0.12, size: 28, rot: -t * 0.25, col: "rgba(205,242,0,0.04)" },
      ];
      for (const h of hexes) {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rot);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
          const [px, py] = [Math.cos(a) * h.size, Math.sin(a) * h.size];
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = h.col;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("resize", () => { resize(); init(); });
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", () => { mouseRef.current = { x: -9999, y: -9999 }; });

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
