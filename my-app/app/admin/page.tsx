"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  LayoutGrid,
  PieChart as PieIcon,
  Globe,
  Database,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  AlertCircle,
  X,
  Settings,
  Menu,
  ChevronRight,
  BarChart3,
  RefreshCw,
  Filter,
  Activity,
  Server,
  Code,
  ShieldCheck,
  Users,
  Bell,
  Tag,
  Building2 // Added for the Industry icon
} from "lucide-react";

// --- DATA ---
const PLAN_TYPES = [
  { id: "free", label: "Free", color: "#E5E7EB" },
  { id: "starter", label: "Starter", color: "#22C55E" },
  { id: "growth", label: "Growth", color: "#3B82F6" },
  { id: "enterprise", label: "Enterprise", color: "#F97316" },
];

const recentWorkspaces = [
  { id: 1, name: "Nexmart Analytics", owner: "alex@nexmart.io", plan: "Growth", users: 18, status: "Active", lastActive: "2m ago" },
  { id: 2, name: "Beacon Retail", owner: "ops@beacon.com", plan: "Enterprise", users: 41, status: "Active", lastActive: "12m ago" },
  { id: 3, name: "FinEdge Labs", owner: "cto@finedge.ai", plan: "Starter", users: 7, status: "Active", lastActive: "1h ago" },
  { id: 4, name: "SteadyCare Health", owner: "data@steady.care", plan: "Growth", users: 23, status: "Trial", lastActive: "3h ago" },
  { id: 5, name: "Orbit Travel Group", owner: "it@orbittravel.co", plan: "Free", users: 3, status: "Paused", lastActive: "1d ago" },
];

const systemEvents = [
  { id: 1, action: "3 new workspaces created", target: "Self-serve signup", time: "Just now", status: "success" },
  { id: 2, action: "Error rate spiked to 1.8%", target: "EU ingestion cluster", time: "38s ago", status: "warn" },
  { id: 3, action: "Plan upgraded to Enterprise", target: "Beacon Retail", time: "4m ago", status: "success" },
  { id: 4, action: "New admin invited", target: "alex@demo.io", time: "9m ago", status: "success" },
];

// --- COMPONENTS ---
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_-10px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({ title, value, change, trend, icon: Icon, subtext }: any) => (
  <Card className="p-6 relative overflow-hidden group">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-orange-500/10 via-slate-900/5 to-transparent rounded-full blur-2xl"
    />
    <div className="relative z-10 flex justify-between items-start mb-4">
      <motion.div whileHover={{ rotate: 4, scale: 1.05 }} className="p-3 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-orange-400 shadow-md shadow-slate-900/40">
        <Icon className="w-5 h-5" />
      </motion.div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend === "up" ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"}`}>
        {trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <motion.div key={value} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
        {value}
      </motion.div>
      {subtext && <div className="text-[10px] font-bold text-slate-400 mt-1">{subtext}</div>}
    </div>
  </Card>
);

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick, badge }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${active ? "bg-slate-900 text-white shadow-lg shadow-slate-900/40" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
  >
    <Icon className={`w-5 h-5 relative z-10 transition-transform group-hover:scale-110 ${active ? "text-orange-400" : ""}`} />
    {!collapsed && (
      <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex items-center justify-between relative z-10 overflow-hidden">
        <span className="font-bold text-sm whitespace-nowrap">{label}</span>
        {badge && <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm shadow-orange-500/50">{badge}</span>}
      </motion.div>
    )}
  </button>
);

const StatusPill = ({ label, status }: { label: string; status: "good" | "warn" | "error" }) => {
  const colors: Record<string, string> = { good: "bg-green-500 shadow-green-500/60", warn: "bg-orange-500 shadow-orange-500/60", error: "bg-red-500 shadow-red-500/60" };
  const text = { good: "Healthy", warn: "Attention", error: "Degraded" }[status];
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xs font-bold text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase">{text}</span>
        <span className={`w-2 h-2 rounded-full ${colors[status]} shadow-[0_0_12px]`} />
      </div>
    </div>
  );
};

// --- CHARTS ---
const SignupsBarChart = () => {
  const data = [35, 52, 44, 61, 80, 58, 72];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="h-full w-full flex items-end justify-between gap-2 pt-8">
      {data.map((value, i) => (
        <div key={i} className="flex-1 h-full flex flex-col justify-end group cursor-pointer relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 pointer-events-none transform translate-y-2 group-hover:translate-y-0 shadow-xl">
            {value} new workspaces
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
          </div>
          <div className="w-full bg-slate-100/80 rounded-t-xl relative h-full overflow-hidden">
            <motion.div initial={{ height: 0 }} animate={{ height: `${value}%` }} transition={{ delay: i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-0 w-full bg-slate-200/80 group-hover:bg-orange-200/70 transition-colors rounded-t-xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.08 }} className="absolute bottom-0 w-full h-full bg-gradient-to-t from-orange-500 to-amber-300 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 mt-3 text-center group-hover:text-orange-500 transition-colors">{days[i]}</span>
        </div>
      ))}
    </div>
  );
};

