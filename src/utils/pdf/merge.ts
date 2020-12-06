import { PDFDocument } from "pdf-lib";

const merge = async (pdfs: Uint8Array[]): Promise<Uint8Array> => {
    const mergedPdf = await PDFDocument.create();

    for (const pdfBytes of pdfs) {
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
        });
    }

    return await mergedPdf.save();
}

export default merge;
