"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Reads the current hour in Manila so visitors anywhere see the cafe's real status.
function manilaHour() {
  const h = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hour: "numeric", hour12: false }).format(new Date());
  return Number(h) % 24;
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(manilaHour() >= site.openHour && manilaHour() < site.closeHour);
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return <span className={`inline-block h-9 ${className}`} aria-hidden />;

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 rounded-full bg-bark/60 px-4 py-2 text-sm font-semibold text-milk ring-1 ring-milk/25 backdrop-blur ${className}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${open ? "bg-[#9bd24a]" : "bg-clay"}`} aria-hidden />
      {open ? "Open now until 12 midnight" : "Closed now, opens at 10 AM"}
    </span>
  );
}
