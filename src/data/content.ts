/**
 * Editable page content: FAQs, reviews, gallery, process steps and About copy.
 */
import type { VisualKey } from "./services";

export const homeFaqs = [
  {
    q: "Where is Auto Garage One located?",
    a: "Our workshop is at NH Arcade, Street No. 10, Block C, Multi Gardens B-17, Islamabad. Use the directions button on the Contact page to navigate to us.",
  },
  {
    q: "Is the computerized scanning really free?",
    a: "Yes. Until 31 December 2026 we offer a free computerized scan and general vehicle check-up. Repairs are quoted separately and only carried out with your approval.",
  },
  {
    q: "Do you publish repair prices?",
    a: "No. The cost of a repair depends on your vehicle and what the inspection finds. We explain the problem and give you an estimate before starting any work.",
  },
  {
    q: "Do you repair hybrid cars?",
    a: "Yes. We scan hybrid systems, check battery and cooling health and carry out routine hybrid maintenance. Message your car's details on WhatsApp so we can confirm before you visit.",
  },
  {
    q: "Which areas do you serve?",
    a: "We are based in B-17, Islamabad and welcome customers from across Islamabad and Rawalpindi, including nearby sectors along the Srinagar Highway and GT Road.",
  },
  {
    q: "How do I book an appointment?",
    a: "Use the Book Appointment form, message us on WhatsApp at 0333-4548008 or call 051-8898534. Our team will confirm your time slot through WhatsApp or telephone.",
  },
];

export const whyChooseUs: { title: string; text: string; icon: VisualKey }[] = [
  { title: "Diagnosis before repair", text: "We scan and test first, so you pay to fix the real problem — not for guesswork.", icon: "scanner" },
  { title: "Transparent estimates", text: "You get a clear explanation and estimate before work begins. Nothing is done without your approval.", icon: "inspection" },
  { title: "Modern & hybrid ready", text: "EFI, computerized tuning and hybrid systems are part of our everyday work.", icon: "hybrid" },
  { title: "One-stop workshop", text: "Engine, electrical, AC, brakes, suspension and servicing under one roof in B-17.", icon: "gear" },
];

export const processSteps = [
  { title: "Book", text: "Send your request via the form, WhatsApp or phone. We confirm a time that suits you." },
  { title: "Scan & inspect", text: "Computerized scan plus a physical check of the related systems." },
  { title: "Explain & estimate", text: "We explain what we found in plain language and share an estimate." },
  { title: "Repair with approval", text: "Work starts only after you approve it. We keep you updated." },
  { title: "Test & hand over", text: "Post-repair scan and road test, then we walk you through the work done." },
];

/**
 * Stats shown on the home page. Only verifiable facts — do not add
 * "cars serviced" or "years of experience" until the business supplies real numbers.
 */
export const stats = [
  { value: "2026", label: "Established in B-17" },
  { value: "16", label: "Specialist services" },
  { value: "2", label: "Cities served" },
  { value: "Free", label: "Scan until Dec 2026" },
];

/**
 * Genuine customer reviews ONLY — copied word-for-word from the source platform.
 *
 * - `rating`: fill in only from the actual star rating on the platform. Leave it out
 *   if unknown; no stars are shown and no rating is sent to Google for that review.
 * - AggregateRating schema is published only when EVERY listed review has a rating,
 *   so the average can never be based on a partial set.
 * - `date`: ISO date or month ("2026-08"). Google shows relative dates ("a month ago"),
 *   so month precision is used for these.
 */
export type Review = {
  name: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  title?: string;
  text: string;
  date: string;
  source: string;
  reviewerNote?: string;
  vehicle?: string;
};
export const reviews: Review[] = [
  {
    name: "Mirza Abdul Rehman",
    rating: 5,
    title: "Excellent Experience — Highly Recommended",
    text:
      "Had performance and fuel-average issues that my local mechanic couldn't properly diagnose. These guys quickly found the root cause, including a faulty fuel injector. My fuel average improved from 14 to 18.5 km/L, and the car now drives much smoother—it used to feel heavy and sluggish before. Very satisfied with the diagnosis and results. Definitely recommended!",
    date: "2026-08",
    source: "Google",
    reviewerNote: "Local Guide",
  },
  {
    name: "Muhammad Mateen",
    rating: 5,
    text:
      "A good Auto workshop recently opens in town offer 🫴 all mechanical works with car and bike service with latest tools and gadgets along ultrasonic injectors cleaning machine. …",
    date: "2026-06",
    source: "Google",
  },
  {
    name: "Noor Fatimah",
    rating: 5,
    text: "Anazing 🤭 …",
    date: "2026-08",
    source: "Google",
  },
  {
    name: "Muzammal Abbas",
    text: "Car Care service digital Auto Garage One",
    date: "2026-06",
    source: "Google",
  },
];

