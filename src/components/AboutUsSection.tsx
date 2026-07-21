import React from "react";
import { motion } from "motion/react";
import { Info, ShieldAlert, CheckCircle2, Award } from "lucide-react";
import kidSwimmerImg from "../assets/images/kid_swimmer_about_us_1784607577316.jpg";

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
        
        {/* Left Column: Circular Bubble Graphic + Image */}
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

            {/* Kid holding a floaty smiling */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#1e3b8a] via-[#0f2d59] to-[#0a2540] shadow-inner border border-blue-200">
              <img
                src={kidSwimmerImg}
                alt="Kid swimmer smiling with floaty"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
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
              <strong className="text-blue-900 font-bold">Step Sport Center</strong> is a respected name in the country, region, and beyond, with sports activities on the local and international stage. With the creation of Step Sport Center, opportunities for an active and healthy life are offered for all age groups.
            </p>
            <p>
              Through activities in swimming pools and gyms, we aim for Step Sport Center to become synonymous with health, sports, and recreation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
