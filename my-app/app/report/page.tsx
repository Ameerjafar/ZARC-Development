"use client";

import React, { useState, useMemo } from "react";
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
  Tag
} from "lucide-react";
import Link from "next/link";

// --- Types ---
interface Option {
  id: string;
  label: string;
  category?: string;
}

// --- Mock Large Datasets ---
const ALL_INDUSTRIES: Option[] = [
  { id: "solar", label: "Solar Energy" },
  { id: "fintech", label: "Fintech Payments" },
  { id: "saas_b2b", label: "B2B SaaS" },
  { id: "ecommerce_fashion", label: "E-commerce (Fashion)" },
  { id: "biotech", label: "Biotechnology" },
  { id: "real_estate", label: "Commercial Real Estate" },
  { id: "ev", label: "Electric Vehicles" },
  { id: "cybersec", label: "Cybersecurity" },
  { id: "agritech", label: "Agritech" },
  { id: "gaming", label: "Gaming & Esports" },
  { id: "healthtech", label: "HealthTech & Telemedicine" },
  { id: "logistics", label: "Logistics & Supply Chain" },
  { id: "edtech", label: "Educational Technology" },
  { id: "proptech", label: "PropTech" },
  { id: "insurtech", label: "InsurTech" },
  { id: "clean_energy", label: "Clean Energy & Renewables" },
  { id: "ai_ml", label: "Artificial Intelligence (AI/ML)" },
  { id: "blockchain", label: "Blockchain & Web3" },
  { id: "robotics", label: "Robotics & Automation" },
  { id: "iot", label: "Internet of Things (IoT)" },
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
  { id: "social_sentiment", label: "Social Sentiment Analysis", category: "Digital" },
  { id: "ma_activity", label: "M&A Recent Activity", category: "Finance" },
  { id: "vc_funding", label: "VC Funding Trends", category: "Finance" },
  { id: "tech_stack", label: "Technology Stack Analysis", category: "Tech" },
  { id: "talent_pool", label: "Talent & Hiring Trends", category: "HR" },
  { id: "esg_score", label: "ESG Scoring & Compliance", category: "Sustainability" },
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-gray-900">10k+</div>
            <div className="text-sm text-gray-500 font-medium">Industries Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-500 font-medium">Data Modules</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">0.2s</div>
            <div className="text-sm text-gray-500 font-medium">Generation Speed</div>
          </div>
        </motion.div>
      </main>

      <ReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// --- Enhanced Modal Component ---
const ReportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<"industry" | "modules" | "generating" | "complete">("industry");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<Option | null>(null);
  const [selectedModules, setSelectedModules] = useState<Option[]>([]);
  
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
    setStep("generating");
    await new Promise(r => setTimeout(r, 2000)); 

    const docChildren: Paragraph[] = [];

    // Title Page
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

    // Modules Content
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
    setStep("complete");
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
            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-3xl bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-orange-500/10 flex flex-col overflow-hidden h-[85vh]">
              
              {/* Header */}
              <div className="flex-none px-8 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {step === "industry" ? "Select Industry" : 
                     step === "modules" ? "Customize Report" : 
                     step === "generating" ? "Processing" : "Ready"}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {step === "industry" && "Search across 1,000+ market sectors"}
                    {step === "modules" && `Targeting: ${selectedIndustry?.label}`}
                  </p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content - Scrollable Area */}
              <div className="flex-1 overflow-hidden flex flex-col relative bg-white">
                
                {/* STEP 1: INDUSTRY */}
                {step === "industry" && (
                  <div className="flex flex-col h-full">
                    <div className="flex-none p-6 border-b border-gray-50">
                      <div className="relative">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input 
                          autoFocus
                          type="text" 
                          placeholder="Type to find industry..." 
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-lg focus:ring-2 focus:ring-orange-500/20 outline-none"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                      {filteredIndustries.map(ind => (
                        <button
                          key={ind.id}
                          onClick={() => {
                            setSelectedIndustry(ind);
                            setSearchQuery("");
                            setStep("modules");
                          }}
                          className="w-full text-left px-6 py-4 hover:bg-orange-50 rounded-lg group flex items-center justify-between transition-colors border-b border-gray-50 last:border-0"
                        >
                          <span className="text-gray-700 font-medium text-lg">{ind.label}</span>
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: MODULES */}
                {step === "modules" && (
                  <div className="flex flex-col h-full">
                    
                    {/* Fixed Top Section: Tags + Search */}
                    <div className="flex-none border-b border-gray-100 bg-white z-10">
                      {/* Active Tags */}
                      {selectedModules.length > 0 && (
                        <div className="px-6 py-4 bg-orange-50/50 border-b border-orange-100 flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                           {selectedModules.map(mod => (
                             <motion.span 
                               key={mod.id}
                               initial={{ scale: 0.8, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-orange-200 rounded-full text-sm font-medium text-orange-700 shadow-sm"
                             >
                               {mod.label}
                               <button 
                                 onClick={(e) => { e.stopPropagation(); removeModule(mod.id); }}
                                 className="hover:bg-orange-100 rounded-full p-0.5 transition-colors"
                               >
                                 <X className="w-3 h-3" />
                               </button>
                             </motion.span>
                           ))}
                        </div>
                      )}

                      {/* Search Bar */}
                      <div className="p-6">
                        <div className="relative">
                          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                          <input 
                            autoFocus
                            type="text" 
                            placeholder="Search 1,000+ data modules..." 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Scrollable Module List */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                      <div className="grid grid-cols-1 gap-2 pb-4">
                        {filteredModules.map(mod => {
                          const isSelected = selectedModules.some(m => m.id === mod.id);
                          return (
                            <button
                              key={mod.id}
                              onClick={() => toggleModule(mod)}
                              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                                isSelected 
                                  ? "bg-orange-50 border-orange-500 shadow-sm" 
                                  : "bg-white border-gray-100 hover:border-orange-200 hover:shadow-sm"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isSelected ? "bg-orange-200 text-orange-700" : "bg-gray-100 text-gray-500"}`}>
                                  <Tag className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className={`font-semibold ${isSelected ? "text-orange-900" : "text-gray-700"}`}>{mod.label}</div>
                                  <div className="text-xs text-gray-400">{mod.category}</div>
                                </div>
                              </div>
                              {isSelected && <Check className="w-5 h-5 text-orange-500" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Fixed Footer Buttons */}
                    <div className="flex-none p-6 border-t border-gray-100 bg-white flex justify-between items-center z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                      <button 
                        onClick={() => setStep("industry")} 
                        className="text-gray-400 hover:text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={generateDOCX}
                        disabled={selectedModules.length === 0}
                        className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center gap-2"
                      >
                         Generate Report <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEPS 3 & 4 (Processing/Complete) */}
                {(step === "generating" || step === "complete") && (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/30">
                     {step === "generating" ? (
                       <div className="relative mb-8">
                         <div className="w-24 h-24 rounded-full border-[6px] border-orange-100 border-t-orange-500 animate-spin" />
                         <Zap className="w-8 h-8 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                       </div>
                     ) : (
                       <motion.div 
                         initial={{ scale: 0.5, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl"
                       >
                         <Check className="w-12 h-12 text-green-600" />
                       </motion.div>
                     )}
                     
                     <h3 className="text-3xl font-bold text-gray-900 mb-2">
                       {step === "generating" ? "Synthesizing Data..." : "Report Ready!"}
                     </h3>
                     <p className="text-gray-500 max-w-sm mx-auto text-lg">
                       {step === "generating" 
                         ? `Processing ${selectedModules.length} selected modules for the ${selectedIndustry?.label} sector.` 
                         : "Your custom intelligence report has been downloaded successfully."}
                     </p>

                     {step === "complete" && (
                       <button 
                         onClick={() => {
                           setStep("industry");
                           setSearchQuery("");
                           setSelectedModules([]);
                         }}
                         className="mt-10 px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
                       >
                         Create Another Report
                       </button>
                     )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
