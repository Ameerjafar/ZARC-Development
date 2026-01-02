import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType, BorderStyle } from "docx";

export interface ReportContent {
    id: string;
    title: string;
    industry: string;
    createdAt: Date;
    sections?: {
        title: string;
        content: string;
    }[];
}

export async function generateWordDocument(report: ReportContent): Promise<Blob> {
    const docSections = [
        new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
                new TextRun({
                    text: report.title,
                    bold: true,
                    size: 28,
                    color: "1F2121", // Slate 900
                }),
            ],
        }),

        new Paragraph({
            spacing: { after: 100 },
            children: [
                new TextRun({
                    text: `Industry: ${report.industry}`,
                    italics: true,
                    color: "626C7C", // Slate 500
                }),
            ],
        }),

        new Paragraph({
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: `Generated on: ${report.createdAt.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}`,
                    color: "A7A9A9", // Gray 300
                    size: 20,
                }),
            ],
        }),

        new Paragraph({
            children: [
                new TextRun({
                    text: "─".repeat(80),
                }),
            ],
            spacing: { after: 300 },
        }),
    ];

    // Add sections if they exist
    if (report.sections && report.sections.length > 0) {
        report.sections.forEach((section) => {
            docSections.push(
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 },
                    children: [
                        new TextRun({
                            text: section.title,
                            bold: true,
                            size: 24,
                            color: "208080", // Orange 600 equivalent
                        }),
                    ],
                })
            );

            docSections.push(
                new Paragraph({
                    spacing: { after: 200 },
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: section.content,
                        }),
                    ],
                })
            );
        });
    } else {
        // Default content if no sections provided
        docSections.push(
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
                children: [
                    new TextRun({
                        text: "Report Summary",
                        bold: true,
                        size: 24,
                        color: "208080",
                    }),
                ],
            }),
            new Paragraph({
                spacing: { after: 200 },
                children: [
                    new TextRun({
                        text: "This is your generated intelligence dossier. Review the details and insights provided in this document.",
                    }),
                ],
            })
        );
    }

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: docSections,
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    return blob;
}

export function downloadFile(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
