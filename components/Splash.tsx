"use client";

import { useEffect, useState } from "react";

const SHOW_MS = 2600;

export default function Splash() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setGone(true);
      document.documentElement.style.overflow = "";
    }, SHOW_MS);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div className="splash" role="status" aria-label="Loading Dwena's Cafe">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Dwena's Cafe" className="splash-logo" width={320} height={320} />
      <span className="splash-bar" aria-hidden />
    </div>
  );
}
