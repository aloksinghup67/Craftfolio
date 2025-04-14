import React, { useState } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase } from 'lucide-react';

const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeContext();
  const { experience } = resumeData;
  const [showAddForm, setShowAddForm] = useState(false);

  const [newExperience, setNewExperience] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [],
    location: '',
  });

  const handleChange = (e, id) => {
    const { name, value, type, checked } = e.target;
    if (id) {
      updateExperience(id, { [name]: type === 'checkbox' ? checked : value });
    } else {
      setNewExperience(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleAchievementChange = (index, value, id) => {
    if (id) {
      const exp = experience.find(e => e.id === id);
      if (exp) {
        const newAchievements = [...exp.achievements];
        newAchievements[index] = value;
        updateExperience(id, { achievements: newAchievements });
      }
    } else {
      const newAchievements = [...newExperience.achievements];
      newAchievements[index] = value;
      setNewExperience(prev => ({ ...prev, achievements: newAchievements }));
    }
  };

  const addAchievement = (id) => {
    if (id) {
      const exp = experience.find(e => e.id === id);
      if (exp) {
        updateExperience(id, { achievements: [...exp.achievements, ''] });
      }
    } else {
      setNewExperience(prev => ({ ...prev, achievements: [...prev.achievements, ''] }));
    }
  };

  const removeAchievement = (index, id) => {
    if (id) {
      const exp = experience.find(e => e.id === id);
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(id, { achievements: newAchievements });
    } else {
      const newAchievements = newExperience.achievements.filter((_, i) => i !== index);
      setNewExperience(prev => ({ ...prev, achievements: newAchievements }));
    }
  };

  const handleAdd = () => {
    if (newExperience.jobTitle && newExperience.company) {
      // Filter out any empty achievements before adding
      const filteredAchievements = newExperience.achievements.filter(achievement => achievement.trim() !== '');
      addExperience({
        ...newExperience,
        id: Date.now().toString(), // Add a unique ID
        achievements: filteredAchievements
      });
      setNewExperience({
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
        location: '',
      });
      setShowAddForm(false);
    }
  };

  return (
    <Card className="group">
      <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp) => (
          <div 
            key={exp.id} 
            className="space-y-4 p-6 border rounded-xl bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                     shadow-sm hover:shadow-md transition-all duration-200
                     border-slate-200/50 dark:border-slate-800/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`jobTitle-${exp.id}`} className="text-slate-700 dark:text-slate-300">Job Title</Label>
                <Input
                  id={`jobTitle-${exp.id}`}
                  name="jobTitle"
                  value={exp.jobTitle}
                  onChange={(e) => handleChange(e, exp.id)}
                  placeholder="Software Engineer"
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`company-${exp.id}`} className="text-slate-700 dark:text-slate-300">Company</Label>
                <Input
                  id={`company-${exp.id}`}
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, exp.id)}
                  placeholder="Tech Company Inc."
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`location-${exp.id}`} className="text-slate-700 dark:text-slate-300">Location</Label>
                <Input
                  id={`location-${exp.id}`}
                  name="location"
                  value={exp.location}
                  onChange={(e) => handleChange(e, exp.id)}
                  placeholder="City, State"
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`startDate-${exp.id}`} className="text-slate-700 dark:text-slate-300">Start Date</Label>
                <Input
                  id={`startDate-${exp.id}`}
                  name="startDate"
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleChange(e, exp.id)}
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`endDate-${exp.id}`} className="text-slate-700 dark:text-slate-300">End Date</Label>
                <Input
                  id={`endDate-${exp.id}`}
                  name="endDate"
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleChange(e, exp.id)}
                  disabled={exp.current}
                  className="bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  name="current"
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, { current: checked })}
                  className="border-slate-300 dark:border-slate-700"
                />
                <Label htmlFor={`current-${exp.id}`} className="text-slate-700 dark:text-slate-300">Current Position</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`description-${exp.id}`} className="text-slate-700 dark:text-slate-300">Description</Label>
              <Textarea
                id={`description-${exp.id}`}
                name="description"
                value={exp.description}
                onChange={(e) => handleChange(e, exp.id)}
                placeholder="Describe your role and responsibilities"
                className="min-h-[100px] bg-white/50 dark:bg-slate-900/50"
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-slate-700 dark:text-slate-300">Achievements</Label>
              {exp.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2 group/achievement">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value, exp.id)}
                    placeholder="Achievement or responsibility"
                    className="bg-white/50 dark:bg-slate-900/50 group-hover/achievement:border-blue-500/50"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAchievement(index, exp.id)}
                    className="opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-200"
                  >
                    <Trash2 size={14} className="text-red-500 hover:text-red-600" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addAchievement(exp.id)}
                className="mt-2 border-dashed hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
              >
                <Plus size={14} className="mr-1" />
                Add Achievement
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20"
            >
              <Trash2 size={14} className="mr-1" />
              Remove Experience
            </Button>
          </div>
        ))}

        {!showAddForm ? (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full border-dashed hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
          >
            <Plus size={14} className="mr-1" />
            Add New Experience
          </Button>
        ) : (
          <div className="space-y-4 p-6 border rounded-xl bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                       shadow-sm hover:shadow-md transition-all duration-200
                       border-slate-200/50 dark:border-slate-800/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-jobTitle">Job Title</Label>
                <Input
                  id="new-jobTitle"
                  name="jobTitle"
                  value={newExperience.jobTitle}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-company">Company</Label>
                <Input
                  id="new-company"
                  name="company"
                  value={newExperience.company}
                  onChange={handleChange}
                  placeholder="Tech Company Inc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-location">Location</Label>
                <Input
                  id="new-location"
                  name="location"
                  value={newExperience.location}
                  onChange={handleChange}
                  placeholder="City, State"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-startDate">Start Date</Label>
                <Input
                  id="new-startDate"
                  name="startDate"
                  type="date"
                  value={newExperience.startDate}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-endDate">End Date</Label>
                <Input
                  id="new-endDate"
                  name="endDate"
                  type="date"
                  value={newExperience.endDate}
                  onChange={handleChange}
                  disabled={newExperience.current}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-current"
                  name="current"
                  checked={newExperience.current}
                  onCheckedChange={(checked) => setNewExperience(prev => ({ ...prev, current: checked }))}
                />
                <Label htmlFor="new-current">Current Position</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                name="description"
                value={newExperience.description}
                onChange={handleChange}
                placeholder="Describe your role and responsibilities"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Achievements</Label>
              {newExperience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    placeholder="Achievement or responsibility"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeAchievement(index)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addAchievement()}
                className="mt-2"
              >
                <Plus size={14} className="mr-1" />
                Add Achievement
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleAdd}
                className="flex items-center"
                disabled={!newExperience.jobTitle || !newExperience.company}
              >
                <Plus size={14} className="mr-1" />
                Add Experience
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
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

export default ExperienceForm; 