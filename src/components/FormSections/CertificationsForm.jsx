import React, { useState } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Award } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const CertificationsForm = () => {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResumeContext();
  const { certifications } = resumeData;

  const [newCertification, setNewCertification] = useState({
    name: '',
    organization: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCertification(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (newCertification.name && newCertification.organization) {
      addCertification(newCertification);
      setNewCertification({
        name: '',
        organization: '',
        date: '',
        description: '',
      });
    }
  };

  const handleRemove = (id) => {
    removeCertification(id);
  };

  return (
    <Card className="group">
      <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-xl bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                     shadow-sm hover:shadow-md transition-all duration-200
                     border-slate-200/50 dark:border-slate-800/50">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Certification Name</Label>
            <Input
              id="name"
              name="name"
              value={newCertification.name}
              onChange={handleChange}
              placeholder="Enter certification name"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="organization" className="text-slate-700 dark:text-slate-300">Organization</Label>
            <Input
              id="organization"
              name="organization"
              value={newCertification.organization}
              onChange={handleChange}
              placeholder="Enter organization name"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="text-slate-700 dark:text-slate-300">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={newCertification.date}
              onChange={handleChange}
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700 dark:text-slate-300">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newCertification.description}
              onChange={handleChange}
              placeholder="Enter certification description"
              rows={3}
              className="bg-white/50 dark:bg-slate-900/50 min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={handleAdd} 
            className="w-full border-dashed hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
            disabled={!newCertification.name || !newCertification.organization}
          >
            <Plus size={14} className="mr-1" />
            Add Certification
          </Button>
        </div>
        
        {certifications.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-slate-700 dark:text-slate-300">Added Certifications</h3>
            {certifications.map((certification) => (
              <div 
                key={certification.id} 
                className="border rounded-xl p-4 bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                         shadow-sm hover:shadow-md transition-all duration-200
                         border-slate-200/50 dark:border-slate-800/50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">{certification.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{certification.organization}</p>
                    {certification.date && (
                      <p className="text-sm text-slate-500 dark:text-slate-500">{certification.date}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(certification.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                {certification.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{certification.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationsForm; 
