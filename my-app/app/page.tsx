"use client";

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
export default function Home() {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <main className="min-h-screen bg- selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      {/* <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      /> */}

    </main>
  );
}
