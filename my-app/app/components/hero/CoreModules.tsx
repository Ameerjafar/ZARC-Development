"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Globe2, TrendingUp, Zap, Cpu, Sparkles } from "lucide-react";

export const CoreModules = () => {
    const stats = [
        { label: "Data Points Processed", value: "50M+", icon: Database, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Market Sectors", value: "140+", icon: Globe2, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Prediction Accuracy", value: "96%", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50" },
        { label: "Report Generation", value: "< 2m", icon: Zap, color: "text-purple-500", bg: "bg-purple-50" },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute -left-[10%] top-[20%] w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 border border-slate-200">
                        Precision At Scale
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        We crunch the numbers. <br />
                        <span className="text-orange-600">You lead the market.</span>
                    </h2>
                    <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                        Stop guessing. Zarc aggregates data from government registries, financial filings, and consumer behavior patterns to give you a single source of truth.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Neural Network Processor Visualization */}
                <div className="relative h-[500px] flex items-center justify-center">

                    {/* Connecting Lines (Animated) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        <defs>
                            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0" />
                                <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Left Connector */}
                        <motion.path
                            d="M 100 400 Q 250 300 250 250"
                            fill="none"
                            stroke="url(#line-gradient)"
                            strokeWidth="2"
                            strokeDasharray="10 10"
                            animate={{ strokeDashoffset: [20, 0] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Right Connector */}
                        <motion.path
                            d="M 400 400 Q 250 300 250 250"
                            fill="none"
                            stroke="url(#line-gradient)"
                            strokeWidth="2"
                            strokeDasharray="10 10"
                            animate={{ strokeDashoffset: [20, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Center Up Connector */}
                        <motion.path
                            d="M 250 250 L 250 150"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Bottom Nodes: Data Sources */}
                    <div className="absolute bottom-10 left-10 p-4 bg-white border border-slate-100 rounded-2xl shadow-lg flex items-center gap-3 w-40 z-10 animate-float-slow">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Globe2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-xs font-bold text-slate-700">Global Data</div>
                    </div>

                    <div className="absolute bottom-10 right-10 p-4 bg-white border border-slate-100 rounded-2xl shadow-lg flex items-center gap-3 w-40 z-10 animate-float-delayed">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="text-xs font-bold text-slate-700">Trends</div>
                    </div>

                    {/* Center Node: The Processor */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-2xl flex items-center justify-center z-20">
                        <div className="absolute inset-0 rounded-full border border-orange-100 animate-ping opacity-20" />
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-inner">
                            <Cpu className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Top Node: The Result (Strategy Card) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 bg-slate-900 rounded-2xl p-5 shadow-2xl shadow-orange-500/20 border border-slate-800 z-30"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-slate-300 tracking-wider">OUTPUT READY</span>
                            </div>
                            <Sparkles className="w-4 h-4 text-orange-400" />
                        </div>

                        <div className="space-y-3">
                            <div className="h-2 w-full bg-slate-800 rounded-full" />
                            <div className="h-2 w-3/4 bg-slate-800 rounded-full" />
                            <div className="h-16 bg-slate-800/50 rounded-lg border border-slate-700 p-3 flex flex-col justify-center gap-1">
                                <div className="text-[10px] text-slate-500 uppercase">Top Recommendation</div>
                                <div className="text-sm font-bold text-white">Focus: Tier-2 Retail</div>
                            </div>
                        </div>

                        <button className="w-full mt-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-orange-50 transition-colors">
                            Download Strategy
                        </button>
                    </motion.div>

                </div>
            </div>
            <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-slow 4s ease-in-out infinite 2s;
        }
      `}</style>
        </section>
    );
};
