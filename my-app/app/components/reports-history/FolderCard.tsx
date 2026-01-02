"use client";

import React from "react";
import { Folder, ChevronRight } from "lucide-react";

interface FolderCardProps {
    industry: string;
    count: number;
    onClick: () => void;
}

export const FolderCard = ({ industry, count, onClick }: FolderCardProps) => {
    return (
        <div
            onClick={onClick}
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
            <p className="relative z-10 text-slate-500 text-sm mt-1">{count} Reports</p>
        </div>
    );
};
