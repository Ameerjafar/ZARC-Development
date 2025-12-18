"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Box,
  Plus,
  Trash2,
  X,
  AlertTriangle,
  ArrowLeft,
  Search,
  CheckCircle2,
  LayoutGrid
} from "lucide-react";

// --- INITIAL DATA ---
const INITIAL_MODULES = [
  { id: "m1", name: "Web Scraper", type: "Core" },
  { id: "m2", name: "Sentiment Engine", type: "AI" },
  { id: "m3", name: "Price Monitor", type: "Analytics" },
  { id: "m4", name: "SERP Tracking", type: "SEO" },
];

const INITIAL_INDUSTRIES = [
  { id: "i1", name: "E-Commerce & Retail", color: "bg-orange-500", activeModules: ["m1", "m3"] },
  { id: "i2", name: "Financial Services", color: "bg-blue-500", activeModules: ["m2", "m4"] },
  { id: "i3", name: "Healthcare & Pharma", color: "bg-emerald-500", activeModules: ["m1"] },
  { id: "i4", name: "Real Estate", color: "bg-indigo-500", activeModules: ["m1", "m3", "m4"] },
];

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`bg-white rounded-3xl border border-slate-100 shadow-xl shadow-orange-500/5 ${className}`}
  >
    {children}
  </motion.div>
);

