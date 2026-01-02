"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Code2, BarChart3, Zap, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { TiltCard } from "../ui/TiltCard";

export const HeroBanner = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const router = useRouter();

    return (
        <div className="relative pt-32 pb-20 px-6 w-full overflow-hidden">
            {/* Full width immersive gradient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#FAFAFA]" />
                <div className="absolute top-[-10%] inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/60 via-orange-50/30 to-transparent blur-xl" />
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-orange-50/40 to-transparent" />
                <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-orange-50/40 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-orange-100 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                            New Features 2.0
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                        Turn data into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                            strategic power.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed">
                        Select your industry, choose your modules, and let our engine
                        generate a comprehensive strategic report in seconds.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => router.push("/report")}
                            className="group relative px-8 py-4 rounded-full bg-slate-900 text-white font-semibold shadow-xl shadow-slate-900/20 overflow-hidden transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="absolute inset-0 bg-orange-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-2">
                                Get Your Report
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <button className="px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-3.5 h-3.5 fill-orange-600 text-orange-600 ml-0.5" />
                            </div>
                            View Showreel
                        </button>
                    </div>

                    <div className="pt-8 flex items-center gap-8 border-t border-orange-100/50">
                        <div>
                            <h4 className="text-3xl font-bold text-slate-900">200+</h4>
                            <p className="text-sm text-slate-500 font-medium">
                                Projects Shipped
                            </p>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold text-slate-900">98%</h4>
                            <p className="text-sm text-slate-500 font-medium">
                                Client Retention
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="relative hidden lg:block perspective-2000">
                    <TiltCard>
                        <motion.div
                            style={{ y: y2 }}
                            className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-orange-500/10 border border-white/50 overflow-hidden flex flex-col"
                        >
                            <div className="h-10 border-b border-slate-100 bg-white/50 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                                </div>
                                <div className="mx-auto w-40 h-5 bg-white rounded-md border border-slate-100 shadow-sm flex items-center justify-center">
                                    <div className="w-20 h-1.5 bg-slate-200 rounded-full" />
                                </div>
                            </div>

                            <div className="flex-1 p-6 flex gap-6">
                                <div className="w-16 flex flex-col items-center gap-6 py-4 border-r border-slate-100/50">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${i === 1
                                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                                                    : "text-slate-400 hover:bg-white hover:shadow-sm"
                                                }`}
                                        >
                                            <Code2 className="w-5 h-5" />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="h-4 w-32 bg-slate-900/10 rounded-md mb-2" />
                                            <div className="h-8 w-48 bg-slate-900 rounded-lg" />
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-slate-200" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 rounded-md bg-orange-100 text-orange-600">
                                                    <BarChart3 className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-semibold text-slate-500">
                                                    Revenue
                                                </span>
                                            </div>
                                            <div className="h-16 flex items-end gap-1">
                                                {[40, 70, 45, 90, 60].map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex-1 bg-orange-500 rounded-t-sm"
                                                        style={{ height: `${h}%` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 rounded-md bg-amber-100 text-amber-600">
                                                    <Zap className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-semibold text-slate-500">
                                                    Your Growth
                                                </span>
                                            </div>
                                            <div className="h-16 w-full bg-slate-50 rounded-lg relative overflow-hidden flex items-end">
                                                <svg
                                                    viewBox="0 0 100 40"
                                                    className="w-full h-full text-orange-500"
                                                    preserveAspectRatio="none"
                                                >
                                                    <defs>
                                                        <linearGradient
                                                            id="growthGradient"
                                                            x1="0"
                                                            x2="0"
                                                            y1="0"
                                                            y2="1"
                                                        >
                                                            <stop
                                                                offset="0%"
                                                                stopColor="currentColor"
                                                                stopOpacity="0.2"
                                                            />
                                                            <stop
                                                                offset="100%"
                                                                stopColor="currentColor"
                                                                stopOpacity="0"
                                                            />
                                                        </linearGradient>
                                                    </defs>
                                                    <path
                                                        d="M0 40 L0 30 C10 30 15 15 25 25 C35 35 40 10 50 20 C60 30 65 35 75 15 C85 -5 90 5 100 0 L100 40 Z"
                                                        fill="url(#growthGradient)"
                                                    />
                                                    <path
                                                        d="M0 30 C10 30 15 15 25 25 C35 35 40 10 50 20 C60 30 65 35 75 15 C85 -5 90 5 100 0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ y: y1, x: -20, z: 50 }}
                            className="absolute -left-12 bottom-20 w-48 bg-white/90 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-2xl shadow-slate-900/10"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900">
                                        Report Ready
                                    </p>
                                    <p className="text-[10px] text-slate-500">Just now</p>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="w-3/4 h-full bg-orange-500 rounded-full" />
                            </div>
                        </motion.div>
                    </TiltCard>
                </div>
            </div>
        </div>
    );
};
