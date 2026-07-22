import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ScrollFrameSequence } from "./ScrollFrameSequence";
import { Phone, Instagram, MapPin, Globe, Droplet } from "lucide-react";
import { Logo } from "./Logo";

const HERO_FRAME_COUNT = 60;
const heroFramePath = (index: number) => `/hero-frames/frame-${String(index + 1).padStart(3, "0")}.jpg`;

interface HeroSectionProps {
  scrollProgress: number; // calculated progress (0 to 1) for the wave reveal
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollProgress }) => {
  // Bubbles state for rendering cute floating pool bubbles
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate a fixed set of bubbles on mount to prevent hydration/flicker issues
    const generated = Array.from({ length: 25 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100, // percentage width
      y: Math.random() * 100 + 100, // start below
      size: Math.random() * 12 + 4, // 4px to 16px
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 6, // 6s to 14s
    }));
    setBubbles(generated);
  }, []);

  // Animate the wave upward on scroll.
  // At scrollProgress = 0, translate-y is near 85vh (visible at the bottom as waves)
  // At scrollProgress = 1, translate-y is -10vh (fully covering the screen with solid blue below)
  const translateY = (1 - scrollProgress) * 90 - 5; // maps 0..1 to 85..-5

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-black select-none">
      {/* 1. Fixed Underwater Swimming Pool Digital Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scroll-scrubbed dive footage: frame advances 1:1 with hero scroll progress */}
        <ScrollFrameSequence
          progress={scrollProgress}
          frameCount={HERO_FRAME_COUNT}
          framePath={heroFramePath}
          className="absolute inset-0 w-full h-full"
        />

        {/* Scrim so the glass card and lane-line overlay stay legible over the footage */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Deep blue glow under the lanes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-[50vw] h-[40vh] bg-sky-900/10 blur-[100px] rounded-full" />

        {/* Lane lines in perspective */}
        <svg className="absolute inset-0 w-full h-full opacity-35" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lane-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#1e3a8a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Vertical swimming lane dividers */}
          <line x1="10%" y1="100%" x2="25%" y2="0%" stroke="url(#lane-grad)" strokeWidth="3" strokeDasharray="6 6" />
          <line x1="30%" y1="100%" x2="38%" y2="0%" stroke="url(#lane-grad)" strokeWidth="2" strokeDasharray="8 8" />
          <line x1="50%" y1="100%" x2="50%" y2="0%" stroke="url(#lane-grad)" strokeWidth="4" strokeDasharray="10 10" />
          <line x1="70%" y1="100%" x2="62%" y2="0%" stroke="url(#lane-grad)" strokeWidth="2" strokeDasharray="8 8" />
          <line x1="90%" y1="100%" x2="75%" y2="0%" stroke="url(#lane-grad)" strokeWidth="3" strokeDasharray="6 6" />
        </svg>

        {/* Animated Floating Bubbles */}
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full border border-blue-400/30 bg-blue-300/10 backdrop-blur-[1px]"
            style={{
              left: `${bubble.x}%`,
              width: bubble.size,
              height: bubble.size,
              bottom: "-20px",
            }}
            animate={{
              y: ["0vh", "-120vh"],
              x: ["0px", bubble.id % 2 === 0 ? "15px" : "-15px", "0px"],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle grid pattern to resemble tile lines of a pool */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* 2. Glass-morphism Text Card spanning the entire page with dynamic borders & margins, styled after AKINA reference */}
      <div className="absolute top-4 bottom-0 left-4 right-4 md:top-8 md:bottom-0 md:left-8 md:right-8 z-10 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full p-4 md:p-8 rounded-[28px] md:rounded-[40px] bg-white/[0.02] backdrop-blur-[6px] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] text-white flex flex-col justify-between items-center"
        >
          {/* Subtle light highlight sheen */}
          <div className="absolute inset-0 rounded-[28px] md:rounded-[40px] bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] opacity-40 pointer-events-none" />

          {/* CENTER TEXT & CALL TO ACTIONS */}
          <div className="w-full flex-1 flex flex-col justify-center items-center text-center max-w-5xl px-2 md:px-12 py-2 md:py-4 -mt-8 md:-mt-12 z-10">
            {/* App Logo on top of the text block - positioned neatly on the glass */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.95, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mb-4 md:mb-5"
            >
              <Logo className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto filter brightness-0 invert opacity-95" />
            </motion.div>

            {/* Center align text "dive into excellence" */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-[10px] sm:text-xs md:text-xs uppercase tracking-[0.45em] text-sky-300 font-black mb-3 text-center"
            >
              DIVE INTO EXCELLENCE
            </motion.span>

            {/* Title on one line: STEP SPORT CENTER */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(4px)", y: 15 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.9, duration: 1.1, ease: "easeOut" }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none uppercase mb-4 text-center whitespace-nowrap"
            >
              <span className="text-sky-400">STEP</span>{" "}
              <span className="text-white">SPORT CENTER</span>
            </motion.h1>

            {/* Subtext description - smaller text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="font-ui text-[11px] sm:text-xs md:text-xs text-gray-200 font-light leading-relaxed max-w-md"
            >
              Experience premier aquatic coaching, Olympic-sized swimming facilities, and personalized training programs designed to unleash your athletic potential.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* 3. Animating SVG Wave Shape (Rising upwards from bottom on scroll) */}
      <div
        className="absolute left-0 right-0 h-[120vh] pointer-events-none transition-transform duration-100 ease-out z-20"
        style={{
          transform: `translateY(${translateY}vh)`,
        }}
      >
        {/* Layered waves for high-fidelity water depth (matching reference image stack) */}
        
        {/* Wave Layer 1: Sky Accent wave */}
        <svg
          className="absolute top-0 left-0 w-full h-[180px] text-sky-500/30 drop-shadow-[-2px_-4px_8px_rgba(56,189,248,0.25)]"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,80 C320,130 480,30 800,90 C1120,150 1280,60 1440,110 L1440,180 L0,180 Z" />
        </svg>

        {/* Wave Layer 2: Medium Navy wave */}
        <svg
          className="absolute top-[20px] left-0 w-full h-[180px] text-[#0f2d59]/80"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,100 C240,40 520,140 840,70 C1160,0 1320,120 1440,80 L1440,180 L0,180 Z" />
        </svg>

        {/* Wave Layer 3: Solid Deep Navy wave (Primary color of the transitioned section) */}
        <svg
          className="absolute top-[40px] left-0 w-full h-[180px] text-[#0a2540] drop-shadow-[-4px_-8px_15px_rgba(10,37,64,0.4)]"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 C360,60 720,140 1080,70 C1260,35 1350,110 1440,90 L1440,180 L0,180 Z" />
        </svg>

        {/* Under-wave solid block */}
        <div className="absolute top-[210px] left-0 right-0 h-full bg-[#0a2540] -mt-1" />
      </div>
    </div>
  );
};
