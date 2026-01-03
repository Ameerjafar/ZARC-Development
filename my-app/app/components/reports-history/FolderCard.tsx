import { motion } from "framer-motion";
import { Folder, Layers, ChevronRight } from "lucide-react";

interface FolderCardProps {
    industry: string;
    count: number;
    onClick: () => void;
}

export const FolderCard = ({ industry, count, onClick }: FolderCardProps) => {
    return (
        <motion.div
            whileHover="hover"
            initial="rest"
            onClick={onClick}
            className="group relative cursor-pointer h-[180px] w-full"
        >
            {/* Layer 3 (Back-most) */}
            <motion.div
                variants={{
                    rest: { scale: 0.9, y: 0, opacity: 0.5 },
                    hover: { scale: 0.9, y: -15, opacity: 0.6 }
                }}
                className="absolute inset-x-4 top-2 bottom-0 bg-gray-200 rounded-2xl border border-gray-300"
            />

            {/* Layer 2 (Middle) */}
            <motion.div
                variants={{
                    rest: { scale: 0.95, y: 5, opacity: 0.7 },
                    hover: { scale: 0.95, y: -8, opacity: 0.8 }
                }}
                className="absolute inset-x-2 top-2 bottom-0 bg-gray-100 rounded-2xl border border-gray-200 shadow-sm"
            />

            {/* Layer 1 (Front - Main Card) */}
            <motion.div
                variants={{
                    rest: { y: 10 },
                    hover: { y: 0 }
                }}
                className="absolute inset-0 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-500/10 group-hover:border-orange-200"
            >
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors duration-300">
                        {industry === 'all' ? <Layers size={24} /> : <Folder size={24} />}
                    </div>

                    {/* Counter Badge */}
                    <div className="px-2 py-1 bg-gray-100 rounded-md text-xs font-bold text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors">
                        {count}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-900 capitalize group-hover:text-orange-700 transition-colors">
                        {industry}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-400 mt-1 font-medium group-hover:text-gray-600">
                        <span>View Collection</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
