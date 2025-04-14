import React, { useState } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Code } from 'lucide-react';

const SkillsForm = () => {
  const { resumeData, addSkill, removeSkill, updateSkill } = useResumeContext();
  const { skills } = resumeData;

  const [newSkill, setNewSkill] = useState('');

  const handleChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAdd = () => {
    if (newSkill.trim()) {
      addSkill({ name: newSkill.trim() });
      setNewSkill('');
    }
  };

  const handleRemove = (id) => {
    removeSkill(id);
  };

  return (
    <Card className="group">
      <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className="flex items-center space-x-4 p-4 border rounded-xl bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                     shadow-sm hover:shadow-md transition-all duration-200
                     border-slate-200/50 dark:border-slate-800/50"
          >
            <div className="flex-1">
              <Label htmlFor={`skill-${skill.id}`} className="text-slate-700 dark:text-slate-300">Skill Name</Label>
              <Input
                id={`skill-${skill.id}`}
                name="name"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                placeholder="e.g., JavaScript"
                className="bg-white/50 dark:bg-slate-900/50"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(skill.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20 mt-6"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}

        <div className="space-y-4 p-4 border rounded-xl bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                     shadow-sm hover:shadow-md transition-all duration-200
                     border-slate-200/50 dark:border-slate-800/50">
          <div className="space-y-2">
            <Label htmlFor="new-skill" className="text-slate-700 dark:text-slate-300">Skill Name</Label>
            <Input
              id="new-skill"
              name="name"
              value={newSkill}
              onChange={handleChange}
              placeholder="e.g., JavaScript"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          <Button
            onClick={handleAdd}
            className="w-full border-dashed hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
            disabled={!newSkill.trim()}
          >
            <Plus size={14} className="mr-1" />
            Add Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm; 