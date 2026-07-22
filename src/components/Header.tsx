import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

interface HeaderProps {
  isVisible: boolean; // True when header is active
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ isVisible, activeSection }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about-us-page" },
    { name: "Coaches", href: "#coaches-page" },
    { name: "Register", href: "#register-page" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.includes("-page") || href === "#home") {
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
          className="font-ui fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 bg-slate-950/85 backdrop-blur-xl border-b border-white/10 text-white select-none shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {/* Brand Logo */}
          <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center group">
            <Logo className="h-9 sm:h-10 w-auto group-hover:opacity-80 transition-opacity" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const currentHash = typeof window !== "undefined" ? window.location.hash : "";
              const isActive =
                activeSection === item.href.substring(1) ||
                currentHash === item.href ||
                (currentHash === "" && item.href === "#home");

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`text-xs font-extrabold tracking-widest hover:text-sky-300 transition-all relative py-1.5 ${
                    isActive ? "text-sky-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
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
              href="#signin-page"
              onClick={(e) => handleScrollTo(e, "#signin-page")}
              className="px-5 py-2 rounded-full border border-white/70 text-xs font-black tracking-wider text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
            >
              Sign In
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-gray-300 hover:text-sky-300 font-extrabold transition-colors p-1"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold">{currentLang}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 py-2 w-28 rounded-xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden z-50 text-xs text-left text-white backdrop-blur-xl"
                  >
                    {["EN", "ES", "TR"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-2 hover:bg-sky-950/60 text-left font-bold transition-colors ${
                          currentLang === lang ? "text-sky-400 bg-sky-950/40" : "text-gray-300"
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
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white active:scale-95"
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
                className="absolute top-20 left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 py-6 px-8 flex flex-col gap-5 md:hidden z-40 overflow-hidden shadow-2xl text-white"
              >
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-sm font-extrabold tracking-widest text-gray-200 hover:text-sky-400 transition-colors border-b border-white/5 pb-2"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10">
                  <a
                    href="#signin-page"
                    onClick={(e) => handleScrollTo(e, "#signin-page")}
                    className="px-4 py-1.5 rounded-full border border-white/70 text-xs font-black tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </a>

                  {/* Mobile language picker */}
                  <div className="flex gap-2">
                    {["EN", "ES", "TR"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setCurrentLang(lang)}
                        className={`text-xs px-2.5 py-1 rounded-md border font-bold ${
                          currentLang === lang ? "bg-sky-500/20 text-sky-400 border-sky-400/40" : "border-white/15 text-gray-400"
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
