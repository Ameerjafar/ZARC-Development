"use client";

import React from "react";
import { Search, Building2 } from "lucide-react";
import { Option } from "../../types/reporting";

interface IndustryStepProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredIndustries: Option[];
    onSelect: (ind: Option) => void;
}

export const IndustryStep = ({ searchQuery, setSearchQuery, filteredIndustries, onSelect }: IndustryStepProps) => {
    return (
        <div className="flex flex-col h-full p-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Select Industry</h2>
            <p className="text-slate-500 mb-8">Which market sector are you analyzing?</p>

            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    autoFocus
                    type="text"
                    placeholder="Search industries..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-orange-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2">
                {filteredIndustries.map((ind) => {
                    const Icon = ind.icon || Building2;
                    return (
                        <button
                            key={ind.id}
                            onClick={() => onSelect(ind)}
                            className="flex items-center gap-4 p-4 text-left border rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
                        >
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-slate-700 group-hover:text-orange-700">{ind.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
