"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Globe, 
  Code2, 
  Menu,
  X
} from "lucide-react";

// --- Components ---

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[4/3] perspective-1000"
    >
      {children}
    </motion.div>
  );
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-slate-900 overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content (UPDATED) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 relative z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">New Features 2.0</span>
          </div>

          {/* Headline (UPDATED) */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Turn data into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              strategic power.
            </span>
          </h1>

          {/* Subheadline (UPDATED) */}
          <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed">
            Select your industry, choose your modules, and let our engine generate a comprehensive strategic report in seconds.
          </p>

          {/* Action Buttons (UPDATED) */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="group relative px-8 py-4 rounded-full bg-slate-900 text-white font-semibold shadow-xl shadow-slate-900/20 overflow-hidden transition-all hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Get Your Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              View Showreel
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="pt-8 flex items-center gap-8 border-t border-slate-200/60">
            <div>
              <h4 className="text-3xl font-bold text-slate-900">200+</h4>
              <p className="text-sm text-slate-500 font-medium">Projects Shipped</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-slate-900">98%</h4>
              <p className="text-sm text-slate-500 font-medium">Client Retention</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Visual Mockup (UNCHANGED) */}
        <div className="relative z-10 hidden lg:block perspective-2000">
           <TiltCard>
             {/* Main App Container */}
             <motion.div 
               style={{ y: y2 }}
               className="absolute inset-0 bg-white rounded-2xl shadow-2xl shadow-indigo-500/10 border border-slate-200 overflow-hidden flex flex-col"
             >
               {/* Mockup Header */}
               <div className="h-10 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                   <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                   <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                 </div>
                 <div className="mx-auto w-40 h-5 bg-white rounded-md border border-slate-100 shadow-sm flex items-center justify-center">
                   <div className="w-20 h-1.5 bg-slate-200 rounded-full" />
                 </div>
               </div>

               {/* Mockup Body */}
               <div className="flex-1 p-6 bg-slate-50/30 flex gap-6">
                 {/* Sidebar */}
                 <div className="w-16 flex flex-col items-center gap-6 py-4 border-r border-slate-100">
                     {[1,2,3,4].map(i => (
                       <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${i === 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-white hover:shadow-sm'}`}>
                         <Code2 className="w-5 h-5" />
                       </div>
                     ))}
                 </div>

                 {/* Dashboard Content */}
                 <div className="flex-1 space-y-6">
                   <div className="flex justify-between items-center">
                     <div>
                       <div className="h-4 w-32 bg-slate-900/10 rounded-md mb-2" />
                       <div className="h-8 w-48 bg-slate-900 rounded-lg" />
                     </div>
                     <div className="h-10 w-10 rounded-full bg-slate-200" />
                   </div>

                   {/* Charts Grid */}
                   <div className="grid grid-cols-2 gap-4">
                     {/* Card 1: Revenue */}
                     <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-600"><BarChart3 className="w-4 h-4"/></div>
                         <span className="text-xs font-semibold text-slate-500">Revenue</span>
                       </div>
                       <div className="h-16 flex items-end gap-1">
                         {[40, 70, 45, 90, 60].map((h, i) => (
                           <div key={i} className="flex-1 bg-indigo-500 rounded-t-sm" style={{ height: `${h}%` }} />
                         ))}
                       </div>
                     </div>

                     {/* Card 2: Your Growth (Maintained) */}
                     <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="p-1.5 rounded-md bg-blue-100 text-blue-600"><Zap className="w-4 h-4"/></div>
                         <span className="text-xs font-semibold text-slate-500">Your Growth</span>
                       </div>
                       <div className="h-16 w-full bg-slate-50 rounded-lg relative overflow-hidden flex items-end">
                          <svg 
                            viewBox="0 0 100 40" 
                            className="w-full h-full text-blue-500" 
                            preserveAspectRatio="none"
                          >
                             {/* Gradient Fill */}
                             <defs>
                                <linearGradient id="growthGradient" x1="0" x2="0" y1="0" y2="1">
                                   <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                                   <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                </linearGradient>
                             </defs>
                             {/* Area */}
                             <path 
                               d="M0 40 L0 30 C10 30 15 15 25 25 C35 35 40 10 50 20 C60 30 65 35 75 15 C85 -5 90 5 100 0 L100 40 Z" 
                               fill="url(#growthGradient)" 
                             />
                             {/* Stroke Line (Up, Down, Up) */}
                             <path 
                               d="M0 30 C10 30 15 15 25 25 C35 35 40 10 50 20 C60 30 65 35 75 15 C85 -5 90 5 100 0" 
                               fill="none" 
                               stroke="currentColor" 
                               strokeWidth="2" 
                               strokeLinecap="round" 
                               strokeLinejoin="round" 
                             />
                          </svg>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>

             {/* Floating Element 1 (Glass Card) */}
             <motion.div 
               style={{ y: y1, x: -20, z: 50 }}
               className="absolute -left-12 bottom-20 w-48 bg-white/90 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-2xl shadow-slate-900/10"
             >
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                   <CheckCircle2 className="w-5 h-5 text-green-600" />
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-900">Payment Sent</p>
                   <p className="text-[10px] text-slate-500">Just now</p>
                 </div>
               </div>
               <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="w-3/4 h-full bg-green-500 rounded-full" />
               </div>
             </motion.div>
           </TiltCard>
        </div>
      </main>

      {/* Marquee Section */}
      <div className="w-full border-y border-slate-200 bg-white py-8 overflow-hidden relative">
         <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
         <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
         
         <div className="flex w-max animate-marquee gap-16 px-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {[1,2,3,4,5,6,1,2,3,4].map((i, idx) => (
              <div key={idx} className="flex items-center gap-2 font-bold text-xl text-slate-400">
                 <div className="w-6 h-6 rounded-full bg-slate-300" />
                 PARTNER {i}
              </div>
           ))}
         </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
