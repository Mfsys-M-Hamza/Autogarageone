import { client } from "@/config/client";

/**
 * Inline <head> script: hides the offer banner before first paint if the visitor
 * dismissed it or the offer has expired — avoids any layout shift.
 */
export const offerBannerBootScript = `try{var d=document.documentElement;if(localStorage.getItem('ag1-offer-banner')==='closed'||Date.now()>${new Date(
  client.offer.endsAt,
).getTime()})d.setAttribute('data-offer-banner','closed')}catch(e){}`;
