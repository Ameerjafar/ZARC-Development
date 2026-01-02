"use client";

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
export default function Home() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);

  return (
    <main className="min-h-screen bg- selection:bg-blue-500/30">
      <Navbar onOpenAuth={(mode) => setAuthMode(mode)} />
      <Hero />
      {/* <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      /> */}

    </main>
  );
}
