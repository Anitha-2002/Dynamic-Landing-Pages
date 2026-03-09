import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Hotel } from "../services/hotelApi";

interface HighlightsSectionProps {
  hotel: Hotel;
}

type IconType =
  | "building"
  | "snowflake"
  | "medical"
  | "metro"
  | "coffee"
  | "bell"
  | "shower"
  | "default";

const GRID_ORDER: Array<{
  key: string;
  tag: string;
  title: string;
  description: string;
  icon: IconType;
}> = [
  {
    key: "apollo",
    tag: "NEARBY",
    title: "Apollo Cancer Hospital",
    description:
      "Ideal for patients & families visiting Apollo. Close proximity means less stress during a difficult time.",
    icon: "medical",
  },
  {
    key: "ac",
    tag: "ALL ROOMS",
    title: "Air-Conditioned",
    description:
      "Beat Chennai's heat. All rooms have AC for a cool, restful stay.",
    icon: "snowflake",
  },
  {
    key: "metro",
    tag: "WALKING DISTANCE",
    title: "Metro Station",
    description:
      "Walking distance to Chennai Metro. Explore the city effortlessly — no taxis, seamless connectivity.",
    icon: "metro",
  },
  {
    key: "frontdesk",
    tag: "ALWAYS OPEN",
    title: "24/7 Front Desk",
    description:
      "Always on hand — early check-in, late check-out, any help you need.",
    icon: "bell",
  },
  {
    key: "wifi",
    tag: "COMPLIMENTARY",
    title: "Free Wi-Fi & Breakfast",
    description:
      "Complimentary breakfast daily. High-speed Wi-Fi across the entire property.",
    icon: "coffee",
  },
  {
    key: "bathroom",
    tag: "EN-SUITE",
    title: "Private Bathrooms",
    description:
      "Every room has a clean, private en-suite bathroom for full comfort.",
    icon: "shower",
  },
];

function matchHighlightToSlot(highlight: string): string {
  const lower = highlight.toLowerCase();
  if (
    lower.includes("apollo") ||
    lower.includes("hospital") ||
    lower.includes("medical")
  )
    return "apollo";
  if (
    lower.includes("air") ||
    lower.includes("condition") ||
    lower.includes("conditioned")
  )
    return "ac";
  if (
    lower.includes("metro") ||
    lower.includes("walking") ||
    lower.includes("distance")
  )
    return "metro";
  if (
    lower.includes("front desk") ||
    lower.includes("24") ||
    lower.includes("reception")
  )
    return "frontdesk";
  if (
    lower.includes("wifi") ||
    lower.includes("breakfast") ||
    lower.includes("wi-fi")
  )
    return "wifi";
  if (
    lower.includes("bathroom") ||
    lower.includes("bath") ||
    lower.includes("ensuite") ||
    lower.includes("en-suite")
  )
    return "bathroom";
  return "";
}

function getPrimeLocationHighlight(highlights: string[]): string | null {
  return (
    highlights.find(
      (h) =>
        h.toLowerCase().includes("consulate") ||
        h.toLowerCase().includes("vfs"),
    ) ?? null
  );
}

function IconBuilding() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function IconSnowflake() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14M12 6a2 2 0 110 4 2 2 0 010 4m0 8a2 2 0 110 4 2 2 0 010-4"
      />
    </svg>
  );
}

function IconMedical() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

function IconMetro() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 6h16v12H4V6zm4 3h8m-8 4h8m-4 0v4m4-4v4"
      />
    </svg>
  );
}

function IconCoffee() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 14v3m4-3v3m4-3v3M3 11h18M5 11V8a2 2 0 012-2h10a2 2 0 012 2v3M3 11a2 2 0 002 2h14a2 2 0 002-2M5 11v5a2 2 0 002 2h10a2 2 0 002-2v-5"
      />
    </svg>
  );
}

function IconBell() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function IconShower() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 14v3m4-3v3m4-3v3M6 6h12l-2 4H8L6 6zm0 0l2-4h8l2 4M4 14h16"
      />
    </svg>
  );
}

function IconDefault() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

