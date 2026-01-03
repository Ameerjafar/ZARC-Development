import { Search, Grid, List, ChevronDown, Folder, FileText, Filter, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FiltersBarProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    isGroupedView: boolean;
    setIsGroupedView: (v: boolean) => void;
    selectedIndustry: string;
    setSelectedIndustry: (i: string) => void;
    industries: string[];
    isDropdownOpen: boolean;
    setIsDropdownOpen: (v: boolean) => void;
    viewMode: "grid" | "list";
    setViewMode: (m: "grid" | "list") => void;
    dropdownRef: React.RefObject<HTMLDivElement>;
}

export const FiltersBar = ({
    searchQuery,
    setSearchQuery,
    isGroupedView,
    setIsGroupedView,
    selectedIndustry,
    setSelectedIndustry,
    industries,
    isDropdownOpen,
    setIsDropdownOpen,
    viewMode,
    setViewMode,
    dropdownRef,
}: FiltersBarProps) => {

    // New Helper: Handle "Back to Folders" logic
    const handleBackToFolders = () => {
        setSelectedIndustry("all"); // Reset filter
        setIsGroupedView(true);     // Go back to grid
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-4">

            {/* 0. NEW: Back to Folders Button (Only visible if inside a folder) */}
            {!isGroupedView && selectedIndustry !== "all" && (
                <button
                    onClick={handleBackToFolders}
                    className="flex items-center gap-2 pr-4 border-r border-gray-200 text-sm font-bold text-gray-500 hover:text-orange-600 transition-colors"
                >
                    <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-orange-100">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="hidden md:inline">Folders</span>
                </button>
            )}

            {/* 1. Search Input */}
            <div className="relative w-full md:flex-1 group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50/50 transition-all placeholder:text-gray-400 shadow-sm"
                />
            </div>

            {/* 2. Industry Dropdown */}
            <div className="relative w-full md:w-48" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50/50 transition-all shadow-sm"
                >
                    <div className="flex items-center gap-2 truncate">
                        <Filter size={16} className="text-gray-400" />
                        <span className="capitalize">
                            {selectedIndustry === "all" ? "All Industries" : selectedIndustry}
                        </span>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 overflow-hidden max-h-60 overflow-y-auto"
                        >
                            {industries.map((industry) => (
                                <button
                                    key={industry}
                                    onClick={() => {
                                        setSelectedIndustry(industry);
                                        setIsDropdownOpen(false);
                                        // Note: We don't force View switch here, allowing user to filter while in grid/list
                                        if (isGroupedView) setIsGroupedView(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors flex items-center justify-between ${selectedIndustry === industry
                                            ? "bg-orange-50 text-orange-700"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <span className="capitalize">{industry === "all" ? "All Industries" : industry}</span>
                                    {selectedIndustry === industry && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="w-px h-8 bg-gray-200 hidden md:block mx-1" />

            {/* 3. View Toggles */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">

                {/* Files / Folders Toggle */}
                <div className="flex items-center p-1 bg-gray-100 rounded-lg border border-gray-200">
                    <button
                        onClick={() => {
                            setIsGroupedView(false);
                            // Optional: if they click "Files", maybe we stay in current filter? 
                            // Or reset? Usually staying is better UX.
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${!isGroupedView
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <FileText size={14} />
                        <span className="hidden sm:inline">Files</span>
                    </button>
                    <button
                        onClick={() => {
                            setIsGroupedView(true);
                            setSelectedIndustry("all"); // Reset filter when going to root folders
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${isGroupedView
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Folder size={14} />
                        <span className="hidden sm:inline">Folders</span>
                    </button>
                </div>

                {/* Grid / List Toggle (Hidden in Folder View) */}
                {!isGroupedView && (
                    <div className="flex items-center p-1 bg-gray-100 rounded-lg border border-gray-200">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 rounded-md transition-all ${viewMode === "grid"
                                    ? "bg-white text-orange-600 shadow-sm"
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 rounded-md transition-all ${viewMode === "list"
                                    ? "bg-white text-orange-600 shadow-sm"
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
