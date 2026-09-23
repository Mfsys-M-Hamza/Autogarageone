import { client, fullAddress } from "@/config/client";

export const telHref = `tel:${client.phone.e164}`;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${client.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function serviceInquiryMessage(serviceName: string) {
  return `Hello ${client.name}, I'd like to ask about ${serviceName} for my car.\n\nVehicle (make/model/year): \nIssue: `;
}

export const directionsHref = client.geo.confirmed
  ? `https://www.google.com/maps/dir/?api=1&destination=${client.geo.lat},${client.geo.lng}`
  : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${client.name}, ${fullAddress}`)}`;

export const mapEmbedSrc = client.geo.confirmed
  ? `https://www.google.com/maps?q=${client.geo.lat},${client.geo.lng}&z=16&output=embed`
  : `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=15&output=embed`;

/** Offer is live if switched on and the end date has not passed. */
export function isOfferLive(now: Date = new Date()) {
  return client.offer.active && now.getTime() < new Date(client.offer.endsAt).getTime();
}
