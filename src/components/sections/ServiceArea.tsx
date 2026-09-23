import { client, fullAddress } from "@/config/client";
import { directionsHref } from "@/lib/links";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoursList } from "@/components/HoursList";
import { ClockIcon, DirectionsIcon, PinIcon } from "@/components/Icons";

export function ServiceArea() {
  return (
    <section className="section" aria-labelledby="area-title">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            id="area-title"
            eyebrow="Service area"
            title={<>Serving Islamabad <span className="green-text">&amp; Rawalpindi</span></>}
            intro={`Our workshop is in Multi Gardens B-17, just off the Srinagar Highway (Kashmir Highway) — convenient for drivers from the western sectors of Islamabad, the motorway side and Rawalpindi via GT Road.`}
          />
          <ul className="reveal mt-6 flex flex-wrap gap-2" aria-label="Nearby areas we serve">
            {client.serviceAreas.nearby.map((a) => (
              <li key={a} className="rounded-full border border-white/12 bg-white/[.03] px-3.5 py-1.5 text-sm text-mist">{a}</li>
            ))}
          </ul>
          <div className="reveal mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <PinIcon className="text-brand" />
              <h3 className="mt-2 font-display text-xl font-bold uppercase text-white">Workshop address</h3>
              <p className="mt-1 text-mist">{fullAddress}</p>
            </div>
            <div className="card p-5">
              <ClockIcon className="text-brand" />
              <h3 className="mt-2 font-display text-xl font-bold uppercase text-white">Opening hours</h3>
              <div className="mt-1 text-sm"><HoursList compact /></div>
            </div>
          </div>
          <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="reveal btn btn-outline mt-6">
            <DirectionsIcon /> Get directions on Google Maps
          </a>
        </div>
        <MapEmbed className="reveal aspect-[4/3] w-full" />
      </div>
    </section>
  );
}
