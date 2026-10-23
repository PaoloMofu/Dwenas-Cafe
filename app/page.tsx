import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Reserve from "@/components/Reserve";
import Happening from "@/components/Happening";
import LogoPop from "@/components/LogoPop";
import OpenStatus from "@/components/OpenStatus";
import MobileBar from "@/components/MobileBar";
import { site, reviews } from "@/lib/site";

const btn = "lift inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold";
const h2 = "text-4xl font-semibold sm:text-6xl";
const section = "px-5 py-16 md:py-24";

const tiles = [
  { cls: "col-span-2 aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto", src: "/beanbags.png", alt: "Bean bags and low tables on the lawn at dusk, with the cafe lit up behind" },
  { cls: "aspect-square bg-clay" },
  { cls: "aspect-square bg-crema" },
  { cls: "col-span-2 aspect-[2/1] md:aspect-auto", src: "/night-view.png", alt: "Lit A-frame cabins and the terrace at night" },
];

export default function Home() {
  const { lat, lng } = site.coords;
  const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

  return (
    <>
      <Header />

      <main id="top" className="pb-24 md:pb-0">
        {/* Hero */}
        <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-bark text-milk md:min-h-[92vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/night-view.png"
            alt="Dwena's Cafe at night, with lit A-frame cabins and the terrace overlooking the valley"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[35%_center] md:object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bark/95 via-bark/30 to-bark/40" aria-hidden />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bark/70 via-bark/25 to-transparent md:from-bark/85" aria-hidden />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-4 px-5 pb-10 pt-24 md:grid-cols-[1.05fr_.95fr] md:gap-8 md:pb-16 md:pt-32">
            <LogoPop className="mx-auto w-[86%] max-w-md md:order-last md:w-full md:max-w-none" />
            <div>
            <div className="flex flex-wrap items-center gap-2">
              <OpenStatus />
              <a href="#happening" className="lift inline-flex items-center gap-2 rounded-full bg-clay px-4 py-2 text-sm font-semibold text-milk shadow-soft">
                <span aria-hidden>🎃</span> Halloween party, Oct 31
              </a>
            </div>
            <h1 className="drift-1 mt-5 max-w-[14ch] text-[clamp(2.75rem,10vw,6.5rem)] font-semibold">
              Sunsets, coffee and the whole valley below.
            </h1>
            <p className="drift-2 mt-5 max-w-[40ch] text-base text-milk/90 sm:text-lg">{site.tagline}</p>
            <div className="drift-2 mt-7 flex flex-wrap gap-3">
              <a href="#menu" className={`${btn} bg-milk text-bark shadow-soft`}>See the menu</a>
              <a href="#reserve" className={`${btn} bg-bark/60 text-milk ring-1 ring-milk/40 backdrop-blur`}>Reserve a table</a>
            </div>
            </div>
          </div>
        </section>

        {/* What's happening */}
        <Happening />

        {/* About */}
        <section id="about" className={`${section} mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-12`}>
          <h2 className={h2}>Surrounded by green, a cup in hand.</h2>
          <div className="max-w-[60ch] space-y-5 text-lg">
            <p>
              Dwena&apos;s Cafe is a quiet stop in {site.city}, a place to put the day down for a while.
              Sit with a coffee, watch the sunset over the hills, and enjoy fresh flavors surrounded by nature.
            </p>
            <p>We also host events, with all-in packages. Tap one to start a booking:</p>
            <ul className="flex flex-wrap gap-2">
              {site.events.map((e) => (
                <li key={e}>
                  <a href="#reserve" className="lift inline-block rounded-full bg-parchment px-4 py-2.5 text-sm font-semibold">{e}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className={`${section} bg-parchment/60`}>
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className={h2}>What we serve</h2>
              <p className="mt-4 max-w-[34ch]">Pasta, burgers, sandwiches and pulutan, plus coffee and sodas. This is our soft opening menu, so check Instagram for specials.</p>
            </div>
            <Menu />
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className={`${section} mx-auto max-w-6xl`}>
          <h2 className={h2}>Inside and around</h2>
          <p className="mt-3 text-bark/70">Tap a photo to see it larger.</p>
          <Gallery tiles={tiles} />
        </section>

        {/* Reviews */}
        <section id="reviews" className={`${section} bg-bark text-milk`}>
          <div className="mx-auto max-w-6xl">
            <h2 className={h2}>Kind words</h2>
            <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
              {reviews.map((r, i) => (
                <figure key={i} className="w-[82%] shrink-0 snap-center rounded-2xl bg-milk/10 p-7 ring-1 ring-milk/15 md:w-auto">
                  <blockquote className="font-display text-xl leading-snug">{r.quote}</blockquote>
                  <figcaption className="mt-4 text-sm text-milk/70">{r.who}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Reserve */}
        <section id="reserve" className={`${section} mx-auto max-w-3xl`}>
          <h2 className={h2}>Reserve a table or event</h2>
          <p className="mb-8 mt-3 max-w-[48ch]">
            Pick the occasion, fill in the details and send. We take reservations for dining and for weddings, debuts, birthdays, christenings and company events.
          </p>
          <Reserve />
        </section>

        {/* Visit */}
        <section id="visit" className={`${section} mx-auto grid max-w-6xl gap-10 bg-parchment/60 md:grid-cols-[.8fr_1.2fr] md:gap-12`}>
          <div>
            <h2 className={h2}>Come visit</h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="font-semibold">Where</dt>
                <dd>{site.address}</dd>
              </div>
              <div>
                <dt className="font-semibold">Hours</dt>
                <dd>{site.hoursLabel}</dd>
                <dd className="text-sm text-bark/70">{site.hoursNote}</dd>
              </div>
              <div>
                <dt className="font-semibold">Contact</dt>
                <dd><a href={tel(site.phone)} className="hover:text-clay">{site.phone}</a></dd>
                <dd>Reservations: <a href={tel(site.reservations)} className="hover:text-clay">{site.reservations}</a></dd>
                <dd><a href={`mailto:${site.email}`} className="break-all hover:text-clay">{site.email}</a></dd>
                <dd className="text-bark/70">{site.services.join(", ")}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.mapsUrl} target="_blank" rel="noreferrer" className={`${btn} bg-bark text-milk shadow-soft`}>Get directions</a>
              <a href={site.facebook} target="_blank" rel="noreferrer" className={`${btn} bg-milk`}>Facebook</a>
              <a href={site.instagram} target="_blank" rel="noreferrer" className={`${btn} bg-milk`}>Instagram</a>
              <a href={site.tiktok} target="_blank" rel="noreferrer" className={`${btn} bg-milk`}>TikTok</a>
            </div>
          </div>
          <iframe
            title="Map showing Dwena's Cafe in Sto. Tomas, Batangas"
            src={`https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
            className="h-80 w-full rounded-2xl shadow-soft md:h-full md:min-h-96"
            loading="lazy"
          />
        </section>
      </main>

      <footer className="bg-bark py-8 pb-28 text-center text-sm text-milk/80 md:pb-8">
        © {new Date().getFullYear()} Dwena&apos;s Cafe, {site.city}
      </footer>

      <MobileBar />
    </>
  );
}
