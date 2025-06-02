import React from 'react';
import { ModernProps } from '../../interfaces/publicProfileData.interface'
import ShareProfileButton from '../../components/ShareButton';

const Professional: React.FC<ModernProps> = ({ userData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  const formatYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header Section */}
        <div className="bg-white px-8 pt-8 pb-6">
          <div className="flex items-start gap-6">
            {/* Profile Photo */}
            
            
            {/* Name and Title */}
            <div className="flex-1">
              <h1 className="text-4xl font-light text-teal-600 mb-2">
                {userData.first_name} {userData.last_name}
              </h1>
              <p className="text-xl text-gray-600 font-light">
                {userData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal line */}
        <div className="border-t border-gray-300 mx-8"></div>

        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/3 bg-gray-50 px-6 py-8">
            {/* Profile Summary */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-teal-600 mb-4">Perfil</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {userData.description}
              </p>
              {userData.work_experience && userData.work_experience.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    Experiencia en {userData.work_experience[0].description}
                  </p>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-800">Logros destacados:</p>
                    <ul className="mt-2 space-y-1">
                      {userData.projects && userData.projects.slice(0, 2).map((project, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>{project.title}</span>
                        </li>
                      ))}
                      {userData.work_experience.slice(0, 2).map((job, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Experiencia en {job.company}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-teal-600 mb-4">Detalles</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">Dirección</p>
                  <p className="text-sm text-gray-600">{userData.location || 'Barcelona'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Teléfono</p>
                  <p className="text-sm text-gray-600">{userData.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Correo electrónico</p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
                {userData.portfolio_url && (
                  <div>
                    <p className="text-sm font-medium text-gray-800">Sitio web</p>
                    <a href={userData.portfolio_url} target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-teal-600 hover:underline">
                      {userData.portfolio_url.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-teal-600 mb-4">Redes sociales</h2>
              <div className="space-y-2">
                {userData.linkedin && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                    <a href={userData.linkedin} target="_blank" rel="noopener noreferrer"
                       className="text-sm text-gray-600 hover:text-teal-600">
                      {userData.first_name.toLowerCase()}{userData.last_name.toLowerCase()}
                    </a>
                  </div>
                )}

                <ShareProfileButton />
                
                {userData.email && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
                      <span className="text-white text-xs">@</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      @{userData.first_name.toLowerCase()}{userData.last_name.toLowerCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Top Skills */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-teal-600 mb-4">Habilidades destacadas</h2>
              <div className="space-y-3">
                {userData.skills && userData.skills.slice(0, 5).map((skillObj, index) => (
                  <div key={index}>
                    <p className="text-sm font-medium text-gray-800 mb-1">{skillObj.skill.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full" 
                        style={{ width: `${85 - (index * 5)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-2/3 px-8 py-8">
            {/* Experience */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-teal-600 mb-6">Experiencia laboral</h2>
              <div className="space-y-6">
                {userData.work_experience && userData.work_experience.map((job, index) => (
                  <div key={job.id} className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {formatYear(job.start_date)} - {job.end_date ? formatYear(job.end_date) : 'ACTUAL'}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm font-medium text-gray-800">EMPRESA {index + 1}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">
                          {job.company} ({job.start_date ? formatYear(job.start_date) : ''})
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{job.position}</span>
                    </div>
                    
                    <div className="text-sm text-gray-700 leading-relaxed">
                      <p className="mb-2">
                        Con sede en {userData.location || 'Barcelona'}, el grupo está compuesto por múltiples empresas
                        con amplia experiencia en tecnología e innovación.
                      </p>
                      <p>
                        {job.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            {userData.education && userData.education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-teal-600 mb-6">Educación</h2>
                <div className="space-y-4">
                  {userData.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {formatYear(edu.start_date)} - {formatYear(edu.end_date)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800">{edu.degree}</p>
                      </div>
                      <span className="text-sm text-gray-600">{edu.institution}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {userData.languages && userData.languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-teal-600 mb-6">Idiomas</h2>
                <div className="space-y-2">
                  {userData.languages.map((langObj, index) => (
                    <div key={index}>
                      <span className="text-sm font-medium text-gray-800">
                        Fluido en {langObj.language.name}
                        {index === 0 && userData.languages.length > 1 && ' y '}
                        {index === 1 && userData.languages.length > 2 && ','}
                        {index > 0 && index === userData.languages.length - 1 && userData.languages.length > 2 && ' y '}
                      </span>
                      {index === 0 && (
                        <span className="text-sm text-gray-600 block">
                          {langObj.language.name}, idioma nativo
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {userData.projects && userData.projects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-teal-600 mb-6">Proyectos</h2>
                <div className="space-y-4">
                  {userData.projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="text-sm font-medium text-gray-800 mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                        {project.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tecnologías: {project.tools_used}
                      </p>
                      {project.project_url && (
                        <a href={project.project_url} target="_blank" rel="noopener noreferrer"
                           className="text-xs text-teal-600 hover:underline block mt-1">
                          Ver proyecto →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {userData.certifications && userData.certifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-teal-600 mb-6">Certificaciones</h2>
                <div className="space-y-3">
                  {userData.certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{cert.name}</p>
                        <p className="text-xs text-gray-500">{cert.institution}</p>
                      </div>
                      <span className="text-sm text-gray-600">{formatYear(cert.date_obtained)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 px-8 py-4 bg-gray-50">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Teléfono: {userData.phone}</span>
            <span>Correo: {userData.email}</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Professional