"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Box,
  Plus,
  Trash2,
  X,
  ArrowLeft,
  Search,
  CheckCircle2,
  LayoutGrid,
  Save,
  Check,
  Edit3,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  FileText,
  Loader2,
  CheckSquare,
  Square
} from "lucide-react";

// --- MOCK DATA GENERATOR ---
const generateData = () => {
  const industries = Array.from({ length: 50 }, (_, i) => ({
    id: `ind-${i}`,
    name: `Industry Sector ${i + 1}`,
    modules: [`mod-${i}`, `mod-${i+1}`]
  }));

  const modules = Array.from({ length: 100 }, (_, i) => ({
    id: `mod-${i}`,
    name: `Module Feature ${i + 1}`,
    type: i % 3 === 0 ? "Core" : i % 3 === 1 ? "AI" : "Analytics",
    description: "Automated data extraction and processing unit."
  }));

  return { industries, modules };
};

const { industries: INITIAL_INDUSTRIES, modules: INITIAL_MODULES } = generateData();

// --- TOAST COMPONENT ---
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
    className={`fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[60] backdrop-blur-md border ${
      type === 'success' 
        ? 'bg-slate-900 text-white border-slate-800' 
        : 'bg-red-500 text-white border-red-600'
    }`}
  >
    {type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-white" />}
    <span className="font-bold text-sm">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100"><X className="w-4 h-4" /></button>
  </motion.div>
);

