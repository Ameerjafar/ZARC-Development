"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQItem = ({
    question,
    answer,
    delay,
}: {
    question: string;
    answer: string;
    delay: number;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={`border-b border-slate-100 transition-colors ${isOpen ? "bg-slate-50/50" : ""
                }`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 px-4 flex justify-between items-center text-left focus:outline-none group"
            >
                <span
                    className={`text-lg font-semibold transition-colors ${isOpen
                            ? "text-orange-600"
                            : "text-slate-900 group-hover:text-orange-600"
                        }`}
                >
                    {question}
                </span>
                {isOpen ? (
                    <Minus className="w-5 h-5 text-orange-500" />
                ) : (
                    <Plus className="w-5 h-5 text-slate-400 group-hover:text-orange-500" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="px-4 pb-6 text-slate-500 leading-relaxed max-w-2xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const FAQSection = () => {
    const faqs = [
        {
            q: "How accurate is the data?",
            a: "We aggregate real-time data from government registries, financial reports, and satellite imagery, cross-referenced by our AI for 95%+ accuracy.",
        },
        {
            q: "Can I download the reports?",
            a: "Yes! All reports can be exported as PDF, CSV, or customizable PowerPoint decks for your stakeholders.",
        },
        {
            q: "Do you support custom industries?",
            a: "Absolutely. While we have 140+ presets, you can input custom parameters for niche markets like 'Vertical Farming in Jaipur' or 'SaaS for Dentists'.",
        },
        {
            q: "What is the refund policy?",
            a: "If you're not satisfied with the report quality, we offer a full credit refund within 7 days of generation.",
        },
    ];

    return (
        <section className="py-24 px-6 max-w-3xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold mb-4 text-slate-900">
                    Frequently Asked Questions
                </h2>
                <p className="text-slate-500">
                    Everything you need to know about Zarc.
                </p>
            </div>
            <div className="border-t border-slate-100">
                {faqs.map((faq, i) => (
                    <FAQItem key={i} question={faq.q} answer={faq.a} delay={i * 0.1} />
                ))}
            </div>
        </section>
    );
};
