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
    <div className="relative min-h-screen overflow-hidden">
      {/* Moving Background Element */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-30 animate-gradient-x" />

      <div className="relative container mx-auto px-4 py-8 sm:py-16 z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-16 animate-fadeIn">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 tracking-wide">
            Craftfolio
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto px-4">
            Create a professional resume in minutes with our easy-to-use builder.
            Choose a template, fill in your details, and download your resume — no signup required.
          </p>
        </div>

        {/* Mobile Warning */}
        {isMobile && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center max-w-2xl mx-auto animate-slideIn">
            <p className="text-yellow-800 text-sm">
              <span className="font-semibold">Note:</span> This resume builder works best on desktop devices. The UI on mobile is limited.
            </p>
          </div>
        )}

        {/* Features Section */}
        <div className="mb-12 sm:mb-16 animate-fadeIn delay-200">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 sm:mb-8">
            Why Choose Our Craftfolio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-gray-700">
            <div className="flex flex-col items-center p-4 animate-rotateIn">
              <span className="text-5xl sm:text-6xl font-extrabold mb-2 text-blue-500">
                01
              </span>
              <p className="text-lg sm:text-xl text-center max-w-xs">
                Easy to Use — Our intuitive interface guides you every step of the way.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 animate-rotateIn delay-100">
              <span className="text-5xl sm:text-6xl font-extrabold mb-2 text-blue-500">
                02
              </span>
              <p className="text-lg sm:text-xl text-center max-w-xs">
                Multiple Templates — Choose a design that fits your personality and career.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 animate-rotateIn delay-200">
              <span className="text-5xl sm:text-6xl font-extrabold mb-2 text-blue-500">
                03
              </span>
              <p className="text-lg sm:text-xl text-center max-w-xs">
                Fast & Responsive — Experience real-time previews and instant editing.
              </p>
            </div>
          </div>
        </div>

      {/* Template Selection */}
<div className="mb-12 animate-fadeIn delay-400">
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
    Choose a Template
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {templates.map((template, index) => (
      <Card
        key={template.id}
        className={`transition-transform duration-500 transform hover:scale-105 hover:rotate-2 ${
          selectedTemplateId === template.id
            ? "ring-4 ring-blue-500 shadow-2xl"
            : "shadow-sm hover:shadow-lg"
        } animate-rotateIn`}
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => setSelectedTemplateId(template.id)}
      >
        <CardHeader className="p-4 bg-gradient-to-r from-white to-gray-100 hover:from-blue-50 hover:to-blue-100 transition-colors duration-500">
          <CardTitle className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-500">
            {template.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 bg-white hover:bg-blue-50 transition-colors duration-500">
          <div className="w-full h-48 sm:h-56 bg-gray-100 rounded-md overflow-hidden mb-4">
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <p className="text-gray-700 text-base hover:text-blue-700 transition-colors duration-500">
            {template.description}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>




        {/* Call to Action */}
        <div className="flex justify-center animate-fadeIn delay-600">
          <Button
            size="lg"
            className="px-8 py-4 text-xl font-semibold border-2 border-transparent transition duration-300 hover:border-blue-500 hover:shadow-lg hover:scale-105"
            onClick={handleStartBuilding}
          >
            Start Building Your Resume
            <ArrowRight className="ml-2 animate-bounceIcon" size={20} />
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-300 text-center animate-fadeIn delay-800">
          <div className="text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>
              Developed by <span className="font-bold">Alok Singh</span>
            </span>
            <span className="hidden sm:inline">|</span>
            <a
              href="mailto:aloksinghkh43@gmail.com"
              className="underline text-blue-600 hover:text-blue-800 transition"
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
              className="underline text-blue-600 hover:text-blue-800 transition"
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
