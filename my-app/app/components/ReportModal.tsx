"use client";

import { useState, useMemo } from "react";
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
  Building2,
  Grid,
  Loader2,
  CheckCircle2,
  LayoutDashboard,
  Plus,
  ArrowRight,
  BarChart3,
  Tag,
  Box,
  Globe2,
  Cpu,
  ShieldCheck
} from "lucide-react";

// --- Types ---
interface Option {
  id: string;
  label: string;
  category?: string;
  icon?: any;
}

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_INDUSTRIES: Option[] = [
  { id: "solar", label: "Solar Energy", icon: Zap },
  { id: "fintech", label: "Fintech Payments", icon: BarChart3 },
  { id: "saas_b2b", label: "B2B SaaS", icon: LayoutDashboard },
  { id: "ecommerce_fashion", label: "E-commerce (Fashion)", icon: Tag },
  { id: "biotech", label: "Biotechnology", icon: Box },
  { id: "real_estate", label: "Commercial Real Estate", icon: Building2 },
  { id: "cybersec", label: "Cybersecurity", icon: ShieldCheck },
  { id: "agritech", label: "Agritech", icon: Globe2 },
  { id: "gaming", label: "Gaming & Esports", icon: Cpu },
];


const ALL_MODULES: Option[] = [
  { id: "tam_sam_som", label: "Market Size (TAM/SAM/SOM)", category: "Market" },
  { id: "growth_forecast", label: "5-Year Growth Forecast", category: "Market" },
  { id: "swot", label: "SWOT Analysis", category: "Strategy" },
  { id: "pestle", label: "PESTLE Framework", category: "Strategy" },

  { id: "competitor_pricing", label: "Competitor Pricing Matrix", category: "Competitor" },
  { id: "feature_gap", label: "Feature Gap Analysis", category: "Competitor" },
  { id: "market_share", label: "Market Share Breakdown", category: "Competitor" },

  { id: "customer_persona", label: "Customer Personas", category: "Consumer" },
  { id: "sentiment_analysis", label: "Brand Sentiment Analysis", category: "Consumer" },
  
  { id: "ma_activity", label: "Recent M&A Activity", category: "Finance" },
  { id: "funding_trends", label: "VC Funding Trends", category: "Finance" },

  { id: "seo_gap", label: "SEO Keyword Gap", category: "Digital" },
  { id: "tech_stack", label: "Technology Stack Intel", category: "Tech" },
  { id: "app_ratings", label: "Mobile App Performance", category: "Digital" },

  { id: "regulatory", label: "Regulatory Landscape", category: "Legal" },
  { id: "supply_chain", label: "Supply Chain Risks", category: "Ops" },
  { id: "patent_landscape", label: "Patent & IP Landscape", category: "R&D" },
];

const SECTION_CONTENT: Record<string, string[]> = {
  default: [
    "Market consolidation is accelerating, with larger players acquiring innovative startups.",
    "Customer acquisition costs (CAC) have increased by approximately 12% in the last fiscal year.",
    "Emerging regulatory frameworks are creating new compliance barriers for entrants.",
    "Digital-first adoption is becoming the primary driver of revenue growth across the sector.",
  ],
};

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] bg-slate-900 text-white border border-slate-800"
  >
    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    <span className="font-bold text-sm">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

