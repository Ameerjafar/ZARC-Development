"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20 overflow-hidden text-center">
    {/* Background Glow Effects */}
    <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
    <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] animate-pulse" />

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 max-w-4xl space-y-8"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-blue-300 mb-4 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        AI-Powered Analytics 2.0
      </div>

      <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[1.1]">
        Turn data into <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
          strategic power.
        </span>
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
        Select your industry, choose your modules, and let our engine generate a comprehensive strategic report in seconds.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenModal}
        className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full overflow-hidden transition-all hover:bg-blue-500 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)]"
      >
        <span>Get Your Report</span>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  </section>
);
