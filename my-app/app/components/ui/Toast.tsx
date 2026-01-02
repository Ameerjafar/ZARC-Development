"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] bg-slate-900 text-white border border-slate-800"
    >
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        <span className="font-bold text-sm">{message}</span>
        <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">
            <X className="w-4 h-4" />
        </button>
    </motion.div>
);
