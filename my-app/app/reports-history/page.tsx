"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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

        <HistoryHeader onCreateNew={() => setIsCreateModalOpen(true)} />

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
                <FolderCard
                  key={industry}
                  industry={industry}
                  count={industryCounts[industry]}
                  onClick={() => handleFolderClick(industry)}
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
                    onClick={() => handleCardClick(report.id)}
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