function HighlightIcon({
  type,
  featured,
  light,
}: {
  type: IconType;
  featured?: boolean;
  light?: boolean;
}) {
  const size = featured ? "w-14 h-14" : "w-10 h-10";
  const base = light
    ? "bg-accent-gold/10 text-accent-gold border-2 border-accent-gold/50"
    : "bg-white/10 text-accent-gold border-2 border-accent-gold/50";
  const circleClass = `flex items-center justify-center rounded-full ${base} ${size}`;
  const boxClass = `flex items-center justify-center rounded-lg ${base} ${size}`;
  const content = (() => {
    switch (type) {
      case "building":
        return <IconBuilding />;
      case "snowflake":
        return <IconSnowflake />;
      case "medical":
        return <IconMedical />;
      case "metro":
        return <IconMetro />;
      case "coffee":
        return <IconCoffee />;
      case "bell":
        return <IconBell />;
      case "shower":
        return <IconShower />;
      default:
        return <IconDefault />;
    }
  })();
  if (type === "medical" || type === "metro" || type === "coffee") {
    return <span className={boxClass}>{content}</span>;
  }
  return <span className={circleClass}>{content}</span>;
}

export function HighlightsSection({ hotel }: HighlightsSectionProps) {
  const highlights = hotel.highlights ?? [];
  const description = hotel.tagline ?? hotel.shortDescription ?? "";
  const primeTitle = getPrimeLocationHighlight(highlights);

  const [slideIndex, setSlideIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const reduceMotion = useReducedMotion();

  if (highlights.length === 0) return null;

  const reviewCount = hotel.ratings?.google?.reviewCount ?? 0;
  const overallRating = hotel.ratings?.overall ?? 0;
  const roomCount = hotel.rooms?.length ?? 0;

  const gridItems = GRID_ORDER.map((slot) => {
    const matched = highlights.find(
      (h) => matchHighlightToSlot(h) === slot.key,
    );
    return { ...slot, title: matched ?? slot.title };
  });

  const slides = [
    { id: "prime", type: "prime" as const, primeTitle },
    ...gridItems.map((item) => ({
      id: item.key,
      type: "grid" as const,
      ...item,
    })),
  ];
  const n = slides.length;
  const VISIBLE = 4;
  // Duplicate first VISIBLE slides at end so at "last" position we show [last...] + [first...] with no empty gap
  const trackList = [...slides, ...slides.slice(0, VISIBLE)];
  const trackLength = trackList.length;
  const duration = reduceMotion ? 0 : 0.45;
  const ease = [0.25, 0.46, 0.45, 0.94];

  const goNext = useCallback(() => {
    setSlideIndex((prev) => Math.min(prev + 1, n));
  }, [n]);

  const goPrev = useCallback(() => {
    setSlideIndex((prev) => (prev === 0 ? n : prev - 1));
  }, [n]);

  const onSlideComplete = useCallback(() => {
    if (slideIndex === n && n > 0) {
      setIsResetting(true);
      setSlideIndex(0);
    }
  }, [slideIndex, n]);

  useEffect(() => {
    if (!isResetting) return;
    const t = requestAnimationFrame(() => setIsResetting(false));
    return () => cancelAnimationFrame(t);
  }, [isResetting]);

  useEffect(() => {
    if (n <= 1) return;
    const id = window.setInterval(goNext, 6000);
    return () => window.clearInterval(id);
  }, [n, goNext]);

  const displayIndex = slideIndex >= n ? 0 : slideIndex;

  return (
    <section
      className="relative py-12 md:py-20 px-4 bg-bg-dark overflow-hidden"
      aria-labelledby="highlights-heading"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <header className="mb-10 md:mb-12">
          <p className="flex items-center gap-2 text-accent-gold text-xs font-semibold tracking-widest uppercase mb-3">
            <span className="w-6 h-px bg-accent-gold" aria-hidden />
            Our advantages
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              id="highlights-heading"
              className="text-3xl md:text-4xl font-serif font-semibold text-white text-center lg:text-left"
            >
              Why Stay With <span className="text-accent-gold">Us</span>
            </h2>
            {description && (
              <p className="text-white/90 text-sm md:text-base max-w-md lg:text-right">
                {description}
              </p>
            )}
          </div>
        </header>

        {/* Carousel: fixed height so section doesn't grow with prime card */}
        <div className="relative overflow-hidden rounded-lg  border-accent-gold/30 bg-bg-dark">
          <div className="w-full overflow-hidden h-[300px] md:h-[320px]">
            <motion.div
              className="flex h-full"
              style={{ width: `${(trackLength * 100) / VISIBLE}%` }}
              animate={{
                x: isResetting ? "0%" : `-${(slideIndex / trackLength) * 100}%`,
              }}
              transition={{
                duration: isResetting ? 0 : duration,
                ease,
              }}
              onAnimationComplete={onSlideComplete}
            >
              {trackList.map((slide, i) => (
                <div
                  key={`${slide.id}-${i}`}
                  className="flex-none h-full px-1"
                  style={{ width: `${100 / trackLength}%` }}
                >
                  {slide.type === "prime" ? (
                    <PrimeLocationCard primeTitle={slide.primeTitle ?? null} />
                  ) : (
                    <HighlightCarouselCard
                      title={slide.title}
                      description={slide.description}
                      tag={slide.tag}
                      icon={slide.icon}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
          {n > 1 && (
            <div className="flex items-center justify-between px-2 py-4 border-t border-white/10">
              <button
                type="button"
                onClick={goPrev}
                className="text-accent-gold text-sm font-semibold hover:opacity-90 transition uppercase tracking-wider"
                aria-label="Previous highlight"
              >
                Previous
              </button>
              <div className="flex gap-1.5">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === displayIndex ? "bg-accent-gold" : "bg-white/30"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                className="text-accent-gold text-sm font-semibold hover:opacity-90 transition uppercase tracking-wider"
                aria-label="Next highlight"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <p className="text-accent-gold text-2xl md:text-3xl font-bold">
              {reviewCount > 0 ? `${reviewCount}+` : "—"}
            </p>
            <p className="text-white/80 text-xs font-semibold tracking-widest uppercase mt-1">
              Guest reviews
            </p>
          </div>
          <div className="text-center">
            <p className="text-accent-gold text-2xl md:text-3xl font-bold">
              {overallRating > 0 ? overallRating.toFixed(1) : "—"}
            </p>
            <p className="text-white/80 text-xs font-semibold tracking-widest uppercase mt-1">
              Google rating
            </p>
          </div>
          <div className="text-center">
            <p className="text-accent-gold text-2xl md:text-3xl font-bold">
              {roomCount > 0 ? roomCount : "—"}
            </p>
            <p className="text-white/80 text-xs font-semibold tracking-widest uppercase mt-1">
              Room types
            </p>
          </div>
          <div className="text-center">
            <p className="text-accent-gold text-2xl md:text-3xl font-bold">
              24/7
            </p>
            <p className="text-white/80 text-xs font-semibold tracking-widest uppercase mt-1">
              Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrimeLocationCard({ primeTitle }: { primeTitle: string | null }) {
  return (
    <div className="h-full relative rounded-lg border border-gray-200 bg-bg-light shadow-sm p-5 md:p-6 flex flex-col min-h-0">
      <span
        className="absolute inset-0 flex items-center justify-center text-gray-200 font-serif text-6xl md:text-7xl pointer-events-none select-none tracking-tighter rounded-lg"
        aria-hidden
      >
        OI
      </span>
      <div className="relative z-10 flex items-start gap-3 flex-1 min-h-0">
        <span className="flex-shrink-0">
          <HighlightIcon type="building" featured light />
        </span>
        <div className="flex-1 min-w-0 flex flex-col">
          <span className="inline-block text-accent-gold text-xs font-semibold tracking-wider uppercase border border-accent-gold px-2 py-0.5 bg-accent-gold/10 w-fit">
            PRIME LOCATION
          </span>
          <h3 className="mt-2 font-serif text-lg md:text-xl font-bold text-accent-gold line-clamp-1">
            {primeTitle ?? "Near US Consulate & VFS Global"}
          </h3>
          <p className="mt-1 text-text-muted text-sm line-clamp-3 flex-1 min-h-0">
            Perfectly positioned for visa applicants and consulate visitors.
            Arrive refreshed and on time — we're just minutes from your
            appointment.
          </p>
          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between text-xs text-text-muted flex-shrink-0">
            <span>5 min walk</span>
            <span>Anna Salai</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightCarouselCard({
  title,
  description,
  tag,
  icon,
}: {
  title: string;
  description: string;
  tag: string;
  icon: IconType;
}) {
  return (
    <div className="h-full rounded-lg border border-gray-200 bg-bg-light shadow-sm p-5 md:p-6 flex flex-col min-h-0">
      <HighlightIcon type={icon} light />
      <h3 className="mt-2 font-serif text-base md:text-lg font-semibold text-text-primary line-clamp-1">
        {title}
      </h3>
      <p className="mt-1 text-text-muted text-sm flex-1 line-clamp-3 min-h-0">
        {description}
      </p>
      <span className="mt-2 inline-block text-accent-gold text-xs font-semibold tracking-wider uppercase border border-accent-gold rounded-md bg-accent-gold/10 px-2 py-1.5 w-fit flex-shrink-0">
        {tag}
      </span>
    </div>
  );
}
