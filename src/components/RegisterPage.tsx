import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Landmark, CheckCircle, Mail, Lock, User, Phone, Sparkles, LogIn } from "lucide-react";

export const RegisterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"register" | "signin">("register");
  
  // Registration Form State
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    program: "Private Coaching",
    level: "Intermediate",
    agree: false,
  });

  // Sign In Form State
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Deep-link routing based on hash queries
  useEffect(() => {
    const checkHashQuery = () => {
      const hash = window.location.hash;
      if (hash.includes("tab=signin")) {
        setActiveTab("signin");
      } else if (hash.includes("tab=register")) {
        setActiveTab("register");
      }
    };
    checkHashQuery();
    window.addEventListener("hashchange", checkHashQuery);
    return () => window.removeEventListener("hashchange", checkHashQuery);
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.phone || !registerForm.password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!registerForm.agree) {
      alert("You must agree to the Terms of Service.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Account created successfully for ${registerForm.name}! Welcome to Steps Sport Center.`);
      setIsSuccess(true);
      // Clear
      setRegisterForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        program: "Private Coaching",
        level: "Intermediate",
        agree: false,
      });
    }, 1500);
  };

  const handleSigninSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signinForm.email || !signinForm.password) {
      alert("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Successfully signed in as ${signinForm.email}!`);
      setIsSuccess(true);
      // Clear
      setSigninForm({
        email: "",
        password: "",
        rememberMe: false,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white text-slate-800 pt-24 pb-16 px-6 flex flex-col justify-center">
      <div className="max-w-xl w-full mx-auto my-auto">
        
        {/* Back navigation */}
        <div className="mb-6 flex justify-between items-center">
          <a
            href="#home"
            className="font-ui inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Steps Sport Center
          </span>
        </div>

        {/* Auth Page Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-6 md:p-10 rounded-[32px] border border-white/75 bg-white/45 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Decorative glowing background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/15 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-450/15 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="auth-forms"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Brand Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex p-3 rounded-2xl bg-sky-100 border border-sky-200 text-sky-600 mb-3">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-blue-950">
                    Swim <span className="text-sky-600">Arena</span>
                  </h1>
                  <p className="font-ui text-[11px] text-slate-500 font-semibold tracking-wide mt-1 uppercase">
                    Steps Sport Center Membership Access
                  </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-sky-100/60 border border-sky-200/50 p-1.5 rounded-2xl mb-8 relative">
                  <button
                    onClick={() => {
                      setActiveTab("register");
                      window.location.hash = "#register-page?tab=register";
                    }}
                    className={`font-ui flex-1 py-3 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all relative z-10 ${
                      activeTab === "register" ? "text-white" : "text-slate-500 hover:text-sky-600"
                    }`}
                  >
                    Register
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("signin");
                      window.location.hash = "#register-page?tab=signin";
                    }}
                    className={`font-ui flex-1 py-3 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all relative z-10 ${
                      activeTab === "signin" ? "text-white" : "text-slate-500 hover:text-sky-600"
                    }`}
                  >
                    Sign In
                  </button>
                  {/* Sliding active background highlight */}
                  <motion.div
                    className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-sky-500 rounded-xl"
                    animate={{
                      x: activeTab === "register" ? 0 : "100%",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                </div>

                {/* Active Form */}
                <AnimatePresence mode="wait">
                  {activeTab === "register" ? (
                    <motion.form
                      key="register-form"
                      onSubmit={handleRegisterSubmit}
                      className="space-y-4 text-left"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Full Name */}
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                          Full Name <span className="text-sky-600">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                            className="w-full h-11 pl-11 pr-4 rounded-xl border border-sky-100 bg-white/60 text-slate-800 placeholder-slate-400 font-medium text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                            Email Address <span className="text-sky-600">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                            <input
                              type="email"
                              required
                              placeholder="john@example.com"
                              value={registerForm.email}
                              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                              className="w-full h-11 pl-11 pr-4 rounded-xl border border-sky-100 bg-white/60 text-slate-800 placeholder-slate-400 font-medium text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                            Phone Number <span className="text-sky-600">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                            <input
                              type="tel"
                              required
                              placeholder="+383 49 123 456"
                              value={registerForm.phone}
                              onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                              className="w-full h-11 pl-11 pr-4 rounded-xl border border-sky-100 bg-white/60 text-slate-800 placeholder-slate-400 font-medium text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Program Category */}
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                            Swim Program
                          </label>
                          <select
                            value={registerForm.program}
                            onChange={(e) => setRegisterForm({ ...registerForm, program: e.target.value })}
                            className="w-full h-11 px-3 rounded-xl border border-sky-100 bg-white text-slate-800 font-medium text-xs focus:border-sky-500 focus:outline-none transition-all duration-300 cursor-pointer"
                          >
                            <option value="Private Coaching">Private Olympic Coaching</option>
                            <option value="Junior Swim Club">Junior Swim Club (Kids)</option>
                            <option value="Water Polo Prep">Water Polo Prep</option>
                            <option value="Adult Aqua Group">Adult Group Sessions</option>
                            <option value="Masters Swim Prep">Masters Pool Prep</option>
                          </select>
                        </div>

                        {/* Skill Level */}
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                            Skill Level
                          </label>
                          <select
                            value={registerForm.level}
                            onChange={(e) => setRegisterForm({ ...registerForm, level: e.target.value })}
                            className="w-full h-11 px-3 rounded-xl border border-sky-100 bg-white text-slate-800 font-medium text-xs focus:border-sky-500 focus:outline-none transition-all duration-300 cursor-pointer"
                          >
                            <option value="Beginner">Beginner (Level 1)</option>
                            <option value="Intermediate">Intermediate (Level 2)</option>
                            <option value="Advanced">Advanced (Level 3)</option>
                            <option value="Elite / Pro">Elite / Olympic Prep</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Password */}
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                            Password <span className="text-sky-600">*</span>
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                            <input
                              type="password"
                              required
                              placeholder="••••••••"
                              value={registerForm.password}
                              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                              className="w-full h-11 pl-11 pr-4 rounded-xl border border-sky-100 bg-white/60 text-slate-800 placeholder-slate-400 font-medium text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                            Confirm Password <span className="text-sky-600">*</span>
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                            <input
                              type="password"
                              required
                              placeholder="••••••••"
                              value={registerForm.confirmPassword}
                              onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                              className="w-full h-11 pl-11 pr-4 rounded-xl border border-sky-100 bg-white/60 text-slate-800 placeholder-slate-400 font-medium text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Agree Checkbox */}
                      <div className="flex items-center gap-3 pt-2">
                        <input
                          id="agree-checkbox"
                          type="checkbox"
                          checked={registerForm.agree}
                          onChange={(e) => setRegisterForm({ ...registerForm, agree: e.target.checked })}
                          className="w-4 h-4 rounded border-sky-200 bg-white text-sky-500 focus:ring-sky-500"
                        />
                        <label htmlFor="agree-checkbox" className="text-[11px] text-slate-600 font-medium select-none">
                          I agree to Steps Sport Center's{" "}
                          <a href="#about-us" className="text-sky-600 hover:underline">Terms of Service</a> &{" "}
                          <a href="#about-us" className="text-sky-600 hover:underline">Privacy Policy</a>
                        </label>
                      </div>

                      {/* Register Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="font-ui w-full h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Complete Registration
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="signin-form"
                      onSubmit={handleSigninSubmit}
                      className="space-y-5 text-left"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Email */}
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={signinForm.email}
                            onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                            className="w-full h-12 pl-11 pr-4 rounded-xl border border-sky-100 bg-white/60 text-slate-800 placeholder-slate-400 font-medium text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                            Password
                          </label>
                          <a href="#about-us" className="text-[10px] text-sky-600 hover:underline">
                            Forgot Password?
                          </a>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={signinForm.password}
                            onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                            className="w-full h-12 pl-11 pr-4 rounded-xl border border-sky-100 bg-white/60 text-slate-800 placeholder-slate-400 font-medium text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Remember Me */}
                      <div className="flex items-center gap-3">
                        <input
                          id="remember-checkbox"
                          type="checkbox"
                          checked={signinForm.rememberMe}
                          onChange={(e) => setSigninForm({ ...signinForm, rememberMe: e.target.checked })}
                          className="w-4 h-4 rounded border-sky-200 bg-white text-sky-500 focus:ring-sky-500"
                        />
                        <label htmlFor="remember-checkbox" className="text-[11px] text-slate-600 font-medium select-none">
                          Remember my device
                        </label>
                      </div>

                      {/* Sign In Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="font-ui w-full h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <LogIn className="w-4 h-4" />
                            Sign In to Account
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="success-screen"
                className="flex flex-col items-center justify-center py-10 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center mb-6 text-sky-600">
                  <CheckCircle className="w-10 h-10 animate-bounce" />
                </div>
                
                <h2 className="text-2xl font-black uppercase tracking-tight text-blue-950 mb-3">
                  Success!
                </h2>
                
                <p className="font-ui text-sm text-slate-600 max-w-sm mb-10 leading-relaxed font-semibold">
                  {successMessage}
                </p>

                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setSuccessMessage("");
                    }}
                    className="font-ui w-full h-12 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95"
                  >
                    Go Back to Form
                  </button>
                  <a
                    href="#home"
                    className="font-ui w-full h-12 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center active:scale-95"
                  >
                    Return to Homepage
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
