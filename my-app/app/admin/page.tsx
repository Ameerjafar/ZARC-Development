"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  LayoutGrid,
  PieChart as PieIcon,
  Globe,
  Database,
  Layers,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Settings,
  Menu,
  ChevronRight,
  BarChart3,
  RefreshCw,
  Filter,
  Activity,
  Server,
  Code,
  Cpu,
  ShieldCheck
} from "lucide-react";

// --- 1. CONFIG & DATA CONSTANTS ---

const INDUSTRIES = [
  { id: "retail", label: "E-Commerce & Retail", color: "#F97316" }, // Orange
  { id: "fintech", label: "Financial Services", color: "#3B82F6" }, // Blue
  { id: "health", label: "Healthcare & Pharma", color: "#10B981" }, // Emerald
  { id: "realestate", label: "Real Estate", color: "#6366F1" },     // Indigo
  { id: "travel", label: "Travel & Hospitality", color: "#F43F5E" } // Rose
];

const MODULES = [
  { id: "scraper", label: "Web Scraper", icon: Globe },
  { id: "sentiment", label: "Sentiment Engine", icon: Activity },
  { id: "pricing", label: "Price Monitor", icon: Database },
  { id: "serp", label: "SERP Tracking", icon: Search },
];

// --- 2. VISUAL COMPONENTS ---

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-6px_rgba(249,115,22,0.1)] transition-shadow duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({ title, value, change, trend, icon: Icon, subtext }: any) => (
  <Card className="p-6 relative overflow-hidden group">
    {/* Background Decor */}
    <div className="absolute top-0 right-0 p-16 bg-orange-50/50 rounded-full blur-3xl -mr-12 -mt-12 transition-opacity opacity-50 group-hover:opacity-100" />
    
    <div className="relative z-10 flex justify-between items-start mb-4">
      <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 group-hover:scale-110 transition-transform duration-300 shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    
    <div className="relative z-10">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{value}</div>
      {subtext && <div className="text-[10px] font-bold text-slate-400 mt-1">{subtext}</div>}
    </div>
  </Card>
);

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick, badge }: any) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group relative overflow-hidden
      ${active ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
    `}
  >
    <Icon className={`w-5 h-5 relative z-10 transition-transform group-hover:scale-110 ${active ? 'text-orange-500' : ''}`} />
    {!collapsed && (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex-1 flex items-center justify-between relative z-10 overflow-hidden"
      >
        <span className="font-bold text-sm whitespace-nowrap">{label}</span>
        {badge && (
          <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm shadow-orange-500/50">
            {badge}
          </span>
        )}
      </motion.div>
    )}
  </button>
);

const StatusPill = ({ label, status }: { label: string, status: 'good' | 'warn' | 'error' }) => {
  const colors = {
    good: "bg-green-500",
    warn: "bg-orange-500",
    error: "bg-red-500"
  };
  
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase">{status === 'good' ? 'Operational' : status}</span>
        <span className={`w-2 h-2 rounded-full ${colors[status]} shadow-[0_0_8px_rgba(0,0,0,0.3)] shadow-${status}-500`} />
      </div>
    </div>
  );
};

// --- 3. CHARTS ---

const VolumeBarChart = () => {
  const data = [65, 85, 45, 95, 70, 40, 60];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  return (
    <div className="h-full w-full flex items-end justify-between gap-2 pt-8">
      {data.map((h, i) => (
        <div key={i} className="flex-1 h-full flex flex-col justify-end group cursor-pointer relative">
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 pointer-events-none transform translate-y-2 group-hover:translate-y-0 shadow-xl">
             {h * 142} Records
             <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
          </div>

          <div className="w-full bg-slate-50 rounded-t-xl relative h-full overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-0 w-full bg-slate-200 group-hover:bg-orange-200 transition-colors rounded-t-xl"
            >
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 + (i*0.1) }}
                 className="absolute bottom-0 w-full h-full bg-gradient-to-t from-orange-500/80 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               />
            </motion.div>
          </div>
          <span className="text-[10px] font-bold text-slate-300 mt-3 text-center group-hover:text-orange-500 transition-colors">{days[i]}</span>
        </div>
      ))}
    </div>
  );
};

const IndustryDonut = () => {
  const slices = [
    { label: "Retail", value: 45, color: "#F97316" }, // Orange
    { label: "Fintech", value: 30, color: "#334155" }, // Slate 700
    { label: "Health", value: 15, color: "#94A3B8" },  // Slate 400
    { label: "Other", value: 10, color: "#E2E8F0" },   // Slate 200
  ];
  
  const total = slices.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 0;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center justify-center gap-6 h-full">
      <div className="relative w-32 h-32 shrink-0 group">
        <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 overflow-visible relative z-10">
          {slices.map((slice, i) => {
            const percentage = slice.value / total;
            const strokeDasharray = `${percentage * circumference} ${circumference}`;
            const strokeDashoffset = -currentAngle * circumference;
            currentAngle += percentage;

            return (
              <motion.circle
                key={i}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="hover:scale-105 origin-center transition-transform duration-300 cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
           <span className="text-2xl font-black text-slate-900">4.2M</span>
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Records</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2.5">
         {slices.map((s, i) => (
           <div key={i} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: s.color }} />
              <div className="flex flex-col leading-none">
                 <span className="text-xs font-bold text-slate-700">{s.label}</span>
                 <span className="text-[10px] font-bold text-slate-400">{s.value}%</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

// --- 4. MAIN COMPONENT ---

export default function StratEngineFinal() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Expanded Data State for Table
  const [triggers, setTriggers] = useState([
    { id: 1, name: "Amazon Price Watch - Electronics", industry: "Retail", module: "Price Monitor", status: "Active", lastRun: "2m ago", records: "12.4k" },
    { id: 2, name: "Crypto Sentiment - Twitter/X", industry: "Fintech", module: "Sentiment Engine", status: "Active", lastRun: "15m ago", records: "45.2k" },
    { id: 3, name: "Zillow Housing Trends", industry: "Real Estate", module: "Web Scraper", status: "Paused", lastRun: "1d ago", records: "8.1k" },
    { id: 4, name: "Competitor Keywords - SaaS", industry: "SaaS", module: "SERP Tracking", status: "Active", lastRun: "1h ago", records: "2.3k" },
    { id: 5, name: "FDA Drug Approvals", industry: "Healthcare", module: "Web Scraper", status: "Active", lastRun: "4h ago", records: "156" },
  ]);

  // Live Feed Data
  const liveFeed = [
    { id: 1, action: "Extracted 400 rows", target: "amazon.com", time: "Just now", status: "success" },
    { id: 2, action: "Proxy rotated (IP: 192.x)", target: "System", time: "10s ago", status: "warn" },
    { id: 3, action: "Sentiment analysis complete", target: "Batch #4021", time: "45s ago", status: "success" },
  ];

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden selection:bg-orange-100 selection:text-orange-900">
      
      {/* --- SIDEBAR --- */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 84 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full bg-white border-r border-slate-100 flex flex-col z-30 relative shadow-2xl shadow-slate-200/50"
      >
        <div className="h-24 flex items-center px-6">
           <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30 text-white relative group cursor-pointer">
                 <Zap className="w-6 h-6 fill-white relative z-10" />
                 <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {!isSidebarCollapsed && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black text-xl tracking-tighter">
                   Strat<span className="text-orange-600">Engine</span>
                 </motion.div>
              )}
           </div>
        </div>

        <div className="flex-1 px-4 space-y-1.5 overflow-y-auto py-4 custom-scrollbar">
           <p className={`px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 transition-opacity ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>Intelligence</p>
           
           <SidebarItem icon={LayoutGrid} label="Dashboard" active={activeTab === 'Dashboard'} collapsed={isSidebarCollapsed} onClick={() => setActiveTab('Dashboard')} />
           <SidebarItem icon={Database} label="Datasets" active={activeTab === 'Datasets'} collapsed={isSidebarCollapsed} onClick={() => setActiveTab('Datasets')} badge="New" />
           <SidebarItem icon={PieIcon} label="Market Analysis" active={activeTab === 'Analytics'} collapsed={isSidebarCollapsed} onClick={() => setActiveTab('Analytics')} />
           <SidebarItem icon={Globe} label="Scraping Tasks" active={activeTab === 'Scraping'} collapsed={isSidebarCollapsed} onClick={() => setActiveTab('Scraping')} />
           
           <div className="my-6 border-t border-slate-50" />
           
           <p className={`px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 transition-opacity ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>Configuration</p>
           <SidebarItem icon={Server} label="Proxies & Net" collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Code} label="API Keys" collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Settings} label="Settings" collapsed={isSidebarCollapsed} />

           {!isSidebarCollapsed && (
              <div className="mt-8 mx-2 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                   <Activity className="w-4 h-4 text-orange-500" />
                   <span className="text-xs font-black text-slate-900 uppercase">System Status</span>
                </div>
                <div className="space-y-1">
                   <StatusPill label="Scraper Nodes" status="good" />
                   <StatusPill label="Proxy Pool" status="good" />
                   <StatusPill label="Database API" status="warn" />
                </div>
              </div>
           )}
        </div>

        <div className="p-4 border-t border-slate-50">
           <button onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} className="w-full h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 transition-colors">
              {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
           </button>
        </div>
      </motion.aside>


      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
         
         {/* HEADER */}
         <header className="h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100 z-20 sticky top-0">
            {/* Search Bar */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm w-96 focus-within:ring-2 focus-within:ring-orange-100 transition-all hover:shadow-md">
               <Search className="w-4 h-4 text-slate-400" />
               <input type="text" placeholder="Search insights, datasets, or targets..." className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 w-full placeholder:text-slate-400" />
               <span className="text-[10px] font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded">⌘K</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
               <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:shadow-md transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
               </button>
               <div className="h-8 w-px bg-slate-200 mx-2" />
               <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="text-right hidden md:block">
                     <div className="text-xs font-bold text-slate-900">Alex Designer</div>
                     <div className="text-[10px] font-bold text-slate-400">Full Stack Lead</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-slate-900/20">AD</div>
               </div>
            </div>
         </header>

         {/* CONTENT SCROLL AREA */}
         <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-8">
               
               {/* Welcome & Actions */}
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                     <h1 className="text-3xl font-black text-slate-900 tracking-tight">Market Pulse</h1>
                     <p className="text-slate-500 font-medium text-sm mt-1 flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        System collecting data from <span className="text-slate-900 font-bold">124 sources</span>
                     </p>
                  </div>
                  <div className="flex gap-3">
                     <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                        <RefreshCw className="w-4 h-4" /> Force Sync
                     </button>
                     <button 
                       onClick={() => setIsModalOpen(true)}
                       className="px-5 py-2.5 bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xl shadow-slate-900/20 hover:shadow-orange-600/30 transition-all flex items-center gap-2 active:scale-95"
                     >
                        <Plus className="w-4 h-4" /> New Extraction
                     </button>
                  </div>
               </div>

               {/* KPI Row - Tailored for Scraping/SaaS */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    title="Active Scrapers" 
                    value="142" 
                    change="+12" 
                    trend="up" 
                    icon={Globe} 
                    subtext="Processing 4k pages/min"
                  />
                  <StatCard 
                    title="Records Extracted" 
                    value="8.4M" 
                    change="+24%" 
                    trend="up" 
                    icon={Database} 
                    subtext="This billing cycle"
                  />
                  <StatCard 
                    title="API Latency" 
                    value="42ms" 
                    change="-12ms" 
                    trend="up" 
                    icon={Zap} 
                    subtext="Global average"
                  />
                  <StatCard 
                    title="Active Proxies" 
                    value="850" 
                    change="-5" 
                    trend="down" 
                    icon={ShieldCheck} 
                    subtext="24 flagged/banned"
                  />
               </div>

               {/* Charts Row */}
               <div className="grid grid-cols-12 gap-6 h-[400px]">
                  {/* Bar Chart */}
                  <Card className="col-span-12 lg:col-span-8 p-8 flex flex-col">
                     <div className="flex justify-between items-center mb-4">
                        <div>
                           <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                              <BarChart3 className="w-5 h-5 text-orange-500" /> Data Ingestion Volume
                           </h3>
                           <p className="text-xs font-bold text-slate-400 mt-1">Records processed per day (Thousands)</p>
                        </div>
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-orange-500 transition-colors">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                     </div>
                     <div className="flex-1 w-full">
                        <VolumeBarChart />
                     </div>
                  </Card>

                  {/* Pie Chart */}
                  <Card className="col-span-12 lg:col-span-4 p-8 flex flex-col">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                           <PieIcon className="w-5 h-5 text-orange-500" /> Industry Split
                        </h3>
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                           <Filter className="w-4 h-4" />
                        </button>
                     </div>
                     <div className="flex-1">
                        <IndustryDonut />
                     </div>
                  </Card>
               </div>

               {/* Split Bottom Row */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                 {/* Live Feed - NEW */}
                 <Card className="lg:col-span-1 p-0 overflow-hidden flex flex-col h-[400px]">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                       <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                         <Activity className="w-4 h-4 text-orange-500" /> Live Feed
                       </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                       {liveFeed.map((feed) => (
                         <div key={feed.id} className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${feed.status === 'success' ? 'bg-green-500' : 'bg-orange-500'}`} />
                            <div>
                               <p className="text-xs font-bold text-slate-700 leading-tight group-hover:text-orange-600 transition-colors">{feed.action}</p>
                               <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{feed.target}</span>
                                  <span className="text-[10px] font-medium text-slate-300">{feed.time}</span>
                               </div>
                            </div>
                         </div>
                       ))}
                       {/* Faux items for scroll demo */}
                       {[...Array(5)].map((_, i) => (
                          <div key={i+10} className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors opacity-50">
                             <div className="mt-1 w-2 h-2 rounded-full shrink-0 bg-slate-300" />
                             <div>
                                <p className="text-xs font-bold text-slate-400 leading-tight">Background worker sync...</p>
                                <span className="text-[10px] font-medium text-slate-300">Older</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </Card>

                 {/* Data Table */}
                 <Card className="lg:col-span-2 p-0 overflow-hidden h-[400px] flex flex-col">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                       <h3 className="text-lg font-extrabold text-slate-900">Trigger Management</h3>
                       <button className="text-xs font-bold text-orange-600 hover:text-orange-700 px-4 py-2 bg-orange-50 rounded-lg transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                       <table className="w-full text-left border-collapse">
                          <thead>
                             <tr className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider bg-white border-b border-slate-50">
                                <th className="px-6 py-4">Trigger Name</th>
                                <th className="px-6 py-4">Industry</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Volume</th>
                             </tr>
                          </thead>
                          <tbody className="text-xs font-bold text-slate-600 divide-y divide-slate-50">
                             {triggers.map((t) => (
                                <tr key={t.id} className="group hover:bg-orange-50/20 transition-colors cursor-pointer">
                                   <td className="px-6 py-4 text-slate-900 text-sm flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                         {t.module === 'Price Monitor' && <Database className="w-4 h-4" />}
                                         {t.module === 'Sentiment Engine' && <Activity className="w-4 h-4" />}
                                         {t.module === 'Web Scraper' && <Globe className="w-4 h-4" />}
                                         {t.module === 'SERP Tracking' && <Search className="w-4 h-4" />}
                                      </div>
                                      <div>
                                         <div className="font-bold">{t.name}</div>
                                         <div className="text-[10px] text-slate-400 font-medium">{t.module}</div>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <span className="px-2 py-1 bg-slate-100 rounded text-slate-500 border border-slate-200">{t.industry}</span>
                                   </td>
                                   <td className="px-6 py-4">
                                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border ${
                                         t.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-50 text-slate-500 border-slate-200'
                                      }`}>
                                         <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`} />
                                         {t.status}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                      <div className="text-slate-900 font-black">{t.records}</div>
                                      <div className="text-[10px] text-slate-400">{t.lastRun}</div>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </Card>
               </div>

            </div>
         </main>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
         {isModalOpen && (
            <>
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
                  onClick={() => setIsModalOpen(false)}
               />
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden border border-slate-100"
               >
                  <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                     <div>
                        <h3 className="text-lg font-black text-slate-900">New Extraction Trigger</h3>
                        <p className="text-xs font-bold text-slate-400">Configure a new data pipeline</p>
                     </div>
                     <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                  
                  <div className="p-8 space-y-5">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Trigger Name</label>
                        <input type="text" placeholder="e.g. Monthly Competitor Price Scan" className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all" />
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Industry Vertical</label>
                           <div className="relative">
                              <select className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all appearance-none cursor-pointer">
                                 {INDUSTRIES.map(i => <option key={i.id}>{i.label}</option>)}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                 <ArrowDownRight className="w-4 h-4" />
                              </div>
                           </div>
                        </div>
                        <div>
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Intelligence Module</label>
                           <div className="relative">
                              <select className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all appearance-none cursor-pointer">
                                 {MODULES.map(m => <option key={m.id}>{m.label}</option>)}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                 <ArrowDownRight className="w-4 h-4" />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-orange-50 p-4 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="text-xs font-black text-orange-800">API Credit Usage</h4>
                           <p className="text-[11px] font-bold text-orange-600/80 leading-snug mt-1">This trigger will consume approx. 450 credits per run based on the selected module.</p>
                        </div>
                     </div>

                     <button className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-orange-600/20 transition-all mt-4 text-sm flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" /> Deploy Trigger
                     </button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>

    </div>
  );
}
