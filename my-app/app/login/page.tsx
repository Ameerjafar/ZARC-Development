"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, User, ArrowRight, Loader2, 
  Globe, Zap, BarChart3, Database, Building2, CheckCircle2, Briefcase
} from "lucide-react";

// --- ANIMATED WIDGETS (Right Side) ---
const AnimatedWidgets = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
      
      {/* Status Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="z-10 -ml-24"
      >
         <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl shadow-orange-500/5 border border-white flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center shadow-md shadow-orange-500/20">
                <CheckCircle2 className="w-5 h-5 text-white" />
             </div>
             <div>
                <p className="text-[10px] font-bold text-orange-400 uppercase">Status</p>
                <p className="text-xs font-black text-slate-900">Connected</p>
             </div>
         </div>
      </motion.div>

      {/* Central Hub */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="relative z-20 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_30px_60px_-15px_rgba(249,115,22,0.15)] border border-white/60 w-[340px]"
      >
        <div className="flex justify-between items-center mb-6">
           <div>
              <p className="text-[11px] font-extrabold text-orange-600 uppercase tracking-widest mb-1">Live Extraction</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">1,284 <span className="text-sm font-bold text-slate-400">Reports</span></h3>
           </div>
           <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Zap className="w-6 h-6 text-white fill-white" />
           </div>
        </div>

        <div className="space-y-3 relative">
           {[
              { label: "Market Trends", icon: BarChart3, color: "text-orange-600", bg: "bg-orange-50", fill: "bg-orange-500" },
              { label: "Competitor Intel", icon: Globe, color: "text-amber-600", bg: "bg-amber-50", fill: "bg-amber-500" },
              { label: "Sentiment Analysis", icon: Database, color: "text-orange-500", bg: "bg-orange-50/50", fill: "bg-orange-400" }
           ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-4 p-3 rounded-2xl bg-white/80 border border-white shadow-sm"
              >
                 <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                 </div>
                 <div className="flex-1">
                    <div className="h-2 w-24 bg-orange-50 rounded-full mb-1.5 overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 1.5, delay: 0.8 + (i * 0.2) }}
                           className={`h-full ${item.fill}`} 
                        />
                    </div>
                    <div className="h-1.5 w-12 bg-slate-100 rounded-full" />
                 </div>
              </motion.div>
           ))}
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[15%] right-[10%] z-30"
      >
         <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-orange-900/10 flex items-center gap-3 border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-sm font-bold">System Online</span>
         </div>
      </motion.div>

  </div>
);

// --- BRAND ICONS ---
const GoogleIcon = () => (
   <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
   </svg>
);

