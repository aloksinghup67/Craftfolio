import React from 'react';

const ModernTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow-lg min-h-[297mm] w-full">
      <div className="mb-8 text-center border-b-4 border-pink-500 pb-4">
        <h1 className="text-5xl font-bold text-gray-900">
          {personalInfo?.name || 'Full Name'}
        </h1>
        {personalInfo?.title && (
          <p className="text-2xl text-pink-600 mt-2">{personalInfo.title}</p>
        )}
        <div className="mt-2 flex justify-center space-x-4 text-gray-600 text-base">
          {personalInfo?.email && <p>{personalInfo.email}</p>}
          {personalInfo?.phone && <p>{personalInfo.phone}</p>}
          {personalInfo?.location && <p>{personalInfo.location}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {personalInfo?.summary && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-3 border-b-2 border-pink-500 inline-block pb-3">
                Summary
              </h2>
              <p className="text-base text-gray-700">{personalInfo.summary}</p>
            </div>
          )}

          {experience?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-500 inline-block pb-3">
                Work Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                  <p className="text-lg text-gray-600">
                    {exp.company}
                    {exp.location ? ` | ${exp.location}` : ''}
                  </p>
                  <p className="text-base text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-base text-gray-700 mt-2">{exp.description}</p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-base text-gray-700">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-500 inline-block pb-3">
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4 border-b pb-3">
                  <h3 className="text-2xl font-semibold text-gray-800">{project.title}</h3>
                  <p className="text-base text-gray-700">{project.description}</p>
                  {project.link && (
                    <p className="text-base text-gray-600 mt-1">
                      Project URL:{' '}
                      <span className="font-medium text-pink-600">{project.link}</span>
                    </p>
                  )}
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-pink-50 text-pink-700 rounded text-base"
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

          {certifications?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-500 inline-block pb-3">
                Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-4 border-b pb-3">
                  <h3 className="text-2xl font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-lg text-gray-600">{cert.organization}</p>
                  <p className="text-base text-gray-500">{cert.date}</p>
                  {cert.description && (
                    <p className="text-base text-gray-700 mt-2">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
        {education?.length > 0 && (
  <div className="mb-8">
    <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-500 inline-block pb-3">
      Education
    </h2>
    {education.map((edu, index) => (
      <div key={index} className="mb-4 border-b pb-3">
        <h3 className="text-2xl font-semibold text-gray-800">{edu.degree}</h3>
        <p className="text-lg text-gray-600">{edu.institution}</p>
        {edu.location && (
          <p className="text-base text-gray-500">{edu.location}</p>
        )}
        {edu.description && (
          <p className="text-base text-gray-700 mt-1">{edu.description}</p>
        )}
        <p className="text-base text-gray-500">
          {edu.startDate?.split('-')[0]} - {edu.endDate?.split('-')[0]}
        </p>
      </div>
    ))}
  </div>
)}


          {skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-500 inline-block pb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-base"
                  >
                    {typeof skill === 'object' ? skill.name : skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
