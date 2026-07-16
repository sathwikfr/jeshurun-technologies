"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  Globe, 
  Shield, 
  Sparkles, 
  PhoneCall, 
  Check, 
  ExternalLink, 
  Building2, 
  CheckCircle,
  HelpCircle,
  Laptop,
  Server,
  Workflow,
  Key
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { HeroFieldBackground } from "@/components/HeroFieldBackground";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 22 },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    countryCode: "+353",
    phone: "",
    interest: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    // Format additional fields into the message body to preserve database schema & API route integrity
    const formattedMessage = `
--- Enterprise Inquiry Details ---
Phone: ${formData.countryCode} ${formData.phone || "Not Provided"}
Service Interest: ${formData.interest.length > 0 ? formData.interest.join(", ") : "Not Provided"}

--- Project Requirements ---
${formData.message}
`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          message: formattedMessage,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          message: "Thank you! Your enterprise inquiry has been submitted. A senior consultant will respond within 2 hours.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          countryCode: "+353",
          phone: "",
          interest: [],
          message: "",
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || "An error occurred. Please try again.",
        });
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setSubmitResult({
        success: false,
        message: "A network error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* HERO SECTION WRAPPER */}
      <section className="relative w-full pt-32 md:pt-40 pb-16 overflow-hidden border-b border-border">
        {/* NEW UNIFIED BACKGROUND (Blue/Cyan Theme) */}
        <HeroFieldBackground blobOneColor="bg-blue-600/15" blobTwoColor="bg-cyan-600/15" />

        <div className="container px-6 sm:px-8 mx-auto relative z-10">
          {/* HERO CONTENT */}
          <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto mb-12 space-y-4"
        >
          <motion.div 
            variants={item}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/20 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            START A CONVERSATION
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.15] text-foreground"
          >
            <span className="text-slate-900 dark:text-white block">Let's Solve Your Hardest</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 block">
              Technical Challenges.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium"
          >
            From secure cloud infrastructure to mission-critical software. Tell us what you’re building—or what's holding you back—and a senior consultant will be in touch within 2 business hours.
          </motion.p>

          {/* TRUST STRIP */}
          <div 
            className="pt-8 mt-6 border-t border-dashed border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs sm:text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]"
          >
            {[
              "2017 Established",
              "9+ Years Experience",
              "Global Delivery",
              "24/7 Support"
            ].map((stat, idx, arr) => (
              <span key={idx} className="flex items-center gap-x-6">
                <motion.span 
                  variants={item}
                  whileHover={{ scale: 1.05, color: "#94a3b8" }} 
                  className="cursor-default transition-colors duration-200"
                >
                  {stat}
                </motion.span>
                {idx < arr.length - 1 && (
                  <motion.span variants={item} className="hidden sm:inline text-slate-300 dark:text-slate-700">•</motion.span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="relative w-full py-16 bg-transparent">
        <div className="container px-6 sm:px-8 mx-auto relative z-10">
          {/* MAIN LAYOUT */}
          <div className="grid gap-10 lg:grid-cols-12 max-w-5xl mx-auto items-stretch mb-16">
            
            {/* LEFT COLUMN: Premium Contact Form */}
            <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col"
          >
            <SpotlightCard className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-blue-900/5 overflow-hidden flex-1">
              <div className="space-y-2 mb-8 border-b border-slate-200/50 dark:border-slate-800/50 pb-6">
                <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white tracking-tight">
                  Start a Conversation
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
                  Tell us about your project, goals, and technical requirements. Our team will connect with you within 2 business hours.
                </p>
              </div>
              <div>
                {submitResult?.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                      <motion.svg 
                        initial={{ pathLength: 0 }} 
                        animate={{ pathLength: 1 }} 
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-10 h-10 text-emerald-600 dark:text-emerald-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Received!</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto">
                      Thank you for reaching out. A senior consultant will review your requirements and respond within 2 business hours.
                    </p>
                    <button 
                      type="button"
                      onClick={() => setSubmitResult(null)}
                      className="mt-8 px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {submitResult && !submitResult.success && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-4 mb-6 rounded-2xl border text-sm font-semibold bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800/40 dark:text-rose-300"
                      >
                        <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 bg-rose-500">✕</span>
                        <span>{submitResult.message}</span>
                      </motion.div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-bold text-slate-700 dark:text-slate-300">First Name</Label>
                      <Input 
                        id="firstName" 
                        required 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        disabled={isSubmitting} 
                        className="bg-slate-50/50 dark:bg-slate-900/50 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] h-12 rounded-xl px-4 text-slate-900 dark:text-white placeholder-slate-400 font-semibold disabled:opacity-50 hover:shadow-[0_0_8px_rgba(59,130,246,0.1)] transition-all outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-bold text-slate-700 dark:text-slate-300">Last Name</Label>
                      <Input 
                        id="lastName" 
                        required 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        disabled={isSubmitting} 
                        className="bg-slate-50/50 dark:bg-slate-900/50 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] h-12 rounded-xl px-4 text-slate-900 dark:text-white placeholder-slate-400 font-semibold disabled:opacity-50 hover:shadow-[0_0_8px_rgba(59,130,246,0.1)] transition-all outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">Business Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        disabled={isSubmitting} 
                        className="bg-slate-50/50 dark:bg-slate-900/50 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] h-12 rounded-xl px-4 text-slate-900 dark:text-white placeholder-slate-400 font-semibold disabled:opacity-50 hover:shadow-[0_0_8px_rgba(59,130,246,0.1)] transition-all outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-bold text-slate-700 dark:text-slate-300">Company</Label>
                      <Input 
                        id="company" 
                        required
                        value={formData.company} 
                        onChange={handleChange} 
                        disabled={isSubmitting} 
                        className="bg-slate-50/50 dark:bg-slate-900/50 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] h-12 rounded-xl px-4 text-slate-900 dark:text-white placeholder-slate-400 font-semibold disabled:opacity-50 hover:shadow-[0_0_8px_rgba(59,130,246,0.1)] transition-all outline-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</Label>
                    <div className="flex gap-2">
                      <div className="relative w-28 shrink-0">
                        <select
                          id="countryCode"
                          value={formData.countryCode}
                          onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                          disabled={isSubmitting}
                          className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] h-12 rounded-xl pl-3 pr-8 text-slate-900 dark:text-white font-semibold disabled:opacity-50 hover:shadow-[0_0_8px_rgba(59,130,246,0.1)] transition-all appearance-none cursor-pointer outline-none text-sm"
                        >
                          <option value="+353">🇮🇪 +353</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+65">🇸🇬 +65</option>
                        </select>
                        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-500">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      <Input 
                        id="phone" 
                        type="tel" 
                        required 
                        value={formData.phone} 
                        onChange={handleChange} 
                        disabled={isSubmitting} 
                        className="flex-1 bg-slate-50/50 dark:bg-slate-900/50 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] h-12 rounded-xl px-4 text-slate-900 dark:text-white font-semibold disabled:opacity-50 hover:shadow-[0_0_8px_rgba(59,130,246,0.1)] transition-all outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">Service Interest</Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "IT Consulting", "Cloud Solutions", "Digital Transformation", 
                        "Infrastructure", "AI & Automation", "Cybersecurity", "Custom Software"
                      ].map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => {
                            const current = formData.interest;
                            const updated = current.includes(service)
                              ? current.filter(s => s !== service)
                              : [...current, service];
                            setFormData({ ...formData, interest: updated });
                          }}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            formData.interest.includes(service)
                              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]" 
                              : "bg-slate-50 dark:bg-slate-900 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-[1.02]"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Project Requirements</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your architecture requirements, timeline, and goals..." 
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="min-h-[140px] bg-slate-50/50 dark:bg-slate-900/50 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] text-sm leading-relaxed rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 font-semibold disabled:opacity-50 hover:shadow-[0_0_8px_rgba(59,130,246,0.1)] transition-all outline-none" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full font-bold text-base h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md hover:scale-[1.02] transition-transform duration-300 rounded-xl disabled:opacity-50"
                    >
                      {isSubmitting ? "Scheduling Consultation..." : "Schedule Consultation"}
                      {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <span>Response within 2 business hours.</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-4 text-center leading-relaxed font-semibold">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-500 transition-colors">Privacy Policy</a> and{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-500 transition-colors">Terms of Service</a> apply.
                  </p>
                </form>
              </>
            )}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* RIGHT COLUMN: Company Overview & Global Headquarters */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.25 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* COMPANY OVERVIEW */}
            <SpotlightCard className="p-6 rounded-3xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-blue-900/5 overflow-hidden group">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(15,23,42,0.08)] dark:border-slate-800 pb-3 mb-4">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Company Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">Jeshurun Technologies Limited</h4>
                  <p className="text-xs font-bold text-slate-455 dark:text-slate-400 mt-0.5">Dublin, Ireland</p>
                </div>
                
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
                  Enterprise consulting, cloud transformation, software engineering, and infrastructure modernization for organizations operating at scale.
                </p>

                <div className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>View Company Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </SpotlightCard>

            {/* GLOBAL HEADQUARTERS CARD WITH MAP */}
            <SpotlightCard className="p-6 rounded-3xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-blue-900/5 overflow-hidden group flex-1 flex flex-col">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(15,23,42,0.08)] dark:border-slate-800 pb-3 mb-4">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Global Headquarters
              </h3>
              <p className="text-base font-extrabold text-slate-900 dark:text-white">Dublin, Ireland</p>
              
              <div className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300 space-y-0.5 mt-2 mb-4 leading-relaxed">
                <p>Unit C4, Nutgrove Office Park</p>
                <p>Dundrum, Dublin 14</p>
                <p>Ireland</p>
              </div>

              {/* Miniature Interactive Map */}
              <div className="w-full rounded-2xl overflow-hidden mb-4 relative bg-slate-100 dark:bg-slate-950 border border-slate-900/10 dark:border-slate-800 flex-1 min-h-[176px]">
                <iframe
                  src="https://maps.google.com/maps?q=Nutgrove%20Office%20Park,%20Dundrum,%20Dublin%2014,%20Ireland&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full filter contrast-[1.02] grayscale-[10%] opacity-95 dark:opacity-80 dark:invert-[90%] dark:hue-rotate-[180deg] dark:contrast-[1.25] dark:brightness-[0.88]"
                ></iframe>
              </div>

              <a 
                href="https://www.google.com/maps/search/?api=1&query=Nutgrove+Office+Park,+Dundrum,+Dublin+14,+Ireland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 h-11 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 transition-colors shadow-sm mt-auto"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </SpotlightCard>

          </motion.div>
        </div>

        {/* ENGAGEMENT STANDARDS */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="max-w-5xl mx-auto mb-16"
        >
          <SpotlightCard className="rounded-3xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-blue-900/5 p-6 md:p-8">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Engagement Standards
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { label: "Initial Response", val: "< 2 Hours" },
                { label: "Proposal Turnaround", val: "24–48 Hours" },
                { label: "Discovery Workshop", val: "1–3 Days" },
                { label: "Support Coverage", val: "24/7" }
              ].map((stat, i) => (
                <motion.div key={i} variants={item}>
                  <SpotlightCard className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border border-[rgba(15,23,42,0.08)] dark:border-slate-800 rounded-2xl">
                    <div className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-400">{stat.val}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-550 dark:text-slate-450 mt-1.5">{stat.label}</div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
      </section>

      {/* REGISTRY DETAILS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] dark:bg-[#111827] border border-[rgba(15,23,42,0.08)] dark:border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-xl space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Corporate Registry Information</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Registered Entity Name</h4>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">Jeshurun Technologies Limited</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Company Registration Number</h4>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">596333</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Incorporation Date</h4>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">12 January 2017</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Registered Jurisdiction</h4>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">Ireland (Companies Registration Office)</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Principal Activity</h4>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">Computer Consultancy Activities (NACE 6202)</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Registry Status</h4>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Normal / Active
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setIsModalOpen(false)}
                className="w-full font-bold h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 text-white rounded-xl transition-colors"
              >
                Close Details
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
