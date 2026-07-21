/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { Header } from "./components/Header";
import { FeaturedCarousel } from "./components/FeaturedCarousel";
import { AboutUsSection } from "./components/AboutUsSection";
import { TrainersSection } from "./components/TrainersSection";
import { MapLocationSection } from "./components/MapLocationSection";
import { CoachesPage } from "./components/CoachesPage";
import { RegisterPage } from "./components/RegisterPage";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Logo } from "./components/Logo";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "coaches" | "register">("home");

  // Synchronize hash with the currentPage state & handle sub-section scrolling
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#coaches-page") {
        setCurrentPage("coaches");
        setActiveSection("coaches");
        window.scrollTo({ top: 0 });
      } else if (hash.startsWith("#register-page")) {
        setCurrentPage("register");
        setActiveSection("register");
        window.scrollTo({ top: 0 });
      } else {
        setCurrentPage("home");
        // Scroll to subsection if requested
        const targetId = hash.substring(1);
        if (targetId && targetId !== "home") {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 80);
        } else if (targetId === "home" || !targetId) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHash);
    handleHash(); // Run once on load

    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  // Set up high-performance scroll monitoring for the Home page
  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== "home") {
        setShowScrollTop(window.scrollY > window.innerHeight);
        return;
      }

      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;

      // 1. Calculate wave reveal progress based on first 90% of screen height scroll
      const heroThreshold = innerHeight * 0.9;
      const progress = Math.min(1, Math.max(0, scrollY / heroThreshold));
      setScrollProgress(progress);

      // 2. Track back to top button visibility
      setShowScrollTop(scrollY > innerHeight);

      // 3. Dynamic active section calculation
      const sections = ["home", "about-us", "coaches", "register"];
      const scrollOffset = 140; // offset to match active header heights

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is currently active in viewport
          if (rect.top <= scrollOffset && rect.bottom >= scrollOffset) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once to set initial values
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Header is visible once scrollProgress is near full cover (>= 0.95) OR if we are on a separate page
  const isHeaderVisible = scrollProgress >= 0.95 || currentPage !== "home";

  return (
    <div className="relative min-h-screen bg-black font-sans text-white selection:bg-sky-500/30 selection:text-sky-300">
      
      {/* 1. Sticky/Slide-in glass-morphic Header */}
      <Header isVisible={isHeaderVisible} activeSection={activeSection} />

      {/* Elegant global scroll progress bar on top of the sticky header (Home page only) */}
      {isHeaderVisible && currentPage === "home" && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50 pointer-events-none">
          <motion.div 
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 origin-left"
            style={{
              width: `${(scrollProgress * 100)}%` // visual scroll aid
            }}
            animate={{
              width: `${Math.min(100, Math.max(0, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100))}%`
            }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Main Single-Page Section Stack / Multi-Page Routing */}
      <main className="w-full">
        {currentPage === "coaches" ? (
          <CoachesPage />
        ) : currentPage === "register" ? (
          <RegisterPage />
        ) : (
          <>
            {/* 2. Hero Section with fixed canvas & rising SVG wave */}
            <div id="hero-wrapper" className="relative w-full h-[100vh]">
              <HeroSection scrollProgress={scrollProgress} />
            </div>

            {/* 3. Featured Cards Carousel Section */}
            <div className="relative">
              <FeaturedCarousel />
            </div>

            {/* 4. About Us Section */}
            <div className="relative">
              <AboutUsSection />
            </div>

            {/* 5. Meet Our Trainers Section */}
            <div className="relative">
              <TrainersSection />
            </div>

            {/* 7. Actual Google Map Location Section */}
            <div className="relative">
              <MapLocationSection />
            </div>
          </>
        )}
      </main>

      {/* Footer Details - Steps Sport Center Copyright */}
      <footer className="bg-slate-950 py-12 px-6 text-center border-t border-white/5 text-gray-500 text-xs font-mono">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-auto opacity-90" />
            <span className="text-[10px] tracking-wider text-gray-400 font-sans font-black uppercase">
              Steps Sport Center • Swim Arena
            </span>
          </div>

          <p className="font-sans font-medium text-gray-400">
            &copy; {new Date().getFullYear()} stepsportcenter.com. All rights reserved.
          </p>

          <div className="flex gap-4 font-sans font-bold">
            <a href="#about-us" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#register-page" className="hover:text-sky-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:border-sky-500/50 shadow-xl backdrop-blur-md active:scale-90 transition-all"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 animate-pulse" />
        </motion.button>
      )}

    </div>
  );
}
