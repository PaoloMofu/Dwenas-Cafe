"use client";
import { useState } from "react";
import { menu, type MenuItem } from "@/lib/site";

const tones = ["bg-moss", "bg-clay", "bg-crema", "bg-moss-deep", "bg-bark"];
const priceText = (i: MenuItem) =>
  i.prices.map((p) => (p.label ? `${p.label} ₱${p.value}` : `₱${p.value}`)).join("  ·  ");
const priceLabel = (i: MenuItem) =>
  i.prices.map((p) => `${p.label ?? ""} ${p.value} pesos`).join(", ");

export default function Menu() {
  const groups = Object.keys(menu);
  const [group, setGroup] = useState(groups[0]);
  const [cat, setCat] = useState("Featured");

  const cats = Object.keys(menu[group]);
  const all = cats.flatMap((c) => menu[group][c]);
  const featured = all.filter((i) => i.featured);
  const shown = cat === "Featured" ? all : menu[group][cat];

  const pick = (g: string) => {
    setGroup(g);
    setCat("Featured");
  };

  return (
    <div>
      <div role="tablist" aria-label="Menu" className="flex border-b border-bark/30">
        {groups.map((g) => (
          <button
            key={g}
            role="tab"
            aria-selected={group === g}
            onClick={() => pick(g)}
            className={`border border-b-0 border-bark/30 px-8 py-2 text-sm font-semibold ${
              group === g ? "bg-milk" : "bg-parchment hover:bg-crema/25"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase" role="tablist" aria-label="Categories">
        {["Featured", ...cats].map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`pb-1 ${cat === c ? "border-b-2 border-clay text-clay" : "hover:text-clay"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <h3 className="mt-5 text-3xl font-semibold text-clay">{cat}</h3>
      <ul className="-mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0" aria-label="Featured items">
        {featured.map((i, n) => (
          <li
            key={i.name}
            className={`${tones[n % tones.length]} relative h-72 w-48 shrink-0 snap-start overflow-hidden rounded-[2.5rem] shadow-soft`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-milk">
              <p className="font-display text-lg leading-tight">{i.name}</p>
              <p className="mt-1 font-mono text-xs text-milk/85">{i.prices.map((p) => `${p.label ? p.label + " " : ""}₱${p.value}`).join(" / ")}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 text-3xl font-semibold text-clay">{cat === "Featured" ? "All items" : cat}</h3>
      <ul className="mt-4 divide-y divide-bark/15 font-mono">
        {shown.map((i) => (
          <li key={i.name} className="flex gap-4 py-4">
            <div className="flex-1">
              <p className="text-sm font-bold uppercase">{i.name}</p>
              {i.note && <p className="text-xs text-bark/70">{i.note}</p>}
            </div>
            <span className="text-right text-sm font-bold text-moss-deep" aria-label={priceLabel(i)}>
              {priceText(i)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 rounded-lg bg-parchment/70 p-4 text-sm text-bark/80">
        Soft opening menu. Prices are in pesos and may change.
      </p>
    </div>
  );
}
