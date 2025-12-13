"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent
} from "framer-motion";
import {
  BarChart2,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Globe,
  Zap
} from "lucide-react";

interface NavbarProps {
  onOpenAuth: (mode: "signin" | "signup") => void;
}

const navLinks = [
  {
    label: "Product",
    href: "#",
    subItems: [
      { title: "Analytics", icon: BarChart2, desc: "Real-time insights" },
      { title: "Automation", icon: Zap, desc: "AI-driven workflows" },
      { title: "Global Scale", icon: Globe, desc: "Edge network CDN" },
    ]
  },
  { label: "Solutions", href: "#" },
  { label: "Pricing", href: "#" },
];

export const Navbar = ({ onOpenAuth }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }, [searchOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <motion.nav
          layout
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          className={`
            pointer-events-auto relative flex items-center gap-2 p-2 rounded-full
            border transition-all duration-500 ease-out
            ${isScrolled
              ? "bg-white/70 backdrop-blur-md border-slate-200/50 shadow-xl shadow-slate-500/5 supports-[backdrop-filter]:bg-white/60"
              : "bg-white border-slate-100 shadow-sm"
            }
          `}
          style={{
             maxWidth: "95%",
             width: searchOpen ? "600px" : "fit-content"
          }}
        >
          {/* Logo Section */}
          <motion.div
            layout="position"
            className="flex items-center gap-2 px-3 cursor-pointer group"
            onClick={() => window.location.href = '/'}
          >
            <div className="w-9 h-9 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
              <BarChart2 className="w-5 h-5" />
            </div>
            {!searchOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-slate-800 hidden sm:block whitespace-nowrap tracking-tight"
              >
                NexReport
              </motion.span>
            )}
          </motion.div>

          {/* Vertical Divider */}
          <motion.div layout className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />

          {/* Desktop Navigation Links */}
          {!searchOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="hidden md:flex items-center gap-1"
            >
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => {
                    setActiveHover(index);
                    if (link.subItems) setActiveDropdown(index);
                  }}
                  onMouseLeave={() => {
                    setActiveHover(null);
                    setActiveDropdown(null);
                  }}
                >
                  <a
                    href={link.href}
                    className="relative z-10 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.subItems && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : "opacity-50"}`} />
                    )}
                  </a>
                  
                  {/* Animated Pill Background */}
                  {activeHover === index && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-slate-100/80 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.subItems && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-4 w-64"
                      >
                        <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 ring-1 ring-slate-100 overflow-hidden">
                          {link.subItems.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group/item">
                              <div className="p-2 bg-slate-50 text-slate-500 rounded-lg group-hover/item:bg-indigo-50 group-hover/item:text-indigo-600 transition-colors">
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div layout className="flex items-center gap-2 pl-1 pr-1">
            <button
              onClick={() => onOpenAuth("signin")}
              className="hidden sm:block px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => onOpenAuth("signup")}
              className="group relative flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            {/* Mobile Menu Trigger */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-900 ml-1 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-slate-900">NexReport</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-2xl font-bold text-slate-900 py-4 border-b border-slate-100 flex items-center justify-between group"
                >
                  {link.label}
                  <ArrowRight className="w-6 h-6 -rotate-45 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto grid gap-3"
            >
              <button
                className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 font-bold text-lg hover:bg-slate-100 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth("signup"); }}
                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/20"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
