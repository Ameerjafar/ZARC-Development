"use client";

import React from "react";
import { BarChart2 } from "lucide-react";

interface NavbarProps {
  onOpenAuth: (mode: "signin" | "signup") => void;
}

export const Navbar = ({ onOpenAuth }: NavbarProps) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/10 border-b border-white/5 transition-all duration-300">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
      <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
        <BarChart2 className="text-white w-5 h-5" />
      </div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        NexReport
      </span>
    </div>
    
    <div className="flex items-center gap-4">
      <button 
        onClick={() => onOpenAuth("signin")}
        className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
      >
        Sign In
      </button>
      <button 
        onClick={() => onOpenAuth("signup")}
        className="px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
      >
        Get Started
      </button>
    </div>
  </nav>
);
