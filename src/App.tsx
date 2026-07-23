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
import { SignInPage } from "./components/SignInPage";
import { AboutUsPage } from "./components/AboutUsPage";
import { motion } from "motion/react";
import { ArrowUp, Instagram, Facebook } from "lucide-react";
import { Logo } from "./components/Logo";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "about-us" | "coaches" | "register" | "signin">("home");

  // Synchronize hash with the currentPage state & handle sub-section scrolling
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#about-us-page" || hash === "#about-us") {
        setCurrentPage("about-us");
        setActiveSection("about-us-page");
        window.scrollTo({ top: 0 });
      } else if (hash === "#coaches-page") {
        setCurrentPage("coaches");
        setActiveSection("coaches");
        window.scrollTo({ top: 0 });
      } else if (hash.startsWith("#register-page")) {
        setCurrentPage("register");
        setActiveSection("register");
        window.scrollTo({ top: 0 });
      } else if (hash.startsWith("#signin-page")) {
        setCurrentPage("signin");
        setActiveSection("signin");
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

      {/* Main Single-Page Section Stack / Multi-Page Routing */}
      <main className="w-full">
        {currentPage === "about-us" ? (
          <AboutUsPage />
        ) : currentPage === "coaches" ? (
          <CoachesPage />
        ) : currentPage === "register" ? (
          <RegisterPage />
        ) : currentPage === "signin" ? (
          <SignInPage />
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

          <div className="flex items-center gap-4">
            {/* Plain Small White Social Icons */}
            <a
              href="https://linktr.ee/StepSportCenter?fbclid=PAZXh0bgNhZW0CMTEAAab-jMdOYXcTDUid0g5hQfCGeMuItxrQydbTRx0Og3ybI17Y3OGw3bkMCnk_aem_TZIZ2U6MaIXwcKeEsavbyg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linktree"
              title="Linktree"
              className="text-white hover:text-sky-400 transition-colors p-1.5 hover:bg-white/10 rounded-lg flex items-center justify-center"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M13.736 5.853l4.005-4.177a1.04 1.04 0 0 0-1.488-1.455l-4.25 4.433V0h-2.006v4.654L5.747.221a1.04 1.04 0 0 0-1.488 1.455l4.005 4.177H1.056A1.056 1.056 0 0 0 0 6.909c0 .583.473 1.056 1.056 1.056h6.183v2.483H2.883A1.056 1.056 0 0 0 1.827 11.5c0 .583.473 1.056 1.056 1.056h4.355v2.483H4.156A1.056 1.056 0 0 0 3.1 16.095c0 .583.473 1.056 1.056 1.056h2.083v5.793c0 .583.473 1.056 1.056 1.056h1.408c.583 0 1.056-.473 1.056-1.056v-5.793h2.083a1.056 1.056 0 0 0 1.056-1.056 1.056 1.056 0 0 0-1.056-1.056h-2.083v-2.483h4.355a1.056 1.056 0 0 0 1.056-1.056 1.056 1.056 0 0 0-1.056-1.056h-4.355V7.965h6.183A1.056 1.056 0 0 0 24 6.909a1.056 1.056 0 0 0-1.056-1.056h-9.208z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/stepsportcenter?igsh=eGk4d2Z0NmYyZTdo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="text-white hover:text-sky-400 transition-colors p-1.5 hover:bg-white/10 rounded-lg flex items-center justify-center"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://www.facebook.com/steparena.ks/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="text-white hover:text-sky-400 transition-colors p-1.5 hover:bg-white/10 rounded-lg flex items-center justify-center"
            >
              <Facebook className="w-4 h-4" />
            </a>
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
