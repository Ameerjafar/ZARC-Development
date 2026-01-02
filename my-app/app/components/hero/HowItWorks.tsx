"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ScanLine, FileText, Database, FileBarChart, Download } from "lucide-react";

export const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        {
            title: "Define Your Goal",
            desc: "Select your industry vertical and specific objective: Launch, Scale, or Pivot.",
            icon: Search,
        },
        {
            title: "AI Analysis",
            desc: "Our engine scans 50M+ data points, competitor filings, and consumer trends.",
            icon: ScanLine,
        },
        {
            title: "Execution Plan",
            desc: "Receive a verified strategic roadmap, vendor shortlist, and regulatory checklist.",
            icon: FileText,
        },
    ];

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Intuition to Empire.
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        From a rough idea to a fully executable business strategy in three
                        autonomous steps.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Mac Screen Mockup */}
                    <div className="relative group">
                        <div className="relative w-full aspect-[16/10] bg-[#0d0d0d] rounded-t-2xl border-[4px] border-[#1a1a1a] shadow-2xl overflow-hidden ring-1 ring-white/10">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-lg z-30"></div>

                            <div className="w-full h-full bg-slate-50 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-8 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4 pt-1">
                                    <div className="flex gap-1.5 opacity-50">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-medium">
                                        Zarc Dashboard
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="w-full h-full pt-8 flex flex-col"
                                    >
                                        {/* STEP 1 */}
                                        {activeStep === 0 && (
                                            <div className="h-full px-8 pb-8 flex flex-col gap-6 justify-center">
                                                <div className="text-center space-y-2">
                                                    <h4 className="text-lg font-bold text-slate-800">
                                                        Select Industry
                                                    </h4>
                                                    <p className="text-xs text-slate-400">
                                                        Choose where you want to dominate.
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {["SaaS", "E-com", "Fintech", "Agri"].map((item) => (
                                                        <div
                                                            key={item}
                                                            className="p-3 border rounded-lg bg-white shadow-sm text-sm font-medium text-slate-600 flex items-center gap-2"
                                                        >
                                                            <div
                                                                className={`w-2 h-2 rounded-full ${item === "Fintech"
                                                                        ? "bg-orange-500"
                                                                        : "bg-slate-200"
                                                                    }`}
                                                            ></div>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded text-center mt-2">
                                                    Next Step →
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 2 */}
                                        {activeStep === 1 && (
                                            <div className="h-full px-8 pb-8 flex flex-col items-center justify-center text-center">
                                                <div className="relative w-24 h-24 mb-6">
                                                    <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                                                    <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Database className="w-8 h-8 text-slate-400" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="text-lg font-bold text-slate-800">
                                                        Analyzing Market Data
                                                    </h4>
                                                    <div className="flex flex-col gap-1 text-xs text-slate-400 font-mono">
                                                        <span>Scanning 50M+ records...</span>
                                                        <span className="text-orange-500">
                                                            Found 12 Competitors
                                                        </span>
                                                        <span>Calculating vectors...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 3 - REPORT STRUCTURE */}
                                        {activeStep === 2 && (
                                            <div className="h-full flex bg-white">
                                                {/* Sidebar simulating a document structure */}
                                                <div className="w-1/4 h-full bg-slate-50 border-r border-slate-200 p-4 space-y-3">
                                                    <div className="h-2 w-16 bg-slate-300 rounded mb-4" />
                                                    <div className="space-y-2">
                                                        <div className="h-1.5 w-full bg-orange-200 rounded" />
                                                        <div className="h-1.5 w-10/12 bg-slate-200 rounded" />
                                                        <div className="h-1.5 w-11/12 bg-slate-200 rounded" />
                                                        <div className="h-1.5 w-9/12 bg-slate-200 rounded" />
                                                    </div>
                                                    <div className="pt-4 border-t border-slate-200 mt-auto">
                                                        <div className="flex items-center gap-2 text-[8px] text-slate-400">
                                                            <FileBarChart className="w-3 h-3" /> PDF Ready
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Main Report Content */}
                                                <div className="flex-1 p-5 overflow-hidden flex flex-col">
                                                    {/* Header */}
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <div className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
                                                                Strategic Plan
                                                            </div>
                                                            <h3 className="text-sm font-bold text-slate-900">
                                                                Market Entry: FinTech Q3
                                                            </h3>
                                                        </div>
                                                        <div className="bg-slate-900 text-white p-1.5 rounded hover:bg-slate-800 cursor-pointer">
                                                            <Download className="w-3 h-3" />
                                                        </div>
                                                    </div>

                                                    {/* Report Body */}
                                                    <div className="space-y-3 mb-4">
                                                        <div className="h-1.5 w-full bg-slate-100 rounded" />
                                                        <div className="h-1.5 w-[95%] bg-slate-100 rounded" />
                                                        <div className="h-1.5 w-[80%] bg-slate-100 rounded" />
                                                    </div>

                                                    {/* Cards grid */}
                                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                                        <div className="border border-slate-100 p-3 rounded-lg shadow-sm">
                                                            <div className="text-[8px] text-slate-400 mb-1">
                                                                Projected ROI
                                                            </div>
                                                            <div className="text-xs font-bold text-emerald-600">
                                                                +128%
                                                            </div>
                                                            <div className="w-full h-1 bg-emerald-100 rounded mt-1">
                                                                <div className="w-[80%] h-full bg-emerald-500 rounded" />
                                                            </div>
                                                        </div>
                                                        <div className="border border-slate-100 p-3 rounded-lg shadow-sm">
                                                            <div className="text-[8px] text-slate-400 mb-1">
                                                                Risk Factor
                                                            </div>
                                                            <div className="text-xs font-bold text-orange-500">
                                                                Low-Med
                                                            </div>
                                                            <div className="w-full h-1 bg-orange-100 rounded mt-1">
                                                                <div className="w-[30%] h-full bg-orange-500 rounded" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="relative mx-auto w-[110%] -ml-[5%] h-4 bg-[#e2e2e2] rounded-b-xl shadow-xl flex justify-center border-t border-white/50">
                            <div className="w-24 h-1.5 bg-[#a0a0a0] rounded-b-md mt-0.5"></div>
                        </div>
                    </div>

                    {/* Right: Steps */}
                    <div className="space-y-4">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                onClick={() => setActiveStep(idx)}
                                className={`cursor-pointer p-6 rounded-xl transition-all duration-300 border ${activeStep === idx
                                        ? "bg-white border-orange-200 shadow-lg shadow-orange-500/5"
                                        : "bg-transparent border-transparent hover:bg-slate-50"
                                    }`}
                            >
                                <div className="flex items-start gap-5">
                                    <div
                                        className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${activeStep === idx
                                                ? "bg-orange-500 text-white"
                                                : "bg-slate-100 text-slate-400"
                                            }`}
                                    >
                                        <step.icon size={18} />
                                    </div>
                                    <div>
                                        <h3
                                            className={`text-lg font-bold mb-1 transition-colors ${activeStep === idx ? "text-slate-900" : "text-slate-400"
                                                }`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className={`text-sm leading-relaxed ${activeStep === idx ? "text-slate-600" : "text-slate-400"
                                                }`}
                                        >
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
