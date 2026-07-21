import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import trainer1 from "../assets/images/trainer_1_1784608728880.jpg";
import trainer2 from "../assets/images/trainer_2_1784608745933.jpg";
import trainer3 from "../assets/images/trainer_3_1784608768746.jpg";
import trainer4 from "../assets/images/trainer_4_1784608788501.jpg";
import trainer5 from "../assets/images/trainer_5_1784608807860.jpg";

export const TrainersSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const trainers = [
    { id: 1, image: trainer1 },
    { id: 2, image: trainer2 },
    { id: 3, image: trainer3 },
    { id: 4, image: trainer4 },
    { id: 5, image: trainer5 },
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trainers.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [trainers.length, isHovered]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % trainers.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + trainers.length) % trainers.length);
  };

  return (
    <section id="coaches" className="relative w-full bg-gradient-to-b from-sky-100 to-sky-50 text-slate-900 py-24 select-none overflow-hidden border-t border-sky-150">
      {/* Subtle top border decorative light ray */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      
      {/* Heading Container */}
      <div className="w-full py-10 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-sky-600 font-black mb-1">
            Steps Sport Center Experts
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-950 uppercase mb-4">
            Meet Our <span className="text-sky-600">Trainers</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-xl font-semibold leading-relaxed">
            Our trainers are certified and experienced in their field. They are here to help you achieve your goals.
          </p>
        </motion.div>
      </div>

      {/* Decorative pool elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-sky-300/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Reused 3D Fanned Stacked Card Carousel */}
      <div
        className="relative w-full max-w-[90vw] md:max-w-4xl h-[340px] md:h-[400px] mx-auto flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {trainers.map((trainer, idx) => {
          const diff = (idx - activeIndex + trainers.length) % trainers.length;
          
          let zIndex = 10;
          let scale = 0.8;
          let rotate = 0;
          let translateX = 0;
          let opacity = 0;
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
            scale = 0.9;
            rotate = 6;
            translateX = window.innerWidth < 768 ? 110 : 220;
            opacity = 0.7;
          } else if (diff === 2) {
            zIndex = 10;
            scale = 0.75;
            rotate = 12;
            translateX = window.innerWidth < 768 ? 180 : 380;
            opacity = 0.35;
          } else if (diff === trainers.length - 1) {
            zIndex = 20;
            scale = 0.9;
            rotate = -6;
            translateX = window.innerWidth < 768 ? -110 : -220;
            opacity = 0.7;
          } else if (diff === trainers.length - 2) {
            zIndex = 10;
            scale = 0.75;
            rotate = -12;
            translateX = window.innerWidth < 768 ? -180 : -380;
            opacity = 0.35;
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
              className="absolute max-w-[260px] md:max-w-[320px] w-full aspect-square rounded-[24px] overflow-hidden border border-white/60 shadow-[0_20px_50px_rgba(14,165,233,0.15)] cursor-pointer select-none bg-white/40 backdrop-blur-xl"
            >
              <img
                src={trainer.image}
                alt={`Trainer ${trainer.id}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Manual Left/Right Carousel Controls */}
      <div className="flex items-center justify-center gap-6 mt-8 z-10">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-sky-200 bg-sky-100/50 hover:bg-sky-200/50 text-blue-950 transition-all active:scale-90"
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
                activeIndex === idx ? "w-8 bg-sky-500" : "w-2 bg-sky-200 hover:bg-sky-300"
              }`}
              aria-label={`Go to coach ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-sky-200 bg-sky-100/50 hover:bg-sky-200/50 text-blue-950 transition-all active:scale-90"
          aria-label="Next coach"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Read More CTA Button */}
      <div className="flex justify-center mt-12">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#coaches-page"
          className="px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.5)] cursor-pointer"
        >
          Read More
        </motion.a>
      </div>
    </section>
  );
};
