import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Star, ExternalLink } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const MAPS_URL = "https://www.google.com/maps?q=42.628374,21.178652";

interface Testimonial {
  quoteKey: string;
  author: string;
}

const testimonials: Testimonial[] = [
  { quoteKey: "testimonial.1.quote", author: "Jonida Xhelili" },
  { quoteKey: "testimonial.2.quote", author: "Arben Krasniqi" },
  { quoteKey: "testimonial.3.quote", author: "Valbona Gashi" },
];

export const MapLocationSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="map-location" className="w-full bg-slate-50 text-slate-900 py-16 px-6 md:px-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Map Card linking out to the real Step Sport Center location */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-7 rounded-[24px] overflow-hidden shadow-xl border border-slate-200 min-h-[400px] lg:min-h-[500px] relative group bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 block"
        >
          {/* Decorative street-grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
            <line x1="0%" y1="30%" x2="100%" y2="45%" stroke="#0ea5e9" strokeWidth="3" />
            <line x1="20%" y1="0%" x2="35%" y2="100%" stroke="#0ea5e9" strokeWidth="3" />
            <line x1="0%" y1="75%" x2="100%" y2="65%" stroke="#38bdf8" strokeWidth="2" />
          </svg>

          {/* Center pin + info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-16 h-16 rounded-full bg-sky-400/30 animate-ping" />
              <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-sky-500 shadow-lg shadow-sky-500/40">
                <MapPin className="w-7 h-7 text-white" fill="currentColor" />
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-blue-950 uppercase tracking-tight">
                {t("map.title")}
              </h3>
              <p className="font-ui text-sm text-slate-600 mt-1">
                {t("map.address")}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 group-hover:bg-sky-600 text-white font-ui font-bold text-sm shadow-lg transition-all duration-300 group-active:scale-95">
              {t("map.openInMaps")}
              <ExternalLink className="w-4 h-4" />
            </span>
          </div>
        </a>

        {/* Right Side: Step Sport Center Info & Testimonials Carousel */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center text-center px-4 md:px-8 py-6">
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-6 font-sans">
            {t("map.title")}
          </h2>

          {/* Contact details */}
          <div className="font-ui space-y-3 mb-10 text-slate-700 font-medium text-sm md:text-base">
            <div className="flex items-center justify-center gap-2.5">
              <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
              <span>{t("map.addressLabel")} {t("map.address")}</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Phone className="w-5 h-5 text-sky-500 shrink-0" />
              <span>{t("map.phoneLabel")} +383 49 333 934</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Mail className="w-5 h-5 text-sky-500 shrink-0" />
              <span>{t("map.emailLabel")} info@step-ks.com</span>
            </div>
          </div>

          {/* Testimonial Box */}
          <div className="w-full bg-white rounded-[24px] p-8 shadow-md border border-slate-100 flex flex-col items-center min-h-[220px] justify-between">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote content */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-ui text-slate-600 italic text-sm md:text-base leading-relaxed font-semibold px-2"
                >
                  "{t(testimonials[activeIdx].quoteKey)}"
                  <span className="block not-italic text-xs text-slate-400 font-bold uppercase tracking-wider mt-4">
                    - {testimonials[activeIdx].author}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex gap-2.5 justify-center mt-auto">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIdx === i ? "bg-sky-500 w-6" : "bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
