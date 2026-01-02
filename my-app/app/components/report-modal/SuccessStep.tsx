"use client";

import React from "react";
import { Check, FileText } from "lucide-react";

interface SuccessStepProps {
    onViewReport: () => void;
}

export const SuccessStep = ({ onViewReport }: SuccessStepProps) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                <Check className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-2">
                Report Ready!
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
                Your market intelligence dossier has been successfully generated and saved to your library.
            </p>

            <button
                onClick={onViewReport}
                className="px-8 py-4 bg-orange-600 text-white text-lg rounded-2xl font-bold shadow-xl shadow-orange-500/20 hover:scale-105 hover:bg-orange-700 transition-all flex items-center gap-3"
            >
                <FileText className="w-5 h-5" />
                View Report Now
            </button>
        </div>
    );
};
