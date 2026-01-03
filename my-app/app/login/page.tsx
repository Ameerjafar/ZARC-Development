"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
   Mail, Lock, ArrowRight, Loader2, User, AlertCircle
} from "lucide-react";
import { apiFetch } from "../lib/api";
import { useRouter } from 'next/navigation'

const RightSideVisuals = () => (
   <div className="hidden lg:flex lg:w-[50%] fixed right-0 top-0 h-screen bg-[#0F172A] items-center justify-center overflow-hidden z-0">

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 z-10"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-amber-600/10 rounded-full blur-[100px] mix-blend-screen"></div>

      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.2 }}
         className="relative z-20 text-center max-w-lg mx-auto px-8"
      >
         <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-orange-500/30 border border-white/10 ring-4 ring-white/5">
            <User className="w-12 h-12 text-white fill-white/20" />
         </div>
         <h2 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Welcome <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Back.</span>
         </h2>
         <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md mx-auto">
            Your insights are waiting. Continue your market analysis today.
         </p>
      </motion.div>
   </div>
);

// --- AUTH ICONS ---
const GoogleIcon = () => (
   <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
   </svg>
);

export default function LoginPage() {
   const [isLoading, setIsLoading] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
         const data = await apiFetch("/api/auth/signin", {
            method: "POST",
            body: JSON.stringify({ email, password }),
         });
         localStorage.setItem("token", data.access_token);
         router.push('/report')
      } catch (err: any) {
         setError(err.message || "Failed to sign in. Please check your credentials.");
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen w-full flex font-sans text-slate-900 bg-white selection:bg-orange-100 selection:text-orange-900">

         {/* LEFT SIDE: FORM CONTAINER */}
         <div className="w-full lg:w-[50%] flex flex-col justify-center items-center px-6 py-12 lg:p-12 relative z-10">

            {/* Subtle Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
               <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[80px]"></div>
               <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-blue-50/40 rounded-full blur-[60px]"></div>
            </div>

            <div className="w-full max-w-[420px] relative z-10">

               {/* Header */}
               <div className="mb-10 text-center lg:text-left">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Sign In</h1>
                  <p className="text-slate-500 font-medium text-base leading-relaxed">
                     Enter your credentials to access your workspace.
                  </p>
               </div>

               {/* Social Icons - CENTERED */}
               <div className="flex justify-center gap-5 mb-10">
                  <button className="w-20 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:scale-105 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group">
                     <GoogleIcon />
                  </button>
               </div>

               {/* Divider */}
               <div className="relative flex items-center mb-8">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Or login with email</span>
                  <div className="flex-grow border-t border-slate-200"></div>
               </div>

               {/* Form */}
               <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                     <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                     </div>
                  )}

                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">Work Email</label>
                     <div className="relative group">
                        <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        {/* VISIBLE INPUT: bg-slate-50 & border-slate-300 */}
                        <input
                           type="email"
                           placeholder="sarah@helix.io"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-orange-300"
                        />
                     </div>
                  </div>

                  <div className="space-y-1.5">
                     <div className="relative group">
                        <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        {/* VISIBLE INPUT: bg-slate-50 & border-slate-300 */}
                        <input
                           type="password"
                           placeholder="••••••••"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                           className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-orange-300"
                        />
                     </div>
                     <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">Password</label>
                        <a href="#" className="text-xs font-bold text-orange-600 hover:underline">Forgot Password?</a>
                     </div>
                  </div>

                  <button
                     disabled={isLoading}
                     className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-orange-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                     {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Log In <ArrowRight className="w-5 h-5" /></>}
                  </button>
               </form>

               <div className="mt-8 text-center">
                  <p className="text-sm font-medium text-slate-500">
                     Don not have a workspace? <a href="/signup" className="text-orange-600 font-bold hover:underline underline-offset-4">Create one</a>
                  </p>
               </div>
            </div>

            <div className="absolute bottom-6 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
               © 2025 StratEngine Inc.
            </div>
         </div>

         <RightSideVisuals />
      </div>
   );
}
