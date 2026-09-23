import type { Metadata } from "next";
import { client } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { OfferFeature } from "@/components/sections/OfferFeature";
import { CtaBand } from "@/components/ui/CtaBand";
import { ContactButtons } from "@/components/ui/ContactButtons";

export const metadata: Metadata = pageMetadata({
  title: "Free Computerized Car Scanning in Islamabad — Special Offer",
  description: `Free computerized scanning and general vehicle check-up at Auto Garage One, B-17 Islamabad, until ${client.offer.endsLabel}. See details and terms, then book via WhatsApp.`,
  path: "/special-offers",
});

export default function OffersPage() {
  const o = client.offer;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Special Offers", path: "/special-offers" }]}
        eyebrow="Special offers"
        title={<>Current <span className="green-text">offers</span></>}
        intro={<p>Straightforward offers with clear terms — no hidden conditions and no pressure to book repairs.</p>}
        visual="scanner"
      />

      <section className="section" aria-label="Offer details">
        <div className="container-x">
          {o.active ? (
            <OfferFeature showTermsLink={false} />
          ) : (
            <div className="card p-10 text-center">
              <h2 className="text-3xl font-extrabold uppercase text-white">No active offers right now</h2>
              <p className="mt-3 text-mist">Follow us on social media ({client.social.handle}) or check back soon for new offers.</p>
              <ContactButtons className="mt-6 justify-center" />
            </div>
          )}
        </div>
      </section>

      {o.active && (
        <section id="terms" className="section carbon pt-16" aria-labelledby="terms-title">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div className="reveal">
              <h2 id="terms-title" className="text-3xl font-extrabold uppercase text-white sm:text-4xl">Eligibility <span className="green-text">&amp; terms</span></h2>
              <dl className="mt-6 grid gap-4">
                <div className="card p-5">
                  <dt className="text-sm uppercase tracking-wider text-metal">Offer</dt>
                  <dd className="mt-1 font-semibold text-white">{o.title}</dd>
                </div>
                <div className="card p-5">
                  <dt className="text-sm uppercase tracking-wider text-metal">Valid until</dt>
                  <dd className="mt-1 font-semibold text-white"><time dateTime={o.endsAt}>{o.endsLabel}</time></dd>
                </div>
                <div className="card p-5">
                  <dt className="text-sm uppercase tracking-wider text-metal">Where</dt>
                  <dd className="mt-1 font-semibold text-white">{client.name} workshop, Multi Gardens B-17, Islamabad</dd>
                </div>
              </dl>
            </div>
            <div className="reveal card p-8" style={{ ["--d" as string]: "90ms" }}>
              <h3 className="text-2xl font-bold uppercase text-white">Terms</h3>
              <ol className="mt-5 grid list-decimal gap-3 pl-5 text-mist marker:font-bold marker:text-brand">
                {o.terms.map((t) => <li key={t} className="pl-2">{t}</li>)}
              </ol>
            </div>
          </div>
        </section>
      )}

      <CtaBand title="Book your free scan" />
    </>
  );
}
