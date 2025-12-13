"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Mail, 
  Lock, 
  Github, 
  Chrome, 
  Zap,
  CheckCircle2
} from "lucide-react";

// --- Animated Background Component ---
const BackgroundMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Moving Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-700/10 rounded-full blur-[120px]" 
      />
    </div>
  );
};

// --- Custom Input Component ---
const InputField = ({ 
  icon: Icon, 
  type, 
  placeholder, 
  label 
}: { 
  icon: any, 
  type: string, 
  placeholder: string, 
  label: string 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        <motion.div 
          animate={isFocused ? { borderColor: "#f97316", boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.1)" } : { borderColor: "rgba(255,255,255,0.1)", boxShadow: "none" }}
          className="absolute inset-0 rounded-xl border transition-all duration-300 pointer-events-none"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-orange-500' : 'text-slate-500'}`} />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="block w-full pl-11 pr-4 py-3.5 bg-white/5 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:bg-white/10 transition-colors"
        />
      </div>
    </div>
  );
};

// --- Main Page ---
export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4">
      <BackgroundMesh />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[440px]"
      >
        {/* The Card */}
        <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 overflow-hidden">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />

          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20"
            >
              <Zap className="w-7 h-7 text-white fill-white/20" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm">
              Enter your credentials to access the workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <InputField 
                label="Email" 
                type="email" 
                icon={Mail} 
                placeholder="name@work-email.com" 
              />
              <InputField 
                label="Password" 
                type="password" 
                icon={Lock} 
                placeholder="••••••••••••" 
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-slate-600 bg-transparent flex items-center justify-center group-hover:border-slate-500 transition-colors">
                  {/* Fake Checkbox Logic */}
                </div>
                <span className="text-slate-500 group-hover:text-slate-400 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full h-12 bg-white text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Sign In</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500 font-medium uppercase">Or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 h-11 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all text-sm font-medium text-slate-300">
              <Github className="w-4 h-4" />
              GitHub
            </button>
            <button className="flex items-center justify-center gap-2 h-11 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all text-sm font-medium text-slate-300">
              <Chrome className="w-4 h-4" />
              Google
            </button>
          </div>
        </div>

        {/* Bottom Floating Tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 text-xs text-slate-400">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Secure 256-bit Encryption</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default LoginPage;
