"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Grid,
  List,
  Clock,
  ChevronDown,
  Plus,
  ArrowLeft,
  Check,
  Folder,
  ChevronRight,
  Download,
  Loader
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CreateReportModal from '../components/ReportModal';
import { MOCK_REPORTS, Report } from "../data/reports";
import { generateWordDocument, downloadFile } from "../lib/generateWord";

export default function ReportsHistoryPage() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [isGroupedView, setIsGroupedView] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const industries = ["all", "E-commerce", "SaaS", "Fintech", "Healthcare", "Energy"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const industryCounts = reports.reduce((acc, report) => {
    acc[report.industry] = (acc[report.industry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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

  const handleCardClick = (id: string) => {
    router.push(`/report-view/${id}`);
  };

  const handleFolderClick = (industry: string) => {
    setSelectedIndustry(industry);
    setIsGroupedView(false);
  };

  const handleDownload = async (e: React.MouseEvent, report: Report) => {
    e.stopPropagation(); // Prevent card click navigation
    setDownloadingId(report.id);

    try {
      const blob = await generateWordDocument({
        id: report.id,
        title: report.title,
        industry: report.industry,
        createdAt: report.createdAt,
        sections: [
          {
            title: "Executive Summary",
            content: `This is the ${report.title} intelligence dossier for the ${report.industry} industry.`,
          },
          {
            title: "Key Findings",
            content: "Detailed insights and analysis from the report generation process.",
          },
        ],
      });

      downloadFile(blob, `${report.title}.docx`);
    } catch (error) {
      console.error("Error generating document:", error);
      alert("Failed to download report. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900 relative overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#FAFAFA]"></div>
        <div className="absolute top-[-10%] inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/60 via-orange-50/30 to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-orange-50/40 to-transparent"></div>
        <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-orange-50/40 to-transparent"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <Link href="/" className="mt-1 p-2.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl shadow-sm border border-slate-200 transition-colors group">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-orange-600" />
            </Link>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Report Library</h1>
              <p className="text-slate-500 mt-2 text-lg">
                Manage your generated intelligence dossiers.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="group relative px-6 py-3.5 bg-slate-900 text-white rounded-full font-bold shadow-xl shadow-slate-900/20 overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-orange-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Plus className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Create New Report</span>
          </button>
        </motion.div>

        {/* Filters Bar */}
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

        {/* Content */}
        <AnimatePresence mode="wait">

          {isGroupedView ? (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Object.keys(industryCounts).map((industry) => (
                <div
                  key={industry}
                  onClick={() => handleFolderClick(industry)}
                  className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-orange-600 shadow-sm group-hover:scale-110 transition-transform">
                      <Folder className="w-6 h-6 fill-orange-500 text-orange-600" />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="relative z-10 text-xl font-bold text-slate-900">{industry}</h3>
                  <p className="relative z-10 text-slate-500 text-sm mt-1">{industryCounts[industry]} Reports</p>
                </div>
              ))}
            </motion.div>
          ) : (

            filteredReports.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-32"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                  <FileText className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No reports found</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  We couldn't find any reports matching your filters.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-3"
                }
              >
                {filteredReports.map((report) => (
                  <motion.div
                    layout
                    key={report.id}
                    onClick={() => handleCardClick(report.id)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`
                    group relative bg-white border border-slate-200 rounded-2xl cursor-pointer
                    hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden
                    ${viewMode === "list" ? "p-4 flex items-center gap-6" : "p-0 flex flex-col h-full"}
                  `}
                  >
                    {viewMode === "grid" && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}

                    <div className={`
                        flex items-start gap-4
                        ${viewMode === "grid" ? "p-6 pb-2" : ""}
                  `}>
                      <div className={`
                        flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all border border-transparent
                        bg-slate-50 group-hover:bg-orange-50 group-hover:border-orange-100
                    `}>
                        <FileText className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-lg text-slate-900 truncate leading-tight mb-1 group-hover:text-orange-600 transition-colors">
                          {report.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <span className="uppercase tracking-wider px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600">{report.industry}</span>
                        </div>
                      </div>
                    </div>

                    {viewMode === "grid" && <div className="flex-1" />}

                    <div className={`
                       border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3
                       group-hover:bg-white transition-colors
                       ${viewMode === "grid" ? "px-6 py-4 mt-6" : "border-none bg-transparent p-0 ml-auto gap-2"}
                  `}>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                        <Clock className="w-3.5 h-3.5" />
                        {report.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={(e) => handleDownload(e, report)}
                        disabled={downloadingId === report.id}
                        className="relative p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/download"
                      >
                        {downloadingId === report.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4 group-hover/download:scale-110 transition-transform" />
                        )}
                      </button>

                      <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowLeft className="w-4 h-4 text-orange-500 rotate-180" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )
          )}
        </AnimatePresence>

        <CreateReportModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </main>
    </div>
  );
}
