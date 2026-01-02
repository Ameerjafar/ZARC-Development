"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export const EmptyState = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-32"
        >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No reports found</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
                We couldn't find any reports matching your filters.
            </p>
        </motion.div>
    );
};
