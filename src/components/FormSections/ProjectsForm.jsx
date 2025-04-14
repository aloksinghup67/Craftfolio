import React, { useState } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResumeContext();
  const { projects } = resumeData;

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
  });

  const [newTech, setNewTech] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTech = () => {
    if (newTech.trim()) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, { id: Date.now(), name: newTech.trim() }]
      }));
      setNewTech('');
    }
  };

  const handleRemoveTech = (id) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech.id !== id)
    }));
  };

  const handleAdd = () => {
    if (newProject.title && newProject.description) {
      addProject({
        ...newProject,
        technologies: newProject.technologies.map(tech => tech.name)
      });
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        link: '',
      });
    }
  };

  const handleRemove = (index) => {
    removeProject(index);
  };

  return (
    <Card className="group">
      <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-xl bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                     shadow-sm hover:shadow-md transition-all duration-200
                     border-slate-200/50 dark:border-slate-800/50">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700 dark:text-slate-300">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={newProject.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700 dark:text-slate-300">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newProject.description}
              onChange={handleChange}
              placeholder="Describe your project"
              rows={3}
              className="bg-white/50 dark:bg-slate-900/50 min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link" className="text-slate-700 dark:text-slate-300">Project URL</Label>
            <Input
              id="link"
              name="link"
              value={newProject.link}
              onChange={handleChange}
              placeholder="https://your-project-url.com"
              className="bg-white/50 dark:bg-slate-900/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300">Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology"
                className="bg-white/50 dark:bg-slate-900/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
              />
              <Button 
                onClick={handleAddTech} 
                type="button"
                className="border-dashed hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center gap-1 bg-blue-50/50 dark:bg-blue-950/20 px-2 py-1 rounded-md text-sm border border-blue-100/50 dark:border-blue-900/50"
                >
                  <span>{tech.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTech(tech.id)}
                    className="h-4 w-4 p-0 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleAdd} 
            className="w-full border-dashed hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
            disabled={!newProject.title || !newProject.description}
          >
            <Plus size={14} className="mr-1" />
            Add Project
          </Button>
        </div>
        
        {projects.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-slate-700 dark:text-slate-300">Added Projects</h3>
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="border rounded-xl p-4 bg-gradient-to-b from-white to-white/50 dark:from-slate-900 dark:to-slate-900/50
                         shadow-sm hover:shadow-md transition-all duration-200
                         border-slate-200/50 dark:border-slate-800/50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">{project.title}</h4>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm dark:text-blue-400"
                      >
                        {project.link}
                      </a>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-50/50 dark:bg-blue-950/20 px-2 py-1 rounded-md text-xs border border-blue-100/50 dark:border-blue-900/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsForm; 