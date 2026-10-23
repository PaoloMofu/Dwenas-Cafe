"use client";
import { useEffect, useState } from "react";

const nav = [
  ["What's on", "#happening"],
  ["About", "#about"],
  ["Menu", "#menu"],
  ["Gallery", "#gallery"],
  ["Reviews", "#reviews"],
  ["Reserve", "#reserve"],
  ["Visit", "#visit"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = (cls: string, onClick?: () => void, list = nav) =>
    list.map(([l, h]) => (
      <li key={h}>
        <a href={h} onClick={onClick} className={cls}>{l}</a>
      </li>
    ));

  return (
    <header className="absolute inset-x-0 top-0 z-30 text-milk">
      <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 py-4" aria-label="Main">
        <ul className="hidden gap-6 text-sm font-semibold md:flex">{links("hover:text-parchment", undefined, nav.slice(0, 4))}</ul>
        <a href="#top" aria-label="Dwena's Cafe, back to top" className="lift col-start-2 block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-3d.png" alt="" className="h-12 w-auto drop-shadow-[0_4px_10px_rgba(0,0,0,.5)] sm:h-16" />
        </a>
        <div className="col-start-3 flex items-center justify-end">
          <ul className="hidden gap-6 text-sm font-semibold md:flex">{links("hover:text-parchment", undefined, nav.slice(4))}</ul>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="lift grid h-12 w-12 place-items-center rounded-full bg-bark/50 ring-1 ring-milk/30 backdrop-blur md:hidden"
          >
            <span className="grid gap-1.5" aria-hidden>
              <span className="block h-0.5 w-5 bg-milk" />
              <span className="block h-0.5 w-5 bg-milk" />
              <span className="block h-0.5 w-3 bg-milk" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-40 flex flex-col bg-bark px-6 py-5 text-milk">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="lift ml-auto grid h-12 w-12 place-items-center rounded-full ring-1 ring-milk/30"
          >
            <span className="text-2xl leading-none" aria-hidden>×</span>
          </button>
          <ul className="mt-6 flex flex-1 flex-col justify-center gap-2">
            {links("font-display block py-2 text-5xl font-semibold tracking-tight active:text-crema", () => setOpen(false))}
          </ul>
        </div>
      )}
    </header>
  );
}
