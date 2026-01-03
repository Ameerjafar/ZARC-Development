import { motion } from "framer-motion";
import { FileText, Download, Clock, MoreVertical, Loader2, Sparkles } from "lucide-react";
import { Report } from "../types/reporting";

interface FileCardProps {
    report: Report;
    viewMode: "grid" | "list";
    downloadingId: string | null;
    onDownload: (e: React.MouseEvent) => void;
    onClick: () => void;
}

export const FileCard = ({ report, viewMode, downloadingId, onDownload, onClick }: FileCardProps) => {
    const isDownloading = downloadingId === report.id;

    // --- LIST VIEW ---
    if (viewMode === "list") {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onClick}
                className="group flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-md hover:shadow-orange-500/5 transition-all cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                        <FileText size={18} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-orange-700 transition-colors">
                            {report.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                            <span>{report.industry}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                    {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                </button>
            </motion.div>
        );
    }

    // --- GRID VIEW (Compact & Clean) ---
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClick}
            className="group relative bg-white rounded-2xl p-5 border border-gray-100 cursor-pointer h-[180px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200"
        >
            {/* Top Section */}
            <div className="flex justify-between items-start">
                <div className="w-11 h-11 rounded-xl bg-orange-50/50 border border-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-100 group-hover:scale-105 transition-all">
                    <FileText size={20} className="group-hover:hidden" />
                    <Sparkles size={20} className="hidden group-hover:block animate-pulse" />
                </div>

                <div className="p-1 text-gray-300 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <MoreVertical size={16} />
                </div>
            </div>

            {/* Middle: Title Only */}
            <div className="mt-2">
                <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-orange-700 transition-colors line-clamp-2">
                    {report.title}
                </h3>
            </div>

            {/* Bottom: Meta & Action */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50 group-hover:border-orange-50/50 transition-colors">
                <div className="flex flex-col text-xs font-medium text-gray-400">
                    <span className="text-gray-500">{report.industry}</span>
                    <span className="text-[10px] opacity-70">{new Date(report.createdAt).toLocaleDateString()}</span>
                </div>

                <button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-900 hover:text-white transition-all"
                >
                    {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                </button>
            </div>
        </motion.div>
    );
};
