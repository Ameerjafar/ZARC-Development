"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

interface HistoryHeaderProps {
    onCreateNew: () => void;
}

export const HistoryHeader = ({ onCreateNew }: HistoryHeaderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
            <div className="flex items-start gap-4">
                <Link href="/" className="mt-1 p-2.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl shadow-sm border border-slate-200 transition-colors group">
                    <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-orange-600" />
                </Link>
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Report Library</h1>
                    <p className="text-slate-500 mt-2 text-lg">
                        Manage your generated intelligence dossiers.
                    </p>
                </div>
            </div>

            <button
                onClick={onCreateNew}
                className="group relative px-6 py-3.5 bg-slate-900 text-white rounded-full font-bold shadow-xl shadow-slate-900/20 overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
                <div className="absolute inset-0 bg-orange-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Plus className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Create New Report</span>
            </button>
        </motion.div>
    );
};
