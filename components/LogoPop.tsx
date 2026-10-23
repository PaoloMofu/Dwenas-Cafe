"use client";
import { useRef } from "react";

// Hero logo: spring entrance, slow float, warm halo, and a tilt that follows the pointer.
export default function LogoPop({ className = "" }: { className?: string }) {
  const tilt = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !tilt.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.04)`;
  };
  const reset = () => {
    if (tilt.current) tilt.current.style.transform = "";
  };

  return (
    <div className={`relative ${className}`} onPointerMove={move} onPointerLeave={reset} onPointerUp={reset}>
      <div
        className="pointer-events-none absolute inset-[-12%] -z-10 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,196,96,.45), rgba(255,160,60,.15) 55%, transparent 75%)" }}
        aria-hidden
      />
      <div className="logo-pop">
        <div className="logo-float">
        <div ref={tilt} className="logo-tilt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-3d.png"
            alt="Dwena's Cafe: a mountain sunrise, coffee plant and a steaming latte"
            className="logo-glow h-auto w-full select-none"
            draggable={false}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
