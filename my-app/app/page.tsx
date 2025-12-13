"use client";

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import Hero  from "./components/Hero";
import  { ReportModal }  from "./components/ReportModal";
import { AuthModal } from "./components/AuthModal";

export default function Home() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);

  return (
    <main className="min-h-screen bg-black selection:bg-blue-500/30">
      <Navbar onOpenAuth={(mode) => setAuthMode(mode)} />
      <Hero />
      
      <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />
      
      <AuthModal 
        isOpen={!!authMode} 
        initialMode={authMode || "signin"} 
        onClose={() => setAuthMode(null)} 
      />
    </main>
  );
}
