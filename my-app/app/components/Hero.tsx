"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue,
  useSpring,
  AnimatePresence,
  useInView
} from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Code2,
  Globe2,
  Building2,
  Cpu,
  ShoppingBag,
  Stethoscope,
  Car,
  Lightbulb,
  Smartphone,
  Briefcase,
  Users,
  Clock,
  Lock,
  Sparkles, 
  Command, 
  CreditCard,
  ChevronDown,
  Plus,
  Minus,
  Activity,
  Server,
  Database,
  Search,
  ScanLine,
  Terminal,
  FileText,
  TrendingUp,
  ShieldCheck,
  PieChart,
  MousePointer2,
  Star,
  Quote,
  Download,
  FileBarChart,
  Rocket,
  Timer
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Utility Components ---

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

const MagneticButton = ({ children, className, onClick }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos * 0.3);
    y.set(yPos * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- 1. HERO SECTION ---
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const router = useRouter();

  return (
    <div className="relative pt-32 pb-20 px-6 w-full overflow-hidden">
      {/* Full width immersive gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#FAFAFA]" />
        <div className="absolute top-[-10%] inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/60 via-orange-50/30 to-transparent blur-xl" />
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-orange-50/40 to-transparent" />
        <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-orange-50/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-orange-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">New Features 2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Turn data into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              strategic power.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed">
            Select your industry, choose your modules, and let our engine generate a comprehensive strategic report in seconds.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => router.push('/report')} className="group relative px-8 py-4 rounded-full bg-slate-900 text-white font-semibold shadow-xl shadow-slate-900/20 overflow-hidden transition-all hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-orange-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Get Your Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Play className="w-3.5 h-3.5 fill-orange-600 text-orange-600 ml-0.5" />
              </div>
              View Showreel
            </button>
          </div>

          <div className="pt-8 flex items-center gap-8 border-t border-orange-100/50">
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

        <div className="relative hidden lg:block perspective-2000">
            <TiltCard>
              <motion.div 
                style={{ y: y2 }}
                className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-orange-500/10 border border-white/50 overflow-hidden flex flex-col"
              >
                <div className="h-10 border-b border-slate-100 bg-white/50 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                  </div>
                  <div className="mx-auto w-40 h-5 bg-white rounded-md border border-slate-100 shadow-sm flex items-center justify-center">
                    <div className="w-20 h-1.5 bg-slate-200 rounded-full" />
                  </div>
                </div>

                <div className="flex-1 p-6 flex gap-6">
                  <div className="w-16 flex flex-col items-center gap-6 py-4 border-r border-slate-100/50">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${i === 1 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-400 hover:bg-white hover:shadow-sm'}`}>
                          <Code2 className="w-5 h-5" />
                        </div>
                      ))}
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="h-4 w-32 bg-slate-900/10 rounded-md mb-2" />
                        <div className="h-8 w-48 bg-slate-900 rounded-lg" />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-slate-200" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-md bg-orange-100 text-orange-600"><BarChart3 className="w-4 h-4"/></div>
                          <span className="text-xs font-semibold text-slate-500">Revenue</span>
                        </div>
                        <div className="h-16 flex items-end gap-1">
                          {[40, 70, 45, 90, 60].map((h, i) => (
                            <div key={i} className="flex-1 bg-orange-500 rounded-t-sm" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-md bg-amber-100 text-amber-600"><Zap className="w-4 h-4"/></div>
                          <span className="text-xs font-semibold text-slate-500">Your Growth</span>
                        </div>
                        <div className="h-16 w-full bg-slate-50 rounded-lg relative overflow-hidden flex items-end">
                           <svg viewBox="0 0 100 40" className="w-full h-full text-orange-500" preserveAspectRatio="none">
                              <defs>
                                 <linearGradient id="growthGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                 </linearGradient>
                              </defs>
                              <path d="M0 40 L0 30 C10 30 15 15 25 25 C35 35 40 10 50 20 C60 30 65 35 75 15 C85 -5 90 5 100 0 L100 40 Z" fill="url(#growthGradient)" />
                              <path d="M0 30 C10 30 15 15 25 25 C35 35 40 10 50 20 C60 30 65 35 75 15 C85 -5 90 5 100 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                style={{ y: y1, x: -20, z: 50 }}
                className="absolute -left-12 bottom-20 w-48 bg-white/90 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-2xl shadow-slate-900/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Report Ready</p>
                    <p className="text-[10px] text-slate-500">Just now</p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-orange-500 rounded-full" />
                </div>
              </motion.div>
            </TiltCard>
        </div>
      </div>
    </div>
  );
}

// --- 2. MARQUEE ---
function Marquee() {
  return (
    <div className="w-full border-y border-slate-200 bg-slate-50 py-12 overflow-hidden relative group">
      <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-slate-50 to-transparent z-10" />
      
      <div className="flex w-max animate-marquee gap-32 px-8 group-hover:[animation-play-state:paused] transition-all">
        {["SAAS", "FINTECH", "HEALTHCARE", "RETAIL", "LOGISTICS", "REAL ESTATE", "SAAS", "FINTECH"].map((i, idx) => (
           <div key={idx} className="flex items-center gap-4 font-black text-3xl text-slate-300 hover:text-slate-900 transition-colors cursor-pointer select-none">
              <span className="text-orange-500 text-4xl leading-none">✶</span> {i}
           </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}

// --- 3. INTELLIGENCE ENGINE ---
function IntelligenceEngine() {
  return (
    <section className="py-32 bg-[#0B0F19] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
             <div className="inline-flex items-center gap-3 text-emerald-400 font-mono text-xs border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 rounded-full">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               SYSTEM ONLINE_V2.4
             </div>
             
             <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
               The Intelligence <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                 Engine v2.0
               </span>
             </h2>
             
             <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
               Zarc doesn't just scrape data. It perceives market shifts in real-time using a proprietary neural network trained on 500TB of global business registry data.
             </p>

             <ul className="space-y-5 pt-4">
               {[
                 { text: "Real-time Entity Resolution", icon: ScanLine },
                 { text: "Predictive Market Scoring", icon: TrendingUp },
                 { text: "Cross-border Compliance Check", icon: ShieldCheck }
               ].map((item, i) => (
                 <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-slate-300 font-medium group"
                  >
                   <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-indigo-500/20 transition-colors">
                     <item.icon className="w-5 h-5 text-indigo-400" />
                   </div>
                   {item.text}
                 </motion.li>
               ))}
             </ul>
          </motion.div>

          {/* Visualization Side */}
          <div className="relative perspective-1000">
             <motion.div 
               whileHover={{ rotateY: -2, rotateX: 2 }}
               className="bg-[#121622] border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/10 relative"
             >
                {/* Header */}
                <div className="h-10 bg-[#0F121C] border-b border-slate-800 flex items-center px-4 gap-2">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                   </div>
                   <div className="ml-auto flex items-center gap-2 text-[10px] text-slate-500 font-mono tracking-widest">
                      <Activity className="w-3 h-3 text-indigo-500" />
                      LIVE_FEED
                   </div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-xs space-y-4 h-[350px] overflow-hidden relative">
                   {/* Scanning Line */}
                   <motion.div 
                     animate={{ top: ["0%", "100%", "0%"] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                     className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10 opacity-50"
                   />
                   
                   <div className="text-slate-500 mb-4">
                      <span className="text-emerald-400 font-bold">root@zarc-ai:~$</span> initializing_neural_net --verbose
                   </div>
                   
                   <div className="space-y-2">
                     {[
                       { label: "Parsing SEC Filings", status: "COMPLETE", color: "text-emerald-400", time: "14ms" },
                       { label: "Analyzing Sentiment (Twitter/X)", status: "ACTIVE", color: "text-amber-400", time: "89ms" },
                       { label: "Indexing GST Records", status: "PENDING", color: "text-slate-600", time: "--" },
                       { label: "Geospatial Heatmap", status: "RENDERING", color: "text-blue-400", time: "120ms" },
                     ].map((line, i) => (
                       <div key={i} className="flex justify-between items-center border-b border-slate-800/40 pb-2">
                          <span className="text-slate-300 flex items-center gap-2">
                             <span className="opacity-30">›</span> {line.label}
                          </span>
                          <div className="flex items-center gap-4">
                            <span className="text-slate-600 text-[10px]">{line.time}</span>
                            <span className={`${line.color} font-bold`}>{line.status}</span>
                          </div>
                       </div>
                     ))}
                   </div>

                   {/* Live Data Stream Simulation */}
                   <div className="pt-6 space-y-2">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Incoming Data Stream</div>
                      <div className="flex gap-4 text-[10px] bg-slate-800/30 p-2 rounded border border-slate-800">
                         <span className="text-blue-400">#TS_10293</span>
                         <span className="text-slate-300">Sector: FINTECH</span>
                         <span className="text-emerald-400 ml-auto">+12.4% Growth</span>
                      </div>
                      <div className="flex gap-4 text-[10px] bg-slate-800/30 p-2 rounded border border-slate-800">
                         <span className="text-blue-400">#TS_10294</span>
                         <span className="text-slate-300">Sector: AGRI</span>
                         <span className="text-red-400 ml-auto">-0.4% Dip</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 4. AUDIENCE & HOW IT WORKS ---
function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Define Your Goal", desc: "Select your industry vertical and specific objective: Launch, Scale, or Pivot.", icon: Search },
    { title: "AI Analysis", desc: "Our engine scans 50M+ data points, competitor filings, and consumer trends.", icon: ScanLine },
    { title: "Execution Plan", desc: "Receive a verified strategic roadmap, vendor shortlist, and regulatory checklist.", icon: FileText },
  ];

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="py-32 bg-white overflow-hidden">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Intuition to Empire.</h2>
             <p className="text-lg text-slate-500 max-w-2xl mx-auto">From a rough idea to a fully executable business strategy in three autonomous steps.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
             
             {/* Left: Mac Screen Mockup */}
             <div className="relative group">
                <div className="relative w-full aspect-[16/10] bg-[#0d0d0d] rounded-t-2xl border-[4px] border-[#1a1a1a] shadow-2xl overflow-hidden ring-1 ring-white/10">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-lg z-30"></div>
                   
                   <div className="w-full h-full bg-slate-50 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-8 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4 pt-1">
                          <div className="flex gap-1.5 opacity-50">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">Zarc Dashboard</div>
                      </div>

                      <AnimatePresence mode="wait">
                         <motion.div 
                           key={activeStep}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           transition={{ duration: 0.5, ease: "easeOut" }}
                           className="w-full h-full pt-8 flex flex-col"
                         >
                            {/* STEP 1 */}
                            {activeStep === 0 && (
                               <div className="h-full px-8 pb-8 flex flex-col gap-6 justify-center">
                                  <div className="text-center space-y-2">
                                     <h4 className="text-lg font-bold text-slate-800">Select Industry</h4>
                                     <p className="text-xs text-slate-400">Choose where you want to dominate.</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                     {['SaaS', 'E-com', 'Fintech', 'Agri'].map(item => (
                                        <div key={item} className="p-3 border rounded-lg bg-white shadow-sm text-sm font-medium text-slate-600 flex items-center gap-2">
                                           <div className={`w-2 h-2 rounded-full ${item === 'Fintech' ? 'bg-orange-500' : 'bg-slate-200'}`}></div>
                                           {item}
                                        </div>
                                     ))}
                                  </div>
                                  <div className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded text-center mt-2">Next Step →</div>
                               </div>
                            )}

                            {/* STEP 2 */}
                            {activeStep === 1 && (
                               <div className="h-full px-8 pb-8 flex flex-col items-center justify-center text-center">
                                   <div className="relative w-24 h-24 mb-6">
                                      <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                                      <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                         <Database className="w-8 h-8 text-slate-400" />
                                      </div>
                                   </div>
                                   <div className="space-y-2">
                                      <h4 className="text-lg font-bold text-slate-800">Analyzing Market Data</h4>
                                      <div className="flex flex-col gap-1 text-xs text-slate-400 font-mono">
                                         <span>Scanning 50M+ records...</span>
                                         <span className="text-orange-500">Found 12 Competitors</span>
                                         <span>Calculating vectors...</span>
                                      </div>
                                   </div>
                               </div>
                            )}

                            {/* STEP 3 - REPORT STRUCTURE */}
                            {activeStep === 2 && (
                               <div className="h-full flex bg-white">
                                  {/* Sidebar simulating a document structure */}
                                  <div className="w-1/4 h-full bg-slate-50 border-r border-slate-200 p-4 space-y-3">
                                      <div className="h-2 w-16 bg-slate-300 rounded mb-4"/>
                                      <div className="space-y-2">
                                        <div className="h-1.5 w-full bg-orange-200 rounded"/>
                                        <div className="h-1.5 w-10/12 bg-slate-200 rounded"/>
                                        <div className="h-1.5 w-11/12 bg-slate-200 rounded"/>
                                        <div className="h-1.5 w-9/12 bg-slate-200 rounded"/>
                                      </div>
                                      <div className="pt-4 border-t border-slate-200 mt-auto">
                                        <div className="flex items-center gap-2 text-[8px] text-slate-400">
                                            <FileBarChart className="w-3 h-3"/> PDF Ready
                                        </div>
                                      </div>
                                  </div>

                                  {/* Main Report Content */}
                                  <div className="flex-1 p-5 overflow-hidden flex flex-col">
                                      {/* Header */}
                                      <div className="flex justify-between items-start mb-4">
                                          <div>
                                              <div className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Strategic Plan</div>
                                              <h3 className="text-sm font-bold text-slate-900">Market Entry: FinTech Q3</h3>
                                          </div>
                                          <div className="bg-slate-900 text-white p-1.5 rounded hover:bg-slate-800 cursor-pointer">
                                              <Download className="w-3 h-3" />
                                          </div>
                                      </div>

                                      {/* Report Body */}
                                      <div className="space-y-3 mb-4">
                                          <div className="h-1.5 w-full bg-slate-100 rounded"/>
                                          <div className="h-1.5 w-[95%] bg-slate-100 rounded"/>
                                          <div className="h-1.5 w-[80%] bg-slate-100 rounded"/>
                                      </div>

                                      {/* Cards grid */}
                                      <div className="grid grid-cols-2 gap-3 mt-auto">
                                          <div className="border border-slate-100 p-3 rounded-lg shadow-sm">
                                              <div className="text-[8px] text-slate-400 mb-1">Projected ROI</div>
                                              <div className="text-xs font-bold text-emerald-600">+128%</div>
                                              <div className="w-full h-1 bg-emerald-100 rounded mt-1">
                                                  <div className="w-[80%] h-full bg-emerald-500 rounded"/>
                                              </div>
                                          </div>
                                          <div className="border border-slate-100 p-3 rounded-lg shadow-sm">
                                              <div className="text-[8px] text-slate-400 mb-1">Risk Factor</div>
                                              <div className="text-xs font-bold text-orange-500">Low-Med</div>
                                              <div className="w-full h-1 bg-orange-100 rounded mt-1">
                                                  <div className="w-[30%] h-full bg-orange-500 rounded"/>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                               </div>
                            )}
                         </motion.div>
                      </AnimatePresence>
                   </div>
                </div>

                <div className="relative mx-auto w-[110%] -ml-[5%] h-4 bg-[#e2e2e2] rounded-b-xl shadow-xl flex justify-center border-t border-white/50">
                   <div className="w-24 h-1.5 bg-[#a0a0a0] rounded-b-md mt-0.5"></div>
                </div>
             </div>

             {/* Right: Steps */}
             <div className="space-y-4">
                {steps.map((step, idx) => (
                   <motion.div 
                     key={idx}
                     onClick={() => setActiveStep(idx)}
                     className={`cursor-pointer p-6 rounded-xl transition-all duration-300 border ${activeStep === idx ? 'bg-white border-orange-200 shadow-lg shadow-orange-500/5' : 'bg-transparent border-transparent hover:bg-slate-50'}`}
                   >
                      <div className="flex items-start gap-5">
                         <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${activeStep === idx ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            <step.icon size={18} />
                         </div>
                         <div>
                            <h3 className={`text-lg font-bold mb-1 transition-colors ${activeStep === idx ? 'text-slate-900' : 'text-slate-400'}`}>
                              {step.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${activeStep === idx ? 'text-slate-600' : 'text-slate-400'}`}>
                               {step.desc}
                            </p>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </section>
  )
}

// --- 5. CORE MODULES ---
function CoreModules() {
  const modules = [
    { category: "Plan & Validate", items: ["Market Research", "Idea Validation", "Business Setup"] },
    { category: "Develop Product", items: ["Tech Stack Selection", "MVP Scoping", "Vendor List"] },
    { category: "Grow & Expand", items: ["Sales Strategy", "Branding Kit", "Export Plans"] }
  ];

  return (
    <section className="py-24 bg-[#FFFBF7]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Your AI Partner</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-6">
            Your Personal AI <br /> Business Consultant.
          </h2>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            Choose your focus area and get step-by-step guidance. From validating a SaaS idea to setting up a manufacturing plant, Zarc guides you 24/7.
          </p>
          <div className="flex gap-4">
             <button className="px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl">Start Consulting</button>
          </div>
        </div>
        
        <div className="space-y-4">
          {modules.map((mod, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all"
            >
               <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-orange-500" />
                 {mod.category}
               </h3>
               <div className="grid grid-cols-2 gap-3">
                 {mod.items.map((item, i) => (
                   <div key={i} className="flex items-center gap-2 text-slate-600 text-sm bg-slate-50 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                      <ArrowRight className="w-3 h-3 text-orange-400" />
                      {item}
                   </div>
                 ))}
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 6. WHY ZARC ---
function WhyZarc() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Why Choose Zarc?</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Clock, title: "Instant Solutions", desc: "Get answers to complex business queries in seconds. Our AI processes global data instantly.", bg: "bg-blue-50", text: "text-blue-600" },
          { icon: Zap, title: "Cost-Effective", desc: "Access premium consulting expertise at a fraction of the cost of traditional firms like McKinsey.", bg: "bg-green-50", text: "text-green-600" },
          { icon: Lock, title: "Data Security", desc: "Your business ideas and data are protected with bank-grade encryption and strict privacy protocols.", bg: "bg-purple-50", text: "text-purple-600" }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className={`p-8 rounded-3xl ${item.bg} bg-opacity-50 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300`}
          >
             <div className={`w-14 h-14 ${item.bg} ${item.text} rounded-2xl flex items-center justify-center mb-6`}>
               <item.icon className="w-7 h-7" />
             </div>
             <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
             <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- 7. ECOSYSTEM GRID ---
function EcosystemGrid() {
  const industries = [
    { name: "Tech & SaaS", icon: Cpu, color: "text-blue-600" },
    { name: "Retail & E-com", icon: ShoppingBag, color: "text-pink-600" },
    { name: "Real Estate", icon: Building2, color: "text-emerald-600" },
    { name: "Healthcare", icon: Stethoscope, color: "text-cyan-600" },
    { name: "Automotive", icon: Car, color: "text-red-600" },
    { name: "Energy", icon: Lightbulb, color: "text-yellow-600" },
    { name: "Mobile Apps", icon: Smartphone, color: "text-purple-600" },
    { name: "Consulting", icon: Briefcase, color: "text-slate-600" },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Connect with partners <br/>
              <span className="text-orange-500">across 20+ industries.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Zarc isn't limited to one niche. We aggregate global data to provide granular insights for startups, enterprises, and investors across all major sectors.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-orange-500 shrink-0">1</div>
                <div><h4 className="font-bold text-lg">Select Industry</h4><p className="text-slate-500 text-sm">Choose from 140+ predefined verticals.</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-white shrink-0">2</div>
                <div><h4 className="font-bold text-lg">Define Parameters</h4><p className="text-slate-500 text-sm">Target geography, demographics, and budget.</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-sm text-center text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- NEW COMPONENT: Testimonials ---
function Testimonials() {
  const reviews = [
    { name: "Rohan D.", role: "CEO, FinTech", text: "Zarc cut our market research time by 90%. It's insane.", img: "https://i.pravatar.cc/100?img=11" },
    { name: "Priya S.", role: "Founder, D2C", text: "The execution plan was spot on. We launched in 2 weeks.", img: "https://i.pravatar.cc/100?img=5" },
    { name: "Arjun K.", role: "CTO, SaaS", text: "Finally, an AI that understands Indian market nuances.", img: "https://i.pravatar.cc/100?img=3" },
    { name: "Sarah J.", role: "Product, EdTech", text: "The competitive analysis is better than what we paid agencies for.", img: "https://i.pravatar.cc/100?img=9" },
    { name: "Mike T.", role: "Investor", text: "I use Zarc to vet every startup pitch. It's my secret weapon.", img: "https://i.pravatar.cc/100?img=12" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
       <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
          <div>
            <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Wall of Love</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Trusted by Visionaries.</h2>
          </div>
          <div className="hidden md:flex gap-2">
             <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center"><ArrowRight className="w-4 h-4 rotate-180 text-slate-400"/></div>
             <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-white"/></div>
          </div>
       </div>

       {/* Left-to-Right Scrolling Marquee */}
       <div className="relative w-full">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-6 w-max animate-scroll-left hover:[animation-play-state:paused]">
             {[...reviews, ...reviews, ...reviews].map((review, idx) => (
                <div key={idx} className="w-[350px] p-6 rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                   <div className="flex items-center gap-1 mb-4">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
                   </div>
                   <p className="text-slate-600 leading-relaxed mb-6 font-medium">"{review.text}"</p>
                   <div className="flex items-center gap-3">
                      <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full bg-slate-200 object-cover" />
                      <div>
                         <div className="text-sm font-bold text-slate-900">{review.name}</div>
                         <div className="text-xs text-slate-500">{review.role}</div>
                      </div>
                      <Quote className="w-8 h-8 text-slate-100 ml-auto fill-slate-100" />
                   </div>
                </div>
             ))}
          </div>
       </div>
       <style jsx>{`
         @keyframes scroll-left {
           0% { transform: translateX(-50%); }
           100% { transform: translateX(0); }
         }
         .animate-scroll-left {
           animation: scroll-left 40s linear infinite;
         }
       `}</style>
    </section>
  )
}

// --- 8. IMPROVED CTA SECTION ---
function CTASection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Container */}
        <div className="relative rounded-[3rem] overflow-hidden bg-[#0A0A0A] border border-slate-800 shadow-2xl">
           
           {/* Background Effects */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
           <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-orange-600/30 rounded-full blur-[150px] pointer-events-none" />
           <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />

           <div className="grid lg:grid-cols-2 gap-12 p-12 md:p-20 relative z-10 items-center">
              
              {/* Left Side: The Offer */}
              <div className="space-y-8">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold uppercase tracking-wider">
                    <Timer className="w-4 h-4" />
                    Limited Time Offer • Ends in 04:12:30
                 </div>
                 
                 <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[0.95] tracking-tight">
                    Build your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-[length:200%_auto] animate-gradient">
                       empire.
                    </span>
                 </h2>
                 
                 <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                    Don't just dream about it. Get the validated roadmap, investor pitch, and execution strategy you need to launch today.
                 </p>

                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <MagneticButton className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-orange-50 hover:scale-105 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 group">
                       Start Building Free
                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>
                    <div className="flex items-center gap-4 px-6 text-slate-400 text-sm">
                       <div className="flex -space-x-3">
                          {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0A0A0A]" />)}
                       </div>
                       <span>Join 60k+ Founders</span>
                    </div>
                 </div>
              </div>

              {/* Right Side: The Launch Protocol Visualization */}
              <div className="relative">
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden"
                 >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
                    
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-500/20 rounded-lg">
                             <Rocket className="w-6 h-6 text-orange-400" />
                          </div>
                          <div>
                             <div className="text-white font-bold text-sm">Launch Protocol</div>
                             <div className="text-slate-500 text-xs">System Status: <span className="text-emerald-400">Ready</span></div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-2xl font-mono font-bold text-white">100%</div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       {[
                         { step: "Niche Analysis", status: "Complete", color: "text-emerald-400" },
                         { step: "Competitor Mapping", status: "Complete", color: "text-emerald-400" },
                         { step: "Revenue Model Gen", status: "Complete", color: "text-emerald-400" },
                         { step: "Empire Strategy", status: "Ready to Deploy", color: "text-orange-400 animate-pulse" }
                       ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                             <div className="flex items-center gap-3 text-slate-300">
                                <div className={`w-1.5 h-1.5 rounded-full ${idx === 3 ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                                {item.step}
                             </div>
                             <div className={`font-mono text-xs ${item.color}`}>{item.status}</div>
                          </div>
                       ))}
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                       <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 w-full rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)]"></div>
                       </div>
                    </div>
                 </motion.div>

                 {/* Floating Badges */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-xs shadow-xl rotate-6"
                 >
                    🚀 Validated Idea
                 </motion.div>
                 <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-6 bg-[#1A1A1A] text-white border border-slate-700 px-4 py-2 rounded-lg font-bold text-xs shadow-xl -rotate-3 flex items-center gap-2"
                 >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Investable
                 </motion.div>
              </div>

           </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </section>
  );
}

// --- 9. FAQ SECTION ---
const FAQItem = ({ question, answer, delay }: { question: string, answer: string, delay: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`border-b border-slate-100 transition-colors ${isOpen ? 'bg-slate-50/50' : ''}`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 px-4 flex justify-between items-center text-left focus:outline-none group">
        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-orange-600' : 'text-slate-900 group-hover:text-orange-600'}`}>{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-orange-500"/> : <Plus className="w-5 h-5 text-slate-400 group-hover:text-orange-500"/>}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-6 text-slate-500 leading-relaxed max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQSection() {
   const faqs = [
     { q: "How accurate is the data?", a: "We aggregate real-time data from government registries, financial reports, and satellite imagery, cross-referenced by our AI for 95%+ accuracy." },
     { q: "Can I download the reports?", a: "Yes! All reports can be exported as PDF, CSV, or customizable PowerPoint decks for your stakeholders." },
     { q: "Do you support custom industries?", a: "Absolutely. While we have 140+ presets, you can input custom parameters for niche markets like 'Vertical Farming in Jaipur' or 'SaaS for Dentists'." },
     { q: "What is the refund policy?", a: "If you're not satisfied with the report quality, we offer a full credit refund within 7 days of generation." }
   ];

   return (
     <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-extrabold mb-4 text-slate-900">Frequently Asked Questions</h2>
           <p className="text-slate-500">Everything you need to know about Zarc.</p>
        </div>
        <div className="border-t border-slate-100">
           {faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} delay={i * 0.1} />)}
        </div>
     </section>
   )
}

// --- MAIN PAGE ---
export default function LandingPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Hero />
      <Marquee />
      <IntelligenceEngine />
      <HowItWorks />
      <CoreModules />
      <WhyZarc />
      <EcosystemGrid />
      <Testimonials />
      <CTASection />
      <FAQSection />
      
      <footer className="bg-white border-t border-slate-200 py-16 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
           <div className="space-y-4">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xs">Z</div>
                <h4 className="font-bold text-slate-900 text-lg">Zarc.</h4>
             </div>
             <p className="text-slate-500 leading-relaxed">India's 1st AI Platform for Business Growth across all sectors. Empowering visionaries since 2024.</p>
           </div>
           <div>
              <h5 className="font-bold text-slate-900 mb-4">Product</h5>
              <ul className="space-y-3 text-slate-500">
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Pricing</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Case Studies</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Reviews</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Updates</li>
              </ul>
           </div>
           <div>
              <h5 className="font-bold text-slate-900 mb-4">Company</h5>
              <ul className="space-y-3 text-slate-500">
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">About</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Careers</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Contact</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Press</li>
              </ul>
           </div>
           <div>
              <h5 className="font-bold text-slate-900 mb-4">Legal</h5>
              <ul className="space-y-3 text-slate-500">
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Privacy Policy</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Terms of Service</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Security</li>
                 <li className="hover:text-orange-600 cursor-pointer transition-colors">Cookie Settings</li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
           <p>&copy; 2025 Zarc Technologies. All rights reserved.</p>
           <div className="flex gap-6">
              <MousePointer2 className="w-4 h-4 hover:text-orange-500 cursor-pointer"/>
              <Globe2 className="w-4 h-4 hover:text-orange-500 cursor-pointer"/>
           </div>
        </div>
      </footer>
    </div>
  );
}
