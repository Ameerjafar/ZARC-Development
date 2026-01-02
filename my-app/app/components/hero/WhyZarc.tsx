"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Lock } from "lucide-react";

export const WhyZarc = () => {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Why Choose Zarc?
                </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: Clock,
                        title: "Instant Solutions",
                        desc: "Get answers to complex business queries in seconds. Our AI processes global data instantly.",
                        bg: "bg-blue-50",
                        text: "text-blue-600",
                    },
                    {
                        icon: Zap,
                        title: "Cost-Effective",
                        desc: "Access premium consulting expertise at a fraction of the cost of traditional firms like McKinsey.",
                        bg: "bg-green-50",
                        text: "text-green-600",
                    },
                    {
                        icon: Lock,
                        title: "Data Security",
                        desc: "Your business ideas and data are protected with bank-grade encryption and strict privacy protocols.",
                        bg: "bg-purple-50",
                        text: "text-purple-600",
                    },
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -10 }}
                        className={`p-8 rounded-3xl ${item.bg} bg-opacity-50 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300`}
                    >
                        <div
                            className={`w-14 h-14 ${item.bg} ${item.text} rounded-2xl flex items-center justify-center mb-6`}
                        >
                            <item.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">
                            {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
