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
            text: report.title,
            heading: HeadingLevel.HEADING_1,
            thematicBreak: false,
            spacing: { after: 200 },
            alignment: AlignmentType.CENTER,
            run: new TextRun({
                bold: true,
                size: 28,
                color: "1F2121", // Slate 900
            }),
        }),

        new Paragraph({
            text: `Industry: ${report.industry}`,
            spacing: { after: 100 },
            run: new TextRun({
                italics: true,
                color: "626C7C", // Slate 500
            }),
        }),

        new Paragraph({
            text: `Generated on: ${report.createdAt.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })}`,
            spacing: { after: 300 },
            run: new TextRun({
                color: "A7A9A9", // Gray 300
                size: 20,
            }),
        }),

        new Paragraph({
            text: "─".repeat(80),
            spacing: { after: 300 },
        }),
    ];

    // Add sections if they exist
    if (report.sections && report.sections.length > 0) {
        report.sections.forEach((section, index) => {
            docSections.push(
                new Paragraph({
                    text: section.title,
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 },
                    run: new TextRun({
                        bold: true,
                        size: 24,
                        color: "208080", // Orange 600 equivalent
                    }),
                })
            );

            docSections.push(
                new Paragraph({
                    text: section.content,
                    spacing: { after: 200 },
                    alignment: AlignmentType.LEFT,
                })
            );
        });
    } else {
        // Default content if no sections provided
        docSections.push(
            new Paragraph({
                text: "Report Summary",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
                run: new TextRun({
                    bold: true,
                    size: 24,
                    color: "208080",
                }),
            }),
            new Paragraph({
                text: "This is your generated intelligence dossier. Review the details and insights provided in this document.",
                spacing: { after: 200 },
            })
        );
    }

    const doc = new Document({
        sections: [
            {
                children: docSections,
                margins: {
                    top: 1440, // 1 inch
                    right: 1440,
                    bottom: 1440,
                    left: 1440,
                },
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
