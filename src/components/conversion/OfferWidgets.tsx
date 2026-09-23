"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "@/config/client";
import { isOfferLive } from "@/lib/links";
import { CloseIcon } from "@/components/Icons";

const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} },
};

/** Useful across widgets: false until mounted, then the real live state (checks the date in the browser). */
export function useOfferLive() {
  const [live, setLive] = useState<boolean | null>(null);
  useEffect(() => setLive(isOfferLive()), []);
  return live;
}

/** Slim dismissible announcement strip above the header (server-rendered). */
export function OfferBanner() {
  if (!client.offer.active) return null;
  return (
    <div className="offer-banner relative z-[60] bg-brand text-[#04110a]">
      <div className="container-x flex min-h-10 items-center justify-center gap-3 py-2 pr-10 text-center text-sm font-semibold">
        <p>
          <span className="font-extrabold uppercase">Free</span> computerized scanning &amp; general check-up until {client.offer.endsLabel}.{" "}
          <Link href="/special-offers" className="underline underline-offset-2 hover:no-underline">See offer details</Link>
        </p>
        <button
          type="button"
          onClick={() => { store.set("ag1-offer-banner", "closed"); document.documentElement.setAttribute("data-offer-banner", "closed"); }}
          className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg hover:bg-black/10"
          aria-label="Dismiss offer announcement"
        >
          <CloseIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

/**
 * Countdown to the offer end date. Uses the real end timestamp from config and the
 * visitor's clock — no fake resets. Shows nothing until mounted to avoid hydration drift.
 */
export function OfferCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <div className="h-[76px]" aria-hidden="true" />;
  const end = new Date(client.offer.endsAt).getTime();
  const diff = end - now;
  if (!client.offer.active || diff <= 0) {
    return <p className="rounded-xl border border-white/10 p-4 font-semibold text-mist">This offer has ended. Thank you to everyone who took part.</p>;
  }
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const cells = [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Minutes" },
  ];
  return (
    <div role="timer" aria-live="off" aria-label={`Offer ends in ${d} days, ${h} hours and ${m} minutes`}>
      <ul className="flex gap-3">
        {cells.map((c) => (
          <li key={c.l} className="glass min-w-[76px] rounded-xl px-3 py-2 text-center">
            <span className="block font-display text-3xl font-extrabold text-white tabular-nums">{String(c.v).padStart(2, "0")}</span>
            <span className="text-xs uppercase tracking-wider text-metal">{c.l}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-metal">Ends {client.offer.endsLabel}, 11:59 pm Pakistan time.</p>
    </div>
  );
}

/**
 * Non-intrusive reminder that appears once after a delay, in a corner, is easy to
 * dismiss (button or Escape) and never shows again after dismissal. Not shown on
 * pages where the offer is already the focus.
 */
export function PromoToast() {
  const live = useOfferLive();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const skip = pathname === "/special-offers" || pathname === "/book-appointment";

  useEffect(() => {
    if (!live || skip || !client.promoPopup.enabled || store.get("ag1-promo") === "seen") return;
    const id = setTimeout(() => setShow(true), client.promoPopup.delaySeconds * 1000);
    return () => clearTimeout(id);
  }, [live, skip]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  function close() {
    store.set("ag1-promo", "seen");
    setShow(false);
  }

  if (!show || skip) return null;
  return (
    <aside
      aria-label="Offer reminder"
      className="rise fixed bottom-[92px] left-3 right-3 z-40 mx-auto max-w-sm rounded-2xl border border-brand/40 bg-[#111413]/95 p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,.9)] backdrop-blur-lg sm:left-6 sm:right-auto lg:bottom-6"
    >
      <button type="button" onClick={close} className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-mist hover:bg-white/5 hover:text-white" aria-label="Close offer reminder">
        <CloseIcon width={18} height={18} />
      </button>
      <p className="eyebrow">Until {client.offer.endsLabel}</p>
      <p className="mt-2 pr-8 font-display text-2xl font-extrabold text-white">{client.offer.title}</p>
      <div className="mt-4 flex gap-2">
        <Link href="/book-appointment?service=computerized-scanning" onClick={close} className="btn btn-primary btn-sm">Book free scan</Link>
        <Link href="/special-offers" onClick={close} className="btn btn-outline btn-sm">Details</Link>
      </div>
    </aside>
  );
}
