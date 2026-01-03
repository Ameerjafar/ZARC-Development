"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import {
  Zap, ArrowRight, FileText, CheckCircle2,
  Layers, Filter, Search, Sparkles, Activity
} from "lucide-react";
import CreateReportModal from "../components/ReportModal";

export default function ReportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Parallax & Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.05, 0.95]);

  return (
    <div className="h-screen bg-white text-gray-900 font-sans flex flex-col overflow-hidden relative selection:bg-orange-100 selection:text-orange-900">

      {/* --- Dynamic White & Orange Gradient Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[90%] h-[90%] bg-gradient-to-br from-orange-100/50 to-transparent rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] w-[90%] h-[90%] bg-gradient-to-tl from-amber-100/50 to-transparent rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-multiply" />
      </div>

      {/* --- Navbar --- */}
      <nav className="relative z-50 w-full px-10 py-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="text-gray-900">ZARC</span>
        </div>
      </nav>
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-0">
        <div className="flex flex-col justify-center space-y-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[10px] font-bold tracking-widest text-orange-600 uppercase w-fit"
          >
            <Sparkles size={10} />
            <span>Automated Research Platform</span>
          </motion.div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 leading-[1.05]">
              Build strategy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 animate-gradient-x">
                at lightspeed.
              </span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              Zarc deploys autonomous agents to scour 50M+ sources and build verified market intelligence reports in seconds.
            </p>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="group relative px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-base shadow-xl shadow-orange-500/20 overflow-hidden flex items-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Genearate Report</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-gray-500">
              <CheckCircle2 size={16} className="text-orange-500" />
              <span>Free Tier Available</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100/80 mt-4">
            <StatBox label="Sources" value="50M+" />
            <StatBox label="Latency" value="0.4s" />
            <StatBox label="Accuracy" value="99.9%" />
          </div>
        </div>

        {/* RIGHT COLUMN: The 3D Living Artifact */}
        <div
          className="perspective-1000 w-full h-full max-h-[600px] flex items-center justify-center lg:justify-end"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              filter: useMotionTemplate`brightness(${brightness})`
            }}
            className="relative w-full max-w-md aspect-[4/5] bg-white/70 backdrop-blur-2xl rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-white/80 group"
          >
            {/* Shimmer Effect that constantly moves */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-0 pointer-events-none"
            />

            {/* --- Content Layer --- */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10" style={{ transform: "translateZ(30px)" }}>

              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Q1 Analysis</h3>
                    <p className="text-gray-400 text-xs font-mono uppercase tracking-wide mt-1">Status: Processing</p>
                  </div>
                </div>
                <Activity size={20} className="text-orange-400 animate-pulse" />
              </div>

              {/* Visual Abstract (The Living Stack) */}
              <div className="relative flex-1 flex flex-col justify-center gap-5 py-4">

                {/* The Connector Line */}
                <div className="absolute left-[26px] top-12 bottom-12 w-0.5 bg-gray-100 z-0">
                  {/* Animated Data Packet traveling down */}
                  <motion.div
                    animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-b from-orange-400 to-transparent rounded-full blur-[1px]"
                  />
                </div>

                <LivingModule
                  icon={Search}
                  label="Data Scraper"
                  sub="Extracting Nodes..."
                  color="bg-blue-50 text-blue-600"
                  delay={0}
                />
                <LivingModule
                  icon={Filter}
                  label="Signal Filtering"
                  sub="Removing Noise..."
                  color="bg-purple-50 text-purple-600"
                  delay={1}
                />
                <LivingModule
                  icon={FileText}
                  label="Report Synthesis"
                  sub="Compiling DOCX..."
                  color="bg-green-50 text-green-600"
                  delay={2}
                />
              </div>

              {/* Card Footer */}
              <div className="pt-5 border-t border-gray-100 flex justify-between items-center text-xs font-semibold text-gray-400">
                <span>Encrypted Pipeline</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Active
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </main>

      <CreateReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
}


// --- Helper: Living Module Component ---
function LivingModule({ icon: Icon, label, sub, color, delay }: any) {
  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1, y: [0, -4, 0] }} // Continuous bobbing
      transition={{
        x: { duration: 0.6, delay: delay * 0.2 },
        opacity: { duration: 0.6, delay: delay * 0.2 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay }
      }}
      className="relative z-10 flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`p-2.5 rounded-xl ${color} relative`}>
        <Icon size={18} />
        {/* Subtle Glow Ring Pulse */}
        <motion.div
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 rounded-xl ${color} z-[-1]`}
        />
      </div>
      <div>
        <div className="text-sm font-bold text-gray-900">{label}</div>
        <div className="text-[10px] text-gray-400 font-medium">{sub}</div>
      </div>
    </motion.div>
  )
}

function StatBox({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{label}</div>
    </div>
  )
}
