"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    label?: string;
    fallbackUrl?: string; // Where to go if there's no history (optional)
}

export const BackButton = ({ label = "Back", fallbackUrl = "/" }: BackButtonProps) => {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 2) {
            router.back();
        } else {
            router.push(fallbackUrl);
        }
    };

    return (
        <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 -ml-2 rounded-lg hover:bg-gray-100"
        >
            <ArrowLeft
                size={18}
                className="text-gray-400 group-hover:text-gray-900 transition-colors group-hover:-translate-x-1 duration-200"
            />
            <span>{label}</span>
        </button>
    );
};
