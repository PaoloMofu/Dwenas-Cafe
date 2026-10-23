import { site } from "@/lib/site";

const item = "lift flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-semibold";

export default function MobileBar() {
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-3 bottom-3 z-30 flex overflow-hidden rounded-2xl bg-bark text-milk shadow-soft ring-1 ring-milk/15 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={tel} className={item}><span className="text-lg" aria-hidden>☎</span>Call</a>
      <a href={site.mapsUrl} target="_blank" rel="noreferrer" className={`${item} border-x border-milk/15`}>
        <span className="text-lg" aria-hidden>➤</span>Directions
      </a>
      <a href="#reserve" className={`${item} bg-clay`}><span className="text-lg" aria-hidden>✎</span>Reserve</a>
    </nav>
  );
}
