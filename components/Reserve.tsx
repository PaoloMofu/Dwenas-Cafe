"use client";
import { useState } from "react";
import { site } from "@/lib/site";

const occasions = ["Just dining", "Birthday", "Wedding", "Debut", "Christening", "Company event"];
const field = "w-full rounded-xl border border-bark/25 bg-milk px-4 py-3 text-base";

export default function Reserve() {
  const [occasion, setOccasion] = useState(occasions[0]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [copied, setCopied] = useState(false);

  const message =
    `Hi Dwena's Cafe! I'd like to reserve.\n` +
    `Name: ${name || "-"}\nOccasion: ${occasion}\nDate: ${date || "-"}\nTime: ${time || "-"}\nGuests: ${guests}`;
  const smsHref = `sms:${site.reservations.replace(/\s/g, "")}?&body=${encodeURIComponent(message)}`;
  const callHref = `tel:${site.reservations.replace(/\s/g, "")}`;

  const copyForFacebook = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
    window.open(site.facebook, "_blank", "noreferrer");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <fieldset>
        <legend className="mb-3 font-semibold">What's the occasion?</legend>
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <label key={o} className="cursor-pointer">
              <input type="radio" name="occasion" value={o} checked={occasion === o} onChange={() => setOccasion(o)} className="peer sr-only" />
              <span className="lift block rounded-full bg-parchment px-4 py-2.5 text-sm font-semibold peer-checked:bg-bark peer-checked:text-milk peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-clay">
                {o}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">Your name
          <input className={`${field} mt-1 font-normal`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <div className="block text-sm font-semibold">Guests
          <div className="mt-1 flex items-center gap-3">
            <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="lift h-12 w-12 rounded-full bg-parchment text-xl">−</button>
            <output className="min-w-10 text-center font-display text-3xl" aria-live="polite">{guests}</output>
            <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(200, g + 1))} className="lift h-12 w-12 rounded-full bg-parchment text-xl">+</button>
          </div>
        </div>
        <label className="block text-sm font-semibold">Date
          <input type="date" className={`${field} mt-1 font-normal`} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="block text-sm font-semibold">Time (we open 10 AM to 12 midnight)
          <input type="time" min="10:00" className={`${field} mt-1 font-normal`} value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={smsHref} className="lift inline-flex flex-1 justify-center rounded-full bg-bark px-7 py-3.5 font-semibold text-milk shadow-soft sm:flex-none">Send by text</a>
        <button type="button" onClick={copyForFacebook} className="lift inline-flex flex-1 justify-center rounded-full bg-parchment px-7 py-3.5 font-semibold sm:flex-none">
          {copied ? "Copied, paste it in Messenger" : "Send on Facebook"}
        </button>
        <a href={callHref} className="lift inline-flex flex-1 justify-center rounded-full px-7 py-3.5 font-semibold ring-1 ring-bark/40 sm:flex-none">Call {site.reservations}</a>
      </div>
      <p className="text-sm text-bark/70">This fills in a message for you. The cafe confirms your booking by reply.</p>
    </form>
  );
}
