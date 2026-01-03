"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_REPORTS } from "../../data/reports";
import {
    ArrowLeft,
    Download,
    Share2,
    Printer,
    ChevronRight,
    ChevronLeft,
    LayoutDashboard,
    FileText,
    Globe,
    Users,
    DollarSign,
    AlertCircle,
    Zap,
    Target,
    Calendar,
    Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Module Configuration ---
const MODULE_CONFIG: Record<string, { icon: any; color: string; bg: string; description: string }> = {
    "Market Analysis": {
        icon: Globe,
        color: "text-blue-600",
        bg: "bg-blue-50",
        description: "Global trends & TAM analysis"
    },
    "Competitor Intelligence": {
        icon: Users,
        color: "text-purple-600",
        bg: "bg-purple-50",
        description: "Key players & market share"
    },
    "Financial Projections": {
        icon: DollarSign,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        description: "Revenue & cost forecasts"
    },
    "Risk Assessment": {
        icon: AlertCircle,
        color: "text-red-600",
        bg: "bg-red-50",
        description: "Regulatory & operational risks"
    },
    "Growth Opportunities": {
        icon: Zap,
        color: "text-amber-600",
        bg: "bg-amber-50",
        description: "Expansion vectors"
    },
    "SWOT Analysis": {
        icon: Target,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        description: "Strengths, Weaknesses, Opportunities, Threats"
    },
};

const DynamicContentRenderer = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-stone max-w-none 
      prose-p:leading-8 prose-p:text-gray-600 prose-p:mb-6
      prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4
      prose-h3:text-xl prose-h3:mt-8
      prose-li:text-gray-600 prose-li:my-2
      prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
      prose-strong:text-gray-900 prose-strong:font-bold">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default function ReportViewPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params?.id;

    const report = MOCK_REPORTS.find((r) => r.id === id);

    const [activeSection, setActiveSection] = useState<string>("summary");
    const [sidebarSearch, setSidebarSearch] = useState("");

    if (!report) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
            Report not found.
        </div>
    );

    const allNavItems = [
        { id: "summary", label: "Executive Summary", icon: LayoutDashboard, category: "Overview" },
        ...(report.modules || []).map(m => ({
            id: m,
            label: m,
            icon: MODULE_CONFIG[m]?.icon || FileText,
            category: "Modules"
        }))
    ];

    const filteredNavItems = allNavItems.filter(item =>
        item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
    );

    const currentIndex = allNavItems.findIndex(item => item.id === activeSection);

    const handleNext = () => {
        if (currentIndex < allNavItems.length - 1) setActiveSection(allNavItems[currentIndex + 1].id);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setActiveSection(allNavItems[currentIndex - 1].id);
    };

    const getSectionContent = (section: string) => {
        if (section === "summary") {
            return `
        <p>This comprehensive analysis of the <strong>${report.industry}</strong> sector reveals a dynamic landscape characterized by rapid technological adoption. Despite macroeconomic headwinds, the sector demonstrates resilience with a projected compound annual growth rate (CAGR) exceeding market averages.</p>
        
        <h3>Key Findings</h3>
        <p>Our data suggests a bifurcation in the market, where agile startups are capturing niche segments while legacy players consolidate positions through M&A. The outlook remains positive for organizations willing to pivot towards data-driven decision making.</p>
        
        <blockquote>
          "Incumbents must accelerate digital consolidation to capture emerging market value, currently projected to grow at 2x the historical average."
        </blockquote>

        <h3>Strategic Recommendations</h3>
        <ul>
          <li><strong>Audit Supply Chain:</strong> Identify single points of failure and diversify vendor relationships immediately.</li>
          <li><strong>Predictive Modeling:</strong> Leverage historical data to forecast demand spikes in the coming quarter.</li>
          <li><strong>Customer Retention:</strong> Shift focus from acquisition to lifetime value (LTV) maximization.</li>
        </ul>
      `;
        }

        return `
      <p>This section provides a detailed breakdown of <strong>${section}</strong>. We have synthesized data from multiple touchpoints to provide a granular view of emerging patterns and anomalies within the ${report.industry} sector.</p>
      
      <h3>Core Analysis</h3>
      <p>Our analysis highlights a significant shift in underlying fundamentals. The correlation between market volatility and asset performance has diverged from historical norms.</p>
      
      <blockquote>
        "The velocity of change in this specific vertical has outpaced traditional forecasting models by a factor of three."
      </blockquote>

      <h3>Implications for Stakeholders</h3>
      <p>Moving forward, it is recommended to adopt a more agile approach to resource allocation. Static models are ill-equipped to handle current velocity. Additionally, risk mitigation strategies should be revisited to address interconnected supply chain vulnerabilities.</p>
    `;
    };

    return (
        <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-900 font-sans selection:bg-orange-200 flex flex-col overflow-hidden">

            {/* --- Fixed Header --- */}
            <header className="shrink-0 z-40 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 h-16 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-orange-50 rounded-full transition-colors text-gray-500 hover:text-orange-600">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-gray-200" />
                    <div>
                        <h1 className="text-sm font-bold text-gray-900 leading-none">{report.title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Share2 className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Printer className="w-4 h-4" /></button>
                    <button className="ml-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2 shadow-lg shadow-gray-200">
                        <Download className="w-3.5 h-3.5" /> Export
                    </button>
                </div>
            </header>

            {/* --- Main Layout --- */}
            <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 h-[calc(100vh-64px)]">

                {/* --- LEFT SIDEBAR --- */}
                <aside className="lg:col-span-3 flex flex-col h-full bg-white/50 rounded-2xl border border-gray-100/50 backdrop-blur-sm overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-100 bg-white/50 shrink-0">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-100 uppercase tracking-wider">
                                {report.industry}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">{report.fileSize}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {report.createdAt.toLocaleDateString()}
                        </div>
                    </div>
                    <div className="p-3 border-b border-gray-100 bg-white shrink-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search modules..."
                                value={sidebarSearch}
                                onChange={(e) => setSidebarSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                        {filteredNavItems.map((item) => {
                            const isActive = activeSection === item.id;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group
                      ${isActive ? "bg-white text-orange-600 shadow-md shadow-orange-500/10 ring-1 ring-orange-100 scale-[1.02]" : "text-gray-500 hover:bg-white/60 hover:text-gray-900"}
                    `}
                                >
                                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-orange-50' : 'bg-transparent group-hover:bg-gray-100'}`}>
                                        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-orange-500" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    </div>
                                    <span className="truncate text-left flex-1 leading-tight">{item.label}</span>
                                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                                </button>
                            );
                        })}
                    </nav>
                    <div className="p-2 border-t border-gray-100 bg-gray-50/50 text-center shrink-0">
                        <span className="text-[10px] text-gray-400 font-medium">{filteredNavItems.length} available sections</span>
                    </div>
                </aside>

                {/* --- RIGHT CONTENT AREA --- */}
                <main className="lg:col-span-9 flex flex-col h-full overflow-hidden">
                    {/* WRAPPER - Static, doesn't animate */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-orange-500/5 flex-1 flex flex-col h-full overflow-hidden relative">

                        {/* ANIMATED CONTENT - Only this part changes */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1 flex flex-col overflow-hidden"
                            >
                                {/* Header */}
                                {(() => {
                                    const config = activeSection === "summary"
                                        ? { icon: LayoutDashboard, color: "text-orange-600", bg: "bg-orange-50", description: "High-level overview of findings." }
                                        : MODULE_CONFIG[activeSection] || { icon: FileText, color: "text-gray-600", bg: "bg-gray-50", description: "Detailed Analysis" };
                                    const Icon = config.icon;

                                    return (
                                        <div className="px-8 py-8 border-b border-gray-100/50 flex-shrink-0 bg-white">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-start gap-4 max-w-md">
                                                    <div className={`w-12 h-12 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 ${activeSection === "summary" ? "bg-orange-50" : "bg-gray-50"}`}>
                                                        <Icon className={`w-6 h-6 ${config.color}`} />
                                                    </div>
                                                    <div className="mt-1">
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                                                            {activeSection === "summary" ? "Report Context" : "Module Context"}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 leading-snug">{config.description}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end text-right">
                                                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm ${activeSection === "summary" ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
                                                        {activeSection === "summary" ? "Executive Summary" : `Section ${currentIndex + 1}`}
                                                    </div>
                                                    <h2 className="text-2xl font-black text-gray-900 leading-tight">
                                                        {activeSection === "summary" ? "Strategic Overview" : activeSection}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Content Body */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="p-8 lg:p-12 pb-24 max-w-4xl mx-auto">
                                        <DynamicContentRenderer content={getSectionContent(activeSection)} />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* FOOTER - Static, stays outside AnimatePresence */}
                        <div className="flex-shrink-0 border-t border-gray-100 px-8 py-5 bg-gray-50/90 backdrop-blur-md absolute bottom-0 left-0 right-0 z-10">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${currentIndex === 0 ? "border-transparent text-gray-300 cursor-not-allowed bg-transparent" : "border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:text-orange-600 hover:shadow-sm"}`}
                                >
                                    <ChevronLeft className="w-4 h-4" /> Previous
                                </button>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {currentIndex + 1} / {allNavItems.length}
                                    </span>
                                </div>
                                <button
                                    onClick={handleNext}
                                    disabled={currentIndex === allNavItems.length - 1}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${currentIndex === allNavItems.length - 1 ? "border-transparent text-gray-300 cursor-not-allowed bg-transparent" : "border-transparent bg-gray-900 text-white hover:bg-black hover:shadow-lg shadow-gray-200"}`}
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
