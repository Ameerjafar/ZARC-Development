"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Zap, Mail, Lock, ArrowRight, Loader2, User, Building2, Briefcase, AlertCircle, ChevronDown, Check
} from "lucide-react";
import { Toaster, toast } from "sonner";
// import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";
import { useRouter } from 'next/navigation'

const DashboardPreview = () => (
   <div className="hidden lg:flex lg:w-[50%] fixed right-0 top-0 h-screen bg-[#0F172A] items-center justify-center overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-slate-900/80 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 z-0"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-amber-600/10 rounded-full blur-[100px] mix-blend-screen"></div>

      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.2 }}
         className="relative z-20 text-center max-w-lg mx-auto px-8"
      >
         <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-orange-500/30 border border-white/10 ring-4 ring-white/5">
            <Zap className="w-12 h-12 text-white fill-white" />
         </div>
         <h2 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">at Scale.</span>
         </h2>
         <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md mx-auto">
            Join 4,000+ data teams extracting actionable market insights.
         </p>
      </motion.div>
   </div>
);

const GoogleIcon = () => (
   <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
   </svg>
);

// --- CUSTOM DROPDOWN COMPONENT ---
const CustomIndustryDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const options = ["SaaS", "Finance", "Healthcare", "E-commerce", "Others"];
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div className="relative group" ref={dropdownRef}>
         <Briefcase className={`absolute left-3.5 top-3.5 w-5 h-5 transition-colors z-10 ${isOpen || value ? 'text-orange-500' : 'text-slate-400 group-focus-within:text-orange-500'}`} />
         <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />

         {/* Trigger Button (Looks like Input) */}
         <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
               w-full text-left bg-white border border-slate-200 
               rounded-xl pl-11 pr-10 py-3 text-sm font-bold outline-none 
               transition-all shadow-sm hover:border-orange-300
               ${isOpen ? 'border-orange-500 ring-4 ring-orange-500/10' : ''}
               ${value ? "text-slate-900" : "text-slate-400"}
            `}
         >
            {value || "Select an industry..."}
         </button>

         {/* Animated Dropdown Menu */}
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl shadow-orange-500/10 border border-orange-100 overflow-hidden"
               >
                  <div className="bg-gradient-to-br from-orange-50/50 via-white to-orange-100/50 p-1.5 space-y-0.5">
                     {options.map((option) => (
                        <button
                           key={option}
                           type="button"
                           onClick={() => {
                              onChange(option);
                              setIsOpen(false);
                           }}
                           className={`
                              w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between
                              transition-all duration-150
                              ${value === option
                                 ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                                 : "text-slate-600 hover:bg-orange-50 hover:text-orange-700"}
                           `}
                        >
                           {option}
                           {value === option && <Check className="w-4 h-4" />}
                        </button>
                     ))}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default function SignupPage() {
   const [isLoading, setIsLoading] = useState(false);
   const [fullName, setFullName] = useState("");
   const [company, setCompany] = useState("");
   const [industry, setIndustry] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      const username = email.split("@")[0].replace(/[^a-zA-Z0-9_-]/g, "_") + Math.floor(Math.random() * 10000);

      try {
         const data = await apiFetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
               email,
               username,
               password,
               fullName,
               company,
               industry: industry || "",
            }),
         });

         if (data.access_token) {
            toast.success("Welcome aboard! Your workspace is ready.", {
               description: "Redirecting you to the dashboard...",
               duration: 3000,
            });
            localStorage.setItem("token", data.access_token);
            router.push('/report')
         }
      } catch (err: any) {
         console.error("Signup Error:", err);
         let errorMessage = "Failed to create account. Please try again.";

         if (err?.detail && Array.isArray(err.detail)) {
            const firstError = err.detail[0];
            if (firstError?.msg) errorMessage = firstError.msg;
         }
         else if (typeof err?.detail === 'string') {
            errorMessage = err.detail;
         }
         else if (err?.message) {
            errorMessage = err.message;
         }

         if (errorMessage.toLowerCase().includes("username")) {
            errorMessage = "Temporary system conflict. Please try clicking 'Create Workspace' again.";
         }

         toast.error("Registration Failed", {
            description: errorMessage,
         });

         setError(errorMessage);
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen w-full flex font-sans text-slate-900 bg-gradient-to-br from-orange-50 via-white to-orange-100 selection:bg-orange-200 selection:text-orange-900">
         <Toaster position="top-center" richColors />

         {/* LEFT SIDE: FORM CONTAINER */}
         <div className="w-full lg:w-[50%] flex flex-col justify-center items-center px-6 py-12 lg:p-12 relative z-10">

            {/* Subtle Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
               <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[80px]"></div>
               <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-white/60 rounded-full blur-[60px]"></div>
            </div>

            <div className="w-full max-w-[440px] relative z-10">

               {/* Header */}
               <div className="mb-10 text-center lg:text-left">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Start Your Free Trial</h1>
                  <p className="text-slate-500 font-medium text-base leading-relaxed">
                     Create your workspace to start generating reports.
                  </p>
               </div>
               <div className="flex justify-center gap-5 mb-10">
                  <button className="w-16 h-16 rounded-full bg-white border border-orange-100 flex items-center justify-center hover:scale-105 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group">
                     <GoogleIcon />
                  </button>
               </div>
               <div className="relative flex items-center mb-8">
                  <div className="flex-grow border-t border-orange-200"></div>
                  <span className="flex-shrink-0 mx-4 text-[11px] font-extrabold text-orange-400 uppercase tracking-widest">Or continue with email</span>
                  <div className="flex-grow border-t border-orange-200"></div>
               </div>

               {/* Form */}
               <form onSubmit={handleSignup} className="space-y-5">
                  {/* Inline Error Display */}
                  {error && (
                     <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm"
                     >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                     </motion.div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">
                        Full Name <span className="text-orange-600">*</span>
                     </label>
                     <div className="relative group">
                        <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                           type="text"
                           placeholder="Sarah Chen"
                           value={fullName}
                           onChange={(e) => setFullName(e.target.value)}
                           required
                           className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-orange-300"
                        />
                     </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">
                        Company Name <span className="text-orange-600">*</span>
                     </label>
                     <div className="relative group">
                        <Building2 className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                           type="text"
                           placeholder="Helix Market Research"
                           value={company}
                           onChange={(e) => setCompany(e.target.value)}
                           required
                           className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-orange-300"
                        />
                     </div>
                  </div>

                  {/* Industry (CUSTOM GRADIENT DROPDOWN) */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">
                        Industry <span className="text-slate-400 font-medium lowercase tracking-normal">(optional)</span>
                     </label>
                     <CustomIndustryDropdown value={industry} onChange={setIndustry} />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">
                        Work Email <span className="text-orange-600">*</span>
                     </label>
                     <div className="relative group">
                        <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                           type="email"
                           placeholder="sarah@helix.io"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-orange-300"
                        />
                     </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">
                        Password <span className="text-orange-600">*</span>
                     </label>
                     <div className="relative group">
                        <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                           type="password"
                           placeholder="••••••••"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                           className="w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-orange-300"
                        />
                     </div>
                  </div>

                  <button
                     disabled={isLoading}
                     className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 hover:shadow-orange-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                  >
                     {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Workspace <ArrowRight className="w-5 h-5" /></>}
                  </button>
               </form>

               <div className="mt-8 text-center">
                  <p className="text-sm font-medium text-slate-500">
                     Already have a workspace? <a href="/login" className="text-orange-600 font-bold hover:underline underline-offset-4">Log in</a>
                  </p>
               </div>
            </div>

            <div className="absolute bottom-6 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
               © 2025 StratEngine Inc.
            </div>
         </div>

         {/* RIGHT SIDE (FIXED & FULL HEIGHT) */}
         <DashboardPreview />
      </div>
   );
}
