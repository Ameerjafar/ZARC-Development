"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_REPORTS } from "../../data/reports";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft, Download, Share2, Printer, ChevronRight, ChevronLeft,
  LayoutDashboard, FileText, Globe, Users, DollarSign, AlertCircle,
  Zap, Target, Calendar, Search, PieChart as PieChartIcon, BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";


const MODULE_CONFIG: Record<string, { icon: any; color: string; bg: string; description: string }> = {
  "Market Analysis": { icon: Globe, color: "text-blue-600", bg: "bg-blue-50", description: "Global trends & TAM analysis" },
  "Competitor Intelligence": { icon: Users, color: "text-purple-600", bg: "bg-purple-50", description: "Key players & market share" },
  "Financial Projections": { icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", description: "Revenue & cost forecasts" },
  "Risk Assessment": { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", description: "Regulatory & operational risks" },
  "Growth Opportunities": { icon: Zap, color: "text-amber-600", bg: "bg-amber-50", description: "Expansion vectors" },
  "SWOT Analysis": { icon: Target, color: "text-indigo-600", bg: "bg-indigo-50", description: "Strengths, Weaknesses, Opportunities, Threats" },
};

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#f43f5e"];

const ChartRenderer = ({ type, data, title }: { type: string; data: any; title?: string }) => {
  const chartHeight = 300;

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                cursor={{ stroke: "#f97316", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip cursor={{ fill: "#f9fafb" }} contentStyle={{ borderRadius: "12px", border: "none" }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}
                dataKey="value" stroke="none"
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <div className="text-red-500">Unsupported chart type: {type}</div>;
    }
  };

  return (
    <div className="my-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {title && <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">{title}</h4>}
      {renderChart()}
    </div>
  );
};

const DynamicContentRenderer = ({ content }: { content: string }) => {
    return (
      <div className="prose prose-stone max-w-none 
        prose-p:leading-7 prose-p:text-gray-600 prose-p:mb-4
        prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-3
        prose-h2:text-2xl prose-h2:mt-8
        prose-h3:text-lg prose-h3:mt-6 prose-h3:text-orange-600
        prose-li:text-gray-600 prose-li:my-1
        prose-ul:list-disc prose-ul:pl-5
        prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700
        prose-strong:text-gray-900 prose-strong:font-bold">
        
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }: any) {
              const match = /language-chart-(\w+)/.exec(className || "");
              if (match) {
                const chartType = match[1];
                try {
                  const chartConfig = JSON.parse(String(children).replace(/\n$/, ""));
                  return <ChartRenderer type={chartType} data={chartConfig.data} title={chartConfig.title} />;
                } catch (e) {
                  return null;
                }
              }
              // --- FIX IS HERE: Ensure <code tag is properly opened ---
              return <code className={className} {...props}>{children}</code>;
            }
          }}
        >
          {content}
        </ReactMarkdown>
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

  if (!report) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Report not found.</div>;

  const allNavItems = useMemo(() => [
    { id: "summary", label: "Executive Summary", icon: LayoutDashboard, category: "Overview" },
    ...(report.modules || []).map(m => ({
      id: m,
      label: m,
      icon: MODULE_CONFIG[m]?.icon || FileText,
      category: "Modules"
    }))
  ], [report]);

  const filteredNavItems = allNavItems.filter(item => item.label.toLowerCase().includes(sidebarSearch.toLowerCase()));
  const currentIndex = allNavItems.findIndex(item => item.id === activeSection);

  const handleNext = () => { if (currentIndex < allNavItems.length - 1) setActiveSection(allNavItems[currentIndex + 1].id); };
  const handlePrev = () => { if (currentIndex > 0) setActiveSection(allNavItems[currentIndex - 1].id); };

  // --- CONTENT GENERATION ---
  const getSectionContent = (section: string) => {
    switch(section) {
      case "summary": return `
## Strategic Overview

The **${report.industry}** industry is currently at an inflection point. Our data indicates a shift from traditional operational models to AI-driven ecosystems.

### Market Trajectory (2023-2027)
Growth is accelerating, driven primarily by enterprise adoption.

\`\`\`chart-line
{
  "title": "Projected Market Size (Billions USD)",
  "data": [
    { "name": "2023", "value": 4.2 },
    { "name": "2024", "value": 5.8 },
    { "name": "2025", "value": 7.5 },
    { "name": "2026", "value": 9.2 },
    { "name": "2027", "value": 12.4 }
  ]
}
\`\`\`

> "Companies that integrate generative AI into their workflows are seeing a **30% reduction** in operational overhead within the first 12 months."

### Key Drivers
*   **Digital Transformation:** Legacy systems are being replaced at record speed.
*   **Consumer Demand:** Shift towards hyper-personalized experiences.
*   **Regulatory Support:** New frameworks are stabilizing the investment climate.
`;
      case "Market Analysis": return `
## Market Analysis

The total addressable market (TAM) has expanded by 15% YoY. This section breaks down the demographics and regional performance.

### Regional Breakdown
North America continues to lead, but APAC is the fastest-growing region.

\`\`\`chart-pie
{
  "title": "Market Share by Region (2025)",
  "data": [
    { "name": "North America", "value": 40 },
    { "name": "Europe", "value": 25 },
    { "name": "APAC", "value": 20 },
    { "name": "LATAM", "value": 10 },
    { "name": "MEA", "value": 5 }
  ]
}
\`\`\`

### Consumer Demographics
The user base is shifting younger, with Gen Z now accounting for 35% of all transactions. This necessitates a mobile-first UI/UX strategy.
`;
      case "Competitor Intelligence": return `
## Competitive Landscape

The market is consolidating. Top 3 players now control 60% of the market share, creating high barriers to entry for new startups.

### Market Share Distribution
\`\`\`chart-bar
{
  "title": "Top Players Market Share (%)",
  "data": [
    { "name": "Company A", "value": 35 },
    { "name": "Company B", "value": 25 },
    { "name": "Company C", "value": 15 },
    { "name": "Others", "value": 25 }
  ]
}
\`\`\`

**Strategic Implications:**
1.  **M&A Activity:** Expect increased acquisitions of niche AI startups.
2.  **Pricing Wars:** Tier 2 players are dropping prices to retain churn.
`;
      case "Financial Projections": return `
## Financial Forecasts

We project strong unit economics improving over time as scale effects kick in.

### Revenue vs Cost Analysis
Margins are expected to widen as automation reduces variable costs.

\`\`\`chart-line
{
  "title": "EBITDA Margin Forecast (%)",
  "data": [
    { "name": "Q1", "value": 12 },
    { "name": "Q2", "value": 15 },
    { "name": "Q3", "value": 22 },
    { "name": "Q4", "value": 28 }
  ]
}
\`\`\`
`;
      default: return `
## ${section}

Detailed analysis for **${section}** is currently being generated. This module explores specific nuances relevant to your strategic goals.

### Preliminary Insights
*   **Trend A:** Significant uptake in Q3.
*   **Trend B:** User retention metrics are stable.

\`\`\`chart-bar
{
  "title": "Key Metrics Overview",
  "data": [
    { "name": "Metric A", "value": 65 },
    { "name": "Metric B", "value": 45 },
    { "name": "Metric C", "value": 80 }
  ]
}
\`\`\`
`;
    }
  };

  const currentConfig = activeSection === "summary"
    ? { icon: LayoutDashboard, color: "text-orange-600", bg: "bg-orange-50", description: "High-level overview of findings." }
    : MODULE_CONFIG[activeSection] || { icon: FileText, color: "text-gray-600", bg: "bg-gray-50", description: "Detailed Analysis" };
  const CurrentIcon = currentConfig.icon;

  return (
    <div className="h-screen bg-gray-50 text-gray-900 font-sans flex flex-col overflow-hidden">
      
      {/* --- FIXED HEADER --- */}
      <header className="shrink-0 z-40 bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <div>
            <h1 className="text-sm font-bold text-gray-900">{report.title}</h1>
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Read Mode</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Share2 className="w-4 h-4" /></button>
           <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Printer className="w-4 h-4" /></button>
           <button className="ml-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export PDF
           </button>
        </div>
      </header>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR (FIXED) --- */}
        <aside className="lg:col-span-3 flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
           <div className="p-4 border-b border-gray-100 shrink-0">
               <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                   <input
                       type="text"
                       placeholder="Search sections..."
                       value={sidebarSearch}
                       onChange={(e) => setSidebarSearch(e.target.value)}
                       className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                   />
               </div>
           </div>
           
           <nav className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
             {filteredNavItems.map((item) => {
               const isActive = activeSection === item.id;
               const ItemIcon = item.icon;
               return (
                 <button
                   key={item.id}
                   onClick={() => setActiveSection(item.id)}
                   className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-200 group ${isActive ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                 >
                   <ItemIcon className={`w-4 h-4 ${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                   <span className="truncate flex-1 text-left">{item.label}</span>
                   {isActive && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                 </button>
               );
             })}
           </nav>
        </aside>

        {/* --- RIGHT CONTENT AREA (SCROLLABLE) --- */}
        <main className="lg:col-span-9 flex flex-col h-full overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm relative">
          
          {/* 1. Header (Fixed inside Main) */}
          <div className="px-8 py-6 border-b border-gray-100 flex-shrink-0 bg-white z-10">
             <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${currentConfig.bg}`}>
                   <CurrentIcon className={`w-6 h-6 ${currentConfig.color}`} />
                </div>
                <div>
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{activeSection === "summary" ? "Report Context" : "Module Analysis"}</h4>
                   <h2 className="text-2xl font-black text-gray-900 leading-tight">{activeSection === "summary" ? "Strategic Overview" : activeSection}</h2>
                </div>
             </div>
          </div>

          {/* 2. Scrollable Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            <div className="p-8 lg:p-10 pb-32 max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                   <DynamicContentRenderer content={getSectionContent(activeSection)} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 3. Footer Controls (Fixed Bottom) */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 px-8 py-4 bg-white/95 backdrop-blur-sm z-20 flex justify-between items-center">
             <button 
               onClick={handlePrev} 
               disabled={currentIndex === 0} 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${currentIndex === 0 ? "border-transparent text-gray-300 cursor-not-allowed" : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600"}`}
             >
                 <ChevronLeft className="w-4 h-4" /> Previous
             </button>
             
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
               {currentIndex + 1} <span className="text-gray-300">/</span> {allNavItems.length}
             </span>

             <button 
               onClick={handleNext} 
               disabled={currentIndex === allNavItems.length - 1} 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${currentIndex === allNavItems.length - 1 ? "border-transparent text-gray-300 cursor-not-allowed" : "border-transparent bg-gray-900 text-white hover:bg-black"}`}
             >
                 Next <ChevronRight className="w-4 h-4" />
             </button>
          </div>

        </main>
      </div>
    </div>
  );
}
