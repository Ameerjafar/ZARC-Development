import { Zap, BarChart3, LayoutDashboard, Tag, Box, Building2, ShieldCheck, Globe2, Cpu } from "lucide-react";
import { Option } from "../types/reporting";

export const ALL_INDUSTRIES: Option[] = [
    { id: "solar", label: "Solar Energy", icon: Zap },
    { id: "fintech", label: "Fintech Payments", icon: BarChart3 },
    { id: "saas_b2b", label: "B2B SaaS", icon: LayoutDashboard },
    { id: "ecommerce_fashion", label: "E-commerce (Fashion)", icon: Tag },
    { id: "biotech", label: "Biotechnology", icon: Box },
    { id: "real_estate", label: "Commercial Real Estate", icon: Building2 },
    { id: "cybersec", label: "Cybersecurity", icon: ShieldCheck },
    { id: "agritech", label: "Agritech", icon: Globe2 },
    { id: "gaming", label: "Gaming & Esports", icon: Cpu },
];

export const ALL_MODULES: Option[] = [
    { id: "tam_sam_som", label: "Market Size (TAM/SAM/SOM)", category: "Market" },
    { id: "growth_forecast", label: "5-Year Growth Forecast", category: "Market" },
    { id: "swot", label: "SWOT Analysis", category: "Strategy" },
    { id: "pestle", label: "PESTLE Framework", category: "Strategy" },
    { id: "competitor_pricing", label: "Competitor Pricing Matrix", category: "Competitor" },
    { id: "feature_gap", label: "Feature Gap Analysis", category: "Competitor" },
    { id: "market_share", label: "Market Share Breakdown", category: "Competitor" },
    { id: "customer_persona", label: "Customer Personas", category: "Consumer" },
    { id: "sentiment_analysis", label: "Brand Sentiment Analysis", category: "Consumer" },
    { id: "ma_activity", label: "Recent M&A Activity", category: "Finance" },
    { id: "funding_trends", label: "VC Funding Trends", category: "Finance" },
    { id: "seo_gap", label: "SEO Keyword Gap", category: "Digital" },
    { id: "tech_stack", label: "Technology Stack Intel", category: "Tech" },
    { id: "app_ratings", label: "Mobile App Performance", category: "Digital" },
    { id: "regulatory", label: "Regulatory Landscape", category: "Legal" },
    { id: "supply_chain", label: "Supply Chain Risks", category: "Ops" },
    { id: "patent_landscape", label: "Patent & IP Landscape", category: "R&D" },
];
