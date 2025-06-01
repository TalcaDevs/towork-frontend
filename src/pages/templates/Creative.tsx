import React from 'react';
import { ModernProps } from '../../interfaces/publicProfileData.interface'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-teal-400 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-indigo-400 rotate-45 animate-bounce delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Animated Profile Photo */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl blur opacity-75 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
                <div className="relative w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-600 p-1 rounded-3xl transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={userData.profile_photo || '/api/placeholder/160/160'}
                    alt={`${userData.first_name} ${userData.last_name}`}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full border-4 border-white shadow-lg animate-pulse flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✨</span>
                </div>
              </div>

              {/* Main Info with Gradient Text */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-5xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
                  {userData.first_name}
                </h1>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {userData.last_name}
                </h2>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur"></div>
                  <p className="relative text-xl lg:text-2xl text-white/90 mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    {userData.description}
                  </p>
                </div>

                {/* Animated Contact Info */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="group bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">{userData.email}</span>
                    </div>
                  </div>

                  {userData.phone && (
                    <div className="group bg-gradient-to-r from-cyan-500/20 to-teal-500/20 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <span className="text-white font-medium">{userData.phone}</span>
                      </div>
                    </div>
                  )}

                  {userData.location && (
                    <div className="group bg-gradient-to-r from-slate-500/20 to-slate-600/20 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-white font-medium">{userData.location}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Animated Social Links */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {userData.linkedin && (
                    <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" 
                       className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-700 text-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/50">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                        LinkedIn
                      </div>
                    </a>
                  )}
                  
                  {userData.portfolio_url && (
                    <a href={userData.portfolio_url} target="_blank" rel="noopener noreferrer"
                       className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                        </svg>
                        Portafolio
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Experience Section - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              {/* Work Experience */}
              {userData.work_experience && userData.work_experience.length > 0 && (
                <section className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                    <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center transform rotate-12">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1zm1 5H9v4h2V8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Experiencia Profesional
                    </h2>
                    
                    <div className="space-y-8">
                      {userData.work_experience.map((job, index) => (
                        <div key={job.id} className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                          <div className="relative flex gap-6 p-6">
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                                {job.company.charAt(0)}
                              </div>
                              {index !== userData.work_experience.length - 1 && (
                                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-white mb-2">{job.position}</h3>
                              <p className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">{job.company}</p>
                              <div className="flex items-center gap-4 mb-4">
                                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full text-white/80 text-sm border border-blue-300/30">
                                  {formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : 'Presente'}
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full text-white/80 text-sm border border-cyan-300/30">
                                  {calculateDuration(job.start_date, job.end_date)}
                                </span>
                              </div>
                              <p className="text-white/90 leading-relaxed text-lg">{job.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Projects Section */}
              {userData.projects && userData.projects.length > 0 && (
                <section className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                    <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center transform -rotate-12">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      Proyectos Destacados
                    </h2>
                    
                    <div className="grid gap-6">
                      {userData.projects.map((project) => (
                        <div key={project.id} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                          <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:border-teal-300/50 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300">{project.title}</h3>
                              {project.project_url && (
                                <a href={project.project_url} target="_blank" rel="noopener noreferrer"
                                   className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                  </svg>
                                </a>
                              )}
                            </div>
                            <p className="text-white/90 mb-6 leading-relaxed text-lg">{project.description}</p>
                            <div className="flex flex-wrap gap-3">
                              {project.tools_used.split(',').map((tool, toolIndex) => (
                                <                                span key={toolIndex} 
                                      className={`px-4 py-2 rounded-full text-sm font-bold text-white border transition-all duration-300 hover:scale-105 ${
                                        toolIndex % 4 === 0 ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-300/50' :
                                        toolIndex % 4 === 1 ? 'bg-gradient-to-r from-cyan-500/30 to-teal-500/30 border-cyan-300/50' :
                                        toolIndex % 4 === 2 ? 'bg-gradient-to-r from-teal-500/30 to-blue-500/30 border-teal-300/50' :
                                        'bg-gradient-to-r from-indigo-500/30 to-blue-500/30 border-indigo-300/50'
                                      }`}>
                                  {tool.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              {userData.skills && userData.skills.length > 0 && (
                <section className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h2 className="text-xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center transform rotate-45">
                        <svg className="w-4 h-4 text-white transform -rotate-45" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      Habilidades
                    </h2>
                    
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.map((skillObj, index) => (
                        <span
                          key={index}
                          className={`px-3 py-2 rounded-lg text-xs font-bold text-white border transition-all duration-300 hover:scale-110 animate-pulse ${
                            index % 5 === 0
                              ? 'bg-gradient-to-r from-blue-500/40 to-cyan-500/40 border-blue-300/50'
                              : index % 5 === 1
                              ? 'bg-gradient-to-r from-cyan-500/40 to-teal-500/40 border-cyan-300/50'
                              : index % 5 === 2
                              ? 'bg-gradient-to-r from-teal-500/40 to-blue-500/40 border-teal-300/50'
                              : index % 5 === 3
                              ? 'bg-gradient-to-r from-indigo-500/40 to-blue-500/40 border-indigo-300/50'
                              : 'bg-gradient-to-r from-slate-500/40 to-slate-600/40 border-slate-300/50'
                          }`}
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                          {skillObj.skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Languages */}
              {userData.languages && userData.languages.length > 0 && (
                <section className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h2 className="text-xl font-black mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform -rotate-12">
                        <svg className="w-4 h-4 text-white transform rotate-12" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Idiomas
                    </h2>
                    
                    <div className="space-y-4">
                      {userData.languages.map((langObj, index) => (
                        <div key={index} className="group flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:border-indigo-300/50 transition-all duration-300">
                          <span className="text-white font-semibold group-hover:text-indigo-300 transition-colors duration-300">{langObj.language.name}</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 text-white rounded-full text-sm font-bold border border-indigo-300/50">
                            {langObj.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Education */}
              {userData.education && userData.education.length > 0 && (
                <section className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-2xl blur"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h2 className="text-xl font-black mb-6 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg flex items-center justify-center transform rotate-12">
                        <svg className="w-4 h-4 text-white transform -rotate-12" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      Educación
                    </h2>
                    
                    <div className="space-y-4">
                      {userData.education.map((edu) => (
                        <div key={edu.id} className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-rose-300/50 transition-all duration-300">
                          <h3 className="font-bold text-white group-hover:text-rose-300 transition-colors duration-300 mb-2">{edu.degree}</h3>
                          <p className="text-rose-300 font-semibold mb-2">{edu.institution}</p>
                          <p className="text-white/70 text-sm">
                            {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Certifications */}
              {userData.certifications && userData.certifications.length > 0 && (
                <section className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl blur"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h2 className="text-xl font-black mb-6 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Certificaciones
                    </h2>
                    
                    <div className="space-y-4">
                      {userData.certifications.map((cert) => (
                        <div key={cert.id} className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-amber-300/50 transition-all duration-300">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-bold text-white group-hover:text-amber-300 transition-colors duration-300 mb-2">{cert.name}</h3>
                              <p className="text-amber-300 font-semibold mb-2">{cert.institution}</p>
                              <p className="text-white/70 text-sm">{formatDate(cert.date_obtained)}</p>
                            </div>
                            {cert.certificate_url && (
                              <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer"
                                 className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg ml-3">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Footer with animated elements */}
        <div className="relative mt-16 py-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <p className="text-white/70 text-lg">
              Última actualización: {formatDate(userData.last_updated)}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-100"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creative;