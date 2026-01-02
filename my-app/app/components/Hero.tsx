"use client";

import React from "react";
import { HeroBanner } from "./hero/HeroBanner";
import { Marquee } from "./hero/Marquee";
import { IntelligenceEngine } from "./hero/IntelligenceEngine";
import { HowItWorks } from "./hero/HowItWorks";
import { CoreModules } from "./hero/CoreModules";
import { WhyZarc } from "./hero/WhyZarc";
import { EcosystemGrid } from "./hero/EcosystemGrid";
import { Testimonials } from "./hero/Testimonials";
import { CTASection } from "./hero/CTASection";
import { FAQSection } from "./hero/FAQSection";
import { Footer } from "./hero/Footer";

export default function Hero() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <HeroBanner />
      <Marquee />
      <IntelligenceEngine />
      <HowItWorks />
      <CoreModules />
      <WhyZarc />
      <EcosystemGrid />
      <Testimonials />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
}
