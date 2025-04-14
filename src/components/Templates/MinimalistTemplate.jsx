import React from 'react';

const MinimalistTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects, summary } = data || {};
  const professionalSummary = personalInfo?.summary || summary;

  return (
    <div className="min-h-[297mm] flex bg-gray-100 font-sans w-full">
      <aside className="w-64 bg-white p-6 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {personalInfo?.name || 'Your Name'}
          </h1>
          <p className="text-base text-gray-600">
            {personalInfo?.title || 'Job Title'}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact</h2>
          <ul className="space-y-1 text-base text-gray-700">
            {personalInfo?.email && <li>{personalInfo.email}</li>}
            {personalInfo?.phone && <li>{personalInfo.phone}</li>}
            {personalInfo?.location && <li>{personalInfo.location}</li>}
            {personalInfo?.website && <li>{personalInfo.website}</li>}
          </ul>
        </div>

        {skills?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
            <ul className="space-y-1 text-base text-gray-700">
              {skills.map((skill, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-gray-600 rounded-full mr-2" />
                  {typeof skill === 'object' ? skill.name : skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {certifications?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Certifications</h2>
            <ul className="space-y-2 text-base text-gray-700">
              {certifications.map((cert, idx) => (
                <li key={idx}>
                  <p className="font-bold">{cert.name}</p>
                  <p>{cert.organization}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="flex-1 p-8">
        {professionalSummary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-700 pb-3 mb-4">
              Professional Summary
            </h2>
            <p className="text-base text-gray-700">{professionalSummary}</p>
          </section>
        )}

        {education?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Education</h2>
            <ul className="space-y-2 text-base text-gray-700">
              {education.map((edu, idx) => (
                <li key={idx}>
                  <p className="font-bold">{edu.degree}</p>
                  <p>{edu.school}</p>
                  {edu.location && <p className="text-gray-600">{edu.location}</p>}
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b border-gray-300 pb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {exp.jobTitle}{' '}
                    <span className="ml-2 text-base text-gray-600">
                      ({exp.startDate} - {exp.current ? 'Present' : exp.endDate})
                    </span>
                  </h3>
                  <p className="text-base text-gray-600">
                    {exp.company} &mdash; {exp.location}
                  </p>
                  {exp.description && (
                    <p className="text-base text-gray-700 mt-1">{exp.description}</p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-base text-gray-700">
                      {exp.achievements.map((achievement, achievementIdx) => (
                        <li key={achievementIdx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b border-gray-300 pb-3">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {project.title || `Project ${idx + 1}`}
                  </h3>
                  {project.description && (
                    <p className="text-base text-gray-700 mt-1">{project.description}</p>
                  )}
                  {project.link && (
                    <p className="text-base text-gray-600 mt-1">
                      Project URL:{' '}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 underline break-all"
                      >
                        {project.link}
                      </a>
                    </p>
                  )}
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-base"
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
      </main>
    </div>
  );
};

export default MinimalistTemplate;