const GithubIcon = () => (
   <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#181717]">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
   </svg>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    // MAIN BACKGROUND
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4 lg:p-6 font-sans selection:bg-orange-100 selection:text-orange-900 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[100px] mix-blend-multiply" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(249,115,22,0.1)] border border-white/80 overflow-hidden flex min-h-[750px] relative z-10">
         
         {/* --- LEFT SIDE: FORM (Aligned Top) --- */}
         <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-start pt-20 relative bg-white/50">
            
            <div className="max-w-md mx-auto w-full">
               <motion.div 
                 key={isLogin ? "login" : "signup"}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="mb-6"
               >
                  <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                     {isLogin ? "Welcome Back" : "Create Account"}
                  </h1>
                  <p className="text-slate-500 font-medium">
                     {isLogin ? "Enter details to access your reports." : "Start generating reports in minutes."}
                  </p>
               </motion.div>

               {/* --- SOCIALS (Centered) --- */}
               <div className="flex justify-center gap-4 mb-6">
                  <button className="w-14 h-14 rounded-full border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-200 transition-all group shadow-sm flex items-center justify-center">
                     <GoogleIcon />
                  </button>
                  <button className="w-14 h-14 rounded-full border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-200 transition-all group shadow-sm flex items-center justify-center">
                     <GithubIcon />
                  </button>
               </div>

               {/* Divider */}
               <div className="relative flex items-center mb-6">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
               </div>

               {/* Form */}
               <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Toggle */}
                  <div className="flex bg-orange-50/50 p-1.5 rounded-2xl w-fit mb-6 border border-orange-100">
                     <button 
                        onClick={() => setIsLogin(true)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 ${isLogin ? 'bg-white text-orange-600 shadow-md shadow-orange-100' : 'text-slate-400 hover:text-orange-500'}`}
                     >
                        Login
                     </button>
                     <button 
                        onClick={() => setIsLogin(false)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 ${!isLogin ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-400 hover:text-orange-500'}`}
                     >
                        Sign Up
                     </button>
                  </div>
                  
                  {/* Signup Fields */}
                  <AnimatePresence mode="popLayout">
                     {!isLogin && (
                        <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="space-y-4 overflow-hidden"
                        >
                           <div className="grid grid-cols-2 gap-4">
                              <div className="relative group">
                                 <User className="absolute left-5 top-4 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                 <input 
                                    type="text" 
                                    placeholder="First Name" 
                                    className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl py-4 pl-12 pr-4 outline-none font-black text-slate-900 placeholder:text-slate-400 placeholder:font-bold transition-all text-sm shadow-sm"
                                 />
                              </div>
                              <div className="relative group">
                                 <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl py-4 px-6 outline-none font-black text-slate-900 placeholder:text-slate-400 placeholder:font-bold transition-all text-sm shadow-sm"
                                 />
                              </div>
                           </div>
                           
                           <div className="relative group">
                              <Building2 className="absolute left-5 top-4 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                              <input 
                                 type="text" 
                                 placeholder="Company Name" 
                                 className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl py-4 pl-12 pr-4 outline-none font-black text-slate-900 placeholder:text-slate-400 placeholder:font-bold transition-all text-sm shadow-sm"
                              />
                           </div>

                           {/* --- INDUSTRY SELECTOR --- */}
                           <div className="relative group">
                              <Briefcase className="absolute left-5 top-4 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors pointer-events-none z-10" />
                              <select 
                                 className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl py-4 pl-12 pr-8 outline-none font-black text-slate-600 focus:text-slate-900 transition-all text-sm shadow-sm appearance-none cursor-pointer"
                              >
                                 <option value="" disabled selected>Select Industry</option>
                                 <option value="ecommerce">E-Commerce</option>
                                 <option value="finance">Finance</option>
                                 <option value="saas">SaaS / Tech</option>
                                 <option value="healthcare">Healthcare</option>
                                 <option value="retail">Retail</option>
                              </select>
                              <div className="absolute right-5 top-4 pointer-events-none">
                                 <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                              </div>
                           </div>

                        </motion.div>
                     )}
                  </AnimatePresence>

                  <div className="relative group">
                     <Mail className="absolute left-5 top-4 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                     <input 
                        type="email" 
                        placeholder="Work Email" 
                        className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl py-4 pl-12 pr-4 outline-none font-black text-slate-900 placeholder:text-slate-400 placeholder:font-bold transition-all text-sm shadow-sm"
                     />
                  </div>

                  <div className="relative group">
                     <Lock className="absolute left-5 top-4 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                     <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl py-4 pl-12 pr-4 outline-none font-black text-slate-900 placeholder:text-slate-400 placeholder:font-bold transition-all text-sm shadow-sm"
                     />
                  </div>

                  {/* GRADIENT BUTTON */}
                  <button 
                     disabled={isLoading}
                     className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 mt-6 border border-white/20 group"
                  >
                     {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                        Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3px]" />
                     </>}
                  </button>
               </form>
            </div>
         </div>


         {/* --- RIGHT SIDE: VISUAL (50%) --- */}
         <div className="hidden lg:block w-1/2 relative overflow-hidden">
             
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-white/50" />
             
             {/* Glowing Orbs */}
             <div className="absolute inset-0">
                <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-orange-300/20 rounded-full blur-[80px] animate-pulse" />
                <div className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] bg-amber-300/20 rounded-full blur-[80px]" />
             </div>

             {/* Content */}
             <AnimatedWidgets />

         </div>

      </div>
    </div>
  );
}
