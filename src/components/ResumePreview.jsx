import React, { useRef, useState, forwardRef } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import MinimalistTemplate from './Templates/MinimalistTemplate';
import ClassicTemplate from './Templates/ClassicTemplate';
import ModernTemplate from './Templates/ModernTemplate';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

const ResumePreview = forwardRef(({ scale = 1, isFullPreview = false }, ref) => {
  const { resumeData, selectedTemplate } = useResumeContext();
  const internalRef = useRef(null);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const setRefs = (el) => {
    internalRef.current = el;
    if (ref) {
      if (typeof ref === 'function') {
        ref(el);
      } else {
        ref.current = el;
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      toast.info("Generating PDF...");

      const resumeElement = internalRef.current;
      if (!resumeElement) {
        console.error('Resume content element not found');
        toast.error("Could not find resume content. Please try again.");
        return;
      }

      const clone = resumeElement.cloneNode(true);
      
      clone.style.width = '210mm';
      clone.style.minHeight = '297mm';
      clone.style.margin = '0';
      clone.style.padding = '15mm';
      clone.style.boxSizing = 'border-box';
      clone.style.transform = 'none';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.backgroundColor = '#ffffff';
      
      const textElements = clone.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, div');
      textElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const currentFontSize = parseFloat(computedStyle.fontSize);
        
        const scaleFactor = 1.5;
        el.style.fontSize = `${currentFontSize * scaleFactor}px`;
        
        const currentLineHeight = computedStyle.lineHeight;
        if (currentLineHeight !== 'normal') {
          const lineHeightValue = parseFloat(currentLineHeight);
          el.style.lineHeight = `${lineHeightValue * scaleFactor}`;
        }
      });

      const noPdfElements = clone.querySelectorAll('.no-pdf');
      noPdfElements.forEach(el => el.remove());

      document.body.appendChild(clone);
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 210 * 3.78,
        windowHeight: 297 * 3.78,
      });

      clone.remove();

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = pdfHeight;

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      const fileName = resumeData.personalInfo?.name 
        ? `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf` 
        : 'resume.pdf';
      pdf.save(fileName);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate PDF. Please try again later.");
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      default:
        return <MinimalistTemplate data={resumeData} />;
    }
  };

  const previewStyles = {
    width: '100%',
    height: 'auto',
    padding: '1rem',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: '1rem',
    lineHeight: '1.5'
  };

  if (isFullPreview) {
    return (
      <div className="w-full h-full">
        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg overflow-hidden no-print">
          <div 
            ref={internalRef}
            style={{ ...previewStyles, transform: `scale(${scale})`, transformOrigin: 'top center' }}
            className="resume-page bg-white shadow-lg"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[800px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div 
          id="resume-content" 
          ref={setRefs}
          style={previewStyles}
          className="resume-page origin-top bg-white"
        >
          {renderTemplate()}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Button onClick={() => setShowFullPreview(true)} className="flex items-center">
          View Complete Resume
        </Button>
        <Button onClick={handleDownloadPDF} className="flex items-center" variant="outline">
          <Download size={14} className="mr-1" />
          Download PDF
        </Button>
      </div>

      <Dialog open={showFullPreview} onOpenChange={setShowFullPreview}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Complete Resume</DialogTitle>
            <DialogDescription>
              View and download your complete resume
            </DialogDescription>
          </DialogHeader>
          <div className="bg-white p-4 rounded-lg">
            <div id="full-resume-content">
              {renderTemplate()}
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2 mt-4">
            <Button onClick={handleDownloadPDF} className="flex items-center" variant="outline">
              <Download size={14} className="mr-1" />
              Download PDF
            </Button>
            <Button onClick={() => setShowFullPreview(false)}>
              Continue Editing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default ResumePreview;
