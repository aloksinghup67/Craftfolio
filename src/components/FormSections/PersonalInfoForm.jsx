import React from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResumeContext();
  const personalInfo = resumeData?.personalInfo || {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({ ...personalInfo, [name]: value });
  };

  return (
    <Card className="group">
      <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
              placeholder="Ben Affleck"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700 dark:text-slate-300">Professional Title</Label>
            <Input
              id="title"
              name="title"
              value={personalInfo.title}
              onChange={handleChange}
              placeholder="Student, Software Engineer"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder="abc@example.com"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-700 dark:text-slate-300">Location</Label>
            <Input
              id="location"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              placeholder="Zermatt, Switzerland"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website" className="text-slate-700 dark:text-slate-300">Website/Portfolio</Label>
            <Input
              id="website"
              name="website"
              value={personalInfo.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="summary" className="text-slate-700 dark:text-slate-300">Professional Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            placeholder="A brief summary of your professional background and career objectives..."
            rows={4}
            className="bg-white/50 dark:bg-slate-900/50 min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm; 