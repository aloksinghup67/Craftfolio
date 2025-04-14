import React from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

const ClassicTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="resume-page template-classic bg-white text-gray-800 p-8 w-full h-full min-h-[297mm]">
      <header className="text-center mb-8 border-b border-gray-300 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo?.name}</h1>
        {personalInfo?.title && (
          <h2 className="text-2xl text-gray-700 mb-4">{personalInfo.title}</h2>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-base">
          {personalInfo?.phone && (
            <div className="flex items-center gap-1 text-gray-600">
              <Phone size={16} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.email && (
            <div className="flex items-center gap-1 text-gray-600">
              <Mail size={16} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin size={16} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.website && (
            <div className="flex items-center gap-1 text-gray-600">
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-700 pb-3 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-base">{personalInfo.summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-700 pb-3 mb-4">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-xl">{exp.jobTitle}</h3>
                    <h4 className="text-gray-700 text-lg">{exp.company}</h4>
                    {exp.location && <p className="text-gray-600 text-base">{exp.location}</p>}
                  </div>
                  <div className="flex items-center text-gray-600 text-base">
                    <Calendar size={16} className="mr-1" />
                    <span>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2 text-base">{exp.description}</p>
                {exp.achievements?.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-base">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-700 pb-3 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <h4 className="text-gray-700 text-base">{edu.school}</h4>
                    {edu.location && <p className="text-gray-600 text-base">{edu.location}</p>}
                  </div>
                  <div className="flex items-center text-gray-600 text-base">
                    <Calendar size={16} className="mr-1" />
                    <span>{edu.startDate?.split('-')[0]} – {edu.endDate?.split('-')[0]}</span>
                  </div>
                </div>
                {edu.description && <p className="text-gray-700 mt-1 text-base">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-700 pb-3 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-base"
              >
                {typeof skill === 'object' ? skill.name : skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-700 pb-3 mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  {project.link && (
                    <p className="text-blue-600 text-base font-medium">
                      <span className="mr-1 font-semibold">URL:</span> {project.link}
                    </p>
                  )}
                </div>
                <p className="text-gray-700 mb-2 text-base">{project.description}</p>
                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-base"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-700 pb-3 mb-4">
            Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{cert.name}</h3>
                    <h4 className="text-gray-700 text-base">{cert.organization}</h4>
                  </div>
                  <div className="flex items-center text-gray-600 text-base">
                    <Calendar size={16} className="mr-1" />
                    <span>{cert.date}</span>
                  </div>
                </div>
                {cert.description && (
                  <p className="text-gray-700 mt-1 text-base">{cert.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