export default function AddIndustryPage() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  // Data State
  const [industries, setIndustries] = useState(INITIAL_INDUSTRIES);
  const [modules, setModules] = useState(INITIAL_MODULES);

  // Form State
  const [industryName, setIndustryName] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  
  // Search State
  const [moduleSearch, setModuleSearch] = useState("");
  const [industrySearch, setIndustrySearch] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  // Modal State
  const [isNewModuleModalOpen, setIsNewModuleModalOpen] = useState(false);
  const [newModuleForm, setNewModuleForm] = useState({ name: "", type: "Custom", description: "" });
  
  // Toast State
  const [toasts, setToasts] = useState<{id: number, msg: string, type: 'success'|'error'}[]>([]);

  // Drag State
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Report Generation State
  const [generatingReports, setGeneratingReports] = useState<Record<string, boolean>>({});

  // --- HELPERS ---
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- FILTERING & PAGINATION LOGIC ---
  const filteredModules = useMemo(() => {
    const searchLower = moduleSearch.toLowerCase();
    return modules.filter(m => 
      m.name.toLowerCase().includes(searchLower) || 
      m.type.toLowerCase().includes(searchLower) // Added tag searching
    );
  }, [modules, moduleSearch]);

  const filteredIndustries = useMemo(() => {
    return industries.filter(i => 
      i.name.toLowerCase().includes(industrySearch.toLowerCase())
    );
  }, [industries, industrySearch]);

  // Check if all *currently filtered* modules are selected
  const areAllFilteredSelected = useMemo(() => {
    if (filteredModules.length === 0) return false;
    return filteredModules.every(m => selectedModules.includes(m.id));
  }, [filteredModules, selectedModules]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [industrySearch]);

  const paginatedIndustries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredIndustries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredIndustries, currentPage]);

  const totalPages = Math.ceil(filteredIndustries.length / ITEMS_PER_PAGE);

  // --- HANDLERS: MODULES ---
  const toggleModule = (id: string) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (filteredModules.length === 0) return;

    if (areAllFilteredSelected) {
      // Deselect currently filtered modules
      const filteredIds = filteredModules.map(m => m.id);
      setSelectedModules(prev => prev.filter(id => !filteredIds.includes(id)));
    } else {
      // Select all currently filtered modules
      const filteredIds = filteredModules.map(m => m.id);
      setSelectedModules(prev => {
        const newSet = new Set([...prev, ...filteredIds]);
        return Array.from(newSet);
      });
    }
  };

  const handleCreateModule = () => {
    if (!newModuleForm.name.trim()) {
      showToast("Module name is required", "error");
      return;
    }

    const exists = modules.some(m => m.name.toLowerCase() === newModuleForm.name.trim().toLowerCase());
    if (exists) {
      showToast("Module already exists", "error");
      return;
    }

    const newModule = {
      id: `mod-new-${Date.now()}`,
      name: newModuleForm.name.trim(),
      type: newModuleForm.type,
      description: newModuleForm.description || "Custom module created by admin."
    };

    setModules([newModule, ...modules]);
    setIsNewModuleModalOpen(false);
    setNewModuleForm({ name: "", type: "Custom", description: "" });
    setModuleSearch(""); 
  };

  // --- DRAG AND DROP HANDLERS ---
  const handleDragStart = (e: React.DragEvent, moduleId: string) => {
    e.dataTransfer.setData("moduleId", moduleId);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const moduleId = e.dataTransfer.getData("moduleId");
    
    if (moduleId && !selectedModules.includes(moduleId)) {
      setSelectedModules(prev => [...prev, moduleId]);
    }
  };

  // --- HANDLERS: INDUSTRIES (CRUD) ---
  const handleSaveIndustry = () => {
    if (!industryName.trim()) return;

    const nameExists = industries.some(i => 
      i.name.toLowerCase() === industryName.trim().toLowerCase() && i.id !== isEditingId
    );
    
    if (nameExists) {
      showToast("Industry name already exists", "error");
      return;
    }

    if (isEditingId) {
      setIndustries(prev => prev.map(ind => 
        ind.id === isEditingId ? { ...ind, name: industryName, modules: selectedModules } : ind
      ));
      showToast("Industry updated successfully");
    } else {
      const newIndustry = {
        id: `ind-new-${Date.now()}`,
        name: industryName,
        modules: selectedModules
      };
      setIndustries([newIndustry, ...industries]);
      showToast("Industry created successfully");
    }
    
    resetForm();
  };

  const handleEditClick = (industry: any) => {
    setIndustryName(industry.name);
    setSelectedModules(industry.modules);
    setIsEditingId(industry.id);
    setActiveTab("create");
  };

  const handleDeleteIndustry = (id: string) => {
    setIndustries(prev => prev.filter(i => i.id !== id));
    showToast("Industry deleted");
    if (isEditingId === id) resetForm();
  };

  // --- HANDLER: GENERATE REPORT ---
  const handleGenerateReport = (industryId: string, industryName: string) => {
    setGeneratingReports(prev => ({ ...prev, [industryId]: true }));
    showToast(`Generating analysis for ${industryName}...`);

    setTimeout(() => {
      setGeneratingReports(prev => ({ ...prev, [industryId]: false }));
      showToast(`Report for ${industryName} ready for download`, 'success');
    }, 2000);
  };

  const resetForm = () => {
    setIndustryName("");
    setSelectedModules([]);
    setIsEditingId(null);
    setActiveTab("manage");
  };

  const cancelEdit = () => {
    resetForm();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col">
      
      {/* TOAST CONTAINER */}
      <AnimatePresence>
        {toasts.map(t => (
          <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
             <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
             <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
               <Building2 className="w-5 h-5 text-orange-500" /> 
               {isEditingId ? "Edit Industry" : "Industry Manager"}
             </h1>
          </div>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           <button 
             onClick={() => setActiveTab("create")}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "create" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
           >
             {isEditingId ? "Editing..." : "Create New"}
           </button>
           <button 
             onClick={() => setActiveTab("manage")}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "manage" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
           >
             Manage Existing
           </button>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 overflow-hidden flex flex-col">
        
        {activeTab === "create" ? (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
            
            {/* LEFT: Configuration Panel (DROP ZONE) */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-shrink-0">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-lg font-black text-slate-900">1. Industry Details</h2>
                     {isEditingId && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">EDIT MODE</span>}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Industry Name</label>
                      <input 
                        type="text" 
                        value={industryName}
                        onChange={(e) => setIndustryName(e.target.value)}
                        placeholder="e.g. Automotive & Mobility" 
                        className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all" 
                      />
                    </div>
                  </div>
               </div>

               {/* DROP TARGET */}
               <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`bg-white p-6 rounded-2xl border-2 shadow-sm flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isDraggingOver ? 'border-orange-400 bg-orange-50/50 border-dashed scale-[1.01]' : 'border-slate-200 border-solid'}`}
               >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-slate-900">3. Selected Modules</h2>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-bold">
                      {selectedModules.length} Active
                    </span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <AnimatePresence>
                    {selectedModules.length === 0 ? (
                      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="h-full flex flex-col items-center justify-center text-slate-400">
                        <LayoutGrid className={`w-8 h-8 mb-2 ${isDraggingOver ? 'text-orange-500 animate-bounce' : 'opacity-50'}`} />
                        <p className="text-xs font-bold">{isDraggingOver ? "Drop Module Here!" : "Drag & drop modules here"}</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-2">
                        {selectedModules.map(id => {
                          const mod = modules.find(m => m.id === id);
                          if (!mod) return null;
                          return (
                            <motion.div 
                                key={id} 
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm group"
                            >
                              <span className="text-xs font-bold text-slate-700">{mod.name}</span>
                              <button onClick={() => toggleModule(id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 flex gap-3">
                    {isEditingId && (
                      <button 
                        onClick={cancelEdit}
                        className="flex-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-4 rounded-xl transition-all text-sm"
                      >
                        Cancel
                      </button>
                    )}
                    <button 
                      onClick={handleSaveIndustry}
                      disabled={!industryName || selectedModules.length === 0}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 transition-all text-sm flex items-center justify-center gap-2 transform active:scale-[0.98]"
                    >
                      <Save className="w-4 h-4" /> {isEditingId ? "Update Industry" : "Save Industry"}
                    </button>
                  </div>
               </div>
            </div>

            {/* RIGHT: Module Selector (DRAGGABLE SOURCE) */}
            <div className="w-full lg:w-2/3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-black text-slate-900">2. Available Modules</h2>
                    <button 
                      onClick={() => setIsNewModuleModalOpen(true)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors border border-blue-100"
                    >
                      <Plus className="w-4 h-4" /> New Module
                    </button>
                 </div>
                 
                 <div className="flex gap-4">
                   <div className="flex-1 relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input 
                       type="text" 
                       value={moduleSearch}
                       onChange={(e) => setModuleSearch(e.target.value)}
                       placeholder="Search by name or tag..." 
                       className="w-full pl-10 pr-32 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none" 
                     />
                     {/* --- SELECT ALL BUTTON --- */}
                     <button
                        onClick={handleSelectAll}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-2 transition-all shadow-sm"
                     >
                       {areAllFilteredSelected ? (
                         <>
                           <CheckSquare className="w-3.5 h-3.5 text-blue-500" /> All Selected
                         </>
                       ) : (
                         <>
                           <Square className="w-3.5 h-3.5 text-slate-300" /> Select All
                         </>
                       )}
                     </button>
                   </div>
                 </div>
               </div>

               <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/30">
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                   {filteredModules.map((mod) => {
                     const isSelected = selectedModules.includes(mod.id);
                     return (
                       <div 
                         key={mod.id}
                         draggable="true" 
                         onDragStart={(e: any) => handleDragStart(e, mod.id)}
                         onClick={() => toggleModule(mod.id)}
                         className={`cursor-grab active:cursor-grabbing group relative p-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10' : 'border-white bg-white shadow-sm hover:border-blue-200 hover:shadow-md'}`}
                       >
                         <div className="flex justify-between items-start mb-2">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                             {isSelected ? <Check className="w-5 h-5" /> : <Box className="w-4 h-4" />}
                           </div>
                           <div className="flex items-center gap-2">
                             <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${mod.type === 'AI' ? 'bg-purple-100 text-purple-600' : mod.type === 'Core' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                               {mod.type}
                             </span>
                             <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                           </div>
                         </div>
                         <h3 className={`font-bold text-sm ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>{mod.name}</h3>
                         <p className="text-xs text-slate-400 mt-1 line-clamp-2">{mod.description}</p>
                       </div>
                     );
                   })}
                 </div>
               </div>
            </div>

          </div>
        ) : (
          // --- MANAGE TAB (With Pagination) ---
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-140px)]">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900">Existing Industries</h2>
                <div className="w-72 relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <input 
                      type="text" 
                      value={industrySearch}
                      onChange={(e) => setIndustrySearch(e.target.value)}
                      placeholder="Search industries..." 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500/20 outline-none" 
                   />
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50 sticky top-0 z-10">
                   <tr>
                     <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide w-[40%]">Industry Name</th>
                     <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide">Active Modules</th>
                     <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    <AnimatePresence>
                   {paginatedIndustries.map((ind) => (
                     <motion.tr 
                        key={ind.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="hover:bg-slate-50/80 transition-colors group"
                     >
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                             {ind.name.charAt(0)}
                           </div>
                           <span className="font-bold text-slate-900 text-sm">{ind.name}</span>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md text-xs font-bold text-slate-600 border border-slate-200">
                             <Box className="w-3 h-3 text-slate-400" /> {ind.modules.length}
                           </span>
                           <span className="text-[10px] text-slate-400 font-medium truncate max-w-[200px] hidden xl:block">
                              {ind.modules.slice(0, 3).map(mid => modules.find(m => m.id === mid)?.name).join(", ")}
                              {ind.modules.length > 3 ? "..." : ""}
                           </span>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleGenerateReport(ind.id, ind.name)}
                              disabled={generatingReports[ind.id]}
                              className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                              title="Generate Report"
                            >
                              {generatingReports[ind.id] ? (
                                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                              ) : (
                                <FileText className="w-4 h-4" />
                              )}
                            </button>
                            
                            <button 
                              onClick={() => handleEditClick(ind)}
                              className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteIndustry(ind.id)}
                              className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors" title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                       </td>
                     </motion.tr>
                   ))}
                   </AnimatePresence>
                   {paginatedIndustries.length === 0 && (
                     <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-slate-400 font-bold">
                           No industries found.
                        </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>

             {/* PAGINATION FOOTER */}
             <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-bold text-slate-400">
                   Showing {paginatedIndustries.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredIndustries.length)} of {filteredIndustries.length}
                </span>
                <div className="flex items-center gap-2">
                   <button 
                     disabled={currentPage === 1}
                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                     className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                   >
                      <ChevronLeft className="w-4 h-4" />
                   </button>
                   <span className="text-xs font-bold text-slate-600">Page {currentPage} of {totalPages || 1}</span>
                   <button 
                     disabled={currentPage === totalPages || totalPages === 0}
                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                     className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                   >
                      <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* --- MODAL: CREATE NEW MODULE --- */}
      <AnimatePresence>
         {isNewModuleModalOpen && (
            <>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsNewModuleModalOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50" />
               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-100">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                     <h3 className="text-lg font-black text-slate-900">Add New Module</h3>
                     <button onClick={() => setIsNewModuleModalOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-900" /></button>
                  </div>
                  <div className="p-6 space-y-4">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Module Name</label>
                        <input 
                           autoFocus
                           type="text" 
                           value={newModuleForm.name}
                           onChange={(e) => setNewModuleForm({...newModuleForm, name: e.target.value})}
                           placeholder="e.g. Price Intelligence Engine" 
                           className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all" 
                        />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Category</label>
                        <select 
                           value={newModuleForm.type}
                           onChange={(e) => setNewModuleForm({...newModuleForm, type: e.target.value})}
                           className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all appearance-none cursor-pointer"
                        >
                           <option value="Custom">Custom</option>
                           <option value="AI">Artificial Intelligence</option>
                           <option value="Analytics">Analytics</option>
                           <option value="Scraper">Scraper</option>
                        </select>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Description</label>
                        <textarea 
                           value={newModuleForm.description}
                           onChange={(e) => setNewModuleForm({...newModuleForm, description: e.target.value})}
                           rows={3}
                           placeholder="Briefly describe what this module does..." 
                           className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all resize-none" 
                        />
                     </div>
                     <button 
                        onClick={handleCreateModule}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-900/20 mt-2"
                     >
                        Create Module
                     </button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>

    </div>
  );
}
