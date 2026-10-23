"use client";
import { useEffect, useState } from "react";
import { happenings, site } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

function Countdown({ start, end }: { start: string; end: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <div className="h-20" aria-hidden />;

  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (now >= s && now < e) return <p className="font-display text-3xl text-[#9bd24a]">Happening right now!</p>;

  const diff = Math.max(0, s - now);
  const parts = [
    ["days", Math.floor(diff / 86_400_000)],
    ["hours", Math.floor(diff / 3_600_000) % 24],
    ["min", Math.floor(diff / 60_000) % 60],
    ["sec", Math.floor(diff / 1000) % 60],
  ] as const;

  return (
    <div role="timer" aria-label="Time until the event" className="flex gap-3">
      {parts.map(([label, v]) => (
        <div key={label} className="min-w-16 rounded-2xl bg-milk/10 px-3 py-3 text-center ring-1 ring-milk/20">
          <div className="font-display text-4xl tabular-nums">{pad(v)}</div>
          <div className="text-xs text-milk/70">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Happening() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  // Before mount, show everything; after mount, hide events that have ended.
  const upcoming = happenings.filter((h) => now === null || new Date(h.end).getTime() > now);

  return (
    <section id="happening" className="bg-bark px-5 py-16 text-milk md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold sm:text-6xl">What&apos;s happening</h2>

        {upcoming.length === 0 && (
          <p className="mt-6 max-w-[40ch] text-milk/80">
            No events scheduled right now. Follow our{" "}
            <a href={site.facebook} className="underline" target="_blank" rel="noreferrer">Facebook</a> and{" "}
            <a href={site.instagram} className="underline" target="_blank" rel="noreferrer">Instagram</a> for the next one.
          </p>
        )}

        {upcoming.map((h) => {
          const sms = `sms:${site.reservations.replace(/\s/g, "")}?&body=${encodeURIComponent(h.joinMessage)}`;
          return (
            <article key={h.id} className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#6b3a14] via-clay to-[#c8741f] p-6 shadow-soft sm:p-10">
              <p className="inline-block rounded-full bg-bark/60 px-4 py-1.5 text-sm font-semibold">
                {h.dateLabel}, {h.timeLabel}
              </p>
              <h3 className="mt-4 max-w-[18ch] text-4xl font-semibold sm:text-6xl">{h.title}</h3>
              <p className="mt-4 max-w-[48ch] text-lg text-milk/90">{h.blurb}</p>

              <div className="mt-6"><Countdown start={h.start} end={h.end} /></div>

              <ul className="mt-8 flex flex-wrap gap-2" aria-label="What's included">
                {h.perks.map((p) => (
                  <li key={p} className="rounded-full bg-milk px-4 py-2 text-sm font-semibold text-bark">{p}</li>
                ))}
              </ul>

              <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_.8fr]">
                <div>
                  <h4 className="font-display text-2xl font-semibold">How to join</h4>
                  <ol className="mt-3 space-y-3">
                    {h.how.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-milk text-sm font-bold text-bark">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-col justify-end gap-3">
                  <p className="rounded-2xl bg-bark/50 p-4 font-semibold">{h.note}</p>
                  <a href={sms} className="lift inline-flex justify-center rounded-full bg-milk px-7 py-3.5 font-semibold text-bark shadow-soft">Register my kid</a>
                  <a href={site.facebook} target="_blank" rel="noreferrer" className="lift inline-flex justify-center rounded-full px-7 py-3.5 font-semibold ring-1 ring-milk/50">More on Facebook</a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
