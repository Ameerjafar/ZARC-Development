"use client";

import React from "react";
import { CheckCircle2, CheckSquare, Square, ArrowRight } from "lucide-react";
import { Option } from "../../types/reporting";

interface ModuleStepProps {
    selectedIndustry: Option | null;
    filteredModules: Option[];
    selectedModules: Option[];
    toggleModule: (mod: Option) => void;
    toggleAllModules: () => void;
    onBack: () => void;
    onGenerate: () => void;
}

export const ModuleStep = ({
    selectedIndustry,
    filteredModules,
    selectedModules,
    toggleModule,
    toggleAllModules,
    onBack,
    onGenerate,
}: ModuleStepProps) => {
    return (
        <div className="flex flex-col h-full p-10">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Add Data Modules</h2>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        Sector: <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{selectedIndustry?.label}</span>
                    </div>
                </div>

                {/* SELECT ALL BUTTON */}
                <button
                    onClick={toggleAllModules}
                    className="text-sm font-bold text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                >
                    {selectedModules.length === filteredModules.length ? (
                        <><CheckSquare className="w-4 h-4" /> Deselect All</>
                    ) : (
                        <><Square className="w-4 h-4" /> Select All</>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-auto overflow-y-auto pr-2 pb-4">
                {filteredModules.map((mod) => {
                    const isSelected = selectedModules.some((m) => m.id === mod.id);
                    return (
                        <button
                            key={mod.id}
                            onClick={() => toggleModule(mod)}
                            className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${isSelected ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "hover:border-orange-300"
                                }`}
                        >
                            <div>
                                <div className="font-bold text-sm text-slate-800">{mod.label}</div>
                                <div className="text-[10px] uppercase font-bold text-slate-400">{mod.category}</div>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-between pt-6 border-t mt-4">
                <button onClick={onBack} className="text-slate-500 font-bold hover:text-slate-800">Back</button>

                <button
                    onClick={onGenerate}
                    disabled={selectedModules.length === 0}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50"
                >
                    Generate Report <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
