import React from "react";
import { motion } from "motion/react";
import { Thermometer, Maximize2, Layers } from "lucide-react";

// Facility images from PDF
import facilityAerialImg from "../assets/images/facility_aerial_view_1784711466372.jpg";
import olympicPoolImg from "../assets/images/olympic_pool_5lanes_1784711486001.jpg";
import trainingPoolImg from "../assets/images/training_pool_4lanes_1784711503345.jpg";
import recreationalPool1Img from "../assets/images/recreational_pool_1_1784711525040.jpg";
import recreationalPool2Img from "../assets/images/recreational_pool_2_1784711543514.jpg";
import fitnessKidsImg from "../assets/images/fitness_kids_gym_1784711563656.jpg";
import saunaImg from "../assets/images/sauna_facility_1784711583134.jpg";

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Step Sport Facility",
    subtitle: "Aerial View & Solar Infrastructure",
    image: facilityAerialImg,
    tag: "AERIAL VIEW",
  },
  {
    id: 2,
    title: "Olympic Size Pool",
    subtitle: "5 Competitive Lanes (25m × 12m)",
    image: olympicPoolImg,
    tag: "OLYMPIC POOL",
  },
  {
    id: 3,
    title: "Training Pool",
    subtitle: "4 Competitive Lanes (25m × 10m)",
    image: trainingPoolImg,
    tag: "TRAINING POOL",
  },
  {
    id: 4,
    title: "Recreational Pool 1",
    subtitle: "Shallow Wellness Pool (15m × 6.5m)",
    image: recreationalPool1Img,
    tag: "RECREATIONAL",
  },
  {
    id: 5,
    title: "Recreational Pool 2",
    subtitle: "Full Swimming Pool (25m × 10m)",
    image: recreationalPool2Img,
    tag: "RECREATIONAL",
  },
  {
    id: 6,
    title: "Fitness Kids",
    subtitle: "Youth Athletic Development Center",
    image: fitnessKidsImg,
    tag: "KIDS FITNESS",
  },
  {
    id: 7,
    title: "Sauna Suite",
    subtitle: "Therapeutic Wooden Thermal Room",
    image: saunaImg,
    tag: "WELLNESS",
  },
];

