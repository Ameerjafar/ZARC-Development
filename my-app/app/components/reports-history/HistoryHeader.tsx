import { Plus } from "lucide-react";
import { BackButton } from "../common/BackButton"; // Import the new button

interface HistoryHeaderProps {
    onCreateNew: () => void;
}

export const HistoryHeader = ({ onCreateNew }: HistoryHeaderProps) => {
    return (
        <div className="space-y-4">
            {/* 1. Add Back Button Row */}
            <div>
                <BackButton label="Back to Home" fallbackUrl="/" />
            </div>

            {/* 2. Main Title Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Report Library
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your generated intelligence reports and insights.
                    </p>
                </div>

                <button
                    onClick={onCreateNew}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-gray-900/10 transition-all hover:scale-105 active:scale-95"
                >
                    <Plus size={18} />
                    <span>New Report</span>
                </button>
            </div>
        </div>
    );
};
