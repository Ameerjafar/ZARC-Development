"use client";

import React from "react";
import { MousePointer2, Globe2 } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-16 text-sm">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xs">
                            Z
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">Zarc.</h4>
                    </div>
                    <p className="text-slate-500 leading-relaxed">
                        India's 1st AI Platform for Business Growth across all sectors.
                        Empowering visionaries since 2024.
                    </p>
                </div>
                <div>
                    <h5 className="font-bold text-slate-900 mb-4">Product</h5>
                    <ul className="space-y-3 text-slate-500">
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Pricing</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Case Studies</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Reviews</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Updates</li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold text-slate-900 mb-4">Company</h5>
                    <ul className="space-y-3 text-slate-500">
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">About</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Careers</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Contact</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Press</li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold text-slate-900 mb-4">Legal</h5>
                    <ul className="space-y-3 text-slate-500">
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Privacy Policy</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Terms of Service</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Security</li>
                        <li className="hover:text-orange-600 cursor-pointer transition-colors">Cookie Settings</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
                <p>&copy; 2025 Zarc Technologies. All rights reserved.</p>
                <div className="flex gap-6">
                    <MousePointer2 className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
                    <Globe2 className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
                </div>
            </div>
        </footer>
    );
};
