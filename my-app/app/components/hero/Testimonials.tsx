"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
    const reviews = [
        {
            name: "Rohan D.",
            role: "CEO, FinTech",
            text: "Zarc cut our market research time by 90%. It's insane.",
            img: "https://i.pravatar.cc/150?img=11",
        },
        {
            name: "Priya S.",
            role: "Founder, D2C",
            text: "The execution plan was spot on. We launched in 2 weeks.",
            img: "https://i.pravatar.cc/150?img=5",
        },
        {
            name: "Arjun K.",
            role: "CTO, SaaS",
            text: "Finally, an AI that understands Indian market nuances.",
            img: "https://i.pravatar.cc/150?img=3",
        },
    ] as const;

    const allReviews = [...reviews, ...reviews, ...reviews, ...reviews];

    return (
        <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16 text-center space-y-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider border border-orange-100">
                        Wall of Love
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Trusted by Visionaries.
                    </h2>
                </div>

                <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden rounded-[2.5rem] bg-slate-50/50 border border-slate-100 py-20">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Track */}
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                        {allReviews.map((review, idx) => (
                            <div key={`${review.name}-${idx}`} className="px-4">
                                <div className="
                  relative w-[85vw] md:w-[450px] lg:w-[500px] 
                  p-8 md:p-10 rounded-[2rem] bg-white 
                  border border-slate-100 
                  shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] 
                  hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.1)] 
                  hover:border-orange-100/50 hover:-translate-y-1 
                  transition-all duration-300 ease-out group cursor-default flex-shrink-0
                ">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-5 h-5 fill-orange-400 text-orange-400" />
                                            ))}
                                        </div>
                                        <div className="p-3 rounded-full bg-slate-50 group-hover:bg-orange-50 transition-colors duration-300">
                                            <Quote className="w-5 h-5 text-slate-300 group-hover:text-orange-500 transition-colors duration-300" />
                                        </div>
                                    </div>

                                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 font-medium">
                                        "{review.text}"
                                    </p>

                                    <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-orange-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                            <img
                                                src={review.img}
                                                alt={review.name}
                                                className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-sm object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-base md:text-lg font-bold text-slate-900">{review.name}</div>
                                            <div className="text-sm text-slate-500 font-medium">{review.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
      ` }} />
        </section>
    );
};
