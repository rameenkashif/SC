import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Menu, X, SwatchBook, Award } from "lucide-react";
import { Logo } from "./Logo";

interface HeaderProps {
  isVisible: boolean; // True when the deep blue wave covers the screen (scrollProgress >= 0.9)
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ isVisible, activeSection }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about-us" },
    { name: "Coaches", href: "#coaches" },
    { name: "Register", href: "#register" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 glass-panel-light backdrop-blur-xl border-b border-white/10 text-white select-none shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        >
          {/* Logo Mark */}
          <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center gap-3 group">
            <Logo className="h-9 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] group-hover:opacity-90 transition-opacity" />
            <div className="hidden sm:flex flex-col border-l border-white/15 pl-3">
              <span className="text-sm font-black tracking-wider leading-none text-white group-hover:text-teal-400 transition-colors">
                SWIM ARENA
              </span>
              <span className="text-[9px] tracking-widest uppercase text-teal-300 font-bold leading-none mt-1">
                STEPS SPORT CENTER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`text-xs uppercase font-bold tracking-widest hover:text-teal-300 transition-all relative py-1.5 ${
                    isActive ? "text-teal-300" : "text-white/80"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-300"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#register"
              onClick={(e) => handleScrollTo(e, "#register")}
              className="text-xs uppercase font-bold tracking-widest text-teal-300 hover:text-teal-200 transition-colors"
            >
              Sign In
            </a>

            <a
              href="#register"
              onClick={(e) => handleScrollTo(e, "#register")}
              className="px-5 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 active:scale-95"
            >
              Register
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors p-1"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4 text-teal-300" />
                <span className="text-xs font-bold">{currentLang}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 py-2 w-24 rounded-lg bg-slate-900 border border-white/10 shadow-xl overflow-hidden z-50 text-xs text-left"
                  >
                    {["EN", "ES", "TR"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-1.5 hover:bg-white/5 text-left font-bold transition-colors ${
                          currentLang === lang ? "text-teal-300" : "text-white/60"
                        }`}
                      >
                        {lang === "EN" ? "English" : lang === "ES" ? "Español" : "Türkçe"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>

          {/* Mobile Overlay Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-20 left-0 right-0 bg-[#0a2540]/95 backdrop-blur-2xl border-b border-white/10 py-6 px-8 flex flex-col gap-5 md:hidden z-40 overflow-hidden shadow-2xl"
              >
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-sm font-bold tracking-widest uppercase hover:text-teal-300 transition-colors border-b border-white/5 pb-2"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10">
                  <div className="flex gap-4">
                    <a
                      href="#register"
                      onClick={(e) => handleScrollTo(e, "#register")}
                      className="text-xs uppercase font-bold tracking-widest text-teal-300 hover:text-teal-200"
                    >
                      Sign In
                    </a>
                    <a
                      href="#register"
                      onClick={(e) => handleScrollTo(e, "#register")}
                      className="text-xs uppercase font-bold tracking-widest text-white hover:text-teal-300"
                    >
                      Register
                    </a>
                  </div>

                  {/* Mobile language picker */}
                  <div className="flex gap-2">
                    {["EN", "ES", "TR"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setCurrentLang(lang)}
                        className={`text-xs px-2.5 py-1 rounded border font-bold ${
                          currentLang === lang ? "bg-teal-500/20 text-teal-300 border-teal-500/40" : "border-white/10 text-white/50"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
