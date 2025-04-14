import React, { useState, useRef, useEffect } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import PersonalInfoForm from './FormSections/PersonalInfoForm';
import ExperienceForm from './FormSections/ExperienceForm';
import EducationForm from './FormSections/EducationForm';
import SkillsForm from './FormSections/SkillsForm';
import ProjectsForm from './FormSections/ProjectsForm';
import CertificationsForm from './FormSections/CertificationsForm';
import ResumePreview from './ResumePreview';
import { Button } from './ui/button';
import { Download, Maximize, Save, RotateCcw, AlertTriangle, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import Navigation from './Navigation';

const Craftfolio = () => {
  const { resumeData, selectedTemplate, clearResume } = useResumeContext();
  const [currentSection, setCurrentSection] = useState('personal');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const resumeRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show mobile notification
  useEffect(() => {
    if (isMobile) {
      toast.info(
        "For the best experience, please open this site on a desktop device.",
        {
          duration: 10000,
          position: "top-center",
          className: "bg-yellow-50 border border-yellow-200 text-yellow-800",
          action: {
            label: "Got it",
            onClick: () => {}
          }
        }
      );
    }
  }, [isMobile]);

  // Show notification on first visit
  useEffect(() => {
    const hasSeenNotification = localStorage.getItem('hasSeenResumeNotification');
    
    if (!hasSeenNotification) {
      // Show notification after a short delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        setShowArrow(true);
        toast.info(
          "To see how your resume actually looks, click the 'View Complete Resume' button in the top right.",
          {
            duration: 8000,
            position: "top-center",
            action: {
              label: "Got it",
              onClick: () => {
                localStorage.setItem('hasSeenResumeNotification', 'true');
                setShowArrow(false);
              }
            }
          }
        );
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const sections = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' }
  ];

  const handleNext = () => {
    const currentIndex = sections.findIndex(section => section.id === currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex(section => section.id === currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1].id);
    }
  };

  const handleSave = () => {
    // Data is already being saved to localStorage through the ResumeContext
    toast.success("Progress saved successfully!");
  };

  const handleReset = () => {
    setShowResetDialog(true);
  };

  const confirmReset = () => {
    clearResume();
    setShowResetDialog(false);
    toast.success("Resume has been reset. You can now start fresh!");
  };

  const handleDownload = async () => {
    if (!resumeRef.current) {
      toast.error("Unable to generate PDF. Please try again.");
      return;
    }

    try {
      toast.info("Generating PDF...");

      const resumeElement = resumeRef.current;
      
      // Create a hidden clone for PDF generation
      const clone = resumeElement.cloneNode(true);
      
      // Set A4 dimensions and styling for the clone
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
      
      // Remove any elements that should not be included in the PDF
      const noPdfElements = clone.querySelectorAll('.no-pdf');
      noPdfElements.forEach(el => el.remove());

      // Add a class to the clone for PDF-specific styling
      clone.classList.add('pdf-export');
      
      // Apply PDF-specific styles to prevent text stretching
      const style = document.createElement('style');
      style.textContent = `
        .pdf-export * {
          font-family: Arial, sans-serif !important;
          line-height: 1.5 !important;
          letter-spacing: normal !important;
          word-spacing: normal !important;
        }
        .pdf-export h1 { font-size: 24px !important; }
        .pdf-export h2 { font-size: 20px !important; }
        .pdf-export h3 { font-size: 18px !important; }
        .pdf-export p, .pdf-export li { font-size: 12px !important; }
      `;
      clone.appendChild(style);

      document.body.appendChild(clone);
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for DOM update

      // Generate canvas with higher scale for better quality
      const canvas = await html2canvas(clone, {
        scale: 2, // Good balance between quality and performance
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 210 * 3.78, // Convert mm to pixels (1mm = 3.78px)
        windowHeight: 297 * 3.78,
      });

      // Clean up the clone
      clone.remove();

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to maintain aspect ratio and fill the page
      const imgWidth = pdfWidth;
      const imgHeight = pdfHeight;

      // Add the image to fill the page
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

  const renderSection = () => {
    switch (currentSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'certifications':
        return <CertificationsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Craftfolio</h1>
          <div className="flex flex-wrap gap-2 relative">
            {showArrow && (
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50">
                <ArrowDown className="h-10 w-10 text-blue-600 animate-bounce" />
                <span className="text-sm text-blue-600 font-medium bg-white px-3 py-1.5 rounded-lg shadow-lg border border-blue-200">
                  Click here to view your resume!
                </span>
              </div>
            )}
            <Button variant="outline" onClick={handleReset} className="flex items-center">
              <RotateCcw size={16} className="mr-1" />
              Reset
            </Button>
            <Button variant="outline" onClick={handleSave} className="flex items-center">
              <Save size={16} className="mr-1" />
              Save Progress
            </Button>
            <Button variant="outline" onClick={handleDownload} className="flex items-center">
              <Download size={16} className="mr-1" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={() => setShowFullPreview(true)} className="flex items-center">
              <Maximize size={16} className="mr-1" />
              View Complete Resume
            </Button>
          </div>
        </div>

        {isMobile && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="text-yellow-800 text-sm">
              <span className="font-semibold">Note:</span> This resume builder works best on desktop devices. UI may be limited on mobile.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={currentSection === section.id ? "default" : "outline"}
                    onClick={() => setCurrentSection(section.id)}
                    className="flex-1 min-w-[150px]"
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
              {renderSection()}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 'personal'}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentSection === 'projects'}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <ResumePreview ref={resumeRef} />
          </div>
        </div>

        {/* Full Preview Dialog */}
        <Dialog open={showFullPreview} onOpenChange={setShowFullPreview}>
          <DialogContent className="max-w-4xl w-full p-0 m-0 overflow-auto bg-white" style={{ height: '90vh' }}>
            <div className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-2 bg-white border-b">
              <h2 className="text-lg font-semibold">Complete Resume Preview</h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleDownload} className="flex items-center">
                  <Download size={16} className="mr-1" />
                  Download PDF
                </Button>
                <Button onClick={() => setShowFullPreview(false)}>
                  Continue Editing
                </Button>
              </div>
            </div>
            <div className="flex justify-center bg-gray-100 p-4 overflow-auto" style={{ height: 'calc(90vh - 52px)' }}>
              <div className="resume-page-full bg-white shadow-lg">
                <ResumePreview scale={1} />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reset Confirmation Dialog */}
        <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2 text-amber-500">
                <AlertTriangle size={20} />
                <DialogTitle>Reset Resume</DialogTitle>
              </div>
              <DialogDescription className="pt-2">
                Are you sure you want to reset all progress? This will clear all your saved data and cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button 
                variant="destructive" 
                onClick={confirmReset}
                className="w-full sm:w-auto"
              >
                Yes, Reset Everything
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowResetDialog(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Craftfolio;
