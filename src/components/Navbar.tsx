"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sun,
  Moon,
  ChevronDown,
  ExternalLink,
  Search,
} from "lucide-react";
import { HeaderLogo } from "@/components/HeaderLogo";
import { useSession, signOut } from "next-auth/react";

const menuData = {
  About: {
    highlight: {
      title: "About Us",
      desc: "Learn about our corporate values, delivery network, and commitment to compliance.",
      href: "/about",
    },
    tabs: [
      {
        title: "Company Profile",
        desc: "Expert IT consulting and technology solutions tailored to drive digital growth.",
        href: "/about",
        features: [
          "Global Delivery Models",
          "Experienced Architects",
          "Enterprise Client Portfolio",
          "Proven Track Record",
        ],
      },
      {
        title: "SLA & Quality Standards",
        desc: "Our commitment to strict performance guarantees, system uptimes, and zero downtime transitions.",
        href: "/about/sla",
        features: [
          "99.9% Uptime Guarantee",
          "24/7 Operations Monitoring",
          "Strict Security Audits",
          "Clear SLA Compliance Logs",
        ],
      },
    ],
  },
  Software: {
    highlight: {
      title: "Enterprise Software",
      desc: "Architecting resilient, hyper-scalable systems deployed on modern cloud infrastructure.",
      href: "/software",
    },
    tabs: [
      {
        title: "Cloud-Native",
        desc: "Architecting resilient, hyper-scalable microservices.",
        href: "/software/cloud-native",
        features: [
          "Serverless Architectures",
          "Kubernetes Orchestration",
          "Auto-Scaling",
          "AWS / Azure / GCP",
        ],
      },
      {
        title: "Legacy Modernization",
        desc: "Refactoring and migrating monolithic systems.",
        href: "/software/legacy-modernization",
        features: [
          "Strangler Fig Pattern",
          "Zero-Downtime Migration",
          "API-First Architecture",
          "Modularization",
        ],
      },
      {
        title: "Mobile Architecture",
        desc: "Enterprise-grade native and cross-platform mobile apps.",
        href: "/software/mobile-architecture",
        features: [
          "React Native",
          "Flutter",
          "Offline Sync",
          "MDM Integration",
        ],
      },
      {
        title: "Enterprise API",
        desc: "Building robust GraphQL and REST APIs alongside real-time data streaming.",
        href: "/software/enterprise-api",
        features: [
          "Event-Driven Arch",
          "Kafka / RabbitMQ",
          "GraphQL Federation",
          "Data Pipelines",
        ],
      },
    ],
  },
  Services: {
    highlight: {
      title: "Our Services",
      desc: "Strategic consultancy and methods designed to organize and scale high-value enterprise deliverables.",
      href: "/services",
    },
    tabs: [
      {
        title: "IT Consulting",
        desc: "Strategic technology planning to align your IT initiatives with key business metrics and maximize ROI.",
        href: "/services/it-consulting",
        features: [
          "Technology Strategy & Roadmap",
          "Digital Transformation",
          "IT Architecture & Design",
          "Technology Assessment",
        ],
      },
      {
        title: "Project Management",
        desc: "Expert project delivery using proven methodologies to ensure on-time, on-budget success.",
        href: "/services/project-management",
        features: [
          "Agile & Scrum Integration",
          "Project Planning & Execution",
          "Risk Management & Mitigation",
          "Stakeholder Communication",
        ],
      },
      {
        title: "Test Management",
        desc: "Comprehensive quality assurance and testing services to ensure flawless software delivery.",
        href: "/services/test-management",
        features: [
          "Test Strategy & Planning",
          "Automated Testing Solutions",
          "Performance & Load Testing",
          "Quality Assurance",
        ],
      },
      {
        title: "Infrastructure Management",
        desc: "Reliable infrastructure solutions that ensure optimal performance, security, and scalability.",
        href: "/services/infrastructure-management",
        features: [
          "Infrastructure Design",
          "Cloud Migration",
          "24/7 System Monitoring",
          "Disaster Recovery & Redundancy",
        ],
      },
    ],
  },
  Technology: {
    highlight: {
      title: "Technology",
      desc: "Accelerate digital pipelines using next-generation cloud architectures and rigorous cybersecurity audits.",
      href: "/technology",
    },
    tabs: [
      {
        title: "Cloud Solutions",
        desc: "Scalable cloud infrastructure using AWS, Azure, and Google Cloud Platform.",
        href: "/technology/cloud-solutions",
        features: [
          "Multi-Cloud Architecture",
          "Serverless Infrastructure",
          "Cloud Cost Optimization",
          "Hybrid Deployments",
        ],
      },
      {
        title: "Data Management",
        desc: "Advanced database solutions and big data analytics for informed decisions.",
        href: "/technology/data-management",
        features: [
          "Enterprise Data Warehousing",
          "Predictive Analytics",
          "Data Governance & Ethics",
          "Real-Time Telemetry Data",
        ],
      },
      {
        title: "Cybersecurity",
        desc: "Comprehensive security solutions to protect your digital assets and user data.",
        href: "/technology/cybersecurity",
        features: [
          "Threat Intel & Auditing",
          "Identity Access Management",
          "Zero-Trust Architecture",
          "Vulnerability Pentesting",
        ],
      },
      {
        title: "AI & Machine Learning",
        desc: "Intelligent automation and predictive analytics for business growth.",
        href: "/technology/ai-machine-learning",
        features: [
          "Generative AI Pipelines",
          "Natural Language Processing",
          "Predictive Trend Analysis",
          "Automated Decision Systems",
        ],
      },
      {
        title: "Network Infrastructure",
        desc: "Robust network design and optimization for seamless connectivity.",
        href: "/technology/network-infrastructure",
        features: [
          "SD-WAN Integration",
          "Secure Subnets & Firewalls",
          "Load Balancing Systems",
          "Global Edge CDN Caching",
        ],
      },
      {
        title: "DevOps Solutions",
        desc: "Streamlined development and deployment pipelines for faster delivery.",
        href: "/technology/devops",
        features: [
          "CI/CD Release Automation",
          "Infrastructure as Code",
          "Container Orchestration (K8s)",
          "Automated Log Telemetry",
        ],
      },
    ],
  },
};


