"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Zap, Cpu, FileText, Download, Globe2 } from "lucide-react";

export const IntelligenceEngine = () => {
    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-soft-light"></div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Intelligence Engine</span>
                    </h2>
                    <p className="text-lg text-slate-500">
                        Our proprietary stack transforms chaos into clarity. Three layers of processing power working in perfect unison.
                    </p>
                </div>

                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-[800px] md:h-[600px]">

                    {/* Card 1: Data Ingestion (Tall Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:row-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="mb-auto z-10">
                            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                                <Database className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Ingestion</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Continuous scanning of 50M+ global data points from registries, news, and satellite feeds.
                            </p>
                        </div>

                        {/* Visual: Scrolling Data Stream */}
                        <div className="mt-8 relative h-full w-full overflow-hidden mask-linear-fade">
                            <div className="space-y-3 animate-scroll-vertical">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                                        <div className="h-2 w-24 bg-slate-200 rounded-full" />
                                        <div className="ml-auto h-2 w-8 bg-orange-200 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Neural Processing (Wide Top Right) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
                    >
                        {/* Dark aesthetic for the "Core" */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className="absolute -right-20 -top-20 w-96 h-96 bg-orange-500/20 rounded-full blur-[80px]" />

                        <div className="relative z-10 max-w-sm">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/30 border border-orange-500/30 text-orange-400 text-xs font-bold mb-6">
                                <Zap className="w-3 h-3" /> CORE PROCESSOR
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">2. Neural Analysis</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Our AI models cross-reference raw data against historical success patterns to identify high-probability opportunities.
                            </p>
                        </div>

                        {/* Visual: Network Node */}
                        <div className="relative z-10 mt-8 md:mt-0">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute inset-0 rounded-full bg-orange-500/5 blur-xl animate-pulse" />

                                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 relative z-20">
                                    <Cpu className="w-10 h-10 text-white" />
                                </div>

                                {/* Orbiting particles */}
                                <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1 shadow-[0_0_10px_white]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Output/Delivery (Bottom Center) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between group overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Strategic Report</h3>
                            <p className="text-sm text-slate-500">
                                Actionable PDF blueprints generated in seconds.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-blue-200 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-xs text-red-500">PDF</div>
                            <div className="flex-1">
                                <div className="h-2 w-20 bg-slate-200 rounded-full mb-1" />
                                <div className="h-1.5 w-12 bg-slate-100 rounded-full" />
                            </div>
                            <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                    </motion.div>

                    {/* Card 4: Accuracy/Stats (Bottom Right) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 shadow-xl shadow-orange-500/20 flex flex-col justify-center items-center text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="text-5xl font-black mb-2 tracking-tighter">99.9%</div>
                            <div className="text-orange-100 font-medium text-sm uppercase tracking-widest opacity-80">Uptime</div>
                            <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-bold border border-white/20">
                                <Globe2 className="w-3 h-3" /> Global Coverage
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <style jsx>{`
        .mask-linear-fade {
           mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }
        @keyframes scroll-vertical {
           0% { transform: translateY(0); }
           100% { transform: translateY(-50%); }
        }
        .animate-scroll-vertical {
           animation: scroll-vertical 20s linear infinite;
        }
      `}</style>
        </section>
    );
};
