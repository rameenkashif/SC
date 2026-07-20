import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Map } from "lucide-react";

export const ContactUsSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 1500);
  };

  return (
    <section
      id="register"
      className="relative min-h-[100vh] flex items-center justify-center py-24 px-6 md:px-16 bg-gradient-to-br from-[#0a2540] via-[#0d1e3d] to-[#1e3a8a] text-white overflow-hidden"
    >
      {/* Background ripples */}
      <div className="absolute top-1/4 left-1/3 w-[60vw] h-[60vh] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/10 right-1/10 w-[30vw] h-[30vh] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start z-10">
        
        {/* Left 5 Columns: Contact Info & Stylized Vector Map */}
        <div className="lg:col-span-5 flex flex-col text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-teal-300 font-extrabold mb-2 block">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase leading-tight">
              Contact <span className="text-teal-300">Us</span>
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed mb-10">
              Have questions about Swim Arena registration, active coaches, or training hours? Send us a message and our support team will respond within 24 hours.
            </p>
          </motion.div>

          {/* Quick Info Cards */}
          <div className="space-y-6 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-teal-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-teal-300 tracking-wider">Address Location</h4>
                <p className="text-sm text-gray-200 mt-1 font-semibold">Steps Sport Center, Swim Arena Complex</p>
                <p className="text-xs text-gray-400 font-mono">102 Athletic Ring Blvd, Suite 400</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-teal-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-teal-300 tracking-wider">Email Inquiry</h4>
                <a href="mailto:info@stepsportcenter.com" className="text-sm text-gray-200 mt-1 font-bold hover:text-teal-300 transition-colors block">
                  info@stepsportcenter.com
                </a>
                <p className="text-[11px] text-gray-400">or visit stepsportcenter.com</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-teal-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-teal-300 tracking-wider">Arena Hours</h4>
                <p className="text-sm text-gray-200 mt-1 font-semibold">Mon – Fri: 06:00 – 22:00</p>
                <p className="text-xs text-gray-400">Sat – Sun: 07:30 – 19:00</p>
              </div>
            </motion.div>
          </div>

          {/* Interactive Stylized Vector Map representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-[20px] border border-white/10 overflow-hidden bg-slate-950 p-4 h-48 relative shadow-lg group"
          >
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 400 150" className="w-full h-full relative z-10" fill="none">
              {/* Abstract roads / grid lines */}
              <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <line x1="0" y1="110" x2="400" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <line x1="120" y1="0" x2="120" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <line x1="280" y1="0" x2="280" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              
              {/* Circular Park block */}
              <rect x="20" y="50" width="80" height="50" rx="8" fill="rgba(13,148,136,0.1)" stroke="rgba(13,148,136,0.2)" strokeWidth="1" />
              <text x="60" y="80" textAnchor="middle" fill="rgba(13,148,136,0.5)" fontSize="10" fontWeight="bold">ATHLETICS</text>

              {/* Steps Sport Center Block with Pool */}
              <rect x="140" y="10" width="120" height="85" rx="12" fill="rgba(37,99,235,0.15)" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" className="animate-pulse" />
              <text x="200" y="35" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">STEPS CENTER</text>
              <text x="200" y="50" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">SWIM ARENA</text>

              {/* Pool illustration */}
              <line x1="160" y1="65" x2="240" y2="65" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="160" y1="75" x2="240" y2="75" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="160" y1="85" x2="240" y2="85" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />

              {/* Location pin animation */}
              <g transform="translate(200, 30)">
                <circle cx="0" cy="0" r="14" fill="rgba(239,68,68,0.2)" className="animate-ping" />
                <circle cx="0" cy="0" r="6" fill="#ef4444" />
              </g>
            </svg>
            <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-teal-400 font-mono">
              <Map className="w-3 h-3" />
              Live Interactive Map
            </div>
          </motion.div>
        </div>

        {/* Right 7 Columns: Form Block with Glass-morphism Fields */}
        <div className="lg:col-span-7 w-full">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full p-8 md:p-10 rounded-[24px] glass-panel backdrop-blur-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-xs font-extrabold uppercase text-gray-300 tracking-wider mb-2">
                        Your Name <span className="text-teal-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-white/15 bg-white/5 text-white placeholder-gray-500 font-medium text-sm focus:border-teal-400 focus:bg-white/10 focus:outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xs font-extrabold uppercase text-gray-300 tracking-wider mb-2">
                        Your Email <span className="text-teal-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-white/15 bg-white/5 text-white placeholder-gray-500 font-medium text-sm focus:border-teal-400 focus:bg-white/10 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Subject Dropdown Selector (Beautifully custom styled) */}
                  <div className="flex flex-col">
                    <label htmlFor="subject" className="text-xs font-extrabold uppercase text-gray-300 tracking-wider mb-2">
                      Subject Matter
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-white/15 bg-slate-900 text-white font-medium text-sm focus:border-teal-400 focus:outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry / Question</option>
                      <option value="Register Registration">Register / Join SC Swim Arena</option>
                      <option value="Coaches Info">Coaching & Training Programs</option>
                      <option value="Facilities Reservation">Pool Lane Rental / Facilities</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-xs font-extrabold uppercase text-gray-300 tracking-wider mb-2">
                      Your Message <span className="text-teal-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us about your skill level, goals, or scheduling needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-xl border border-white/15 bg-white/5 text-white placeholder-gray-500 font-medium text-sm focus:border-teal-400 focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white text-xs font-extrabold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-20 h-20 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center mb-6 text-teal-400">
                    <CheckCircle className="w-10 h-10 animate-pulse" />
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-wide">
                    Submission Received!
                  </h3>
                  
                  <p className="text-sm text-gray-300 max-w-sm mb-8 font-medium leading-relaxed">
                    Thank you! Your message has been sent successfully. One of our elite swim coordinators at Steps Sport Center will get back to you shortly.
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
