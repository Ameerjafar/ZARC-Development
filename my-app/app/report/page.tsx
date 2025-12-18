"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  AlignmentType,
} from "docx";
import {
  X,
  Search,
  Zap,
  Check,
  ChevronRight,
  FileText,
  Sparkles,
  ArrowRight,
  Tag,
  Building2,
  Grid,
  Loader2,
  CheckCircle2,
  LayoutDashboard,
  Plus,
  Box,
  BarChart3,
  Globe2,
  Cpu,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

// --- Types ---
interface Option {
  id: string;
  label: string;
  category?: string;
  icon?: any; 
}

// --- Mock Data ---
const ALL_INDUSTRIES: Option[] = [
  { id: "solar", label: "Solar Energy", icon: Zap },
  { id: "fintech", label: "Fintech Payments", icon: BarChart3 },
  { id: "saas_b2b", label: "B2B SaaS", icon: LayoutDashboard },
  { id: "ecommerce_fashion", label: "E-commerce (Fashion)", icon: Tag },
  { id: "biotech", label: "Biotechnology", icon: Box },
  { id: "real_estate", label: "Commercial Real Estate", icon: Building2 },
  { id: "ev", label: "Electric Vehicles", icon: Zap },
  { id: "cybersec", label: "Cybersecurity", icon: Box },
  { id: "agritech", label: "Agritech", icon: Globe2 },
  { id: "gaming", label: "Gaming & Esports", icon: Cpu },
  { id: "healthtech", label: "HealthTech", icon: Box },
  { id: "logistics", label: "Logistics", icon: Box },
  { id: "clean_energy", label: "Clean Energy", icon: Zap },
  { id: "ai_ml", label: "Artificial Intelligence", icon: Cpu },
  { id: "blockchain", label: "Blockchain & Web3", icon: Box },
];

const ALL_MODULES: Option[] = [
  { id: "tam_sam_som", label: "Market Size (TAM/SAM/SOM)", category: "Market" },
  { id: "swot", label: "SWOT Analysis", category: "Strategy" },
  { id: "pestle", label: "PESTLE Framework", category: "Strategy" },
  { id: "competitor_pricing", label: "Competitor Pricing Matrix", category: "Competitor" },
  { id: "customer_persona", label: "Customer Personas", category: "Consumer" },
  { id: "regulations", label: "Regulatory Landscape", category: "Legal" },
  { id: "supply_chain", label: "Supply Chain Risks", category: "Operations" },
  { id: "seo_gap", label: "SEO Keyword Gap", category: "Digital" },
  { id: "ma_activity", label: "M&A Recent Activity", category: "Finance" },
  { id: "tech_stack", label: "Technology Stack", category: "Tech" },
  { id: "patent_analysis", label: "Patent Landscape", category: "R&D" },
];

const SECTION_CONTENT: Record<string, string[]> = {
  default: [
    "Market consolidation is accelerating, with larger players acquiring innovative startups.",
    "Customer acquisition costs (CAC) have increased by approximately 12% in the last fiscal year.",
    "Digital-first adoption is accelerating across all customer segments.",
    "Most competitors currently under-invest in emerging technologies, creating a gap for disruption.",
  ],
};

// --- Toast Component ---
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'info', onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
    className="fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] bg-slate-900 text-white border border-slate-800"
  >
    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    <span className="font-bold text-sm">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100"><X className="w-4 h-4" /></button>
  </motion.div>
);

// --- Main Page Component ---
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

      <ReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// --- Vertical Stepper Modal Component ---
const ReportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // Steps: 0: Industry, 1: Modules, 2: Generating, 3: Complete
  const [currentStep, setCurrentStep] = useState(0); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<Option | null>(null);
  const [selectedModules, setSelectedModules] = useState<Option[]>([]);
  const [showToast, setShowToast] = useState(false);
  
  // Filtering Logic
  const filteredIndustries = useMemo(() => 
    ALL_INDUSTRIES.filter(ind => ind.label.toLowerCase().includes(searchQuery.toLowerCase())), 
  [searchQuery]);

  const filteredModules = useMemo(() => 
    ALL_MODULES.filter(mod => mod.label.toLowerCase().includes(searchQuery.toLowerCase())), 
  [searchQuery]);

  const toggleModule = (mod: Option) => {
    setSelectedModules(prev => {
      const exists = prev.find(m => m.id === mod.id);
      if (exists) return prev.filter(m => m.id !== mod.id);
      return [...prev, mod];
    });
  };

  const removeModule = (id: string) => {
    setSelectedModules(prev => prev.filter(m => m.id !== id));
  };

  const generateDOCX = async () => {
    setCurrentStep(2); // Move to Generating
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 2500)); 

    const docChildren: Paragraph[] = [];
    // ... Doc Generation Logic ...
    docChildren.push(
      new Paragraph({
        text: "MARKET INTELLIGENCE REPORT",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        run: { size: 32, bold: true, color: "ED7D31" }, 
      }),
      new Paragraph({
        text: (selectedIndustry?.label || "Market").toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        run: { size: 28, bold: true },
      }),
      new Paragraph({
        text: `Generated on ${new Date().toLocaleDateString()}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 800 },
        run: { size: 20, color: "666666" },
      })
    );
    selectedModules.forEach(mod => {
      docChildren.push(
        new Paragraph({
          text: mod.label.toUpperCase(),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
          run: { color: "ED7D31" },
        })
      );
      SECTION_CONTENT.default.forEach(text => {
        docChildren.push(new Paragraph({ children: [new TextRun(text)], spacing: { after: 120 } }));
      });
    });

    const doc = new Document({ sections: [{ children: docChildren }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${selectedIndustry?.label.replace(/\s+/g, "_")}_Report.docx`);
    
    setCurrentStep(3); // Move to Complete

    // Show Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const steps = [
    { label: "Select Industry", description: "Choose market sector", icon: Building2 },
    { label: "Choose Modules", description: "Select data points", icon: Grid },
    { label: "Synthesizing", description: "AI processing...", icon: Loader2 },
    { label: "Ready", description: "Download complete", icon: CheckCircle2 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex overflow-hidden h-[85vh] border border-slate-100">
              
              {/* --- LEFT SIDEBAR: VERTICAL PROGRESS (LIGHT THEME) --- */}
              <div className="w-80 bg-slate-50 border-r border-slate-200 p-8 flex flex-col relative hidden md:flex">
                 
                 <div className="mb-12">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
                       <LayoutDashboard className="w-6 h-6 text-orange-500" />
                       Report Gen
                    </h2>
                    <p className="text-xs text-slate-500 font-bold mt-1 tracking-wide">AI-Powered Market Intelligence</p>
                 </div>

                 {/* Vertical Stepper */}
                 <div className="flex-1 relative">
                    {/* The Background Line */}
                    <div className="absolute left-[19px] top-4 w-0.5 bg-slate-200" style={{ height: `${(steps.length - 1) * 5}rem` }} />
                    
                    {/* The Active Line (Animates Height) */}
                    <div 
                      className="absolute left-[19px] top-4 w-0.5 bg-orange-500 transition-all duration-700 ease-in-out"
                      style={{ height: `${Math.min(currentStep, steps.length - 1) * 5}rem` }} 
                    />

                    <div className="space-y-10 relative z-10">
                       {steps.map((step, index) => {
                          const isActive = index === currentStep;
                          const isCompleted = index < currentStep;
                          const Icon = step.icon;

                          return (
                             <div key={index} className="flex items-start gap-4">
                                {/* Dot/Circle */}
                                <div 
                                  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-500
                                    ${isActive 
                                       ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/50 scale-110" 
                                       : isCompleted 
                                         ? "bg-white border-orange-500 text-orange-500" 
                                         : "bg-white border-slate-200 text-slate-300"
                                    }
                                  `}
                                >
                                   {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                                </div>
                                
                                {/* Label */}
                                <div className={`mt-1 transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-60"}`}>
                                   <h4 className={`text-sm font-bold ${isActive ? "text-slate-900" : isCompleted ? "text-slate-700" : "text-slate-400"}`}>
                                      {step.label}
                                   </h4>
                                   <p className="text-xs text-slate-500 font-medium mt-0.5">{step.description}</p>
                                </div>
                             </div>
                          )
                       })}
                    </div>
                 </div>

                 <div className="mt-auto pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs border border-orange-200">
                          JD
                       </div>
                       <div className="text-xs">
                          <p className="font-bold text-slate-900">John Doe</p>
                          <p className="text-slate-500">Premium Plan</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* --- RIGHT CONTENT AREA --- */}
              <div className="flex-1 flex flex-col bg-white relative">
                 
                 {/* Close Button */}
                 <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all z-20">
                    <X className="w-5 h-5" />
                 </button>

                 {/* Content Container */}
                 <div className="flex-1 overflow-hidden flex flex-col">
                    
                    {/* STEP 1: INDUSTRY */}
                    {currentStep === 0 && (
                      <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex-none px-10 pt-10 pb-4">
                           <h2 className="text-3xl font-black text-slate-900 mb-2">Select Industry</h2>
                           <p className="text-slate-500 text-lg">Which market sector are you analyzing today?</p>
                           
                           <div className="mt-8 relative max-w-md">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input 
                                autoFocus
                                type="text" 
                                placeholder="Search industries..." 
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-base font-medium text-slate-900 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                           </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {filteredIndustries.map(ind => {
                                const Icon = ind.icon || Building2;
                                return (
                                  <button
                                    key={ind.id}
                                    onClick={() => {
                                      setSelectedIndustry(ind);
                                      setSearchQuery("");
                                      setCurrentStep(1); 
                                    }}
                                    className="flex flex-col items-start p-5 bg-white border border-slate-200 rounded-2xl hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 transition-all group text-left"
                                  >
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors text-slate-400">
                                       <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-900 font-bold text-base group-hover:text-orange-600 transition-colors">{ind.label}</span>
                                    <span className="text-slate-400 text-xs mt-1">Generate analysis report</span>
                                  </button>
                                );
                              })}
                           </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: MODULES */}
                    {currentStep === 1 && (
                      <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                         <div className="flex-none px-10 py-8 border-b border-slate-50 bg-white z-10">
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Configure Report</h2>
                            <div className="flex items-center gap-3 text-sm text-slate-500 mb-6">
                               Target Sector: 
                               <div className="flex items-center gap-1.5 font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                                  <Building2 className="w-3.5 h-3.5 text-orange-500" />
                                  {selectedIndustry?.label}
                               </div>
                            </div>

                            <div className="flex gap-4">
                               <div className="relative flex-1">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                  <input 
                                    autoFocus
                                    type="text" 
                                    placeholder="Add data modules..." 
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                  />
                               </div>
                            </div>
                         </div>

                         <div className="flex-1 overflow-y-auto px-10 py-6 custom-scrollbar bg-slate-50/30">
                            
                            {/* Selected Summary */}
                            {selectedModules.length > 0 && (
                               <div className="mb-6 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
                                  {selectedModules.map(mod => (
                                     <span key={mod.id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold shadow-sm">
                                        {mod.label}
                                        <button onClick={() => toggleModule(mod)} className="hover:bg-orange-700 rounded-full p-0.5 transition-colors">
                                           <X className="w-3 h-3" />
                                        </button>
                                     </span>
                                  ))}
                               </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-24">
                               {filteredModules.map(mod => {
                                  const isSelected = selectedModules.some(m => m.id === mod.id);
                                  return (
                                    <button
                                      key={mod.id}
                                      onClick={() => toggleModule(mod)}
                                      className={`text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between group ${
                                        isSelected 
                                          ? "bg-white border-orange-500 ring-1 ring-orange-500 shadow-md" 
                                          : "bg-white border-slate-200 hover:border-orange-300 hover:shadow-sm"
                                      }`}
                                    >
                                      <div>
                                        <div className={`font-bold text-sm ${isSelected ? "text-orange-700" : "text-slate-700"}`}>{mod.label}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-wide">{mod.category}</div>
                                      </div>
                                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                         isSelected ? "bg-orange-500 border-orange-500" : "border-slate-300 group-hover:border-orange-300"
                                      }`}>
                                         {isSelected && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                    </button>
                                  )
                               })}
                            </div>
                         </div>

                         <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
                            <button 
                              onClick={() => setCurrentStep(0)} 
                              className="text-slate-400 hover:text-slate-700 font-bold px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                            >
                              Back
                            </button>
                            <button 
                              onClick={generateDOCX}
                              disabled={selectedModules.length === 0}
                              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 transform active:scale-[0.98]"
                            >
                                Generate Report <ArrowRight className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                    )}

                    {/* STEPS 3 & 4 (Processing/Complete) */}
                    {(currentStep === 2 || currentStep === 3) && (
                      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in-95 duration-500">
                          {currentStep === 2 ? (
                            <div className="relative mb-8">
                              <div className="w-24 h-24 rounded-full border-[6px] border-slate-100 border-t-orange-500 animate-spin" />
                              <Zap className="w-8 h-8 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                            </div>
                          ) : (
                            <motion.div 
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              type="spring"
                              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 border-[6px] border-emerald-50 shadow-xl"
                            >
                              <Check className="w-10 h-10 text-emerald-600" />
                            </motion.div>
                          )}
                          
                          <h3 className="text-3xl font-black text-slate-900 mb-3">
                            {currentStep === 2 ? "Synthesizing Data..." : "Report Ready!"}
                          </h3>
                          <p className="text-slate-500 max-w-sm mx-auto text-sm font-medium leading-relaxed mb-8">
                            {currentStep === 2 
                              ? "Analyzing 50+ data points and structuring your document." 
                              : "Your comprehensive market intelligence report has been successfully generated and opened."}
                          </p>

                          {currentStep === 3 && (
                            <button 
                              onClick={() => {
                                setCurrentStep(0);
                                setSearchQuery("");
                                setSelectedModules([]);
                              }}
                              className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 flex items-center gap-2"
                            >
                              <Plus className="w-5 h-5" />
                              Create Another Report
                            </button>
                          )}
                      </div>
                    )}

                 </div>
              </div>

            </div>
          </motion.div>

          {/* Toast Notification */}
          <AnimatePresence>
            {showToast && (
              <Toast 
                message="Report downloaded successfully!" 
                type="success" 
                onClose={() => setShowToast(false)} 
              />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};
