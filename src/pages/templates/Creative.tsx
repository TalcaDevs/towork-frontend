import React from 'react';
import { ModernProps } from '../../interfaces/publicProfileData.interface'
import ShareProfileButton from '../../components/ShareButton';

const Creative: React.FC<ModernProps> = ({ userData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  const calculateDuration = (start: string, end: string | null) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   endDate.getMonth() - startDate.getMonth();
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} meses`;
    if (remainingMonths === 0) return `${years} año${years > 1 ? 's' : ''}`;
    return `${years} año${years > 1 ? 's' : ''} ${remainingMonths} meses`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-600">
                    {userData.first_name.charAt(0)}{userData.last_name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl font-light text-white mb-3 tracking-wide">
                {userData.first_name}
                <span className="font-semibold ml-3">{userData.last_name}</span>
              </h1>
              <p className="text-2xl text-blue-200 mb-6 font-light">{userData.description}</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-gray-300 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-lg">{userData.email}</span>
                </div>
                
                {userData.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="text-lg">{userData.phone}</span>
                  </div>
                )}
                
                {userData.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-lg">{userData.location}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {userData.linkedin && (
                  <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-3 px-6 py-3 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                    LinkedIn
                  </a>
                )}

                <ShareProfileButton />
                
                {userData.portfolio_url && (
                  <a href={userData.portfolio_url} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    Portafolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {userData.work_experience?.length || 0}
              </div>
              <div className="text-gray-600 font-medium">Experiencias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {userData.projects?.length || 0}
              </div>
              <div className="text-gray-600 font-medium">Proyectos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {userData.skills?.length || 0}
              </div>
              <div className="text-gray-600 font-medium">Habilidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {userData.certifications?.length || 0}
              </div>
              <div className="text-gray-600 font-medium">Certificaciones</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="space-y-16">
          
          {/* 1. EDUCACIÓN */}
          {userData.education && userData.education.length > 0 && (
            <section>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Educación</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Mi formación académica y desarrollo educativo</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.education.map((edu, index) => (
                  <div key={edu.id} className="group">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 hover:scale-105 h-full">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{edu.degree}</h3>
                          <p className="text-indigo-600 font-semibold mb-3">{edu.institution}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. EXPERIENCIA PROFESIONAL */}
          {userData.work_experience && userData.work_experience.length > 0 && (
            <section>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Experiencia Profesional</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Mi trayectoria profesional y los logros más destacados en mi carrera</p>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-transparent h-full"></div>
                
                <div className="space-y-12">
                  {userData.work_experience.map((job, index) => (
                    <div key={job.id} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                      
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:scale-105">
                          <div className="flex items-start gap-6">
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg">
                                {job.company.charAt(0)}
                              </div>
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{job.position}</h3>
                              <div className="flex items-center gap-3 mb-3">
                                <p className="text-blue-600 font-semibold">{job.company}</p>
                                <span className="text-emerald-600 text-sm font-medium px-3 py-1 bg-emerald-50 rounded-full">
                                  {job.end_date ? 'Completado' : 'Actual'}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-gray-500 mb-4 text-sm">
                                <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-3 py-1">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                  </svg>
                                  <span>{formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : 'Presente'}</span>
                                </div>
                                <div className="flex items-center gap-1 bg-blue-50 rounded-lg px-3 py-1">
                                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-blue-700">{calculateDuration(job.start_date, job.end_date)}</span>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                                <p className="text-gray-700 leading-relaxed">{job.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 3. PROYECTOS DESTACADOS */}
          {userData.projects && userData.projects.length > 0 && (
            <section>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Proyectos Destacados</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Una selección de mis trabajos y desarrollos más relevantes</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.projects.map((project, index) => (
                  <div key={project.id} className="group">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-500 hover:scale-105 h-full">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        {project.project_url && (
                          <a href={project.project_url} target="_blank" rel="noopener noreferrer"
                             className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl text-purple-600 hover:from-purple-100 hover:to-pink-100 hover:scale-110 transition-all duration-300 shadow-sm">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                          </a>
                        )}
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{project.title}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-emerald-600 font-medium">Proyecto Activo</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-6 mb-6">
                        <p className="text-gray-700 leading-relaxed">{project.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tecnologías</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tools_used.split(',').slice(0, 4).map((tool, toolIndex) => (
                            <span key={toolIndex} className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg text-xs font-medium border border-purple-100">
                              {tool.trim()}
                            </span>
                          ))}
                          {project.tools_used.split(',').length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                              +{project.tools_used.split(',').length - 4} más
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. HABILIDADES E IDIOMAS */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Habilidades e Idiomas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Competencias técnicas y lingüísticas desarrolladas</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Skills */}
              {userData.skills && userData.skills.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Habilidades Técnicas</h3>
                      <p className="text-gray-600">Competencias y tecnologías dominadas</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userData.skills.map((skillObj, index) => (
                      <div key={index} className="group relative">
                        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 hover:from-emerald-100 hover:to-green-100 transition-all duration-300 hover:shadow-md hover:scale-105">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="font-semibold text-emerald-800">{skillObj.skill.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, starIndex) => (
                              <svg key={starIndex} className={`w-4 h-4 ${starIndex < 4 ? 'text-emerald-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {userData.languages && userData.languages.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Idiomas</h3>
                      <p className="text-gray-600">Competencias lingüísticas</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {userData.languages.map((langObj, index) => (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 hover:from-orange-100 hover:to-amber-100 transition-all duration-300 hover:shadow-md hover:scale-105">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md">
                              {langObj.language.name.charAt(0)}
                            </div>
                            <span className="text-gray-900 font-semibold text-lg">{langObj.language.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-xl text-sm font-bold border border-orange-200">
                              {langObj.level}
                            </span>
                            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 5. CERTIFICACIONES */}
          {userData.certifications && userData.certifications.length > 0 && (
            <section>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Certificaciones</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Logros y reconocimientos profesionales</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.certifications.map((cert, index) => (
                  <div key={cert.id} className="group">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-yellow-200 transition-all duration-500 hover:scale-105 h-full">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {cert.certificate_url && (
                          <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer"
                             className="p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl text-yellow-600 hover:from-yellow-100 hover:to-orange-100 hover:scale-110 transition-all duration-300 shadow-sm">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                          </a>
                        )}
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">{cert.name}</h3>
                        <p className="text-yellow-600 font-semibold mb-4">{cert.institution}</p>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{formatDate(cert.date_obtained)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Footer with Gradient */}
      <div className="h-32 w-full bg-gradient-to-t from-[oklch(0.208_0.042_265.755)] to-transparent"></div>
    </div>
  );
};

export default Creative;