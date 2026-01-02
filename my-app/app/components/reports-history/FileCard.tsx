"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Download, Loader, ArrowLeft } from "lucide-react";
import { Report } from "../../types/reporting";

interface FileCardProps {
    report: Report;
    viewMode: "grid" | "list";
    downloadingId: string | null;
    onDownload: (e: React.MouseEvent) => void;
    onClick: () => void;
}

export const FileCard = ({ report, viewMode, downloadingId, onDownload, onClick }: FileCardProps) => {
    return (
        <motion.div
            layout
            onClick={onClick}
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
                    onClick={onDownload}
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
    );
};