export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Dark mode state and toggle
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Monitor scroll height to apply background color transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle body class and scroll lock when navbar dropdown is open/closed
  useEffect(() => {
    if (activeMenu || isMobileOpen || searchQuery) {
      document.body.classList.add("nav-menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("nav-menu-open");
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.classList.remove("nav-menu-open");
      document.body.style.overflow = "unset";
    };
  }, [activeMenu, isMobileOpen, searchQuery]);

  // ESC key listener to close modals/menus
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setIsMobileOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const { data: session } = useSession();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Technology", href: "/technology", hasDropdown: true },
    { label: "Software", href: "/software", hasDropdown: true },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
  ];

  if (session) {
    navItems.push(
      { label: "Dashboard", href: "/dashboard" },
      { label: "CRM", href: "/crm" },
    );
  }

  // On homepage: transparent-dark at top (only in dark mode), switches to card bg on scroll/light mode
  const navBg = isHomePage && !isScrolled && !activeMenu && isDarkMode
    ? "bg-transparent border-b border-white/[0.06]"
    : "bg-card/95 backdrop-blur-md border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.25)]";

  return (
    <motion.header
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onMouseLeave={() => {
        setActiveMenu(null);
      }}
      className="fixed top-4 md:top-5 left-1/2 z-50 w-[calc(100%-32px)] max-w-[1280px] transition-all duration-500 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-md border border-[#E6E9F0] dark:border-white/10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
    >
      <div
        className={`flex items-center justify-between px-6 sm:px-8 transition-all duration-500 ${isScrolled ? "h-14" : "h-16"}`}
      >
        {/* Brand Logo */}
        <HeaderLogo />

        {/* Desktop Navigation (Centered) */}
        <nav className={`hidden md:flex items-center justify-center gap-8 h-full flex-1 mx-8 ${isHomePage && !isScrolled && !activeMenu && isDarkMode ? "[&_a]:text-slate-200 [&_a:hover]:text-white" : ""}`}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== "/");
            const showLine = activeMenu ? activeMenu === item.label : isActive;

            return (
              <div
                key={item.label}
                className="h-full flex items-center relative group"
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    setActiveMenu(item.label);
                    if (item.label === "Services") {
                      setActiveSubTab("IT Consulting");
                    } else if (item.label === "Technology") {
                      setActiveSubTab("Cloud Solutions");
                    } else if (item.label === "Software") {
                      setActiveSubTab("Cloud-Native");
                    }
                  } else {
                    setActiveMenu(null);
                    setActiveSubTab(null);
                  }
                }}
              >
                {item.hasDropdown ? (
                  <Link
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    aria-expanded={activeMenu === item.label}
                    aria-haspopup="true"
                    className={`text-base font-semibold tracking-wide transition-all duration-300 relative py-1.5 flex items-center gap-1 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary group-hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform duration-300 group-hover:-rotate-180" />
                    {isActive ? (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    ) : (
                      <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary rounded-full scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    )}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    className={`text-base font-semibold tracking-wide transition-colors duration-300 relative py-1.5 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary group-hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    ) : (
                      <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary rounded-full scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Section: Search & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <div className="relative group flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground group-focus-within:text-[#2563EB] transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-9 pr-4 rounded-xl text-[13px] font-medium bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-[#2563EB]/30 focus:bg-card dark:focus:bg-slate-950 outline-none w-32 lg:w-40 focus:w-56 transition-all duration-300 placeholder:text-muted-foreground text-slate-900 dark:text-white"
                aria-label="Search site"
              />
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute top-14 right-0 w-64 bg-card/90 backdrop-blur-md dark:bg-slate-900/90 border border-border dark:border-border rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden p-4 z-50"
                  >
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground text-center font-medium">
                      No results found for &quot;
                      <span className="text-foreground dark:text-white font-bold">
                        {searchQuery}
                      </span>
                      &quot;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {(() => {
              const isContactActive = pathname === "/contact";
              return (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-[13px] font-bold text-white bg-[#1E5FFF] hover:bg-[#154fe5] shadow-[0_4px_14px_rgba(30,95,255,0.3)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                >
                  <span>Contact Us</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              );
            })()}
            {session && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-foreground dark:text-white bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-border dark:border-border">
                  {session.user?.name}
                </span>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  size="sm"
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold h-10 px-4 rounded-xl text-sm shadow-sm transition-all"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none relative w-9 h-9 flex items-center justify-center animate-none"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">
              {isMobileOpen ? "Close" : "Open"} menu
            </span>
            <span className="absolute w-5 flex flex-col gap-[5px] items-center justify-center">
              <motion.span
                animate={
                  isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block h-[2px] w-5 bg-slate-700 dark:bg-slate-200 rounded-full origin-center"
              />
              <motion.span
                animate={
                  isMobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="block h-[2px] w-5 bg-slate-700 dark:bg-slate-200 rounded-full"
              />
              <motion.span
                animate={
                  isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block h-[2px] w-5 bg-slate-700 dark:bg-slate-200 rounded-full origin-center"
              />
            </span>
          </button>
          <button
            onClick={toggleDarkMode}
            className="group relative p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground " />
            )}
            
            {/* Tooltip */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-medium whitespace-nowrap rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            </div>
          </button>
        </div>
      </div>

      {/* Backdrop blur overlay */}
      <AnimatePresence>
        {activeMenu && activeMenu !== "Home" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseEnter={() => {
              setActiveMenu(null);
              setActiveSubTab(null);
            }}
            className="fixed inset-0 bg-[#0A1F44]/15 dark:bg-black/50 backdrop-blur-[3px] z-40"
            style={{
              top: "0px",
              height: "100vh",
            }}
          />
        )}
      </AnimatePresence>

      {/* Full-width Hover Mega-Menu Overlay dropdown */}
      <AnimatePresence>
        {activeMenu && activeMenu !== "Home" && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`absolute left-0 right-0 w-full bg-card border border-border rounded-2xl shadow-[0_15px_50px_rgba(10,31,68,0.08)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.4)] z-50 overflow-hidden hidden md:block ${isScrolled ? "top-[64px]" : "top-[72px]"}`}
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => {
              setActiveMenu(null);
              setActiveSubTab(null);
            }}
          >
            {/* Unified vertical-tabbed menu layout for all categories */}
            <div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-20 py-8 h-[380px] select-none">
              {/* Left Column: Vertical Sub-Menu (4/12) */}
              <div className="col-span-4 pr-6 space-y-1 flex flex-col justify-center bg-muted/10 -my-8 py-8 -ml-6 md:-ml-12 lg:-ml-20 pl-6 md:pl-12 lg:pl-20 rounded-l-none border-r border-border">
                {menuData[activeMenu as keyof typeof menuData].tabs.map(
                  (tab) => {
                    const isSubActive = activeSubTab === tab.title;
                    return (
                      <div
                        key={tab.title}
                        onMouseEnter={() => setActiveSubTab(tab.title)}
                        className={`group/tab relative p-3.5 rounded-xl cursor-pointer transition-all duration-200 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                          isSubActive
                            ? "bg-primary/10 border-l-4 border-l-primary pl-4 shadow-sm"
                            : "hover:bg-muted/50 border-l-4 border-l-transparent hover:pl-4"
                        }`}
                      >
                        <span
                          className={`font-bold text-[15px] transition-colors ${
                            isSubActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover/tab:text-foreground"
                          }`}
                        >
                          {tab.title}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>

              {/* Center Column: Dynamic Content Panel (8/12) */}
              <div className="col-span-8 flex flex-col justify-between py-2 pl-8">
                {(() => {
                  const currentTab =
                    menuData[activeMenu as keyof typeof menuData].tabs.find(
                      (t) => t.title === activeSubTab,
                    ) || menuData[activeMenu as keyof typeof menuData].tabs[0];
                  return (
                    <div className="space-y-6 flex flex-col justify-between h-full">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                          Core Practice
                        </span>
                        <h4 className="text-2xl font-black text-foreground tracking-tight mt-3">
                          {currentTab.title}
                        </h4>
                        <p className="text-muted-foreground text-base leading-relaxed mt-2 font-semibold">
                          {currentTab.desc}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 py-2 border-t border-border">
                        {currentTab.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-[15px] font-semibold text-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-border mt-auto">
                        <Link
                          href={currentTab.href}
                          onClick={() => {
                            setActiveMenu(null);
                            setActiveSubTab(null);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 text-[15px] font-bold text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          Explore {currentTab.title}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Right Column Removed */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-border dark:border-border bg-card/95 dark:bg-slate-950/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href) && item.href !== "/");
                const hasDropdown = item.hasDropdown;
                return (
                  <div key={item.label} className="space-y-1">
                    {hasDropdown ? (
                      <button
                        onClick={() =>
                          setMobileActiveMenu(
                            mobileActiveMenu === item.label ? null : item.label,
                          )
                        }
                        className="w-full text-left py-2 text-base font-bold text-muted-foreground  hover:text-slate-900 dark:hover:text-white flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <span
                          className="text-[10px] transition-transform duration-200"
                          style={{
                            transform:
                              mobileActiveMenu === item.label
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        >
                          ▼
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block py-2 text-base font-bold transition-colors ${
                          isActive
                            ? "text-[#0057D9]"
                            : "text-muted-foreground  hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {hasDropdown && mobileActiveMenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1 bg-muted/10 rounded-lg py-1 overflow-hidden"
                        >
                          {menuData[
                            item.label as keyof typeof menuData
                          ].tabs.map((tab) => (
                            <Link
                              key={tab.title}
                              href={tab.href}
                              onClick={() => {
                                setIsMobileOpen(false);
                                setMobileActiveMenu(null);
                              }}
                              className="block py-1.5 text-sm font-semibold text-muted-foreground  hover:text-[#0057D9]"
                            >
                              {tab.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="pt-4 border-t border-border dark:border-border flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-1.5 text-muted-foreground  hover:text-[#0057D9] dark:hover:text-[#60A5FA] p-1 rounded-md text-base font-bold"
                >
                  <span>Contact Us 📞</span>
                </Link>
                {session ? (
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-sm font-bold text-muted-foreground">
                      Logged in as {session.user?.name}
                    </span>
                    <Button
                      onClick={() => {
                        setIsMobileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 w-full rounded-xl"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full"
                  >
                    <Button className="bg-[#0057D9] hover:bg-[#2563EB] text-white font-bold h-11 w-full rounded-xl">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
