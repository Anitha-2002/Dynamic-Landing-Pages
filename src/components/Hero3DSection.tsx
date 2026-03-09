import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { useScroll, useTransform } from "framer-motion";
import type { Hotel } from "../services/hotelApi";

const HeroScene = lazy(() =>
  import("./3d/HeroScene").then((m) => ({ default: m.HeroScene })),
);

interface Hero3DSectionProps {
  hotel: Hotel;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

export function Hero3DSection({ hotel }: Hero3DSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [use3D, setUse3D] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      setUse3D(!prefersReducedMotion && width >= 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [prefersReducedMotion]);

  const scene = hotel["3dScene"];
  const primaryImage = scene?.primaryImage ?? hotel.gallery?.[0]?.url;
  const customBannerUrl = hotel.customBannerUrl;

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] min-h-[400px] w-full overflow-hidden bg-bg-dark"
      aria-label={`${hotel.name} hero`}
    >
      {customBannerUrl ? (
        <iframe
          src={customBannerUrl}
          title={`${hotel.name} banner`}
          className="absolute inset-0 w-full h-full border-0"
          loading="eager"
        />
      ) : use3D ? (
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 1.5, 4], fov: 50 }}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <HeroScene
                primaryImage={primaryImage}
                cameraPath={scene?.cameraPath ?? []}
                scrollProgress={scrollProgress}
              />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: primaryImage ? `url(${primaryImage})` : undefined,
          }}
        />
      )}
      {!customBannerUrl && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
          {/* LED-style banner strip with glowing text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="led-banner-box inline-block rounded-lg border-2 border-accent-gold/60 bg-bg-dark/90 px-6 py-4 md:px-8 md:py-5 backdrop-blur-sm">
              <h1 className="led-glow led-pulse text-3xl md:text-5xl font-bold mb-2 tracking-tight">
                {hotel.name}
              </h1>
              <p className="led-glow-subtle text-lg md:text-xl mb-6 max-w-2xl font-medium">
                {hotel.tagline}
              </p>
              <a
                href="#book"
                className="led-btn-glow inline-block px-6 py-3 rounded-lg bg-accent-gold text-bg-dark font-semibold hover:opacity-90 transition"
              >
                Book now
              </a>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
