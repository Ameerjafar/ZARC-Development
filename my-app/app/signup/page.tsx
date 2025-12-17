"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, Mail, Lock, ArrowRight, Loader2, Chrome, Github, User
} from "lucide-react";

// --- RIGHT SIDE VISUAL ---
const DashboardPreview = () => (
  <div className="hidden lg:flex w-[55%] bg-slate-900 relative items-center justify-center overflow-hidden h-full">
     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
     <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] -mr-40 -mt-40 mix-blend-screen animate-pulse duration-[5000ms]"></div>
     <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[100px] -ml-20 -mb-20 mix-blend-screen"></div>

     <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center max-w-md mx-auto"
     >
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-orange-500/40">
           <Zap className="w-10 h-10 text-white fill-white" />
        </div>
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Scale your scraping.</h2>
        <p className="text-slate-400 text-lg font-medium leading-relaxed">
           Join the platform processing 8M+ data points daily.
           <br />
           <span className="text-slate-500 text-base">Setup takes less than 2 minutes.</span>
        </p>
     </motion.div>
  </div>
);

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="h-screen w-full bg-white flex font-sans text-slate-900 overflow-hidden selection:bg-orange-100 selection:text-orange-900">
      
      {/* LEFT SIDE: FORM */}
      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center items-center p-8 lg:p-12 relative z-10">
        
        {/* Main Container */}
        <div className="w-full max-w-sm flex flex-col justify-center">
           
           {/* Header */}
           <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Account</h1>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                 Start extracting intelligence today. Free forever plan included.
              </p>
           </div>

           {/* Social Buttons */}
           <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-xs text-slate-700 shadow-sm active:scale-95">
                 <Chrome className="w-4 h-4" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-xs text-slate-700 shadow-sm active:scale-95">
                 <Github className="w-4 h-4" /> Github
              </button>
           </div>

           {/* Divider */}
           <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink-0 mx-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Or register with</span>
              <div className="flex-grow border-t border-slate-100"></div>
           </div>

           {/* Form */}
           <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-900 ml-1">Full Name</label>
                 <div className="relative group">
                    <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Alex Designer" 
                      className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400"
                    />
                 </div>
              </div>

              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-900 ml-1">Email</label>
                 <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400"
                    />
                 </div>
              </div>

              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-900 ml-1">Password</label>
                 <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                    <input 
                      type="password" 
                      placeholder="Create a password" 
                      className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400"
                    />
                 </div>
              </div>

              <div className="flex items-start gap-2 pt-1 pb-2">
                 <input type="checkbox" className="mt-1 w-3.5 h-3.5 rounded text-orange-600 focus:ring-orange-500 cursor-pointer border-slate-300" />
                 <p className="text-xs font-medium text-slate-500 leading-snug">
                    I agree to the <a href="#" className="text-slate-900 font-bold hover:underline">Terms</a> and <a href="#" className="text-slate-900 font-bold hover:underline">Privacy Policy</a>.
                 </p>
              </div>

              <button 
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-orange-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                 {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
           </form>

           {/* Footer Link */}
           <div className="mt-8 text-center">
              <p className="text-sm font-medium text-slate-500">
                 Have an account? <a href="/login" className="text-orange-600 font-bold hover:underline underline-offset-4">Log in</a>
              </p>
           </div>
        </div>

        {/* Absolute Footer Copyright */}
        <div className="absolute bottom-6 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
           © 2025 StratEngine Inc.
        </div>
      </div>

      {/* RIGHT SIDE */}
      <DashboardPreview />
    </div>
  );
}