export const AboutUsPage: React.FC = () => {
  // Duplicate gallery items for smooth infinite horizontal looping
  const infiniteItems = [...galleryItems, ...galleryItems, ...galleryItems];

  return (
    <div className="min-h-screen bg-[#0a2540] text-white pt-24 pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* SECTION 1: HISTORY OF STEP SPORT CENTER */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 pt-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase mb-8 leading-tight">
            History of <span className="text-sky-400">Step Sport Center</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-gray-200 text-base sm:text-lg leading-relaxed font-light font-ui">
              <p>
                <strong className="text-sky-300 font-semibold">“Step Sport Center”</strong> is a respected name in the country, region and beyond, with sports activities in the local and international arena. With the creation of “Step Sport Center”, opportunities for an active and healthy life are offered for all age groups.
              </p>
              <p>
                Through activities in swimming pools and gyms, we aim for Step Sport Center to become synonymous with health, sport and recreation.
              </p>
              <p>
                The team of “Step Sport Center” is united under the principle of providing a quality service to members of swimming clubs and other sports, supporting the achievement of their goals and objectives.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 p-2 shadow-2xl backdrop-blur-sm group">
                <img
                  src={facilityAerialImg}
                  alt="Aerial View of Step Sport Center"
                  className="w-full h-[320px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none rounded-2xl" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs sm:text-sm font-normal text-gray-200">
                    Step Sport Center Complex & Solar System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PREMISES PART 1 */}
        <section className="my-16 py-8 space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Step Sport Center <span className="text-sky-400">Premises</span>
            </h2>
          </div>

          <div className="space-y-8">
            {/* PREMISE 1: Olympic Size Pool with 5 Lanes */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-2xl hover:bg-slate-900/80 hover:border-sky-400/50 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Olympic Size Pool with 5 Lanes
                </h3>
                <ul className="space-y-3 pt-2 text-gray-200 font-ui text-sm sm:text-base font-normal">
                  <li className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>The pool water temperature is <strong className="text-sky-300 font-bold">26.5–30°C</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Maximize2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>The pool is <strong className="text-sky-300 font-bold">25 m long, 12 m wide, and 1.85 m deep</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>Five competitive lanes, each <strong className="text-sky-300 font-bold">2.35 m wide</strong></span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-950 p-1 shadow-xl group">
                  <img
                    src={olympicPoolImg}
                    alt="Olympic Size Pool with 5 Lanes"
                    className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* PREMISE 2: Training Pool with 4 Lanes */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-2xl hover:bg-slate-900/80 hover:border-sky-400/50 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-5 order-2 md:order-1">
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-950 p-1 shadow-xl group">
                  <img
                    src={trainingPoolImg}
                    alt="Training Pool with 4 Lanes"
                    className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="md:col-span-7 order-1 md:order-2 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Training Pool with 4 Lanes
                </h3>
                <ul className="space-y-3 pt-2 text-gray-200 font-ui text-sm sm:text-base font-normal">
                  <li className="flex items-center gap-3">
                    <Maximize2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>The pool is <strong className="text-sky-300 font-bold">25 m long, 10 m wide, and 1.65 m deep</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>The pool water temperature is <strong className="text-sky-300 font-bold">27–30°C</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>Four competitive lanes, each <strong className="text-sky-300 font-bold">2.35 m wide</strong></span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* PREMISE 3: Recreational Pool 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-2xl hover:bg-slate-900/80 hover:border-sky-400/50 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Recreational Pool
                </h3>
                <ul className="space-y-3 pt-2 text-gray-200 font-ui text-sm sm:text-base font-normal">
                  <li className="flex items-center gap-3">
                    <Maximize2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>The pool is <strong className="text-sky-300 font-bold">15 m long, 6.5 m wide, and 0.85 m deep</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>The pool water temperature is <strong className="text-sky-300 font-bold">29°C</strong></span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-950 p-1 shadow-xl group">
                  <img
                    src={recreationalPool1Img}
                    alt="Recreational Pool 1"
                    className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* IN THE MIDDLE AFTER RECREATIONAL POOL 1: CURVED LOOP GALLERY   */}
        {/* Like attached "about us frame ref.png"                         */}
        {/* ------------------------------------------------------------- */}
        <section className="my-20 py-12 relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-950/80 via-blue-950 to-slate-950 border border-sky-400/20 shadow-2xl backdrop-blur-xl">
          <div className="text-center px-4 mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Explore Our <span className="text-sky-400">Arena Gallery</span>
            </h3>
          </div>

          {/* Curved 3D perspective infinite looping marquee */}
          <div className="relative w-full overflow-hidden py-8 [perspective:1200px]">
            {/* Left and Right edge fade masks */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0a2540] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0a2540] to-transparent z-20 pointer-events-none" />

            <div className="flex gap-6 animate-infinite-scroll w-max hover:[animation-play-state:paused]">
              {infiniteItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-[280px] sm:w-[340px] flex-shrink-0 group cursor-pointer transition-all duration-500 hover:scale-105"
                  style={{
                    transform: "rotateY(-4deg) rotateX(2deg) translateZ(0)",
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-sky-300/30 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-md group-hover:border-sky-400/60 transition-colors">
                    <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    </div>

                    <div className="p-3 text-left">
                      <h4 className="text-base font-extrabold text-white uppercase tracking-tight group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-300 font-ui font-light mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREMISES PART 2 (RECREATIONAL 2, KIDS FITNESS, SAUNA) */}
        <section className="my-16 py-8 space-y-8">
          {/* PREMISE 4: Recreational Pool 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-2xl hover:bg-slate-900/80 hover:border-sky-400/50 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-950 p-1 shadow-xl group">
                <img
                  src={recreationalPool2Img}
                  alt="Recreational Pool 2"
                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Recreational Pool
              </h3>
              <ul className="space-y-3 pt-2 text-gray-200 font-ui text-sm sm:text-base font-normal">
                <li className="flex items-center gap-3">
                  <Maximize2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <span>The pool is <strong className="text-sky-300 font-bold">25 m long, 10 m wide, and 1.65 m deep</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Thermometer className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <span>The pool water temperature is <strong className="text-sky-300 font-bold">27–30°C</strong></span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* PREMISE 5: Fitness Kids */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-2xl hover:bg-slate-900/80 hover:border-sky-400/50 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Fitness Kids
              </h3>
              <p className="text-gray-200 font-ui text-sm sm:text-base font-normal leading-relaxed">
                Dedicated youth fitness studio designed to build motor skills, athletic agility, confidence, and strength in a fun, safe, supervised environment equipped with tailored gym gear.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-950 p-1 shadow-xl group">
                <img
                  src={fitnessKidsImg}
                  alt="Fitness Kids"
                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* PREMISE 6: Sauna */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-2xl hover:bg-slate-900/80 hover:border-sky-400/50 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-950 p-1 shadow-xl group">
                <img
                  src={saunaImg}
                  alt="Sauna Facility"
                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Sauna
              </h3>
              <p className="text-gray-200 font-ui text-sm sm:text-base font-normal leading-relaxed">
                Premium Finnish wooden thermal sauna designed for post-workout muscle recovery, circulation enhancement, detoxification, and deep relaxation.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CTA BOTTOM BANNER */}
        <div className="text-center py-12 px-6 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight relative z-10">
            Join Step Sport Center Today
          </h3>
          <p className="text-xs sm:text-sm text-sky-100 font-ui font-light max-w-md mx-auto mt-2 mb-6 relative z-10">
            Experience Olympic-standard swimming pools, professional training, and fitness facilities.
          </p>
          <a
            href="#register-page"
            onClick={() => (window.location.hash = "#register-page")}
            className="inline-block px-8 py-3.5 rounded-full bg-white text-blue-950 font-bold text-sm hover:bg-sky-50 transition-all shadow-xl active:scale-95 relative z-10"
          >
            Become a Member
          </a>
        </div>
      </div>
    </div>
  );
};
