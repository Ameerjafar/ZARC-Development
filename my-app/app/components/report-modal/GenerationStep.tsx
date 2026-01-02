"use client";

import React from "react";

export const GenerationStep = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 border-4 border-slate-100 border-t-orange-500 rounded-full animate-spin mb-6" />
            <h3 className="text-2xl font-black text-slate-900 mb-2">
                Generating Intelligence...
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto">
                Synthesizing data points and creating your report.
            </p>
        </div>
    );
};
