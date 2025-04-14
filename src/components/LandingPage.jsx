import React, { useState, useEffect } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import minimalistImg from './minimalist.jpg';
import classicImg from './classic.jpg';
import modernImg from './modern.png';

const LandingPage = () => {
  const { setSelectedTemplate } = useResumeContext();
  const [selectedTemplateId, setSelectedTemplateId] = useState('minimalist');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const templates = [
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Clean and simple design with a focus on content.',
      image: minimalistImg,
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional resume layout with a professional look.',
      image: classicImg,
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design with a fresh and dynamic feel.',
      image: modernImg,
    },
  ];

  const handleStartBuilding = () => {
    setSelectedTemplate(selectedTemplateId);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Craftfolio
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Create a professional resume in minutes with our easy-to-use builder.
            Choose a template, fill in your details, and download your resume, no more signup.
          </p>
        </div>

        {isMobile && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm">
              <span className="font-semibold">Note:</span> This resume builder works best on desktop devices. User Interface may be limited on mobile.
            </p>
          </div>
        )}

        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6 sm:mb-8">
            Why Choose Our Craftfolio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-gray-700">
            <div className="flex flex-col items-center p-4">
              <span className="text-4xl sm:text-5xl font-bold mb-2 text-blue-500">
                01
              </span>
              <p className="text-base sm:text-lg text-center max-w-xs">
                Easy to Use - Our intuitive interface guides you every step of the way.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-4xl sm:text-5xl font-bold mb-2 text-blue-500">
                02
              </span>
              <p className="text-base sm:text-lg text-center max-w-xs">
                Multiple Templates - Choose a design that best fits your personality and career (more coming soon...).
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-4xl sm:text-5xl font-bold mb-2 text-blue-500">
                03
              </span>
              <p className="text-base sm:text-lg text-center max-w-xs">
                Fast & Responsive - Experience real-time previews and fast editing.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8">
            Choose a Template
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`transition transform duration-300 cursor-pointer hover:scale-105 ${
                  selectedTemplateId === template.id
                    ? 'ring-4 ring-blue-500 shadow-2xl'
                    : 'shadow-sm hover:shadow-lg'
                }`}
                onClick={() => setSelectedTemplateId(template.id)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold">
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="w-full h-48 sm:h-56 bg-gray-100 rounded-md overflow-hidden mb-4">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover transition-all duration-300 ease-in-out hover:opacity-90"
                    />
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {template.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
            onClick={handleStartBuilding}
          >
            Start Building Your Resume
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-300 text-center">
          <div className="text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>
              Developed by <span className="font-semibold">Alok Singh</span>
            </span>
            <span className="hidden sm:inline">|</span>
            <a
              href="mailto:aloksinghkh43@gmail.com"
              className="underline text-blue-600"
            >
              aloksinghkh43@gmail.com
            </a>
            <span className="hidden sm:inline">|</span>
            <span>MCA - MMMUT Gorakhpur, UP</span>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://www.linkedin.com/in/alok-singh-b01966265"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
