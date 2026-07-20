import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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
        {/* Deep blue glow under the lanes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-[50vw] h-[40vh] bg-teal-900/10 blur-[100px] rounded-full" />

        {/* Lane lines in perspective */}
        <svg className="absolute inset-0 w-full h-full opacity-35" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lane-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
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

      {/* 2. Centered Glass-morphism Text Card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-lg w-full p-8 md:p-12 rounded-[24px] glass-panel-light shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 text-white overflow-hidden group"
        >
          {/* Top light highlight sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60 pointer-events-none" />

          {/* Card Header Label */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-teal-400 font-semibold block mb-1">
                Welcome to
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-white drop-shadow-md">
                SWIM
                <span className="block text-teal-300">ARENA</span>
              </h1>
            </div>
            {/* Logo Mark: SC styled in a handwritten/custom look matching references */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-teal-400/40 bg-teal-950/30 text-teal-300 font-serif text-2xl font-bold tracking-tight shadow-inner">
              S<span className="text-xs text-white absolute bottom-3 right-3 font-sans">C</span>
              {/* Pulsing ring around the logo */}
              <div className="absolute inset-0 rounded-full border border-teal-400/20 animate-ping opacity-75" />
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-300 font-normal leading-relaxed mb-8">
            Experience premier sports training, dynamic aquatic fitness, and certified professional coaching at Steps Sport Center.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#about-us"
              className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white transition-all duration-300 shadow-lg shadow-teal-500/20 active:scale-95"
            >
              Explore Center
            </a>
            <a
              href="#register"
              className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/30 hover:border-teal-400/50 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 active:scale-95"
            >
              Join Swim SC
            </a>
          </div>

          {/* Decorative pool line accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-blue-600" />
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
        
        {/* Wave Layer 1: Teal Accent wave */}
        <svg
          className="absolute top-0 left-0 w-full h-[180px] text-teal-800/60 drop-shadow-[-2px_-4px_8px_rgba(13,148,136,0.2)]"
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

      {/* Little downward bounce arrow indicator */}
      {scrollProgress < 0.1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 animate-bounce text-xs font-semibold tracking-widest uppercase pointer-events-none">
          <span>Scroll Down</span>
          <svg className="w-4 h-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  );
};
