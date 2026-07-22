import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FeaturedCard } from "../types";

// Import generated images
import stepIndividualImg from "../assets/images/step_individual_1784607303489.jpg";
import swimmingSchoolImg from "../assets/images/swimming_school_1784607322679.jpg";
import stepGroupImg from "../assets/images/step_group_1784607344623.jpg";

const cardImages: Record<number, string> = {
  1: stepIndividualImg,
  2: swimmingSchoolImg,
  3: stepGroupImg,
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

  // Auto-rotating loop: every 2.5 seconds, next card
  useEffect(() => {
    if (isHovered) return; // pause on hover for accessibility/usability
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [cards.length, isHovered]);

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-sky-50 to-sky-100 text-slate-900 overflow-hidden select-none"
    >
      {/* Glowing background elements to give depth */}
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vh] bg-teal-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vh] bg-sky-200/30 blur-[100px] rounded-full pointer-events-none" />

      {/* Section Title */}
      <div className="text-center max-w-2xl mb-16 z-10 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-blue-950 uppercase"
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
              className={`absolute max-w-[340px] md:max-w-[400px] w-full p-4 rounded-[24px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(14,165,233,0.15)] cursor-pointer select-none`}
            >
              {/* Card Image Area (Real image from assets) */}
              <div className="relative aspect-[16/10] w-full rounded-[16px] overflow-hidden bg-slate-950 mb-5 group border border-white/5">
                <img
                  src={cardImages[card.id]}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Card Content */}
              <div className="px-1 text-left">
                <h3 className="text-lg font-bold tracking-tight uppercase text-blue-950 group-hover:text-sky-600 transition-colors mb-2">
                  {card.title}
                </h3>

                <p className="font-ui text-xs text-slate-600 font-medium leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
