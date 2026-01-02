"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Folder, Grid, List, ChevronDown, Check } from "lucide-react";

interface FiltersBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isGroupedView: boolean;
    setIsGroupedView: (val: boolean) => void;
    selectedIndustry: string;
    setSelectedIndustry: (val: string) => void;
    industries: string[];
    isDropdownOpen: boolean;
    setIsDropdownOpen: (val: boolean) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const FiltersBar = ({
    searchQuery,
    setSearchQuery,
    isGroupedView,
    setIsGroupedView,
    selectedIndustry,
    setSelectedIndustry,
    industries,
    isDropdownOpen,
    setIsDropdownOpen,
    viewMode,
    setViewMode,
    dropdownRef,
}: FiltersBarProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200 p-2 mb-10 flex flex-col md:flex-row gap-3 sticky top-6 z-40"
        >
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus:ring-0 outline-none font-medium"
                />
            </div>

            <div className="h-px md:h-auto md:w-px bg-slate-200 mx-2" />

            <div className="flex items-center gap-3 px-2">
                {/* Grouping Toggle */}
                <div className="flex bg-slate-100/50 rounded-xl p-1 border border-slate-200">
                    <button
                        onClick={() => setIsGroupedView(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${!isGroupedView ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <FileText className="w-3.5 h-3.5" />
                        Files
                    </button>
                    <button
                        onClick={() => setIsGroupedView(true)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${isGroupedView ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <Folder className="w-3.5 h-3.5" />
                        Folders
                    </button>
                </div>

                {!isGroupedView && (
                    <>
                        <div className="w-px h-8 bg-slate-200 mx-1"></div>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`
                  pl-4 pr-10 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center border
                  ${isDropdownOpen || selectedIndustry !== 'all'
                                        ? "bg-orange-50 border-orange-200 text-orange-700"
                                        : "bg-white border-slate-200 text-slate-700 hover:border-orange-200"
                                    }
                `}
                            >
                                {selectedIndustry === "all" ? "All Industries" : selectedIndustry}
                                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180 text-orange-500" : "text-slate-400"}`} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-20 p-1"
                                    >
                                        {industries.map((ind) => (
                                            <button
                                                key={ind}
                                                onClick={() => {
                                                    setSelectedIndustry(ind);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`
                          w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between transition-colors
                          ${selectedIndustry === ind
                                                        ? "bg-orange-50 text-orange-700"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                    }
                        `}
                                            >
                                                {ind === "all" ? "All Industries" : ind}
                                                {selectedIndustry === ind && <Check className="w-3.5 h-3.5 text-orange-500" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex bg-slate-100/50 rounded-xl p-1 border border-slate-200">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};
