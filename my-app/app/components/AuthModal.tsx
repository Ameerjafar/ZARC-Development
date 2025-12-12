"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  initialMode: "signin" | "signup";
  onClose: () => void;
}

export const AuthModal = ({ isOpen, initialMode, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  // Update mode if prop changes while open (optional, usually state is internal)
  React.useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [initialMode, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md bg-[#0f0f11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/5">
                <h2 className="text-xl font-semibold text-white">
                  {mode === "signin" ? "Welcome Back" : "Create Account"}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                {mode === "signup" && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-400 uppercase">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="name@company.com" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input type="password" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="••••••••" />
                  </div>
                </div>

                <button className="w-full mt-4 bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
                  {mode === "signin" ? "Sign In" : "Sign Up"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Footer Toggle */}
              <div className="p-4 bg-white/5 text-center text-sm text-gray-400 border-t border-white/5">
                {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {mode === "signin" ? "Sign Up" : "Log In"}
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
