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
import { useLanguage } from "../i18n/LanguageContext";

interface GalleryItem {
  id: number;
  titleKey: string;
  subtitleKey: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, titleKey: "gallery.1.title", subtitleKey: "gallery.1.subtitle", image: facilityAerialImg },
  { id: 2, titleKey: "gallery.2.title", subtitleKey: "gallery.2.subtitle", image: olympicPoolImg },
  { id: 3, titleKey: "gallery.3.title", subtitleKey: "gallery.3.subtitle", image: trainingPoolImg },
  { id: 4, titleKey: "gallery.4.title", subtitleKey: "gallery.4.subtitle", image: recreationalPool1Img },
  { id: 5, titleKey: "gallery.5.title", subtitleKey: "gallery.5.subtitle", image: recreationalPool2Img },
  { id: 6, titleKey: "gallery.6.title", subtitleKey: "gallery.6.subtitle", image: fitnessKidsImg },
  { id: 7, titleKey: "gallery.7.title", subtitleKey: "gallery.7.subtitle", image: saunaImg },
];

export const AboutUsPage: React.FC = () => {
  const { t } = useLanguage();
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
            {t("aboutUsPage.historyHeadingPart1")} <span className="text-sky-400">{t("aboutUsPage.historyHeadingPart2")}</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-gray-200 text-base sm:text-lg leading-relaxed font-light font-ui">
              <p>
                <strong className="text-sky-300 font-semibold">{t("aboutUsPage.historyP1Strong")}</strong> {t("aboutUsPage.historyP1Rest")}
              </p>
              <p>
                {t("aboutUsPage.historyP2")}
              </p>
              <p>
                {t("aboutUsPage.historyP3")}
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
                    {t("aboutUsPage.historyCaption")}
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
              {t("aboutUsPage.premisesHeadingPart1")} <span className="text-sky-400">{t("aboutUsPage.premisesHeadingPart2")}</span>
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
                  {t("aboutUsPage.olympicPoolTitle")}
                </h3>
                <ul className="space-y-3 pt-2 text-gray-200 font-ui text-sm sm:text-base font-normal">
                  <li className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>{t("aboutUsPage.olympicPoolTemp")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.olympicPoolTempValue")}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Maximize2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>{t("aboutUsPage.olympicPoolSize")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.olympicPoolSizeValue")}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>{t("aboutUsPage.olympicPoolLanes")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.laneWidthValue")}</strong></span>
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
                  {t("aboutUsPage.trainingPoolTitle")}
                </h3>
                <ul className="space-y-3 pt-2 text-gray-200 font-ui text-sm sm:text-base font-normal">
                  <li className="flex items-center gap-3">
                    <Maximize2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>{t("aboutUsPage.trainingPoolSize")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.trainingPoolSizeValue")}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>{t("aboutUsPage.trainingPoolTemp")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.trainingPoolTempValue")}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>{t("aboutUsPage.trainingPoolLanes")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.laneWidthValue")}</strong></span>
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
                  {t("aboutUsPage.recreationalPoolTitle")}
                </h3>
                <ul className="space-y-3 pt-2 text-gray-200 font-ui text-sm sm:text-base font-normal">
                  <li className="flex items-center gap-3">
                    <Maximize2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>{t("aboutUsPage.recreationalPool1Size")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.recreationalPool1SizeValue")}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span>{t("aboutUsPage.recreationalPool1Temp")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.recreationalPool1TempValue")}</strong></span>
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
              {t("aboutUsPage.galleryHeadingPart1")} <span className="text-sky-400">{t("aboutUsPage.galleryHeadingPart2")}</span>
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
                        alt={t(item.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    </div>

                    <div className="p-3 text-left">
                      <h4 className="text-base font-extrabold text-white uppercase tracking-tight group-hover:text-sky-300 transition-colors">
                        {t(item.titleKey)}
                      </h4>
                      <p className="text-xs text-gray-300 font-ui font-light mt-0.5 line-clamp-1">
                        {t(item.subtitleKey)}
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
                {t("aboutUsPage.recreationalPoolTitle")}
              </h3>
              <ul className="space-y-3 pt-2 text-gray-200 font-ui text-sm sm:text-base font-normal">
                <li className="flex items-center gap-3">
                  <Maximize2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <span>{t("aboutUsPage.recreationalPool2Size")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.recreationalPool2SizeValue")}</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Thermometer className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <span>{t("aboutUsPage.recreationalPool2Temp")} <strong className="text-sky-300 font-bold">{t("aboutUsPage.recreationalPool2TempValue")}</strong></span>
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
                {t("aboutUsPage.fitnessKidsTitle")}
              </h3>
              <p className="text-gray-200 font-ui text-sm sm:text-base font-normal leading-relaxed">
                {t("aboutUsPage.fitnessKidsBody")}
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
                {t("aboutUsPage.saunaTitle")}
              </h3>
              <p className="text-gray-200 font-ui text-sm sm:text-base font-normal leading-relaxed">
                {t("aboutUsPage.saunaBody")}
              </p>
            </div>
          </motion.div>
        </section>

        {/* CTA BOTTOM BANNER */}
        <div className="text-center py-12 px-6 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight relative z-10">
            {t("aboutUsPage.ctaHeading")}
          </h3>
          <p className="text-xs sm:text-sm text-sky-100 font-ui font-light max-w-md mx-auto mt-2 mb-6 relative z-10">
            {t("aboutUsPage.ctaSubtitle")}
          </p>
          <a
            href="#register-page"
            onClick={() => (window.location.hash = "#register-page")}
            className="inline-block px-8 py-3.5 rounded-full bg-white text-blue-950 font-bold text-sm hover:bg-sky-50 transition-all shadow-xl active:scale-95 relative z-10"
          >
            {t("aboutUsPage.ctaButton")}
          </a>
        </div>
      </div>
    </div>
  );
};
