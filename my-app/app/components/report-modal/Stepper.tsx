"use client";

import React from "react";
import { LayoutDashboard, Check } from "lucide-react";

interface StepperProps {
    currentStep: number;
    steps: { label: string; description: string; icon: any }[];
}

export const Stepper = ({ currentStep, steps }: StepperProps) => {
    return (
        <div className="w-72 bg-slate-50 border-r border-slate-200 p-8 flex flex-col hidden md:flex">
            <div className="mb-10">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-orange-500" /> Report Gen
                </h2>
            </div>

            {/* Vertical Stepper */}
            <div className="space-y-8 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200" />
                <div
                    className="absolute left-[19px] top-4 w-0.5 bg-orange-500 transition-all duration-500"
                    style={{ height: `${Math.min(currentStep, steps.length - 1) * 33}%` }}
                />

                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    const Icon = step.icon;

                    return (
                        <div key={index} className="flex items-start gap-4 relative z-10">
                            <div
                                className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all 
                  ${isActive
                                        ? "bg-orange-500 border-orange-500 text-white shadow-lg scale-110"
                                        : isCompleted
                                            ? "bg-white border-orange-500 text-orange-500"
                                            : "bg-white border-slate-200 text-slate-300"
                                    }`}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                            </div>
                            <div className={`mt-1 ${isActive ? "opacity-100" : "opacity-60"}`}>
                                <h4 className="text-sm font-bold text-slate-900">{step.label}</h4>
                                <p className="text-xs text-slate-500">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
