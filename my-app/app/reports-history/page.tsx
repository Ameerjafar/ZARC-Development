"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import CreateReportModal from '../components/ReportModal';
import { MOCK_REPORTS } from "../data/reports";
import { Report } from "../types/reporting";
import { generateWordDocument, downloadFile } from "../lib/generateWord";

// Modular Components
import { HistoryHeader } from "../components/reports-history/HistoryHeader";
import { FiltersBar } from "../components/reports-history/FiltersBar";
import { FolderCard } from "../components/reports-history/FolderCard";
import { FileCard } from "../components/reports-history/FileCard";
import { EmptyState } from "../components/reports-history/EmptyState";

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

  const handleDownload = async (e: React.MouseEvent, report: Report) => {
    e.stopPropagation();
    setDownloadingId(report.id);
    try {
      const blob = await generateWordDocument({
        id: report.id,
        title: report.title,
        industry: report.industry,
        createdAt: report.createdAt,
        sections: [
          { title: "Executive Summary", content: `Analysis for ${report.title}...` },
        ],
      });
      downloadFile(blob, `${report.title}.docx`);
    } catch (error) {
      console.error(error);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans relative">

      {/* Enhanced Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-orange-50/60 to-transparent opacity-70" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[100px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">

        <div className="mb-10">
          <HistoryHeader onCreateNew={() => setIsCreateModalOpen(true)} />
        </div>

        <div className="sticky top-4 z-40 bg-[#FDFDFD]/80 backdrop-blur-xl p-4 rounded-2xl border border-gray-100 shadow-sm mb-8">
          <FiltersBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isGroupedView={isGroupedView}
            setIsGroupedView={setIsGroupedView}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            industries={industries}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            viewMode={viewMode}
            setViewMode={setViewMode}
            dropdownRef={dropdownRef}
          />
        </div>

        <AnimatePresence mode="wait">
          {isGroupedView ? (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Object.keys(industryCounts).map((industry) => (
                <FolderCard
                  key={industry}
                  industry={industry}
                  count={industryCounts[industry]}
                  onClick={() => {
                    setSelectedIndustry(industry);
                    setIsGroupedView(false);
                  }}
                />
              ))}
            </motion.div>
          ) : (
            filteredReports.length === 0 ? (
              <EmptyState />
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
                  <FileCard
                    key={report.id}
                    report={report}
                    viewMode={viewMode}
                    downloadingId={downloadingId}
                    onDownload={(e) => handleDownload(e, report)}
                    onClick={() => router.push(`/report-view/${report.id}`)}
                  />
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
