import React, { useState } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeContext();
  const { education } = resumeData;
  const [showAddForm, setShowAddForm] = useState(false);

  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
  });

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    if (id) {
      updateEducation(id, { [name]: value });
    } else {
      setNewEducation(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = () => {
    if (newEducation.school && newEducation.degree) {
      addEducation({
        ...newEducation,
        id: Date.now().toString(),
      });
      setNewEducation({
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
      });
      setShowAddForm(false);
    }
  };

  return (
    <Card className="group">
      <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu) => (
          <div 
            key={edu.id} 
            className="space-y-4 p-6 border rounded-xl bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                     shadow-sm hover:shadow-md transition-all duration-200
                     border-slate-200/50 dark:border-slate-800/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`school-${edu.id}`} className="text-slate-700 dark:text-slate-300">School</Label>
                <Input
                  id={`school-${edu.id}`}
                  name="school"
                  value={edu.school}
                  onChange={(e) => handleChange(e, edu.id)}
                  placeholder="University Name"
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`degree-${edu.id}`} className="text-slate-700 dark:text-slate-300">Degree</Label>
                <Input
                  id={`degree-${edu.id}`}
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(e, edu.id)}
                  placeholder="Bachelor of Science"
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`fieldOfStudy-${edu.id}`} className="text-slate-700 dark:text-slate-300">Field of Study</Label>
                <Input
                  id={`fieldOfStudy-${edu.id}`}
                  name="fieldOfStudy"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleChange(e, edu.id)}
                  placeholder="Computer Science"
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`gpa-${edu.id}`} className="text-slate-700 dark:text-slate-300">GPA</Label>
                <Input
                  id={`gpa-${edu.id}`}
                  name="gpa"
                  value={edu.gpa}
                  onChange={(e) => handleChange(e, edu.id)}
                  placeholder="3.8"
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`startDate-${edu.id}`} className="text-slate-700 dark:text-slate-300">Start Year</Label>
                <Input
                  id={`startDate-${edu.id}`}
                  name="startDate"
                  type="number"
                  min="1900"
                  max="2100"
                  value={edu.startDate}
                  onChange={(e) => handleChange(e, edu.id)}
                  placeholder="2021"
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`endDate-${edu.id}`} className="text-slate-700 dark:text-slate-300">End Year</Label>
                <Input
                  id={`endDate-${edu.id}`}
                  name="endDate"
                  type="number"
                  min="1900"
                  max="2100"
                  value={edu.endDate}
                  onChange={(e) => handleChange(e, edu.id)}
                  placeholder="2024"
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`description-${edu.id}`} className="text-slate-700 dark:text-slate-300">Description</Label>
              <Textarea
                id={`description-${edu.id}`}
                name="description"
                value={edu.description}
                onChange={(e) => handleChange(e, edu.id)}
                placeholder="Relevant coursework, achievements, activities..."
                className="min-h-[100px] bg-white/50 dark:bg-slate-900/50"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20"
            >
              <Trash2 size={14} className="mr-1" />
              Remove Education
            </Button>
          </div>
        ))}

        {!showAddForm ? (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full border-dashed hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
          >
            <Plus size={14} className="mr-1" />
            Add New Education
          </Button>
        ) : (
          <div className="space-y-4 p-6 border rounded-xl bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                       shadow-sm hover:shadow-md transition-all duration-200
                       border-slate-200/50 dark:border-slate-800/50">
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                value={newEducation.school}
                onChange={handleChange}
                placeholder="University Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={newEducation.degree}
                onChange={handleChange}
                placeholder="Bachelor of Science"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={newEducation.fieldOfStudy}
                onChange={handleChange}
                placeholder="Computer Science"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                name="gpa"
                value={newEducation.gpa}
                onChange={handleChange}
                placeholder="3.8"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Year</Label>
              <Input
                id="startDate"
                name="startDate"
                type="number"
                min="1900"
                max="2100"
                value={newEducation.startDate}
                onChange={handleChange}
                placeholder="2021"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Year</Label>
              <Input
                id="endDate"
                name="endDate"
                type="number"
                min="1900"
                max="2100"
                value={newEducation.endDate}
                onChange={handleChange}
                placeholder="2024"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newEducation.description}
                onChange={handleChange}
                placeholder="Relevant coursework, achievements, activities..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleAdd}
                className="flex-1"
                disabled={!newEducation.school || !newEducation.degree}
              >
                Add Education
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationForm; 