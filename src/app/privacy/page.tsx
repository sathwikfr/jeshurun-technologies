"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Bell, Globe, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      icon: <Globe className="w-5 h-5" />,
      content: "Jeshurun Technologies ('we', 'us', or 'our') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our professional IT consulting and software services. Please read this privacy policy carefully."
    },
    {
      title: "2. Information We Collect",
      icon: <Lock className="w-5 h-5" />,
      content: "We may collect personal data that you voluntarily provide to us when you express interest in obtaining information about us or our services, contact us through our online forms, or interact with our chatbot. This information may include your name, email address, phone number, company name, and job title."
    },
    {
      title: "3. How We Use Your Information",
      icon: <Eye className="w-5 h-5" />,
      content: "We use the information we collect to provide, operate, and maintain our services, to improve and personalize your experience, to communicate with you regarding updates, client reports, or inquiries, and to comply with legal obligations. We will never sell or rent your personal information to third parties."
    },
    {
      title: "4. Data Security",
      icon: <Shield className="w-5 h-5" />,
      content: "We implement robust administrative, technical, and physical security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, please remember that no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security."
    },
    {
      title: "5. Cookies & Analytics",
      icon: <Bell className="w-5 h-5" />,
      content: "We use cookies and similar tracking technologies to analyze site traffic, personalize content, and understand where our visitors come from. You can manage your cookie preferences at any time using our Cookie Consent Banner or by adjusting your browser settings."
    },
    {
      title: "6. Contact Us",
      icon: <Mail className="w-5 h-5" />,
      content: "If you have any questions or concerns about this Privacy Policy or our data handling practices, please contact our Data Protection Team at info@jeshuruntech.com or write to us at our registered address in Dublin, Ireland."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-screen">
      
      {/* Header Banner */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 border-b border-border bg-[#F8FAFC]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container px-6 sm:px-8 mx-auto"
        >
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0057D9]/5 border border-[#0057D9]/10 text-xs font-bold uppercase tracking-wider text-[#0057D9]">
              Legal Agreement
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#0A1F44]">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-semibold">
              Last updated: June 2026. Your privacy and data security are our top priorities.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Main Content Body */}
      <section className="w-full py-20 md:py-28 bg-card">
        <div className="container px-6 sm:px-8 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="prose prose-slate max-w-none space-y-8">
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                This Privacy Policy outlines how Jeshurun Technologies handles and processes your data in compliance with the General Data Protection Regulation (GDPR) and other applicable privacy laws.
              </p>

              {/* Grid of Sections */}
              <div className="grid gap-8 mt-12">
                {sections.map((sec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                    className="p-8 border border-border rounded-2xl bg-[#F8FAFC]/30 hover:bg-card shadow-[0_8px_30px_rgb(0,0,0,0.005)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-[#0057D9]/10 text-[#0057D9] flex items-center justify-center group-hover:bg-[#0057D9]/20 group-hover:scale-[1.02] transition-all duration-300">
                        {sec.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#0A1F44]">{sec.title}</h3>
                        <p className="text-muted-foreground text-base leading-relaxed font-medium">
                          {sec.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
