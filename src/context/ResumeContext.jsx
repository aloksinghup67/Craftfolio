import React, { createContext, useContext, useState, useEffect } from 'react';

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Initial resume data
const initialResumeData = {
  contactInfo: {
    fullName: '',
    phone: '',
    email: '',
    linkedin: '',
    location: '',
    title: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  additionalSections: [],
};

const ResumeContext = createContext();

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    // Try to load from localStorage on initial render
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : {
      personalInfo: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: []
    };
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate');
    return savedTemplate || 'minimalist';
  });

  // Save to localStorage whenever resumeData or selectedTemplate changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  const updatePersonalInfo = (info) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const addExperience = (experience) => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id: experience.id || Date.now().toString() }]
    }));
  };

  const updateExperience = (id, updates) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...updates } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = (education) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { ...education, id: generateId() }]
    }));
  };

  const updateEducation = (id, updates) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...updates } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const updateSkill = (index, skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((s, i) => 
        i === index ? skill : s
      )
    }));
  };

  const removeSkill = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = (project) => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (index, project) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? project : proj
      )
    }));
  };

  const removeProject = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addCertification = (certification) => {
    setResumeData(prev => ({
      ...prev,
      certifications: Array.isArray(prev.certifications) 
        ? [...prev.certifications, { ...certification, id: generateId() }]
        : [{ ...certification, id: generateId() }]
    }));
  };

  const updateCertification = (id, updates) => {
    setResumeData(prev => ({
      ...prev,
      certifications: Array.isArray(prev.certifications) 
        ? prev.certifications.map(cert => 
            cert.id === id ? { ...cert, ...updates } : cert
          )
        : []
    }));
  };

  const removeCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: Array.isArray(prev.certifications) 
        ? prev.certifications.filter(cert => cert.id !== id)
        : []
    }));
  };

  const clearResume = () => {
    // Reset to initial state
    setResumeData({
      personalInfo: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: []
    });
    
    // Clear from localStorage
    localStorage.removeItem('resumeData');
    
    // Reset template to default
    setSelectedTemplate('minimalist');
    localStorage.removeItem('selectedTemplate');
  };

  const value = {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    clearResume
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContext; 