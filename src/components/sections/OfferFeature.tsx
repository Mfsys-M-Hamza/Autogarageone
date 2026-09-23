import Link from "next/link";
import { client } from "@/config/client";
import { whatsappHref } from "@/lib/links";
import { OfferCountdown } from "@/components/conversion/OfferWidgets";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { CalendarIcon, CheckCircleIcon, WhatsAppIcon } from "@/components/Icons";

/** Featured free-scan offer panel. Hidden entirely when the offer is switched off. */
export function OfferFeature({ headingLevel = "h2", showTermsLink = true }: { headingLevel?: "h2" | "h3"; showTermsLink?: boolean }) {
  if (!client.offer.active) return null;
  const H = headingLevel;
  return (
    <div className="reveal relative overflow-hidden rounded-3xl border border-brand/40 bg-[radial-gradient(120%_120%_at_0%_0%,#123a18_0%,#0e1410_45%,#0b0d0c_100%)] p-6 shadow-[0_0_80px_-30px_rgba(61,220,74,.6)] sm:p-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow">Limited-time offer · until {client.offer.endsLabel}</p>
          <p className="mt-4 font-display text-7xl font-extrabold leading-none green-text sm:text-8xl" aria-hidden="true">FREE</p>
          <H className="mt-2 text-3xl font-extrabold uppercase text-white sm:text-4xl">{client.offer.title}</H>
          <p className="mt-4 max-w-xl text-mist">{client.offer.summary}</p>
          <ul className="mt-6 grid gap-2.5">
            {client.offer.includes.map((i) => (
              <li key={i} className="flex gap-3 text-[#e6ebe8]"><CheckCircleIcon className="mt-0.5 shrink-0 text-brand" />{i}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-appointment?service=computerized-scanning" className="btn btn-primary"><CalendarIcon /> Book my free scan</Link>
            <a href={whatsappHref(`Hello ${client.name}, I'd like to book the free computerized scan and general check-up.\n\nVehicle (make/model/year): `)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon /> Ask on WhatsApp
            </a>
          </div>
          {showTermsLink && (
            <p className="mt-4 text-sm text-metal">
              Terms apply. <Link href="/special-offers#terms" className="text-brand underline underline-offset-2">Read offer terms</Link>
            </p>
          )}
        </div>
        <div className="grid justify-items-center gap-6">
          <Animated className="w-full max-w-[280px]">
            <MechanicalArt kind="scanner" className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,.6)]" />
          </Animated>
          <OfferCountdown />
        </div>
      </div>
    </div>
  );
}
