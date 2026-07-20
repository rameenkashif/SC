import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FeaturedCard } from "../types";
import { SwatchBook, HelpCircle, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// In-code premium SVG vector templates for stunning placeholders
const SwimArenaPlaceholderSVG: React.FC<{ type: number }> = ({ type }) => {
  if (type === 1) {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="swim-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="50%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#swim-grad-1)" />
        {/* Abstract lanes */}
        <path d="M -50,240 L 150,0 M 100,240 L 250,0 M 250,240 L 350,0" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        {/* Floating light orbs */}
        <circle cx="200" cy="100" r="60" fill="rgba(255,255,255,0.05)" />
        <circle cx="280" cy="80" r="30" fill="rgba(13,148,136,0.15)" />
        {/* Wave curves */}
        <path d="M 0,160 Q 100,120 200,160 T 400,160 L 400,240 L 0,240 Z" fill="rgba(255,255,255,0.05)" />
        <path d="M 0,180 Q 100,210 200,180 T 400,180 L 400,240 L 0,240 Z" fill="rgba(13,148,136,0.15)" />
        {/* Swimmer silhouette symbol */}
        <g transform="translate(160, 90) scale(0.6)" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8">
          <circle cx="40" cy="15" r="5" />
          <path d="M 10,25 C 20,20 30,30 40,25 C 50,20 60,30 70,25" />
          <path d="M 15,35 Q 40,28 65,35" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }
  if (type === 2) {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="swim-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#121829" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#swim-grad-2)" />
        {/* Perspective grid lines */}
        <path d="M 200,0 L 0,240 M 200,0 L 100,240 M 200,0 L 200,240 M 200,0 L 300,240 M 200,0 L 400,240" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
        {/* Water ripples */}
        <circle cx="200" cy="120" r="40" stroke="rgba(37,99,235,0.25)" strokeWidth="1" fill="none" />
        <circle cx="200" cy="120" r="70" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" fill="none" />
        <circle cx="200" cy="120" r="100" stroke="rgba(13,148,136,0.1)" strokeWidth="2" fill="none" />
        {/* Modern logo glyph SC */}
        <text x="200" y="130" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="32" fontWeight="bold" fontFamily="serif">SC</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="swim-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#swim-grad-3)" />
      {/* Abstract bubble particles */}
      <circle cx="60" cy="180" r="12" fill="rgba(255,255,255,0.04)" />
      <circle cx="100" cy="80" r="8" fill="rgba(13,148,136,0.2)" />
      <circle cx="300" cy="140" r="16" fill="rgba(255,255,255,0.03)" />
      <circle cx="340" cy="60" r="6" fill="rgba(255,255,255,0.08)" />
      {/* Waves crossing */}
      <path d="M 0,100 Q 150,180 300,100 T 600,100" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
      <path d="M -100,120 Q 100,60 300,140 T 700,140" stroke="rgba(13,148,136,0.15)" strokeWidth="3" fill="none" />
      {/* Light rays */}
      <polygon points="120,0 180,0 260,240 140,240" fill="rgba(255,255,255,0.02)" />
      <polygon points="220,0 250,0 360,240 310,240" fill="rgba(13,148,136,0.04)" />
    </svg>
  );
};

export const FeaturedCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const cards: FeaturedCard[] = [
    {
      id: 1,
      title: "Step Individual",
      description:
        "For free swimming. In our indoor pools with ideal temperatures, you can swim year-round, regardless of the weather. We have three pools to choose from, making us unique in Kosovo.",
    },
    {
      id: 2,
      title: "Swimming School",
      description:
        "The 'STEP' swimming school offers swimming lessons for all age groups and abilities. With a team dedicated to its members, the school's program is overseen by professionals in the relevant field.",
    },
    {
      id: 3,
      title: "Step Group",
      description: "Group membership is a special form of membership.",
    },
  ];

  // Auto-rotating loop: every 2 seconds, next card
  useEffect(() => {
    if (isHovered) return; // pause on hover for accessibility/usability
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [cards.length, isHovered]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex flex-col items-center justify-center py-20 px-4 bg-[#0a2540] text-white overflow-hidden select-none"
    >
      {/* Glowing background elements to give depth */}
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vh] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vh] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Section Title */}
      <div className="text-center max-w-2xl mb-16 z-10 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase"
        >
          Artistic Pool & Coaching
        </motion.h2>
      </div>

      {/* 3D Stacked Card Carousel Container */}
      <div
        className="relative w-full max-w-[90vw] md:max-w-4xl h-[480px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {cards.map((card, idx) => {
          // Calculate offset relative to active card
          const diff = (idx - activeIndex + cards.length) % cards.length;
          
          let zIndex = 10;
          let scale = 0.85;
          let rotate = 0;
          let translateX = 0;
          let opacity = 0.5;
          let pointerEvents: "auto" | "none" = "none";

          if (diff === 0) {
            // Active center card
            zIndex = 30;
            scale = 1.05;
            rotate = 0;
            translateX = 0;
            opacity = 1;
            pointerEvents = "auto";
          } else if (diff === 1) {
            // Right card
            zIndex = 20;
            scale = 0.88;
            rotate = 5;
            translateX = window.innerWidth < 768 ? 130 : 250;
            opacity = 0.65;
          } else if (diff === cards.length - 1) {
            // Left card
            zIndex = 20;
            scale = 0.88;
            rotate = -5;
            translateX = window.innerWidth < 768 ? -130 : -250;
            opacity = 0.65;
          } else {
            // Any other card in background
            opacity = 0;
          }

          return (
            <motion.div
              key={card.id}
              style={{
                pointerEvents,
              }}
              animate={{
                zIndex,
                scale,
                rotate,
                x: translateX,
                opacity,
              }}
              transition={{
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1], // premium custom cubic-bezier
              }}
              onClick={() => {
                if (diff !== 0) {
                  setActiveIndex(idx);
                }
              }}
              className={`absolute max-w-[340px] md:max-w-[400px] w-full p-4 rounded-[24px] glass-panel backdrop-blur-md border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer select-none`}
            >
              {/* Card Image Area (Abstract SVG vector) */}
              <div className="relative aspect-[16/10] w-full rounded-[16px] overflow-hidden bg-slate-950 mb-5 group border border-white/5">
                <SwimArenaPlaceholderSVG type={card.id} />
                
                {/* Expand / Active marker indicator overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                  <Sparkles className="w-3 h-3 text-teal-300" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-teal-300">SC Peak</span>
                </div>

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
              </div>

              {/* Card Content */}
              <div className="px-1 text-left">
                <h3 className="text-lg font-bold tracking-tight uppercase text-white group-hover:text-teal-300 transition-colors mb-2">
                  {card.title}
                </h3>

                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Manual Left/Right Carousel Controls */}
      <div className="flex items-center justify-center gap-6 mt-10 z-10">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white transition-all active:scale-90"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dynamic page indicator dots */}
        <div className="flex gap-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-teal-400" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white transition-all active:scale-90"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
