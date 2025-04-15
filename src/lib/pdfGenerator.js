import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (element) => {
  try {
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  } catch (error) {
    console.error('Error in PDF generation:', error);
    throw error;
  }
};
