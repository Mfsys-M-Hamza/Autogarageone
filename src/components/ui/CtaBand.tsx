import { client } from "@/config/client";
import { ContactButtons } from "./ContactButtons";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";

/** Closing appointment call to action. */
export function CtaBand({ title = "Ready to get your car checked?", text }: { title?: string; text?: string }) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container-x">
        <div className="reveal relative overflow-hidden rounded-3xl border border-brand/30 bg-[linear-gradient(120deg,#0f1a11,#111413_45%,#0b0d0c)] p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 bg-[radial-gradient(circle,rgb(61_220_74/.22),transparent_65%)]" aria-hidden="true" />
          <Animated className="pointer-events-none absolute -bottom-10 right-4 hidden h-56 w-56 opacity-60 md:block">
            <MechanicalArt kind="gear" className="h-full w-full" />
          </Animated>
          <div className="relative max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-extrabold uppercase text-white sm:text-5xl">{title}</h2>
            <p className="mt-4 text-lg text-mist">
              {text ?? "Book a visit to our B-17 workshop. Your requested appointment time will be confirmed by our team through WhatsApp or telephone."}
            </p>
            <ContactButtons className="mt-8" />
            <p className="mt-5 text-sm text-metal">WhatsApp {client.whatsapp.display} · Tel {client.phone.display}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
