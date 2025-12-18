"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import CreateReportModal from "../components/ReportModal"; // Import the reusable component

export default function ReportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-900 selection:bg-orange-200">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-300/20 rounded-full blur-[100px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 h-screen flex flex-col justify-center items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-200 shadow-sm text-orange-600 text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            <span>Enterprise Intelligence Engine</span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Global Market</span> <br />
            Insights Instantly.
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Access over 5,000+ industry data points. Build custom reports with our modular AI engine. Export to DOCX in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2 text-lg"
            >
              <FileText className="w-5 h-5" />
              Generate Report
            </motion.button>
            
            <Link 
              href="/reports-history"
              className="px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-2xl transition-all shadow-sm flex items-center gap-2 text-lg"
            >
              View Library
            </Link>
          </div>
        </motion.div>
      </main>
      <CreateReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