export default function CreateReportModal({ isOpen, onClose }: CreateReportModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<Option | null>(null);
  const [selectedModules, setSelectedModules] = useState<Option[]>([]);
  const [showToast, setShowToast] = useState(false);

  const steps = [
    { label: "Select Industry", description: "Choose market sector", icon: Building2 },
    { label: "Choose Modules", description: "Select data points", icon: Grid },
    { label: "Synthesizing", description: "AI processing...", icon: Loader2 },
    { label: "Ready", description: "Download complete", icon: CheckCircle2 },
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

  const toggleModule = (mod: Option) => {
    setSelectedModules((prev) => {
      const exists = prev.find((m) => m.id === mod.id);
      if (exists) return prev.filter((m) => m.id !== mod.id);
      return [...prev, mod];
    });
  };

  const generateDOCX = async () => {
    setCurrentStep(2); 
    await new Promise((r) => setTimeout(r, 2000)); 

    const docChildren: Paragraph[] = [];
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

    selectedModules.forEach((mod) => {
      docChildren.push(
        new Paragraph({
          text: mod.label.toUpperCase(),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
          run: { color: "ED7D31" },
        })
      );
      SECTION_CONTENT.default.forEach((text) => {
        docChildren.push(new Paragraph({ children: [new TextRun(text)], spacing: { after: 120 } }));
      });
    });

    const doc = new Document({ sections: [{ children: docChildren }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${selectedIndustry?.label.replace(/\s+/g, "_")}_Report.docx`);

    setCurrentStep(3); 
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };
  const resetForm = () => {
    setCurrentStep(0);
    setSearchQuery("");
    setSelectedIndustry(null);
    setSelectedModules([]);
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
              
              {/* --- LEFT SIDEBAR --- */}
              <div className="w-72 bg-slate-50 border-r border-slate-200 p-8 flex flex-col hidden md:flex">
                <div className="mb-10">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-orange-500" /> Report Gen
                  </h2>
                </div>

                {/* Vertical Stepper */}
                <div className="space-y-8 relative">
                   {/* Connecting Line */}
                   <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200" />
                   <div 
                     className="absolute left-[19px] top-4 w-0.5 bg-orange-500 transition-all duration-500"
                     style={{ height: `${Math.min(currentStep, steps.length - 1) * 25}%` }} 
                   />

                  {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    const Icon = step.icon;

                    return (
                      <div key={index} className="flex items-start gap-4 relative z-10">
                        <div
                          className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all 
                            ${isActive
                              ? "bg-orange-500 border-orange-500 text-white shadow-lg scale-110"
                              : isCompleted
                              ? "bg-white border-orange-500 text-orange-500"
                              : "bg-white border-slate-200 text-slate-300"
                            }`}
                        >
                          {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <div className={`mt-1 ${isActive ? "opacity-100" : "opacity-60"}`}>
                          <h4 className="text-sm font-bold text-slate-900">{step.label}</h4>
                          <p className="text-xs text-slate-500">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* --- RIGHT CONTENT AREA --- */}
              <div className="flex-1 flex flex-col bg-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* STEP 0: INDUSTRY SELECTION */}
                {currentStep === 0 && (
                  <div className="flex flex-col h-full p-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Select Industry</h2>
                    <p className="text-slate-500 mb-8">Which market sector are you analyzing?</p>
                    
                    <div className="relative mb-6">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search industries..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-orange-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2">
                      {filteredIndustries.map((ind) => {
                         const Icon = ind.icon || Building2;
                         return (
                          <button
                            key={ind.id}
                            onClick={() => {
                              setSelectedIndustry(ind);
                              setSearchQuery("");
                              setCurrentStep(1);
                            }}
                            className="flex items-center gap-4 p-4 text-left border rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
                          >
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-slate-700 group-hover:text-orange-700">{ind.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 1: MODULE SELECTION */}
                {currentStep === 1 && (
                  <div className="flex flex-col h-full p-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Add Data Modules</h2>
                    <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
                      Sector: <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{selectedIndustry?.label}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-auto overflow-y-auto pr-2 pb-4">
                      {filteredModules.map((mod) => {
                        const isSelected = selectedModules.some((m) => m.id === mod.id);
                        return (
                          <button
                            key={mod.id}
                            onClick={() => toggleModule(mod)}
                            className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                              isSelected ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "hover:border-orange-300"
                            }`}
                          >
                            <div>
                              <div className="font-bold text-sm text-slate-800">{mod.label}</div>
                              <div className="text-[10px] uppercase font-bold text-slate-400">{mod.category}</div>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-between pt-6 border-t mt-4">
                      <button onClick={() => setCurrentStep(0)} className="text-slate-500 font-bold hover:text-slate-800">Back</button>
                      <button
                        onClick={generateDOCX}
                        disabled={selectedModules.length === 0}
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50"
                      >
                        Generate Report <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 & 3: LOADING / SUCCESS */}
                {(currentStep === 2 || currentStep === 3) && (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    {currentStep === 2 ? (
                      <div className="w-20 h-20 border-4 border-slate-100 border-t-orange-500 rounded-full animate-spin mb-6" />
                    ) : (
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                        <Check className="w-10 h-10" />
                      </div>
                    )}
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {currentStep === 2 ? "Generating Intelligence..." : "Report Ready!"}
                    </h3>
                    <p className="text-slate-500 max-w-xs mx-auto mb-8">
                      {currentStep === 2 
                        ? "Synthesizing data points and formatting your DOCX file." 
                        : "Your file has been downloaded successfully."}
                    </p>
                    
                    {currentStep === 3 && (
                      <button onClick={resetForm} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Create Another
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {showToast && <Toast message="Report downloaded successfully!" onClose={() => setShowToast(false)} />}
        </>
      )}
    </AnimatePresence>
  );
}
