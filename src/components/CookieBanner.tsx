"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, Settings } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show after a short delay so it doesn't flash on first load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: true, marketing: true }));
    setVisible(false);
  };

  const savePrefs = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: false, marketing: false }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-[0_-4px_60px_rgba(10,31,68,0.12)] p-5 pointer-events-auto">
            {!showManage ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Icon */}
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#0057D9]/10 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-[#0057D9]" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0A1F44]">We use cookies</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    We use cookies to improve your experience, analyse site traffic, and personalise content. By clicking &ldquo;Accept All&rdquo; you consent to our use of cookies.{" "}
                    <a href="/privacy" className="text-[#0057D9] hover:underline font-semibold">Privacy Policy</a>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    onClick={() => setShowManage(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-muted-foreground hover:text-slate-900 border border-border hover:border-border rounded-lg transition-all duration-200"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Manage
                  </button>
                  <button
                    onClick={decline}
                    className="px-3.5 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Decline
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0057D9] hover:bg-[#2563EB] rounded-lg transition-colors duration-200 shadow-sm shadow-[#0057D9]/20"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Accept All
                  </button>
                </div>

                {/* Close */}
                <button
                  onClick={() => setVisible(false)}
                  className="shrink-0 p-1 rounded-md hover:bg-slate-100 text-muted-foreground hover:text-muted-foreground transition-colors duration-200"
                  aria-label="Dismiss cookie banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Manage Preferences Panel */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0A1F44]">Cookie Preferences</h3>
                  <button onClick={() => setShowManage(false)} className="p-1 rounded-md hover:bg-slate-100 text-muted-foreground hover:text-muted-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Essential */}
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border">
                    <div>
                      <p className="text-xs font-bold text-foreground">Essential Cookies</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Required for the website to function. Cannot be disabled.</p>
                    </div>
                    <div className="w-9 h-5 bg-[#0057D9] rounded-full flex items-center justify-end pr-0.5 cursor-not-allowed opacity-60">
                      <span className="w-4 h-4 bg-card rounded-full shadow-sm" />
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border">
                    <div>
                      <p className="text-xs font-bold text-foreground">Analytics Cookies</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Help us understand how visitors use the site.</p>
                    </div>
                    <button
                      onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                      className={`w-9 h-5 rounded-full flex items-center transition-colors duration-200 ${prefs.analytics ? "bg-[#0057D9] justify-end pr-0.5" : "bg-slate-300 justify-start pl-0.5"}`}
                    >
                      <span className="w-4 h-4 bg-card rounded-full shadow-sm" />
                    </button>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border">
                    <div>
                      <p className="text-xs font-bold text-foreground">Marketing Cookies</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Used for targeted advertising and personalisation.</p>
                    </div>
                    <button
                      onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}
                      className={`w-9 h-5 rounded-full flex items-center transition-colors duration-200 ${prefs.marketing ? "bg-[#0057D9] justify-end pr-0.5" : "bg-slate-300 justify-start pl-0.5"}`}
                    >
                      <span className="w-4 h-4 bg-card rounded-full shadow-sm" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={savePrefs}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0057D9] hover:bg-[#2563EB] rounded-lg transition-colors duration-200"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 text-xs font-bold text-[#0057D9] border border-[#0057D9]/30 hover:bg-[#0057D9]/5 rounded-lg transition-colors duration-200"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
