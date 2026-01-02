export interface Report {
  id: string;
  title: string;
  industry: string;
  createdAt: Date;
  fileSize: string;
  modules: string[];
}

export const MOCK_REPORTS: Report[] = [
  {
    id: "REP-001",
    title: "Q4 E-commerce Market Trends & Competitor Analysis",
    industry: "E-commerce",
    createdAt: new Date("2024-10-15"),
    fileSize: "2.4 MB",
    modules: [
      "Market Analysis",
      "Competitor Intelligence",
      "Financial Projections",
      "Risk Assessment",
      "Growth Opportunities",
      "SWOT Analysis",
    ],
  },
  {
    id: "REP-002",
    title: "Fintech Regulatory Landscape 2025",
    industry: "Fintech",
    createdAt: new Date("2024-11-02"),
    fileSize: "1.1 MB",
    modules: ["Risk Assessment", "Financial Projections"],
  },
  {
    id: "REP-003",
    title: "SaaS Churn Analysis & Retention Strategy",
    industry: "SaaS",
    createdAt: new Date("2024-09-28"),
    fileSize: "3.5 MB",
    modules: ["Market Analysis", "Growth Opportunities", "SWOT Analysis"],
  },
  {
    id: "REP-004",
    title: "Global Renewable Energy Supply Chain Report",
    industry: "Energy",
    createdAt: new Date("2024-12-05"),
    fileSize: "4.2 MB",
    modules: ["Market Analysis", "Risk Assessment", "Competitor Intelligence"],
  },
  {
    id: "REP-005",
    title: "Healthcare AI Adoption Feasibility Study",
    industry: "Healthcare",
    createdAt: new Date("2024-08-10"),
    fileSize: "1.8 MB",
    modules: ["Financial Projections", "SWOT Analysis"],
  },
];
export const addReport = (newReport: Report) => {
  MOCK_REPORTS.unshift(newReport);
};
