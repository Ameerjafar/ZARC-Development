"use client";

import React from "react";

export const Marquee = () => {
    return (
        <div className="w-full border-y border-slate-200 bg-slate-50 py-12 overflow-hidden relative group">
            <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-slate-50 to-transparent z-10" />

            <div className="flex w-max animate-marquee gap-32 px-8 group-hover:[animation-play-state:paused] transition-all">
                {[
                    "SAAS",
                    "FINTECH",
                    "HEALTHCARE",
                    "RETAIL",
                    "LOGISTICS",
                    "REAL ESTATE",
                    "SAAS",
                    "FINTECH",
                ].map((i, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-4 font-black text-3xl text-slate-300 hover:text-slate-900 transition-colors cursor-pointer select-none"
                    >
                        <span className="text-orange-500 text-4xl leading-none">✶</span> {i}
                    </div>
                ))}
            </div>
            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
        </div>
    );
};
