"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timer, ArrowRight, Rocket } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

export const CTASection = () => {
    const founders = [
        "https://i.pravatar.cc/150?img=32",
        "https://i.pravatar.cc/150?img=12",
        "https://i.pravatar.cc/150?img=5",
        "https://i.pravatar.cc/150?img=3",
    ];

    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Main CTA Container */}
                <div className="relative rounded-[3rem] overflow-hidden bg-[#0A0A0A] border border-slate-800 shadow-2xl">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                    {/* Top Left Glow - Orange (Brand) */}
                    <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-orange-600/30 rounded-full blur-[150px] pointer-events-none" />

                    {/* Bottom Right Glow - Emerald (Growth/Money - Replaced Violet) */}
                    <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px] pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-12 p-12 md:p-20 relative z-10 items-center">
                        {/* Left Side: The Offer */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                <Timer className="w-4 h-4" />
                                Limited Time Offer • Ends in 04:12:30
                            </div>

                            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[0.95] tracking-tight">
                                Build your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-[length:200%_auto] animate-gradient">
                                    empire.
                                </span>
                            </h2>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                Do not just dream about it. Get the validated roadmap, investor
                                pitch, and execution strategy you need to launch today.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 pt-4 items-start sm:items-center">
                                <MagneticButton className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-orange-50 hover:scale-105 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 group">
                                    Start Building Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </MagneticButton>

                                {/* Updated Founders Section */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center -space-x-4">
                                        {founders.map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative z-0 hover:z-10 transition-all duration-300 hover:scale-110"
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Founder ${i}`}
                                                    className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] object-cover"
                                                />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-slate-800 flex items-center justify-center text-xs font-bold text-white relative z-0">
                                            +60k
                                        </div>
                                    </div>
                                    <span className="text-slate-500 text-xs font-medium pl-1">
                                        Join 60,000+ Founders
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: The Launch Protocol Visualization */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl"
                            >
                                {/* Card Highlight */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>

                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-500/20 rounded-lg">
                                            <Rocket className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">
                                                Launch Protocol
                                            </div>
                                            <div className="text-slate-500 text-xs">
                                                System Status:{" "}
                                                <span className="text-emerald-400 font-bold">
                                                    Ready
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-mono font-bold text-white">
                                            100%
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        {
                                            step: "Niche Analysis",
                                            status: "Complete",
                                            color: "text-emerald-400",
                                        },
                                        {
                                            step: "Competitor Mapping",
                                            status: "Complete",
                                            color: "text-emerald-400",
                                        },
                                        {
                                            step: "Revenue Model Gen",
                                            status: "Complete",
                                            color: "text-emerald-400",
                                        },
                                        {
                                            step: "Empire Strategy",
                                            status: "Ready to Deploy",
                                            color: "text-orange-400 animate-pulse font-bold",
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <div className="flex items-center gap-3 text-slate-300">
                                                <div
                                                    className={`w-1.5 h-1.5 rounded-full ${idx === 3
                                                            ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                                                            : "bg-emerald-500"
                                                        }`}
                                                />
                                                {item.step}
                                            </div>
                                            <div className={`font-mono text-xs ${item.color}`}>
                                                {item.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                                    <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 w-full rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)]"></div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute -top-6 -right-6 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-xs shadow-xl rotate-6 z-20"
                            >
                                🚀 Validated Idea
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1,
                                }}
                                className="absolute -bottom-6 -left-6 bg-[#1A1A1A] text-white border border-slate-700 px-4 py-2 rounded-lg font-bold text-xs shadow-xl -rotate-3 flex items-center gap-2 z-20"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                                Investable
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 5s ease infinite;
        }
      `}</style>
        </section>
    );
};
