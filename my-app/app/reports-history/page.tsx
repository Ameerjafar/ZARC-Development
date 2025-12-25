"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Trash2,
  Search,
  Grid,
  List,
  Clock,
  ChevronDown,
  Plus,
  ArrowUpDown,
  ArrowLeft,
  Check,
  Eye,
  Layers // Added Layers icon for the module section
} from "lucide-react";
import Link from "next/link";
import CreateReportModal from '../components/ReportModal';
import { MOCK_REPORTS, Report } from "../data/reports";

export default function ReportsHistoryPage() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  // --- Modal Visibility ---
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const industries = ["all", "E-commerce", "SaaS", "Fintech", "Healthcare", "Energy"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Logic
  const filteredReports = reports
    .filter((report) => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = selectedIndustry === "all" || report.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      if (sortBy === "date") return b.createdAt.getTime() - a.createdAt.getTime();
      return a.title.localeCompare(b.title);
    });

  const handleDelete = (id: string) => {
    setReportToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (reportToDelete) {
      setReports((prev) => prev.filter((r) => r.id !== reportToDelete));
      setShowDeleteModal(false);
      setReportToDelete(null);
    }
  };

  const handleDownload = (report: Report) => {
    alert(`Downloading ${report.title}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-900 selection:bg-orange-200 font-sans">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <Link href="/" className="mt-1 p-2 bg-white hover:bg-orange-50 rounded-full shadow-sm border border-gray-100 transition-colors group">
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Report Library</h1>
              <p className="text-gray-500 mt-2">
                Manage your generated intelligence documents ({filteredReports.length} available)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Report
          </button>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8 flex flex-col md:flex-row gap-3"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent border-none text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none font-medium"
            />
          </div>

          <div className="h-px md:h-auto md:w-px bg-gray-100 mx-2" />

          {/* Controls Group */}
          <div className="flex items-center gap-3 px-2">

            {/* --- CUSTOM GRADIENT DROPDOWN --- */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                   pl-4 pr-10 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center border
                   ${isDropdownOpen
                    ? "bg-gradient-to-r from-white to-orange-50 border-orange-300 text-orange-700 ring-4 ring-orange-500/10"
                    : "bg-gradient-to-r from-white to-orange-50/50 border-gray-200 text-gray-700 hover:border-orange-200"
                  }
                `}
              >
                {selectedIndustry === "all" ? "All Industries" : selectedIndustry}
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180 text-orange-500" : "text-gray-400"}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-orange-100 overflow-hidden z-20 p-1"
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
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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

            {/* Sort Toggle */}
            <button
              onClick={() => setSortBy(sortBy === "date" ? "name" : "date")}
              className="px-4 py-2.5 bg-white border border-gray-200 hover:border-orange-300 rounded-xl text-gray-600 hover:text-orange-600 transition-all flex items-center gap-2 text-sm font-bold shadow-sm"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="hidden sm:inline">{sortBy === "date" ? "Date" : "Name"}</span>
            </button>

            {/* View Toggle */}
            <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-orange-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-orange-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Reports Grid/List */}
        <AnimatePresence mode="popLayout">
          {filteredReports.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-orange-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your filters or search query.</p>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Create New Report
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredReports.map((report) => (
                <motion.div
                  layout
                  key={report.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-100 transition-all duration-300 ${viewMode === "list" ? "flex items-center gap-6" : "flex flex-col"
                    }`}
                >
                  {/* Icon Area */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${viewMode === "grid" ? "mb-4 bg-orange-50 group-hover:bg-orange-500" : "bg-orange-50 group-hover:bg-orange-500"
                    }`}>
                    <FileText className={`w-6 h-6 transition-colors ${viewMode === "grid" ? "text-orange-500 group-hover:text-white" : "text-orange-500 group-hover:text-white"
                      }`} />
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                      {report.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 mb-3 text-xs">
                      <span className="px-2 py-1 bg-gray-50 rounded-md font-medium text-gray-600 border border-gray-100">
                        {report.industry}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500">{report.fileSize}</span>
                    </div>

                    {/* --- NEW: Selected Modules Display --- */}
                    {/* This shows ONLY the modules that are actually in this report */}
                    <div className="flex flex-wrap gap-1 mb-4 h-6 overflow-hidden">
                      {report.modules && report.modules.length > 0 ? (
                        <>
                          {report.modules.slice(0, 3).map((mod, idx) => (
                            <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-50 text-orange-700 border border-orange-100/60">
                              {mod}
                            </span>
                          ))}
                          {report.modules.length > 3 && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-50 text-gray-400 border border-gray-100">
                              +{report.modules.length - 3}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[10px] text-gray-400 italic">No modules selected</span>
                      )}
                    </div>
                    {/* ------------------------------------- */}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {report.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>

                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/report-view/${report.id}`}
                          className="p-1.5 hover:bg-orange-50 text-gray-400 hover:text-orange-600 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDownload(report)}
                          className="p-1.5 hover:bg-orange-50 text-gray-400 hover:text-orange-600 rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <CreateReportModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDeleteModal(false)}
                className="fixed inset-0 bg-white/60 backdrop-blur-md z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
              >
                <div className="pointer-events-auto bg-white border border-gray-100 rounded-3xl p-8 max-w-sm w-full shadow-2xl shadow-orange-500/20">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Trash2 className="w-7 h-7 text-red-500" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Report?</h3>
                  <p className="text-gray-500 text-sm text-center mb-8 px-4">
                    This action cannot be undone. This file will be permanently removed from your library.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
