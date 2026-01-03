"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  Grid,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Option } from "../types/reporting";
import { ALL_INDUSTRIES, ALL_MODULES } from "../constants/reporting";
import { Toast } from "./ui/Toast";
import { Stepper } from "./report-modal/Stepper";
import { IndustryStep } from "./report-modal/IndustryStep";
import { ModuleStep } from "./report-modal/ModuleStep";
import { GenerationStep } from "./report-modal/GenerationStep";
import { SuccessStep } from "./report-modal/SuccessStep";

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateReportModal({ isOpen, onClose }: CreateReportModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<Option | null>(null);
  const [selectedModules, setSelectedModules] = useState<Option[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [generatedReportId, setGeneratedReportId] = useState<string | null>(null);

  const router = useRouter();

  const steps = [
    { label: "Select Industry", description: "Choose market sector", icon: Building2 },
    { label: "Choose Modules", description: "Select data points", icon: Grid },
    { label: "Synthesizing", description: "AI processing...", icon: Loader2 },
    { label: "Ready", description: "Report generated", icon: CheckCircle2 },
  ];

  // Filtering Logic
  const filteredIndustries = useMemo(
    () => ALL_INDUSTRIES.filter((ind) => ind.label.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const filteredModules = useMemo(
    () => ALL_MODULES.filter((mod) => mod.label.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  // Auto-select all modules when entering Step 1 (Choose Modules)
  useEffect(() => {
    if (currentStep === 1) {
      // Only auto-select if nothing is selected yet (initial entry)
      if (selectedModules.length === 0) {
        setSelectedModules(ALL_MODULES);
      }
    }
  }, [currentStep]);

  const toggleModule = (mod: Option) => {
    setSelectedModules((prev) => {
      const exists = prev.find((m) => m.id === mod.id);
      if (exists) return prev.filter((m) => m.id !== mod.id);
      return [...prev, mod];
    });
  };

  const selectAllModules = () => {
    setSelectedModules([...ALL_MODULES]);
  };

  const deselectAllModules = () => {
    setSelectedModules([]);
  };

  const startGeneration = async () => {
    setCurrentStep(2); // Go to loading screen

    // Simulate generation delay
    await new Promise((r) => setTimeout(r, 2000));

    // Create report object
    const reportId = crypto.randomUUID();
    const newReport = {
      id: reportId,
      title: `${selectedIndustry?.label || "Market"} Analysis`,
      industry: selectedIndustry?.label || "General",
      createdAt: new Date(),
      fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      status: "completed" as const,
      modules: selectedModules.map(m => m.label)
    };

    // Dynamic import to avoid server-side issues
    const { addReport } = await import("../data/reports");
    addReport(newReport);

    setGeneratedReportId(reportId);
    setCurrentStep(3); // Go to "Ready" screen
    setShowToast(true);
  };

  const handleViewReport = () => {
    if (generatedReportId) {
      onClose();
      router.push(`/report-view/${generatedReportId}`);
    }
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
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex overflow-hidden h-[85vh] border border-slate-100">

              <Stepper currentStep={currentStep} steps={steps} />

              <div className="flex-1 flex flex-col bg-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {currentStep === 0 && (
                  <IndustryStep
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filteredIndustries={filteredIndustries}
                    onSelect={(ind) => {
                      setSelectedIndustry(ind);
                      setSearchQuery("");
                      setCurrentStep(1);
                    }}
                  />
                )}

                {currentStep === 1 && (
                  <ModuleStep
                    selectedIndustry={selectedIndustry}
                    filteredModules={filteredModules}
                    selectedModules={selectedModules}
                    toggleModule={toggleModule}
                    onSelectAll={selectAllModules}
                    onDeselectAll={deselectAllModules}
                    onBack={() => setCurrentStep(0)}
                    onGenerate={startGeneration}
                  />
                )}

                {currentStep === 2 && <GenerationStep />}

                {currentStep === 3 && <SuccessStep onViewReport={handleViewReport} />}
              </div>
            </div>
          </motion.div>

          {showToast && <Toast message="Report generated successfully!" onClose={() => setShowToast(false)} />}
        </>
      )}
    </AnimatePresence>
  );
}
