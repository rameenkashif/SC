import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I love this sport center! The staff is friendly and the environment is perfect for both beginners and professionals.",
    author: "Jonida Xhelili",
  },
  {
    quote: "The best swimming pool in Kosovo. Clean water, professional coaches, and amazing energy!",
    author: "Arben Krasniqi",
  },
  {
    quote: "Excellent programs for kids. My son learned to swim in just a few weeks. Highly recommended!",
    author: "Valbona Gashi",
  },
];

export const MapLocationSection: React.FC = () => {
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
        
        {/* Left Side: Interactive Google Map */}
        <div className="lg:col-span-7 rounded-[24px] overflow-hidden shadow-xl border border-slate-200 min-h-[400px] lg:min-h-[500px] relative group bg-white">
          <iframe
            title="Step Sport Center Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2935.1581452654316!2d21.178652315465227!3d42.62837377916962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549dcd67b2d29f%3A0xbcaef2be50be0689!2sSTEP%20Sport%20Center!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Right Side: Step Sport Center Info & Testimonials Carousel */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center text-center px-4 md:px-8 py-6">
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-6 font-sans">
            Step Sport Center
          </h2>

          {/* Contact details */}
          <div className="font-ui space-y-3 mb-10 text-slate-700 font-medium text-sm md:text-base">
            <div className="flex items-center justify-center gap-2.5">
              <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
              <span>Address: Veternik, M25-2, Prishtina, Kosovo</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Phone className="w-5 h-5 text-sky-500 shrink-0" />
              <span>Phone: +383 49 333 934</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Mail className="w-5 h-5 text-sky-500 shrink-0" />
              <span>Email: info@step-ks.com</span>
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
                  "{testimonials[activeIdx].quote}"
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
