import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrainerCard } from "../types";
import { Award, User, Clock, ChevronLeft, ChevronRight, HelpCircle, Trophy } from "lucide-react";

// Customized high-quality vector coach placeholders
const CoachAvatarSVG: React.FC<{ type: number }> = ({ type }) => {
  if (type === 1) {
    return (
      <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="coach-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#coach-grad-1)" />
        {/* Abstract waves background */}
        <path d="M 0,220 C 150,180 250,260 400,200 L 400,300 L 0,300 Z" fill="rgba(13,148,136,0.15)" />
        {/* Coach Head / Shoulders Outline */}
        <g transform="translate(140, 60)" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9">
          {/* Goggles on forehead */}
          <ellipse cx="60" cy="55" rx="35" ry="35" fill="rgba(255,255,255,0.05)" />
          {/* Head cap */}
          <path d="M 25,55 C 25,20 95,20 95,55 Z" fill="#0d9488" />
          <ellipse cx="45" cy="55" rx="12" ry="8" stroke="#0d9488" strokeWidth="2.5" />
          <ellipse cx="75" cy="55" rx="12" ry="8" stroke="#0d9488" strokeWidth="2.5" />
          {/* Face outline */}
          <path d="M 30,55 C 30,85 90,85 90,55" />
          {/* Shoulders */}
          <path d="M -15,140 C 20,105 100,105 135,140" fill="none" />
        </g>
        {/* Coach Specialty Badge overlay */}
        <rect x="20" y="20" width="85" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" />
        <text x="62.5" y="35" textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="extrabold" fontFamily="sans-serif" letterSpacing="1">BUTTERFLY</text>
      </svg>
    );
  }
  if (type === 2) {
    return (
      <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="coach-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#coach-grad-2)" />
        <path d="M 0,240 Q 180,200 400,240 L 400,300 L 0,300 Z" fill="rgba(37,99,235,0.2)" />
        {/* Coach Avatar 2 */}
        <g transform="translate(140, 60)" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9">
          {/* Swim cap */}
          <path d="M 25,55 C 25,18 95,18 95,55 Z" fill="#2563eb" />
          {/* Goggles on eyes */}
          <ellipse cx="60" cy="55" rx="35" ry="35" />
          <rect x="36" y="50" width="16" height="10" rx="3" fill="rgba(255,255,255,0.2)" />
          <rect x="68" y="50" width="16" height="10" rx="3" fill="rgba(255,255,255,0.2)" />
          <line x1="52" y1="55" x2="68" y2="55" />
          {/* Smile */}
          <path d="M 45,78 Q 60,90 75,78" />
          {/* Shoulders */}
          <path d="M -20,140 C 20,105 100,105 140,140" />
        </g>
        <rect x="20" y="20" width="85" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" />
        <text x="62.5" y="35" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="extrabold" fontFamily="sans-serif" letterSpacing="1">FREESTYLE</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="coach-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#coach-grad-3)" />
      <path d="M 0,200 Q 200,280 400,200 L 400,300 L 0,300 Z" fill="rgba(13,148,136,0.15)" />
      {/* Coach Avatar 3 */}
      <g transform="translate(140, 60)" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9">
        {/* Head cap */}
        <path d="M 25,55 C 25,20 95,20 95,55 Z" fill="#0f172a" />
        {/* Face */}
        <ellipse cx="60" cy="55" rx="35" ry="35" fill="rgba(255,255,255,0.03)" />
        {/* Goggles strap */}
        <line x1="25" y1="55" x2="95" y2="55" strokeWidth="4" />
        <rect x="42" y="48" width="14" height="12" rx="2" fill="#0d9488" />
        <rect x="64" y="48" width="14" height="12" rx="2" fill="#0d9488" />
        {/* Beard/Smile */}
        <path d="M 40,82 C 45,95 75,95 80,82" strokeWidth="2.5" />
        {/* Shoulders */}
        <path d="M -15,140 C 20,105 100,105 135,140" />
      </g>
      <rect x="20" y="20" width="85" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" />
      <text x="62.5" y="35" textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="extrabold" fontFamily="sans-serif" letterSpacing="1">ENDURANCE</text>
    </svg>
  );
};

export const TrainersSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const trainers: TrainerCard[] = [
    {
      id: 1,
      name: "Coach Alistair Vance",
      role: "Head Olympic Coach",
      quote: "Champions are made in the dark hours when no one is watching. Every length counts.",
      specialty: "Butterfly Stroke & High-Performance",
      experience: "14 Years Olympic Coaching",
      avatarColor: "from-teal-900 to-[#0a2540]",
    },
    {
      id: 2,
      name: "Coach Elena Rostova",
      role: "Aquatics Master Director",
      quote: "Water is the canvas; your body is the brush. Paint with speed, safety, and ultimate grace.",
      specialty: "Freestyle Mechanics & Breath Control",
      experience: "9 Years Certified Instructor",
      avatarColor: "from-blue-900 to-[#0a2540]",
    },
    {
      id: 3,
      name: "Coach Marcus Sterling",
      role: "Triathlon Specialist",
      quote: "Success in the water is the sum of small swimming lanes completed day after day.",
      specialty: "Long-Distance Stamina & Open Water",
      experience: "11 Years Competitive Triathlete",
      avatarColor: "from-slate-900 to-[#0a2540]",
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trainers.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [trainers.length, isHovered]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % trainers.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + trainers.length) % trainers.length);
  };

  return (
    <section id="coaches" className="relative w-full bg-black text-white py-24 select-none overflow-hidden">
      {/* Glow dividers */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
      
      {/* 1. Teal/Dark Divider Bar with Heading */}
      <div className="w-full bg-gradient-to-r from-[#031525] via-teal-950 to-[#031525] py-8 text-center border-y border-teal-500/20 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-teal-400 font-black mb-1">
            Steps Sport Center Experts
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Meet Our <span className="text-teal-300">Trainers</span>
          </h2>
        </motion.div>
      </div>

      {/* Decorative pool elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 2. Reused 3D Fanned Stacked Card Carousel */}
      <div
        className="relative w-full max-w-[90vw] md:max-w-4xl h-[480px] mx-auto flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {trainers.map((trainer, idx) => {
          const diff = (idx - activeIndex + trainers.length) % trainers.length;
          
          let zIndex = 10;
          let scale = 0.85;
          let rotate = 0;
          let translateX = 0;
          let opacity = 0.5;
          let pointerEvents: "auto" | "none" = "none";

          if (diff === 0) {
            zIndex = 30;
            scale = 1.05;
            rotate = 0;
            translateX = 0;
            opacity = 1;
            pointerEvents = "auto";
          } else if (diff === 1) {
            zIndex = 20;
            scale = 0.88;
            rotate = 5;
            translateX = window.innerWidth < 768 ? 130 : 250;
            opacity = 0.65;
          } else if (diff === trainers.length - 1) {
            zIndex = 20;
            scale = 0.88;
            rotate = -5;
            translateX = window.innerWidth < 768 ? -130 : -250;
            opacity = 0.65;
          } else {
            opacity = 0;
          }

          return (
            <motion.div
              key={trainer.id}
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
                ease: [0.25, 1, 0.5, 1],
              }}
              onClick={() => {
                if (diff !== 0) {
                  setActiveIndex(idx);
                }
              }}
              className="absolute max-w-[340px] md:max-w-[400px] w-full p-4 rounded-[24px] glass-panel backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer select-none"
            >
              {/* Trainer Profile Picture Area (Abstract SVG vector) */}
              <div className="relative aspect-[16/11] w-full rounded-[16px] overflow-hidden bg-slate-950 mb-5 border border-white/5 group">
                <CoachAvatarSVG type={trainer.id} />
                
                {/* Active highlight overlay badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Trophy className="w-3.5 h-3.5 text-teal-300" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">Certified Elite</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                  <span className="text-xs text-teal-300 font-bold tracking-widest uppercase">
                    {trainer.role}
                  </span>
                </div>
              </div>

              {/* Trainer Quote & Info Credentials */}
              <div className="px-1 text-left">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {trainer.name}
                </h3>

                <p className="text-xs text-gray-300 italic font-medium leading-relaxed mb-4 border-l-2 border-teal-500/50 pl-3">
                  "{trainer.quote}"
                </p>

                {/* Trainer Specialties list - precise museum layout style */}
                <div className="border-t border-white/10 pt-3 mt-1 flex flex-col gap-1 text-[10px] tracking-wider text-gray-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-teal-400 font-bold uppercase shrink-0">Specialty:</span>
                    <span className="truncate">{trainer.specialty}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-teal-400 font-bold uppercase shrink-0">Experience:</span>
                    <span className="truncate">{trainer.experience}</span>
                  </div>
                </div>
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
          aria-label="Previous coach"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dynamic dots selector */}
        <div className="flex gap-2">
          {trainers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-teal-400" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to coach ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white transition-all active:scale-90"
          aria-label="Next coach"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
