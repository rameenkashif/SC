import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, UserCheck } from "lucide-react";

import trainer1 from "../assets/images/trainer_1_1784608728880.jpg";
import trainer2 from "../assets/images/trainer_2_1784608745933.jpg";
import trainer3 from "../assets/images/trainer_3_1784608768746.jpg";
import trainer4 from "../assets/images/trainer_4_1784608788501.jpg";
import trainer5 from "../assets/images/trainer_5_1784608807860.jpg";

export const CoachesPage: React.FC = () => {
  const coaches = [trainer1, trainer2, trainer3, trainer4, trainer5];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white text-slate-900 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back navigation */}
        <div className="mb-10">
          <a
            href="#home"
            className="font-ui inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>

        {/* Page title with elegant styling */}
        <div className="border-b border-sky-200/50 pb-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-sky-600 font-bold block mb-2">
              Steps Sport Center
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-blue-950">
              Coaches <span className="text-sky-600">Directory</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-2">
              STATUS: EMPTY PAGE • READY FOR DIRECTORY INTEGRATION
            </p>
          </motion.div>
        </div>

        {/* Minimalist Grid of Coach Photos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"
        >
          {coaches.map((image, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-square rounded-[20px] overflow-hidden border border-white/60 bg-white/40 backdrop-blur-md shadow-[0_15px_40px_rgba(14,165,233,0.08)] group"
            >
              <img
                src={image}
                alt={`Coach portrait ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-[10px] font-mono uppercase text-sky-300 tracking-wider">
                  Coach #{idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty placeholder block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 p-12 rounded-[24px] border border-dashed border-sky-200/60 bg-white/30 backdrop-blur-md text-center flex flex-col items-center justify-center"
        >
          <UserCheck className="w-8 h-8 text-sky-600 mb-3 opacity-60" />
          <p className="text-xs font-mono uppercase tracking-widest text-slate-600">
            More coaches and biography details will be loaded here.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
