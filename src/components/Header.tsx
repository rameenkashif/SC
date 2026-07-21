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
    { name: "Coaches", href: "#coaches-page" },
    { name: "Register", href: "#register-page" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.includes("-page")) {
      window.location.hash = href;
      return;
    }
    e.preventDefault();
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
          className="font-ui fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 glass-panel-light backdrop-blur-xl border-b border-sky-100 text-slate-800 select-none shadow-[0_4px_30px_rgba(14,165,233,0.08)]"
        >
          {/* Logo Mark */}
          <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center gap-3 group">
            <Logo className="h-9 w-auto drop-shadow-[0_2px_4px_rgba(14,165,233,0.15)] group-hover:opacity-90 transition-opacity" />
            <div className="hidden sm:flex flex-col border-l border-slate-250 pl-3">
              <span className="text-sm font-black tracking-wider leading-none text-blue-950 group-hover:text-sky-600 transition-colors">
                SWIM ARENA
              </span>
              <span className="text-[9px] tracking-widest uppercase text-sky-600 font-bold leading-none mt-1">
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
                  className={`text-xs uppercase font-extrabold tracking-widest hover:text-sky-600 transition-all relative py-1.5 ${
                    isActive ? "text-sky-600" : "text-slate-500"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500"
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
              href="#register-page?tab=signin"
              onClick={(e) => handleScrollTo(e, "#register-page?tab=signin")}
              className="text-xs uppercase font-extrabold tracking-widest text-sky-600 hover:text-sky-700 transition-colors"
            >
              Sign In
            </a>

            <a
              href="#register-page?tab=register"
              onClick={(e) => handleScrollTo(e, "#register-page?tab=register")}
              className="px-5 py-2 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-sky-500 hover:bg-sky-600 text-white shadow-sm shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-300 active:scale-95"
            >
              Register
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-slate-500 hover:text-sky-600 font-extrabold transition-colors p-1"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold">{currentLang}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 py-2 w-24 rounded-lg bg-white border border-sky-100 shadow-xl overflow-hidden z-50 text-xs text-left text-slate-800"
                  >
                    {["EN", "ES", "TR"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-1.5 hover:bg-sky-50 text-left font-bold transition-colors ${
                          currentLang === lang ? "text-sky-600" : "text-slate-500"
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
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-sky-50 border border-sky-100 active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
          </button>

          {/* Mobile Overlay Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-sky-100 py-6 px-8 flex flex-col gap-5 md:hidden z-40 overflow-hidden shadow-2xl"
              >
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-sm font-extrabold tracking-widest uppercase text-slate-700 hover:text-sky-600 transition-colors border-b border-slate-100 pb-2"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-sky-100">
                  <div className="flex gap-4">
                    <a
                      href="#register-page?tab=signin"
                      onClick={(e) => handleScrollTo(e, "#register-page?tab=signin")}
                      className="text-xs uppercase font-extrabold tracking-widest text-sky-600 hover:text-sky-700"
                    >
                      Sign In
                    </a>
                    <a
                      href="#register-page?tab=register"
                      onClick={(e) => handleScrollTo(e, "#register-page?tab=register")}
                      className="text-xs uppercase font-extrabold tracking-widest text-slate-700 hover:text-sky-600"
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
                          currentLang === lang ? "bg-sky-100 text-sky-600 border-sky-200" : "border-slate-200 text-slate-400"
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
