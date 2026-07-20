import React from "react";
import { motion } from "motion/react";
import { Info, ShieldAlert, CheckCircle2, Award } from "lucide-react";

export const AboutUsSection: React.FC = () => {
  return (
    <section
      id="about-us"
      className="relative min-h-[100vh] flex items-center justify-center py-24 px-6 md:px-16 bg-white text-[#0a2540] overflow-hidden"
    >
      {/* Decorative clean background patterns for the white theme */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center z-10">
        
        {/* Left Column: Circular Bubble Graphic + Diver Vector Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Main Decorative Large Circular Bubble Grid */}
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full flex items-center justify-center p-4 bg-gradient-to-tr from-blue-100 to-teal-50/50 shadow-xl border border-blue-100/80">
            
            {/* Spinning decorative orbit rings around the bubble */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-300/40 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-blue-300/20 animate-[spin_20s_linear_infinite_reverse]" />

            {/* Inner "Underwater Diver" Placeholder SVG (No actual image asset loaded, pure vectors) */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#1e3b8a] via-[#0f2d59] to-[#0a2540] shadow-inner border border-blue-200">
              <svg viewBox="0 0 400 400" className="w-full h-full object-cover">
                {/* Sunbeams underwater */}
                <polygon points="120,0 200,0 350,400 220,400" fill="rgba(255,255,255,0.06)" />
                <polygon points="200,0 260,0 380,400 320,400" fill="rgba(13,148,136,0.06)" />

                {/* Underwater landscape waves at bottom */}
                <path d="M 0,340 Q 100,300 200,340 T 400,340 L 400,400 L 0,400 Z" fill="#061c33" />
                <path d="M 0,360 Q 120,380 240,350 T 400,370 L 400,400 L 0,400 Z" fill="#030f1c" />

                {/* Animated fish icons */}
                <g fill="rgba(13,148,136,0.3)">
                  <path d="M 60,180 Q 75,170 90,180 L 100,170 L 95,180 L 100,190 L 90,180 Z" />
                  <path d="M 320,120 Q 330,113 340,120 L 348,113 L 344,120 L 348,127 L 340,120 Z" />
                  <path d="M 280,260 Q 290,255 300,260 L 306,255 L 303,260 L 306,265 L 300,260 Z" />
                </g>

                {/* Intricate swimming Diver Silhouette Illustration waving hello */}
                <g transform="translate(110, 100) scale(1.15)">
                  {/* Oxygen Tank */}
                  <rect x="50" y="70" width="18" height="42" rx="6" fill="#0d9488" />
                  <rect x="55" y="65" width="8" height="6" fill="#cbd5e1" />
                  {/* Diver Torso / Wetsuit */}
                  <path d="M 68,75 L 105,92 L 125,72 L 132,78 L 112,102 C 108,106 100,105 95,102 L 68,90 Z" fill="#ffffff" />
                  {/* Leg 1 (Kick up) */}
                  <path d="M 112,102 L 150,118 L 175,110 L 180,122 L 155,130 L 112,108 Z" fill="#ffffff" />
                  {/* Fin 1 (Teal) */}
                  <polygon points="175,110 198,104 204,116 180,122" fill="#0d9488" />
                  {/* Leg 2 (Kick down) */}
                  <path d="M 108,102 L 140,132 L 164,152 L 168,142 L 146,124 L 108,102 Z" fill="#ffffff" />
                  {/* Fin 2 (Teal) */}
                  <polygon points="164,152 186,168 178,176 168,142" fill="#0d9488" />
                  {/* Arm waving up */}
                  <path d="M 72,76 C 68,70 60,54 52,40 C 48,34 56,30 62,36 C 70,44 82,60 86,66 Z" fill="#ffffff" />
                  {/* Arm extended for steering */}
                  <path d="M 86,84 C 92,90 102,102 110,110 L 104,116 L 80,90 Z" fill="#e2e8f0" opacity="0.8" />
                  {/* Mask / Goggles */}
                  <circle cx="56" cy="74" r="10" fill="#0d9488" />
                  <circle cx="54" cy="74" r="6" fill="#e2e8f0" />
                  <path d="M 44,74 L 50,74" stroke="#ffffff" strokeWidth="2" />
                  {/* Diver Helmet/Hood */}
                  <circle cx="62" cy="76" r="12" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                  
                  {/* Goggles reflection */}
                  <line x1="52" y1="72" x2="56" y2="76" stroke="#000000" strokeWidth="1.5" />
                </g>

                {/* Animated bubbles rising from diver mouth */}
                <circle cx="150" cy="165" r="4" fill="rgba(255,255,255,0.7)" />
                <circle cx="145" cy="150" r="5" fill="rgba(255,255,255,0.6)" />
                <circle cx="155" cy="130" r="7" fill="rgba(255,255,255,0.5)" />
                <circle cx="138" cy="110" r="9" fill="rgba(255,255,255,0.4)" />
                <circle cx="152" cy="85" r="11" fill="rgba(255,255,255,0.3)" />
              </svg>
            </div>

            {/* Float badge indicator */}
            <div className="absolute -bottom-4 -right-4 glass-panel-light backdrop-blur-md px-4 py-2 rounded-2xl border border-blue-200/60 shadow-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Swim SC</span>
                <span className="text-xs font-extrabold text-blue-900 leading-none">Est. 2012</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: About Us Copy */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest mb-4 self-start">
            <Info className="w-3.5 h-3.5" />
            Steps Sport Center
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-blue-950 mb-6 uppercase">
            About <span className="text-teal-600">Us</span>
          </h2>

          <div className="space-y-5 text-base text-slate-700 leading-relaxed font-medium">
            <p>
              Welcome to <strong className="text-blue-900 font-bold">Swim Arena</strong>, a premium subdivision of Steps Sport Center. Located at <span className="text-teal-600 font-bold">stepsportcenter.com</span>, our mission is to empower individuals of all skill levels to master the water, enhance their dynamic physical health, and build competitive excellence.
            </p>
            <p>
              We provide state-of-the-art facilities featuring a 10-lane Olympic-sized swimming arena, advanced digital training monitors, and personalized coaching tracks. Our curriculum is tailored for early learners, master triathletes, and recreational aquatic enthusiasts alike.
            </p>
          </div>

          {/* Bulleted checklist highlighting our value propositions */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black uppercase text-blue-950">Elite Coaches</h4>
                <p className="text-[11px] text-slate-500 font-bold">Olympic-certified trainers</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black uppercase text-blue-950">Olympic Pools</h4>
                <p className="text-[11px] text-slate-500 font-bold">Advanced temperature-control</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black uppercase text-blue-950">Flexible Tracks</h4>
                <p className="text-[11px] text-slate-500 font-bold">Recreational & Pro tracks</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black uppercase text-blue-950">Ages 4 to 80</h4>
                <p className="text-[11px] text-slate-500 font-bold">Safe, structured groups</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
