"use client";



import { motion } from "framer-motion";

import { Scale, FileText, UserCheck, ShieldAlert, Award, HelpCircle } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <UserCheck className="w-5 h-5" />,
      content: "By accessing and browsing this website, or by engaging with our enterprise software development and consulting services, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you must not use our website or services."
    },
    {
      title: "2. Intellectual Property Rights",
      icon: <Award className="w-5 h-5" />,
      content: "Unless otherwise stated, all content, code, custom logos, visual design assets, databases, and website layouts are the intellectual property of Jeshurun Technologies or its licensors. You may not distribute, reproduce, or modify any part of this site without prior written permission."
    },
    {
      title: "3. User Responsibilities & Conduct",
      icon: <FileText className="w-5 h-5" />,
      content: "You agree to use our website and services only for lawful purposes. You must not attempt to compromise the website security, upload malicious code, probe for vulnerabilities, or spam contact channels. Any unauthorized use immediately terminates your access to our systems."
    },
    {
      title: "4. Disclaimers & Warranties",
      icon: <ShieldAlert className="w-5 h-5" />,
      content: "All information and services on this website are provided 'as is' and 'as available' without warranties of any kind, either express or implied. Jeshurun Technologies does not guarantee uninterrupted service, error-free operations, or that code assets are completely secure from all cyber threats."
    },
    {
      title: "5. Limitation of Liability",
      icon: <Scale className="w-5 h-5" />,
      content: "To the maximum extent permitted by law, Jeshurun Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, data, use, or goodwill, arising out of your access to or use of our site and resources."
    },
    {
      title: "6. Support & Inquiries",
      icon: <HelpCircle className="w-5 h-5" />,
      content: "For questions about these Terms of Service or to report violations, please contact us at info@jeshuruntech.com. We reserve the right to modify these terms at any time by updating this page."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-transparent min-h-dvh">
      
      {/* Header Banner */}
      <section className="w-full min-h-dvh pt-24 pb-12 md:pt-32 flex items-center border-b border-border bg-background relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full container px-6 sm:px-8 mx-auto"
        >
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0057D9]/5 border border-[#0057D9]/10 text-xs font-bold uppercase tracking-wider text-[#0057D9]">
              Legal Agreement
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#0A1F44]">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-semibold">
              Last updated: June 2026. Please read these terms carefully before using our platform.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Main Content Body */}
      <section className="w-full py-20 md:py-28 bg-card">
        <div className="w-full container px-6 sm:px-8 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="prose prose-slate max-w-none space-y-8">
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                These Terms of Service govern your relationship with Jeshurun Technologies relative to our corporate website and digital consulting services.
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
                    className="p-8 border border-border rounded-2xl bg-background/30 hover:bg-card shadow-[0_8px_30px_rgb(0,0,0,0.005)] hover-card-effect group"
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
