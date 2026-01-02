export interface Option {
    id: string;
    label: string;
    category?: string;
    icon?: any;
}

export interface ReportSection {
    title: string;
    content: string;
}

export interface Report {
    id: string;
    title: string;
    industry: string;
    createdAt: Date;
    fileSize?: string;
    status?: "completed" | "processing" | "failed";
    modules: string[];
    sections?: ReportSection[];
}
