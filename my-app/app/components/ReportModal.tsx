"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BarChart2,
  PieChart,
  Target,
  ArrowRight,
  Cpu,
  Globe,
  Zap,
  Check,
  ChevronRight,
  Lock,
  FileDown,
  Sparkles,
  FileText
} from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
  const router = useRouter();
  const [step, setStep] = useState<"config" | "sections" | "generating" | "complete">("config");
  const [industry, setIndustry] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [customContext, setCustomContext] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Industry list
  const industries = [
    { id: "fintech", label: "Fintech", icon: <Lock className="w-5 h-5" /> },
    { id: "ecommerce", label: "E-commerce", icon: <Globe className="w-5 h-5" /> },
    { id: "healthcare", label: "Healthcare", icon: <Zap className="w-5 h-5" /> },
    { id: "saas", label: "SaaS", icon: <Cpu className="w-5 h-5" /> },
    { id: "realestate", label: "Real Estate", icon: <BarChart2 className="w-5 h-5" /> },
    { id: "energy", label: "Energy & Solar", icon: <Zap className="w-5 h-5" /> },
  ];

  const modules = [
    {
      id: "market",
      label: "Market Analysis",
      desc: "TAM, SAM, SOM data",
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      id: "competitor",
      label: "Competitor Intel",
      desc: "Feature comparison",
      icon: <Target className="w-5 h-5" />,
    },
    {
      id: "growth",
      label: "Growth Engine",
      desc: "Conversion tactics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
  ];

  // Available sections for reports
  const reportSections = [
    { id: "executive", label: "Executive Summary", icon: "📊" },
    { id: "market", label: "Market Overview", icon: "🌍" },
    { id: "trends", label: "Key Trends", icon: "📈" },
    { id: "competitor", label: "Competitor Analysis", icon: "🎯" },
    { id: "swot", label: "SWOT Analysis", icon: "⚡" },
    { id: "opportunities", label: "Opportunities & Threats", icon: "🚀" },
    { id: "recommendations", label: "Strategic Recommendations", icon: "💡" },
    { id: "conclusion", label: "Conclusion", icon: "✅" },
  ];

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleSection = (id: string) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGenerateReport = async () => {
    if (!industry || selectedSections.length === 0) return;

    setStep("generating");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would fetch the file here. 
      // For this frontend demo, we simulate a successful URL.
      setDownloadUrl("path/to/generated/report.docx"); 
      
      setTimeout(() => {
        setStep("complete");
        setLoading(false);
      }, 500);

    } catch (error) {
      console.error("Report generation failed:", error);
      setLoading(false);
      setStep("config");
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      alert("Downloading report..."); // Replace with actual download logic
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Light/Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-3xl bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-orange-500/10 flex flex-col overflow-hidden relative max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: CONFIGURATION */}
                  {step === "config" && (
                    <motion.div
                      key="config"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          Create Intelligence Report
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Step 1 of 2: Select your industry and data modules
                        </p>
                      </div>

                      {/* Industry Grid */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Target Industry
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {industries.map((ind) => (
                            <motion.button
                              key={ind.id}
                              whileHover={{ scale: 1.02, backgroundColor: "#FFF7ED" }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setIndustry(ind.id)}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                industry === ind.id
                                  ? "bg-orange-50 border-orange-500 text-orange-700 shadow-sm ring-1 ring-orange-200"
                                  : "bg-white border-gray-200 text-gray-600 hover:border-orange-200 hover:text-orange-600"
                              }`}
                            >
                              <span className={industry === ind.id ? "text-orange-500" : "text-gray-400"}>
                                {ind.icon}
                              </span>
                              {ind.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Modules Cards */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Data Modules
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {modules.map((mod) => {
                            const isSelected = selectedModules.includes(mod.id);
                            return (
                              <motion.div
                                key={mod.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleModule(mod.id)}
                                className={`relative group cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                                  isSelected
                                    ? "bg-orange-50 border-orange-500 shadow-md shadow-orange-100"
                                    : "bg-white border-gray-200 hover:border-orange-200 hover:shadow-sm"
                                }`}
                              >
                                {/* Checkmark Badge */}
                                <div
                                  className={`absolute top-3 right-3 h-5 w-5 rounded-full flex items-center justify-center border transition-all ${
                                    isSelected
                                      ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                                      : "border-gray-200 text-transparent"
                                  }`}
                                >
                                  <Check className="w-3 h-3" />
                                </div>

                                <div
                                  className={`mb-3 transition-colors ${
                                    isSelected
                                      ? "text-orange-600"
                                      : "text-gray-400 group-hover:text-orange-500"
                                  }`}
                                >
                                  {mod.icon}
                                </div>
                                <h3
                                  className={`text-sm font-bold mb-1 ${
                                    isSelected ? "text-gray-900" : "text-gray-700"
                                  }`}
                                >
                                  {mod.label}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight">
                                  {mod.desc}
                                </p>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Next Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep("sections")}
                        disabled={!industry}
                        className="w-full group relative overflow-hidden rounded-xl bg-orange-600 text-white font-bold py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/20"
                      >
                        <span className="flex items-center justify-center gap-2 relative z-10">
                          Next: Select Sections
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </motion.button>
                    </motion.div>
                  )}

                  {/* STEP 2: SECTION SELECTION */}
                  {step === "sections" && (
                    <motion.div
                      key="sections"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          Select Report Sections
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Step 2 of 2: Choose which sections to include
                        </p>
                      </div>

                      {/* Sections Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {reportSections.map((section) => {
                          const isSelected = selectedSections.includes(section.id);
                          return (
                            <motion.div
                              key={section.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => toggleSection(section.id)}
                              className={`relative group cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                                isSelected
                                  ? "bg-orange-50 border-orange-500 shadow-sm"
                                  : "bg-white border-gray-200 hover:border-orange-200 hover:shadow-sm"
                              }`}
                            >
                              {/* Checkmark Badge */}
                              <div
                                className={`absolute top-3 right-3 h-5 w-5 rounded-full flex items-center justify-center border transition-all ${
                                  isSelected
                                    ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                                    : "border-gray-200"
                                }`}
                              >
                                <Check className="w-3 h-3" />
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-xl">{section.icon}</span>
                                <h3
                                  className={`text-sm font-semibold ${
                                    isSelected ? "text-gray-900" : "text-gray-600"
                                  }`}
                                >
                                  {section.label}
                                </h3>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Custom Context */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Custom Context (Optional)
                        </label>
                        <textarea
                          value={customContext}
                          onChange={(e) => setCustomContext(e.target.value)}
                          placeholder="E.g., Focus on Asian markets, B2B only, exclude pricing analysis..."
                          className="w-full h-24 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none transition-all"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStep("config")}
                          className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors border border-transparent"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleGenerateReport}
                          disabled={selectedSections.length === 0}
                          className="flex-[2] py-3 px-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <FileDown className="w-4 h-4" />
                          Generate & Download
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: GENERATING */}
                  {step === "generating" && (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center space-y-8"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="relative"
                      >
                        <div className="w-20 h-20 rounded-full border-[6px] border-orange-100 border-t-orange-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Zap className="w-8 h-8 text-orange-500 fill-orange-500" />
                        </div>
                      </motion.div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Synthesizing Data...
                        </h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">
                          Our AI engine is compiling 5,000+ data points for {industry}...
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="h-full bg-orange-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: COMPLETE */}
                  {step === "complete" && (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-8 text-center py-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl"
                      >
                        <Check className="w-12 h-12 text-green-600" />
                      </motion.div>

                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          Report Ready!
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Your comprehensive market analysis has been generated successfully.
                        </p>
                      </div>

                      {/* Summary Card */}
                      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-left">
                            <p className="text-xs font-semibold text-gray-400 uppercase">Industry</p>
                            <p className="text-gray-900 font-bold capitalize mt-1">
                              {industry}
                            </p>
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-semibold text-gray-400 uppercase">Sections</p>
                            <p className="text-gray-900 font-bold mt-1">
                              {selectedSections.length} included
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleDownload}
                          className="w-full py-4 px-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-lg font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                        >
                          <FileDown className="w-5 h-5" />
                          Download DOCX
                        </motion.button>
                        
                        <button
                          onClick={() => {
                            setStep("config");
                            setIndustry("");
                            setSelectedModules([]);
                            setSelectedSections([]);
                            setCustomContext("");
                          }}
                          className="py-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          Create Another Report
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
