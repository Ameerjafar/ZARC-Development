import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Option } from "../../types/reporting";

interface ModuleStepProps {
    selectedIndustry: Option | null;
    filteredModules: Option[];
    selectedModules: Option[];
    toggleModule: (mod: Option) => void;
    onSelectAll: () => void;
    onDeselectAll: () => void;
    onBack: () => void;
    onGenerate: () => void;
}

export function ModuleStep({
    selectedIndustry,
    filteredModules,
    selectedModules,
    toggleModule,
    onSelectAll,
    onDeselectAll,
    onBack,
    onGenerate,
}: ModuleStepProps) {
    return (
        <div className="flex-1 flex flex-col h-full">
            {/* Header */}
            <div className="px-8 pt-8 pb-4">
                <div className="flex items-center gap-3 mb-2">
                    <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                        {selectedIndustry?.label}
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Configure Analysis Modules</h2>
                <p className="text-slate-500">Select the data points you want to include in this report.</p>

                {/* Selection Controls */}
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={onSelectAll}
                        className="text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-100 transition-colors"
                    >
                        Select All
                    </button>
                    <button
                        onClick={onDeselectAll}
                        className="text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                    >
                        Deselect All
                    </button>
                </div>
            </div>

            {/* Scrollable Module Grid */}
            <div className="flex-1 overflow-y-auto px-8 pb-4 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredModules.map((mod) => {
                        const isSelected = selectedModules.some((m) => m.id === mod.id);
                        return (
                            <motion.div
                                key={mod.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => toggleModule(mod)}
                                className={`
                  relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group
                  ${isSelected
                                        ? "border-orange-500 bg-orange-50/50 shadow-sm"
                                        : "border-slate-100 hover:border-orange-200 hover:bg-slate-50"}
                `}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className={`font-semibold text-sm mb-1 ${isSelected ? "text-orange-900" : "text-slate-900"}`}>
                                            {mod.label}
                                        </h3>
                                        <p className="text-xs text-slate-500 leading-relaxed max-w-[90%]">
                                            Includes market sizing, growth projections, and key trends.
                                        </p>
                                    </div>
                                    <div className={`
                    w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                    ${isSelected ? "bg-orange-500 border-orange-500" : "border-slate-300 bg-white"}
                  `}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-white">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                        <span className="font-bold text-slate-900">{selectedModules.length}</span> modules selected
                    </div>
                    <button
                        onClick={onGenerate}
                        disabled={selectedModules.length === 0}
                        className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all
                ${selectedModules.length > 0
                                ? "bg-gradient-to-r from-orange-600 to-orange-500 hover:scale-[1.02] shadow-orange-500/25"
                                : "bg-slate-300 cursor-not-allowed"}
            `}
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Report</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