/**
 * Gallery. Until authentic photos are supplied, entries use the site's own
 * illustrations and are clearly captioned as illustrations.
 * To add a real photo: put an optimised .webp in /public/gallery and set `src`,
 * `width`, `height` and set `illustration: false`.
 */
export type GalleryItem = {
  id: string;
  category: "Workshop" | "Diagnostics" | "Repairs" | "Before & After";
  title: string;
  alt: string;
  visual: VisualKey;
  illustration: boolean;
  src?: string;
  width?: number;
  height?: number;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", category: "Diagnostics", title: "Computerized OBD scanning", alt: "Illustration of a diagnostic scanner showing live engine data", visual: "scanner", illustration: true },
  { id: "g2", category: "Diagnostics", title: "Electrical fault tracing", alt: "Illustration of an electrical circuit being tested", visual: "electrical", illustration: true },
  { id: "g3", category: "Workshop", title: "Engine bay work", alt: "Illustration of a car engine with moving pistons", visual: "engine", illustration: true },
  { id: "g4", category: "Workshop", title: "Workshop equipment", alt: "Illustration of interlocking workshop gears", visual: "gear", illustration: true },
  { id: "g5", category: "Repairs", title: "Brake disc & caliper service", alt: "Illustration of a spinning brake disc and caliper", visual: "brake", illustration: true },
  { id: "g6", category: "Repairs", title: "Suspension repair", alt: "Illustration of a coil spring and shock absorber compressing", visual: "suspension", illustration: true },
  { id: "g7", category: "Repairs", title: "AC system service", alt: "Illustration of an AC condenser fan with cool airflow", visual: "ac", illustration: true },
  { id: "g8", category: "Before & After", title: "Injector spray: clogged vs clean", alt: "Illustration comparing an uneven injector spray with a clean even spray", visual: "injector", illustration: true },
  { id: "g9", category: "Before & After", title: "Carbon cleaning", alt: "Illustration of a piston with carbon deposits being cleaned", visual: "piston", illustration: true },
  { id: "g10", category: "Workshop", title: "Battery testing station", alt: "Illustration of a car battery on charge", visual: "battery", illustration: true },
];

/**
 * About page copy. Values and standards describe how the workshop intends to
 * operate — confirm wording with the owner. Team details are intentionally empty
 * until verified information is supplied.
 */
export const about = {
  story: [
    "Auto Garage One opened in 2026 in NH Arcade, Multi Gardens B-17 with a simple idea: drivers deserve a workshop that explains what is wrong with their car before asking them to pay for a repair.",
    "Cars have changed. Electronic fuel injection, engine computers, hybrid systems and dozens of sensors mean that many faults can no longer be found by ear alone. We set up the workshop around computerized diagnostics so that every job starts with evidence.",
    "Being new also means we are building our reputation one car at a time — which is why we focus on clear communication, honest advice and work you can check.",
  ],
  mission:
    "To give drivers in Islamabad and Rawalpindi accurate diagnosis, reliable repairs and straightforward advice — so they can make informed decisions about their vehicles.",
  values: [
    { title: "Honesty", text: "We tell you what we find, including when a repair can wait or is not worth doing." },
    { title: "Transparency", text: "Estimates before work, approval before extra work, and old parts available to see on request." },
    { title: "Precision", text: "Data-driven diagnosis and methodical repair instead of trial-and-error part swapping." },
    { title: "Respect", text: "Respect for your time, your car and your budget." },
  ],
  capabilities: [
    "Computerized OBD-II scanning and live data analysis",
    "EFI system diagnosis, throttle body and sensor service",
    "Computerized engine tuning and relearn procedures (where supported)",
    "Hybrid system scanning and battery cooling maintenance",
    "AC and heater system diagnosis and servicing",
    "Brake, suspension and steering inspection and repair",
    "Battery testing and charging facility",
    "Electrical fault tracing",
  ],
  standards: [
    "Seat, steering and floor covers used to protect your interior",
    "Pre-repair scan and post-repair verification scan",
    "Work explained and approved before it begins",
    "Clean, organised workbays and correct tools for the job",
    "Safe handling procedures for hybrid high-voltage components",
  ],
  /** Add verified technician details here, e.g. { name, role, experience }. */
  team: [] as { name: string; role: string; bio: string }[],
};
