import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";
import brightSwimmerBgImg from "../assets/images/bright_swimmer_bg_1784780224088.jpg";

export const SignInPage: React.FC = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      setSigninForm({ email: "", password: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen relative text-slate-800 pt-24 pb-16 px-6 flex flex-col justify-center overflow-hidden">
      {/* Background Swimmer Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={brightSwimmerBgImg}
          alt="Swimmer Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-sky-900/15 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-md w-full mx-auto my-auto relative z-10">
        {/* Auth Page Card - Light Glassmorphism Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-10 rounded-3xl border border-white/80 bg-white/75 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Decorative glowing background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-300/30 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/30 blur-[60px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="signin-form-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-3xl font-black uppercase text-slate-900 mb-6 text-left tracking-tight">
                  Sign in
                </h1>

                <motion.form
                  onSubmit={handleSigninSubmit}
                  className="space-y-5 text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={signinForm.email}
                      onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all duration-300 shadow-sm"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={signinForm.password}
                      onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all duration-300 shadow-sm"
                    />
                    <a href="#about-us" className="text-xs text-sky-600 hover:text-sky-800 mt-2 font-semibold">
                      Forgot password?
                    </a>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center shadow-lg shadow-sky-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Sign in"
                    )}
                  </button>

                  <p className="text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <a
                      href="#register-page"
                      onClick={() => (window.location.hash = "#register-page")}
                      className="text-sky-600 font-bold hover:underline"
                    >
                      Signup
                    </a>
                  </p>
                </motion.form>
              </motion.div>
            ) : (
              <motion.div
                key="success-screen"
                className="flex flex-col items-center justify-center py-6 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center mb-4 text-sky-600">
                  <CheckCircle className="w-8 h-8 animate-bounce" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Success!
                </h2>

                <p className="text-sm text-slate-600 max-w-sm mb-8 leading-relaxed font-normal">
                  {successMessage}
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setSuccessMessage("");
                    }}
                    className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-sm font-medium transition-all duration-300 active:scale-95"
                  >
                    Go Back to Form
                  </button>
                  <a
                    href="#home"
                    className="w-full h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center active:scale-95 shadow-md shadow-sky-500/20"
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
