"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, ShoppingBag, Building2, Stethoscope, Car, Lightbulb, Smartphone, Briefcase } from "lucide-react";

export const EcosystemGrid = () => {
    const industries = [
        { name: "Tech & SaaS", icon: Cpu, color: "text-blue-600" },
        { name: "Retail & E-com", icon: ShoppingBag, color: "text-pink-600" },
        { name: "Real Estate", icon: Building2, color: "text-emerald-600" },
        { name: "Healthcare", icon: Stethoscope, color: "text-cyan-600" },
        { name: "Automotive", icon: Car, color: "text-red-600" },
        { name: "Energy", icon: Lightbulb, color: "text-yellow-600" },
        { name: "Mobile Apps", icon: Smartphone, color: "text-purple-600" },
        { name: "Consulting", icon: Briefcase, color: "text-slate-600" },
    ];

    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Connect with partners <br />
                            <span className="text-orange-500">across 20+ industries.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Zarc isn't limited to one niche. We aggregate global data to
                            provide granular insights for startups, enterprises, and investors
                            across all major sectors.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-orange-500 shrink-0">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Select Industry</h4>
                                    <p className="text-slate-500 text-sm">
                                        Choose from 140+ predefined verticals.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-white shrink-0">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Define Parameters</h4>
                                    <p className="text-slate-500 text-sm">
                                        Target geography, demographics, and budget.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {industries.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: "rgba(30, 41, 59, 0.8)",
                                    }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer group"
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg ${item.color}`}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-sm text-center text-slate-300 group-hover:text-white transition-colors">
                                        {item.name}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
