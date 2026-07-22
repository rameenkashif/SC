import React from "react";
import { motion } from "motion/react";

import ritaImg from "../assets/images/coaches/rita_zeqiri.jpg";
import besartImg from "../assets/images/coaches/besart_shala.jpg";
import hanaImg from "../assets/images/coaches/hana_fejzullahu.jpg";
import elonaImg from "../assets/images/coaches/elona_toverlani.jpg";
import erjonBuzhalaImg from "../assets/images/coaches/erjon_buzhala.jpg";
import artiolImg from "../assets/images/coaches/artiol_shala.jpg";
import drenImg from "../assets/images/coaches/dren_nitaj.jpg";
import korabiImg from "../assets/images/coaches/korabi.jpg";
import rinaImg from "../assets/images/coaches/rina_zuka.jpg";
import mendimImg from "../assets/images/coaches/mendim_samadraxha.jpg";
import erjonShurdhajImg from "../assets/images/coaches/erjon_shurdhaj.jpg";

interface TeamCoach {
  id: number;
  name: string;
  image: string;
}

const teamCoaches: TeamCoach[] = [
  { id: 1, name: "Hana Fejzullahu", image: hanaImg },
  { id: 2, name: "Elona Toverlani", image: elonaImg },
  { id: 3, name: "Erjon Buzhala", image: erjonBuzhalaImg },
  { id: 4, name: "Artiol Shala", image: artiolImg },
  { id: 5, name: "Dren Nitaj", image: drenImg },
  { id: 6, name: "Korabi", image: korabiImg },
  { id: 7, name: "Rina Zuka", image: rinaImg },
  { id: 8, name: "Mendim Samadraxha", image: mendimImg },
  { id: 9, name: "Erjon Shurdhaj", image: erjonShurdhajImg },
];

export const CoachesPage: React.FC = () => {
  const infiniteCoaches = [...teamCoaches, ...teamCoaches, ...teamCoaches];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 text-slate-900 pt-28 pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden font-sans">
      {/* Ambient background glow, consistent with the home section */}
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vh] bg-teal-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vh] bg-sky-200/30 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-sky-600 font-bold block mb-3">
            Step Sport Center
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-blue-950">
            Meet Our <span className="text-sky-600">Coaches</span>
          </h1>
        </motion.div>

        {/* RITA ZEQIRI */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white/45 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(14,165,233,0.1)]"
        >
          <div className="lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/80 bg-white p-2 shadow-md group">
              <img
                src={ritaImg}
                alt="Rita Zeqiri"
                className="w-full aspect-square object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="mt-5 text-2xl font-black uppercase text-blue-950 tracking-tight">
              Rita Zeqiri
            </h3>
          </div>

          <div className="lg:col-span-8 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-light font-ui">
            <p>
              Rita Zeqiri was an active swimmer of the Step Swimming Club for 12 years, a former champion and record holder in many disciplines. She was part of Kosovo's first and historic representation in the European Championship, World Championship, and the Rio 2016 Olympic Games. After this debut, she continued her sports career in triathlon, winning the state championship and many regional tournaments for 3 consecutive years. In 2021, Rita was the first Albanian woman to finish the IRONMAN triathlon race (3.8km swim, 180km bike, 42km run).
            </p>
            <p>
              Rita has been a coach at the Step swimming club since 2017. She formed the Step Swimming Academy, which consists of competitors/swimmers from younger age groups. The Academy swimmers are professional swimmers who represent the club in local and international arenas, winners of the state championship, record holders, and winners of many international medals for their age groups. The greatest successes of the Swimming Academy have been achieved with the two swimmers{" "}
              <strong className="text-sky-700 font-semibold">P.Abazi</strong> (2013) and{" "}
              <strong className="text-sky-700 font-semibold">B.Ademi</strong> (2015), who have ranked first in the European swimming ranking for their age groups. Rita holds a law degree from UP and a master's in Sport Management from Rome Business School.
            </p>
            <p>
              She's also a licensed coach from the World Aquatics Federation and ASCA (American Swimming Coaches Association).
            </p>
            <ul className="space-y-2 pt-2 text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-sky-600">&#10148;</span> LEVEL 1 – Principles for Success
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-600">&#10148;</span> LEVEL 2 – The Strokes School
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-600">&#10148;</span> LEVEL 3 – Physiology School
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-600">&#10148;</span> FITNESS: Strength &amp; Conditioning for Swimmers
              </li>
            </ul>
          </div>
        </motion.section>

        {/* BESART SHALA */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white/45 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(14,165,233,0.1)]"
        >
          <div className="lg:col-span-4 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden border border-white/80 bg-white p-2 shadow-md group">
              <img
                src={besartImg}
                alt="Besart Shala"
                className="w-full aspect-square object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="mt-5 text-2xl font-black uppercase text-blue-950 tracking-tight">
              Besart Shala
            </h3>
          </div>

          <div className="lg:col-span-8 lg:order-1 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-light font-ui">
            <p>
              Besart Shala is a distinguished swimming coach in Kosovo, with the title 'Best Swimmer' for six consecutive years (2003-2008) and 'Best Coach' for seven consecutive years (2017-2023). As the coach of the Kosovo national team, he has led national teams in prestigious international competitions, including the Tokyo 2020 Olympic Games and the World Championships in Fukuoka and Doha.
            </p>
            <p>
              Besart holds a Master's degree in Economic Sciences and high-level training qualifications from FINA. He is known for his skills in communication and time management, and his passion for swimming and other sports.
            </p>
          </div>
        </motion.section>

        {/* CONTINUOUS CAROUSEL OF ALL OTHER COACHES */}
        <section className="my-4 py-12 relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-950/80 via-blue-950 to-slate-950 border border-sky-400/20 shadow-2xl backdrop-blur-xl">
          <div className="text-center px-4 mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              The Rest of Our <span className="text-sky-400">Team</span>
            </h3>
          </div>

          <div className="relative w-full overflow-hidden py-8 [perspective:1200px]">
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

            <div className="flex gap-6 animate-infinite-scroll w-max hover:[animation-play-state:paused]">
              {infiniteCoaches.map((coach, idx) => (
                <div
                  key={`${coach.id}-${idx}`}
                  className="w-[220px] sm:w-[260px] flex-shrink-0 group cursor-pointer transition-all duration-500 hover:scale-105"
                  style={{
                    transform: "rotateY(-4deg) rotateX(2deg) translateZ(0)",
                  }}
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-sky-300/30 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-md group-hover:border-sky-400/60 transition-colors">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img
                        src={coach.image}
                        alt={coach.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Name overlay, revealed only on hover */}
                      <div className="absolute inset-0 bg-slate-950/80 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-base sm:text-lg font-extrabold text-white uppercase tracking-tight text-center px-2">
                          {coach.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