export default function TaxonomyPage() {
  const [industries, setIndustries] = useState(INITIAL_INDUSTRIES);
  const [modules, setModules] = useState(INITIAL_MODULES);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Inputs
  const [newIndustryName, setNewIndustryName] = useState("");
  const [newModuleName, setNewModuleName] = useState("");

  // Deletion Logic State
  const [deleteScopeIndustry, setDeleteScopeIndustry] = useState("none");
  const [deleteScopeModule, setDeleteScopeModule] = useState("none");

  // Handlers
  const addIndustry = () => {
    if (!newIndustryName.trim()) return;
    const colors = ["bg-orange-500", "bg-blue-500", "bg-emerald-500", "bg-indigo-500", "bg-rose-500"];
    setIndustries(prev => [...prev, { 
      id: Math.random().toString(), 
      name: newIndustryName, 
      color: colors[Math.floor(Math.random() * colors.length)],
      activeModules: modules.map(m => m.id)
    }]);
    setNewIndustryName("");
  };

  const addModule = () => {
    if (!newModuleName.trim()) return;
    const newId = Math.random().toString();
    setModules(prev => [...prev, { id: newId, name: newModuleName, type: "Custom" }]);
    setIndustries(prev => prev.map(ind => ({ ...ind, activeModules: [...ind.activeModules, newId] })));
    setNewModuleName("");
  };

  const executeDeletion = () => {
    if (deleteScopeIndustry === "all" && deleteScopeModule === "all") {
        setIndustries([]); setModules([]);
    } else if (deleteScopeIndustry === "none" && deleteScopeModule === "all") {
        setModules([]); setIndustries(prev => prev.map(i => ({ ...i, activeModules: [] })));
    } else if (deleteScopeIndustry === "all" && deleteScopeModule === "none") {
        setIndustries([]);
    } else if (deleteScopeIndustry !== "all" && deleteScopeIndustry !== "none" && deleteScopeModule === "all") {
        setIndustries(prev => prev.filter(i => i.id !== deleteScopeIndustry));
    } else if (deleteScopeIndustry === "all" && deleteScopeModule !== "all" && deleteScopeModule !== "none") {
        setModules(prev => prev.filter(m => m.id !== deleteScopeModule));
        setIndustries(prev => prev.map(i => ({ ...i, activeModules: i.activeModules.filter(mId => mId !== deleteScopeModule) })));
    } else if (deleteScopeIndustry !== "all" && deleteScopeIndustry !== "none" && deleteScopeModule !== "all" && deleteScopeModule !== "none") {
        setIndustries(prev => prev.map(i => {
            if (i.id === deleteScopeIndustry) return { ...i, activeModules: i.activeModules.filter(mId => mId !== deleteScopeModule) };
            return i;
        }));
    }
    setDeleteScopeIndustry("none");
    setDeleteScopeModule("none");
    setIsDeleteModalOpen(false);
  };

  const getActionText = () => {
    if (deleteScopeIndustry === "all" && deleteScopeModule === "all") return "Delete Everything (Reset)";
    if (deleteScopeIndustry === "all" && deleteScopeModule !== "none") return `Delete Module Globally`;
    if (deleteScopeModule === "all" && deleteScopeIndustry !== "none") return `Delete Industry`;
    if (deleteScopeIndustry !== "none" && deleteScopeModule !== "none") return `Unlink Module from Industry`;
    return "Select options above";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 font-sans text-slate-900 p-8">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-orange-500 transition-colors">
               <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
               <h1 className="text-4xl font-black tracking-tight text-slate-900">Taxonomy Manager</h1>
               <p className="text-slate-500 font-bold mt-1">Configure platform verticals and capabilities</p>
            </div>
         </div>
         <button 
           onClick={() => setIsDeleteModalOpen(true)}
           className="px-6 py-3 bg-white border-2 border-slate-100 text-slate-700 hover:border-red-100 hover:text-red-600 hover:bg-red-50 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-sm"
         >
            <Trash2 className="w-4 h-4" /> Bulk Management
         </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* Industries Column */}
         <Card className="flex flex-col h-[600px] overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-gradient-to-b from-white to-slate-50/50">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Tag className="w-5 h-5" /></div>
                  <h2 className="text-xl font-extrabold text-slate-900">Industries</h2>
               </div>
               <p className="text-xs font-bold text-slate-400">Target verticals defined in the system</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
               <AnimatePresence>
                  {industries.map((ind) => (
                     <motion.div 
                       key={ind.id}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                       className="group p-4 rounded-2xl border border-slate-100 bg-white hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
                     >
                        <div className="flex justify-between items-center mb-3">
                           <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${ind.color} shadow-sm`} />
                              <span className="font-bold text-slate-800">{ind.name}</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded-md">{ind.activeModules.length} modules</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           {ind.activeModules.map(mId => {
                              const m = modules.find(mod => mod.id === mId);
                              return m ? (
                                 <span key={mId} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-md border border-slate-100 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-green-500" /> {m.name}
                                 </span>
                              ) : null
                           })}
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
               <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={newIndustryName}
                    onChange={(e) => setNewIndustryName(e.target.value)}
                    placeholder="New industry name..."
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                  <button onClick={addIndustry} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-slate-900/10">
                     <Plus className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </Card>

         {/* Modules Column */}
         <Card className="flex flex-col h-[600px] overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-gradient-to-b from-white to-slate-50/50">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Box className="w-5 h-5" /></div>
                  <h2 className="text-xl font-extrabold text-slate-900">Modules</h2>
               </div>
               <p className="text-xs font-bold text-slate-400">Functional capabilities available globally</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
               <AnimatePresence>
                  {modules.map((mod) => (
                     <motion.div 
                       key={mod.id}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                       className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                     >
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <LayoutGrid className="w-5 h-5" />
                           </div>
                           <div>
                              <div className="font-bold text-slate-800">{mod.name}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{mod.type}</div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
               <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={newModuleName}
                    onChange={(e) => setNewModuleName(e.target.value)}
                    placeholder="New module name..."
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <button onClick={addModule} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10">
                     <Plus className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </Card>

      </div>

      {/* --- SMART DELETION MODAL --- */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" onClick={() => setIsDeleteModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden border border-slate-100">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div><h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><Trash2 className="w-5 h-5 text-red-500" /> Taxonomy Operations</h3><p className="text-xs font-bold text-slate-400">Advanced deletion & unlinking</p></div>
                <button onClick={() => setIsDeleteModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-8 space-y-6">
                 <div className="bg-orange-50 p-4 rounded-xl flex gap-3 border border-orange-100">
                    <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
                    <p className="text-xs text-orange-800 font-medium">Define your scope below. You can delete global definitions or simply unlink modules from specific industries.</p>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Industry Scope</label>
                        <select value={deleteScopeIndustry} onChange={(e) => setDeleteScopeIndustry(e.target.value)} className={`w-full p-3 rounded-xl border-2 text-sm font-bold outline-none transition-all cursor-pointer ${deleteScopeIndustry === 'all' ? 'border-red-200 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-700 focus:border-orange-500'}`}>
                            <option value="none">-- Select Industry --</option>
                            <option value="all" className="text-red-600 font-black">⚠ ALL INDUSTRIES</option>
                            <optgroup label="Specific Industries">{industries.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}</optgroup>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Module Target</label>
                        <select value={deleteScopeModule} onChange={(e) => setDeleteScopeModule(e.target.value)} className={`w-full p-3 rounded-xl border-2 text-sm font-bold outline-none transition-all cursor-pointer ${deleteScopeModule === 'all' ? 'border-red-200 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-700 focus:border-orange-500'}`}>
                            <option value="none">-- Select Module --</option>
                            <option value="all" className="text-red-600 font-black">⚠ ALL MODULES</option>
                            <optgroup label="Specific Modules">{modules.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</optgroup>
                        </select>
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Action:</span>
                    <span className="text-sm font-black text-slate-900">{getActionText()}</span>
                 </div>

                 <button onClick={executeDeletion} disabled={deleteScopeIndustry === "none" && deleteScopeModule === "none"} className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${deleteScopeIndustry === "none" && deleteScopeModule === "none" ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-500/20 active:scale-95'}`}>
                    <Trash2 className="w-4 h-4" /> Confirm Action
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
