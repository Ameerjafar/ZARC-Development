"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Download, Share2, TrendingUp, Activity,
  Zap, Shield, AlertTriangle, Battery, Sun, Globe
} from "lucide-react";
import Link from "next/link";

// --- Data Structure Example ---
// This object represents the data your form would generate.
// Pass this structure as a prop to the ReportPage component.
const sampleReportData = {
  marketName: "Solar Energy",
  reportQuarter: "Q4 2025",
  reportScope: "Global Scope",
  executiveSummary: {
    main: "The solar energy landscape is currently undergoing a rapid consolidation phase (Q4 2025). Our analysis indicates that while residential adoption has slowed by 4% due to interest rate volatility, commercial installations have surged by 18%, driven by new corporate ESG mandates.",
    pivot: "Key competitors like SunRun and Tesla Energy are aggressively pivoting towards integrated battery storage solutions to combat grid instability. Standalone panel sales are declining in favor of 'Energy-as-a-Service' subscription models.",
    insight: "New entrants focusing on high-efficiency perovskite panels in the European market are threatening legacy silicon-based manufacturers."
  },
  stats: [
    { title: "Market Cap", value: "$142.5B", change: "+12.5%", icon: Globe, color: "text-blue-500" },
    { title: "Installation Growth", value: "18.2%", change: "+5.4%", icon: Activity, color: "text-green-500" },
    { title: "Storage Adoption", value: "42%", change: "+24%", icon: Battery, color: "text-purple-500" },
    { title: "Avg Cost / Watt", value: "$2.15", change: "-8.1%", icon: Sun, color: "text-orange-500" }
  ],
  aiInsight: {
    title: "Critical Gap Detected",
    description: "64% of identified competitors are under-investing in VPP (Virtual Power Plant) software compatibility."
  },
  competitors: [
    { name: "Tesla Energy", share: "24", strategy: "Ecosystem Lock-in", risk: "High" },
    { name: "SunRun", share: "18", strategy: "Leasing Model", risk: "Medium" },
    { name: "Enphase", share: "12", strategy: "Microinverters", risk: "Low" }
  ]
};


// --- Animation Variants ---
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// --- Sub-Components ---
const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="p-5 rounded-3xl bg-[#131315] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon className="w-12 h-12" />
    </div>
    <div className="flex flex-col h-full justify-between relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <span className={`p-1.5 rounded-lg bg-white/5 ${color} text-white`}>
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-gray-400 text-sm font-medium">{title}</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-green-400 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {change} <span className="text-gray-600">vs last Q</span>
        </div>
      </div>
    </div>
  </div>
);

const CompetitorRow = ({ name, share, strategy, risk }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-black border border-white/10 flex items-center justify-center text-xs font-bold">
        {name.substring(0, 2)}
      </div>
      <div>
        <h4 className="text-sm font-medium text-white">{name}</h4>
        <p className="text-xs text-gray-400">{strategy}</p>
      </div>
    </div>
    <div className="text-right">
      <div className="text-sm font-bold text-white">{share}%</div>
      <div className={`text-xs ${risk === 'High' ? 'text-red-400' : risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
        {risk} Threat
      </div>
    </div>
  </div>
);

// --- Main Page ---
const ReportPageContent = ({ reportData }) => {
  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-8 pt-24 selection:bg-orange-500/30">
      
      {/* Ambient Background for Solar Theme */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Generator
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {reportData.marketName} <span className="text-gray-600">Market Intel</span>
            </h1>
            <div className="flex items-center gap-3 mt-3 text-sm text-gray-400">
              <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white">{reportData.reportQuarter}</span>
              <span>•</span>
              <span>{reportData.reportScope}</span>
              <span>•</span>
              <span className="text-green-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Live Data</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 transition-colors text-black text-sm font-bold shadow-lg shadow-orange-900/20">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </motion.header>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]"
        >

          {/* 1. Executive Summary (Wide) */}
          <motion.div variants={itemVar} className="md:col-span-2 lg:col-span-2 row-span-2 p-8 rounded-3xl bg-[#131315] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <FileIcon className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" /> Executive Summary
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">Consolidation Phase:</strong> {reportData.executiveSummary.main}
                </p>
                <p>
                  <strong className="text-white">Pivot to Storage:</strong> {reportData.executiveSummary.pivot}
                </p>
                <div className="p-4 mt-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <h4 className="text-blue-300 text-sm font-bold mb-1 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Global Insight
                  </h4>
                  <p className="text-xs text-blue-100/70">
                    {reportData.executiveSummary.insight}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Key Stats (Top Right) */}
          <motion.div variants={itemVar} className="md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-4">
            {reportData.stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </motion.div>

          {/* 3. AI Insight (Middle Row) */}
          <motion.div variants={itemVar} className="md:col-span-1 lg:col-span-1 p-6 rounded-3xl bg-gradient-to-b from-orange-500/20 to-[#131315] border border-orange-500/20 flex flex-col justify-center">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-black flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{reportData.aiInsight.title}</h3>
            <p className="text-sm text-gray-300 mb-4">
              {reportData.aiInsight.description}
            </p>
            <button className="w-full py-2 text-xs font-bold text-black bg-white rounded-lg hover:bg-gray-200 transition-colors">
              View Opportunity
            </button>
          </motion.div>

          {/* 4. Competitor Table (Bottom Row) */}
          <motion.div variants={itemVar} className="md:col-span-3 lg:col-span-3 p-8 rounded-3xl bg-[#131315] border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" /> Competitor Matrix
              </h2>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">View All</button>
            </div>
            <div className="space-y-3">
              {reportData.competitors.map((competitor, index) => (
                <CompetitorRow
                  key={index}
                  name={competitor.name}
                  share={competitor.share}
                  strategy={competitor.strategy}
                  risk={competitor.risk}
                />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}

// Default export renders the page with sample data
export default function ReportPage() {
    return <ReportPageContent reportData={sampleReportData} />;
}

const FileIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)
