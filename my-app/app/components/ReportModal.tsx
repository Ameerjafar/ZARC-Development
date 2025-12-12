"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BarChart2,
  Layers,
  Zap,
  CheckCircle2,
  FileText,
  ArrowRight,
} from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
  const router = useRouter();
  const [view, setView] = useState<"form" | "preview">("form");
  const [industry, setIndustry] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Added "Energy & Solar" to support your specific use case
  const industries = [
    "Fintech",
    "E-commerce",
    "Healthcare",
    "SaaS",
    "Real Estate",
    "Energy & Solar",
  ];

  const modules = [
    {
      id: "market",
      label: "Market Analysis",
      icon: <BarChart2 className="w-4 h-4" />,
    },
    {
      id: "competitor",
      label: "Competitor Intel",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: "growth",
      label: "Growth Strategy",
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (!industry) return; // simple validation
    setLoading(true);

    // Simulate AI Generation delay
    setTimeout(() => {
      setLoading(false);
      setView("preview"); // Switch to preview view instead of closing
    }, 1500);
  };

  const handleGoToDashboard = () => {
    onClose();
    // Create query string
    const params = new URLSearchParams();
    if (industry) params.set("industry", industry);
    if (selectedModules.length)
      params.set("modules", selectedModules.join(","));

    // Push to report page with data
    router.push(`/report?${params.toString()}`);
  };

  // Dynamic Content Generator
  const getGeneratedContent = () => {
    const isSolar = industry === "Energy & Solar";
    const hasCompetitor = selectedModules.includes("competitor");

    if (isSolar && hasCompetitor) {
      return (
        <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
          <p>
            <strong className="text-white">Executive Summary:</strong> The solar
            energy landscape is currently undergoing a rapid consolidation phase
            (Q4 2025). Our analysis indicates that while residential adoption
            has slowed by 4% due to interest rate volatility, commercial
            installations have surged by 18%. Key competitors like{" "}
            <span className="text-blue-400">SunRun</span> and{" "}
            <span className="text-blue-400">Tesla Energy</span> are aggressively
            pivoting towards integrated battery storage solutions to combat grid
            instability.
          </p>
          <p>
            Competitor pricing strategies have shifted from hardware-cost
            dominance to "Energy-as-a-Service" subscription models. Data
            suggests that new entrants focusing on high-efficiency perovskite
            panels are gaining traction in the European market, threatening
            legacy silicon-based manufacturers.
          </p>
          <p className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg text-blue-200 text-xs">
            <strong>AI Insight:</strong> 64% of your identified competitors are
            currently under-investing in VPP (Virtual Power Plant) software
            compatibility. This represents a high-value gap for immediate market
            entry.
          </p>
        </div>
      );
    }

    // Generic fallback for other selections
    return (
      <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
        <p>
          <strong className="text-white">Market Overview:</strong> The selected{" "}
          {industry} sector is showing strong resilience with a projected CAGR
          of 8.5% over the next fiscal year. Initial data processing suggests
          that customer acquisition costs (CAC) have risen by 12%, necessitating
          a shift in your outbound marketing strategy.
        </p>
        <p>
          {selectedModules.includes("growth")
            ? "Our growth module has identified three under-served micro-niches with high intent-to-buy signals. Leveraging automated personalization could unlock a 15% revenue uplift within 6 months."
            : "The analysis highlights a significant opportunity in supply chain optimization. Competitors are currently facing 3-week delays in fulfillment, which you can capitalize on through localized warehousing."}
        </p>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-lg bg-[#0f0f11] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {view === "form" ? "Generate Report" : "Report Ready"}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {view === "form"
                      ? "Configure your parameters."
                      : "AI Analysis Complete"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Switcher */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {view === "form" ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6 space-y-6 overflow-y-auto custom-scrollbar max-h-[60vh]"
                    >
                      {/* Form Inputs */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300">
                          Industry
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {industries.map((ind) => (
                            <button
                              key={ind}
                              onClick={() => setIndustry(ind)}
                              className={`px-4 py-3 text-sm text-left rounded-xl border transition-all ${
                                industry === ind
                                  ? "bg-blue-600/10 border-blue-500 text-blue-400"
                                  : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                              }`}
                            >
                              {ind}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300">
                          Modules
                        </label>
                        <div className="space-y-2">
                          {modules.map((mod) => {
                            const isSelected = selectedModules.includes(mod.id);
                            return (
                              <div
                                key={mod.id}
                                onClick={() => toggleModule(mod.id)}
                                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-blue-600/10 border-blue-500/50"
                                    : "bg-white/5 border-white/5 hover:bg-white/10"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`p-2 rounded-lg ${
                                      isSelected
                                        ? "bg-blue-500 text-white"
                                        : "bg-white/10 text-gray-400"
                                    }`}
                                  >
                                    {mod.icon}
                                  </div>
                                  <span
                                    className={
                                      isSelected
                                        ? "text-white"
                                        : "text-gray-400"
                                    }
                                  >
                                    {mod.label}
                                  </span>
                                </div>
                                {isSelected && (
                                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Context Textarea */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300">
                          Context
                        </label>
                        <textarea
                          className="w-full h-24 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none"
                          placeholder="Specific requirements..."
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-6 space-y-6"
                    >
                      {/* AI Generated Preview Content */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                          <FileText className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">
                            Initial Findings
                          </h4>
                          <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/20">
                            {industry}
                          </span>
                        </div>
                      </div>

                      {getGeneratedContent()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                {view === "form" ? (
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !industry}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing Data...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Generate Report
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleGoToDashboard}
                    className="w-full py-3.5 px-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98] flex justify-center items-center gap-2 group"
                  >
                    View Full Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