const PlanDonut = () => {
  const slices = [
    { label: "Free", value: 32, color: PLAN_TYPES[0].color },
    { label: "Starter", value: 24, color: PLAN_TYPES[1].color },
    { label: "Growth", value: 18, color: PLAN_TYPES[2].color },
    { label: "Enterprise", value: 26, color: PLAN_TYPES[3].color },
  ];
  const total = slices.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 0;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex items-center justify-center gap-6 h-full">
      <div className="relative w-32 h-32 shrink-0 group">
        <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 overflow-visible relative z-10">
          {slices.map((slice, i) => {
            const percentage = slice.value / total;
            const strokeDasharray = `${percentage * circumference} ${circumference}`;
            const strokeDashoffset = -currentAngle * circumference;
            currentAngle += percentage;
            return <motion.circle key={i} initial={{ strokeDasharray: `0 ${circumference}` }} animate={{ strokeDasharray }} transition={{ duration: 1.1, delay: i * 0.2, ease: "easeOut" }} cx="50" cy="50" r={radius} fill="transparent" stroke={slice.color} strokeWidth="12" strokeLinecap="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} className="hover:scale-105 origin-center transition-transform duration-300 cursor-pointer" />;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <span className="text-2xl font-black text-slate-900">284</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Active orgs</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: s.color }} />
            <div className="flex flex-col leading-none">
              <span className="text-xs font-bold text-slate-700">{s.label}</span>
              <span className="text-[10px] font-bold text-slate-400">{s.value}% of orgs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdminConsole() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle Industry click
  const handleIndustryClick = () => {
    setActiveTab("Industry");
    window.location.href = "/admin/industry";
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 flex overflow-hidden selection:bg-orange-100 selection:text-orange-900">
      {/* SIDEBAR */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 84 : 280 }} transition={{ type: "spring", stiffness: 260, damping: 28 }} className="h-full bg-white border-r border-slate-100 flex flex-col z-30 relative shadow-2xl shadow-slate-200/50">
        <div className="h-20 flex items-center px-6">
          <div className="flex items-center gap-3 overflow-hidden">
            <motion.div whileHover={{ rotate: -6, scale: 1.05 }} className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-600/40 text-white relative group cursor-pointer">
              <Zap className="w-6 h-6 fill-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            {!isSidebarCollapsed && (<motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="font-black text-xl tracking-tighter">Strat<span className="text-orange-500">Admin</span></motion.div>)}
          </div>
        </div>
        <div className="flex-1 px-4 space-y-1.5 overflow-y-auto py-4 custom-scrollbar">
          <SidebarItem icon={LayoutGrid} label="Overview" active={activeTab === "Overview"} collapsed={isSidebarCollapsed} onClick={() => setActiveTab("Overview")} />
          <SidebarItem icon={Users} label="Workspaces" active={activeTab === "Workspaces"} collapsed={isSidebarCollapsed} onClick={() => setActiveTab("Workspaces")} />
          <SidebarItem icon={Database} label="Usage & Billing" active={activeTab === "Usage"} collapsed={isSidebarCollapsed} onClick={() => setActiveTab("Usage")} badge="Live" />
          <SidebarItem icon={Server} label="Infrastructure" active={activeTab === "Infra"} collapsed={isSidebarCollapsed} onClick={() => setActiveTab("Infra")} />
          <div className="my-6 border-t border-slate-100" />
          
          {/* UPDATED SECTION: Removed Taxonomy, Added Industry */}
          <SidebarItem 
            icon={Building2} 
            label="Industry" 
            active={activeTab === "Industry"} 
            collapsed={isSidebarCollapsed} 
            onClick={handleIndustryClick} 
            badge="Manage" 
          />
          
          <SidebarItem icon={Code} label="API & Keys" collapsed={isSidebarCollapsed} />
          <SidebarItem icon={Settings} label="Settings" collapsed={isSidebarCollapsed} />
          {!isSidebarCollapsed && (
            <div className="mt-8 mx-2 bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-black text-slate-900 uppercase">System Health</span>
              </div>
              <div className="space-y-1">
                <StatusPill label="API Gateway" status="good" />
                <StatusPill label="Background Workers" status="good" />
                <StatusPill label="EU Cluster" status="warn" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-slate-100"><button onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} className="w-full h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors">{isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button></div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <header className="h-20 px-8 flex items-center justify-between bg-white/70 backdrop-blur-xl border-b border-slate-100 z-20 sticky top-0">
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm w-96 focus-within:ring-2 focus-within:ring-orange-500/40 transition-all hover:shadow-md hover:border-slate-300">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search workspaces, users, or events..." className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 w-full placeholder:text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">⌘K</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right hidden md:block"><div className="text-xs font-bold text-slate-900">Platform Admin</div><div className="text-[10px] font-bold text-slate-400">Superuser</div></div>
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-slate-900/30">SA</div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">Admin Overview <span className="px-2 py-1 text-[10px] rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold">Live</span></h1>
                <p className="text-slate-500 font-medium text-sm mt-1 flex items-center gap-2">Monitoring <span className="text-slate-900 font-bold">284 active workspaces</span> across all regions</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                  <RefreshCw className="w-4 h-4" /> Refresh metrics
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Monthly Recurring" value="$126.4k" change="+8.3%" trend="up" icon={BarChart3} subtext="vs last 30 days" />
              <StatCard title="Active Seats" value="4,291" change="+214" trend="up" icon={Users} subtext="Paid + trial" />
              <StatCard title="Avg. API Latency" value="63ms" change="-9ms" trend="up" icon={Zap} subtext="Global p95" />
              <StatCard title="Error Rate" value="0.7%" change="+0.2%" trend="down" icon={ShieldCheck} subtext="Last 15 minutes" />
            </div>

            <div className="grid grid-cols-12 gap-6 h-[400px]">
              <Card className="col-span-12 lg:col-span-8 p-8 flex flex-col bg-white">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-orange-500" /> Weekly workspace signups</h3>
                    <p className="text-xs font-bold text-slate-400 mt-1">New organizations created per day</p>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-orange-500 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                </div>
                <div className="flex-1 w-full"><SignupsBarChart /></div>
              </Card>
              <Card className="col-span-12 lg:col-span-4 p-8 flex flex-col bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2"><PieIcon className="w-5 h-5 text-orange-500" /> Plan distribution</h3>
                  <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><Filter className="w-4 h-4" /></button>
                </div>
                <div className="flex-1"><PlanDonut /></div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 p-0 overflow-hidden flex flex-col h-[400px] bg-white">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2"><Activity className="w-4 h-4 text-orange-500" /> Live events</h3>
                  <span className="text-[10px] font-bold text-slate-400">Realtime stream</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {systemEvents.map((e) => (
                    <motion.div key={e.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${e.status === "success" ? "bg-emerald-500" : "bg-orange-500"}`} />
                      <div>
                        <p className="text-xs font-bold text-slate-700 leading-tight group-hover:text-orange-600 transition-colors">{e.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{e.target}</span>
                          <span className="text-[10px] font-medium text-slate-300">{e.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
              <Card className="lg:col-span-2 p-0 overflow-hidden h-[400px] flex flex-col bg-white">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="text-lg font-extrabold text-slate-900">Recent workspaces</h3>
                  <button className="text-xs font-bold text-orange-600 hover:text-orange-700 px-4 py-2 bg-orange-50 rounded-lg transition-colors border border-orange-200">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider bg-white border-b border-slate-100">
                        <th className="px-6 py-4">Workspace</th>
                        <th className="px-6 py-4">Owner</th>
                        <th className="px-6 py-4">Plan</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Seats</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-bold text-slate-600 divide-y divide-slate-100">
                      {recentWorkspaces.map((w) => (
                        <tr key={w.id} className="group hover:bg-orange-50/50 transition-colors cursor-pointer">
                          <td className="px-6 py-4 text-sm flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Globe className="w-4 h-4" /></div>
                            <div>
                              <div className="font-bold text-slate-900">{w.name}</div>
                              <div className="text-[10px] text-slate-400 font-medium">Last active {w.lastActive}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[11px] text-slate-500">{w.owner}</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 rounded text-slate-500 border border-slate-200 text-[11px]">{w.plan}</span></td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border ${w.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : w.status === "Trial" ? "bg-sky-50 text-sky-600 border-sky-200" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${w.status === "Active" ? "bg-emerald-500" : w.status === "Trial" ? "bg-sky-500" : "bg-slate-400"}`} />
                              {w.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right"><div className="text-slate-900 font-black">{w.users}</div></td>
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

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 24 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden border border-slate-100">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <div><h3 className="text-lg font-black text-slate-900">New workspace</h3><p className="text-xs font-bold text-slate-400">Provision a new organization</p></div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-8 space-y-5">
                <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Workspace name</label><input type="text" placeholder="e.g. Beacon Retail EU" className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all" /></div>
                <button className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-orange-600/30 transition-all mt-4 text-sm flex items-center justify-center gap-2"><Zap className="w-4 h-4" /> Provision workspace</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
