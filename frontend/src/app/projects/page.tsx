'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/lib/api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaMapMarkerAlt, FaCalendarAlt, FaUser, FaTimes, FaArrowRight, FaTasks, 
  FaBuilding, FaRoad, FaCogs, FaTruck, FaHardHat, FaCheckCircle, FaExclamationTriangle, FaLightbulb 
} from 'react-icons/fa';
import { useAppStore } from '@/lib/store';

export default function ProjectsPage() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    // Auto-scroll to project slug hash if provided
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

  const categories = [
    'All',
    'Road Construction',
    'Mining Operations',
    'Logistics & Haulage',
    'Civil Engineering',
    'Infrastructure Development'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // Helper to retrieve icons for categories
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Road Construction': return <FaRoad />;
      case 'Mining Operations': return <FaCogs />;
      case 'Logistics & Haulage': return <FaTruck />;
      case 'Civil Engineering': return <FaHardHat />;
      case 'Infrastructure Development': return <FaBuilding />;
      default: return <FaBuilding />;
    }
  };

  // Premium Corporate Styling Tokens
  const textColor = isDark ? 'var(--foreground)' : '#020c1b';
  const mutedTextColor = isDark ? 'rgba(238, 240, 241, 0.7)' : '#4b5563';
  const primaryColor = 'var(--brand-royal-blue)';
  
  const titleGradient = { 
    background: 'linear-gradient(135deg, var(--brand-royal-blue), var(--brand-deep-purple))', 
    WebkitBackgroundClip: 'text', 
    WebkitTextFillColor: 'transparent', 
    display: 'inline-block' 
  };

  return (
    <div className="transition-all py-5" style={{ minHeight: '100vh', background: isDark ? 'var(--background)' : '#ffffff', color: textColor }}>
      <div className="container py-4">

        {/* 1. HERO HEADER */}
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-3 py-1.5 rounded-pill mb-3 d-inline-block" style={{ color: primaryColor, background: 'rgba(6, 62, 118, 0.08)' }}>
            Our Portfolio
          </span>
          <h1 className="fw-bold font-montserrat display-4 mb-3" style={titleGradient}>
            Infrastructure & Heavy Operations Cases
          </h1>
          <p className="fs-6 font-sans mx-auto mb-0" style={{ color: mutedTextColor, maxWidth: '650px', lineHeight: '1.6' }}>
            Explore Ethereal's signature project case studies, showcasing structural civil engineering, resource hauling corridors, and road works across Liberia and Sierra Leone.
          </p>
          <div className="mx-auto mt-4" style={{ width: '80px', height: '3px', background: 'var(--brand-cyan-blue)' }}></div>
        </div>

        {/* 2. FILTER CATEGORY CHIPS */}
        <div className="d-flex flex-wrap justify-content-center gap-2.5 mb-5" data-aos="fade-up">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="btn px-4 py-2.5 rounded-pill font-sans fs-7 fw-bold d-flex align-items-center gap-2 transition-all hover-scale"
                style={{
                  background: isActive ? 'linear-gradient(135deg, var(--brand-royal-blue) 0%, var(--brand-deep-purple) 100%)' : (isDark ? '#07162c' : '#ffffff'),
                  color: isActive ? '#ffffff' : textColor,
                  border: isActive ? 'none' : (isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)'),
                  boxShadow: isActive ? '0 4px 15px rgba(6, 62, 118, 0.25)' : '0 2px 5px rgba(0,0,0,0.02)',
                }}
              >
                {cat !== 'All' && <span style={{ opacity: isActive ? 1 : 0.6 }}>{getCategoryIcon(cat)}</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Loader Spin */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading projects...</span>
            </div>
          </div>
        )}

        {/* 3. PROJECTS GRID DISPLAY */}
        <div className="row g-4">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              id={project.slug}
              className="col-lg-4 col-md-6 scroll-mt-5" 
              data-aos="fade-up" 
              data-aos-delay={idx * 100}
            >
              <div 
                className="rounded-4 overflow-hidden h-100 cursor-pointer d-flex flex-column justify-content-between hover-scale border"
                onClick={() => setSelectedProject(project)}
                style={{ 
                  background: isDark ? '#07162c' : '#ffffff', 
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                }}
              >
                <div>
                  {/* Cover picture with zoom hover effect */}
                  <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                    <img 
                      src={project.cover_image_url || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'} 
                      alt={project.title}
                      className="w-100 h-100 object-fit-cover transition-all"
                      style={{ transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    />
                    <span 
                      className="position-absolute text-white fs-8 font-sans px-3 py-1.5 rounded-pill fw-bold shadow-sm"
                      style={{ top: '15px', right: '15px', background: 'linear-gradient(135deg, var(--brand-deep-purple), var(--brand-royal-blue))' }}
                    >
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Card description details */}
                  <div className="p-4">
                    <div className="d-flex align-items-center gap-1.5 text-muted fs-8 font-sans mb-2">
                      <FaMapMarkerAlt style={{ color: 'var(--brand-golden-orange)' }} />
                      <span>{project.location}</span>
                    </div>
                    <h5 className="fw-bold font-montserrat mb-2" style={{ fontSize: '18px', color: textColor }}>{project.title}</h5>
                    <p className="fs-7 font-sans mb-0 text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.6' }}>
                      {project.description}
                    </p>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <span className="text-decoration-none fw-bold fs-7 d-inline-flex align-items-center gap-1.5 hover-link" style={{ color: primaryColor }}>
                    Read Case Study <FaArrowRight className="fs-8" />
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {filteredProjects.length === 0 && !isLoading && (
            <div className="text-center text-muted py-5 col-12">
              <p className="fs-6 font-sans">No projects found in this category. We are actively planning new operations.</p>
            </div>
          )}
        </div>

        {/* 4. DETAILS POPUP MODAL OVERLAY */}
        {selectedProject && (
          <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(2, 12, 27, 0.75)', zIndex: 1050, backdropFilter: 'blur(4px)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content border-0 rounded-4 shadow-lg transition-all" style={{ color: textColor, background: isDark ? '#020c1b' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                
                {/* Modal Header */}
                <div className="modal-header d-flex justify-content-between align-items-center border-bottom-0 py-3.5 px-4" style={{ background: isDark ? '#07162c' : '#f8f9fa' }}>
                  <div>
                    <span className="badge fs-8 font-sans px-3 py-1.5 rounded-pill text-uppercase mb-1.5 d-inline-block text-white" style={{ background: 'linear-gradient(135deg, var(--brand-royal-blue), var(--brand-deep-purple))' }}>
                      {selectedProject.category}
                    </span>
                    <h4 className="modal-title fw-bold font-montserrat mb-0" style={{ color: textColor }}>{selectedProject.title}</h4>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-close border-0 p-2.5 rounded-circle d-flex align-items-center justify-content-center" 
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close modal"
                    style={{ background: 'rgba(0,0,0,0.05)', width: '32px', height: '32px' }}
                  >
                    <FaTimes style={{ fontSize: '14px' }} />
                  </button>
                </div>
                
                {/* Modal Body */}
                <div className="modal-body px-4 py-4">
                  {/* Cover picture */}
                  <div className="position-relative overflow-hidden rounded-4 mb-4" style={{ height: '300px' }}>
                    <img 
                      src={selectedProject.cover_image_url || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'} 
                      alt={selectedProject.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  {/* Operational stats parameters */}
                  <div className="row g-3 p-3 rounded-4 mb-4 border" style={{ background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(6, 62, 118, 0.02)', borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(6, 62, 118, 0.05)' }}>
                    <div className="col-sm-4 d-flex align-items-center gap-3.5">
                      <div className="p-2.5 rounded-circle bg-opacity-10 bg-primary text-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'rgba(6, 62, 118, 0.08)' }}>
                        <FaUser className="fs-6" />
                      </div>
                      <div>
                        <span className="fs-8 text-muted d-block font-sans">Client</span>
                        <span className="fw-bold fs-7 font-montserrat" style={{ color: textColor }}>{selectedProject.client}</span>
                      </div>
                    </div>
                    <div className="col-sm-4 d-flex align-items-center gap-3.5">
                      <div className="p-2.5 rounded-circle bg-opacity-10 bg-danger text-danger d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'rgba(242, 129, 1, 0.08)' }}>
                        <FaMapMarkerAlt className="fs-6" style={{ color: 'var(--brand-golden-orange)' }} />
                      </div>
                      <div>
                        <span className="fs-8 text-muted d-block font-sans">Location</span>
                        <span className="fw-bold fs-7 font-montserrat" style={{ color: textColor }}>{selectedProject.location}</span>
                      </div>
                    </div>
                    <div className="col-sm-4 d-flex align-items-center gap-3.5">
                      <div className="p-2.5 rounded-circle bg-opacity-10 bg-warning text-warning d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'rgba(255, 193, 7, 0.08)' }}>
                        <FaCalendarAlt className="fs-6" />
                      </div>
                      <div>
                        <span className="fs-8 text-muted d-block font-sans">Timeline</span>
                        <span className="fw-bold fs-7 font-montserrat" style={{ color: textColor }}>{selectedProject.project_date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary descriptions */}
                  <div className="mb-4">
                    <h5 className="fw-bold font-montserrat mb-2" style={{ color: textColor }}>Project Overview</h5>
                    <p className="fs-6 font-sans text-muted mb-0" style={{ lineHeight: '1.6' }}>{selectedProject.description}</p>
                  </div>

                  {/* Scope of Work */}
                  <div className="mb-4">
                    <h5 className="fw-bold font-montserrat mb-2.5 d-flex align-items-center gap-2" style={{ color: textColor }}>
                      <FaTasks style={{ color: primaryColor }} /> Scope of Work
                    </h5>
                    <div className="p-3.5 rounded-4 border font-sans fs-7 text-muted whitespace-pre-line" style={{ background: isDark ? '#07162c' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', lineHeight: '1.6' }}>
                      {selectedProject.scope}
                    </div>
                  </div>

                  {/* Challenges, solutions, and outcomes columns */}
                  <div className="row g-3 mb-4">
                    {selectedProject.challenges && (
                      <div className="col-md-6">
                        <div className="p-3.5 rounded-4 border h-100" style={{ background: 'rgba(239, 68, 68, 0.02)', borderColor: 'rgba(239, 68, 68, 0.08)' }}>
                          <h6 className="fw-bold text-danger font-montserrat mb-2 d-flex align-items-center gap-1.5">
                            <FaExclamationTriangle /> Challenges
                          </h6>
                          <p className="fs-7 font-sans mb-0 text-muted" style={{ lineHeight: '1.6' }}>{selectedProject.challenges}</p>
                        </div>
                      </div>
                    )}
                    {selectedProject.solutions && (
                      <div className="col-md-6">
                        <div className="p-3.5 rounded-4 border h-100" style={{ background: 'rgba(16, 185, 129, 0.02)', borderColor: 'rgba(16, 185, 129, 0.08)' }}>
                          <h6 className="fw-bold text-success font-montserrat mb-2 d-flex align-items-center gap-1.5">
                            <FaLightbulb /> Solutions
                          </h6>
                          <p className="fs-7 font-sans mb-0 text-muted" style={{ lineHeight: '1.6' }}>{selectedProject.solutions}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedProject.results && (
                    <div className="p-3.5 rounded-4 border mb-4" style={{ background: 'rgba(2, 161, 201, 0.02)', borderColor: 'rgba(2, 161, 201, 0.08)' }}>
                      <h6 className="fw-bold font-montserrat mb-2 d-flex align-items-center gap-1.5" style={{ color: 'var(--brand-cyan-blue)' }}>
                        <FaCheckCircle /> Project Results
                      </h6>
                      <p className="fs-7 font-sans mb-0 text-muted" style={{ lineHeight: '1.6' }}>{selectedProject.results}</p>
                    </div>
                  )}

                  {/* Project Gallery thumbnails */}
                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div>
                      <h5 className="fw-bold font-montserrat mb-3" style={{ color: textColor }}>Project Operations Gallery</h5>
                      <div className="row g-3">
                        {selectedProject.gallery.map((imgItem: any) => (
                          <div key={imgItem.id} className="col-sm-6">
                            <div className="position-relative overflow-hidden rounded-3 border" style={{ height: '180px' }}>
                              <img 
                                src={imgItem.image_url} 
                                alt={imgItem.caption || "Gallery item"} 
                                className="w-100 h-100 object-fit-cover"
                              />
                              {imgItem.caption && (
                                <div className="position-absolute bottom-0 w-100 p-2 text-center text-white fs-8" style={{ background: 'rgba(2,12,27,0.75)' }}>
                                  {imgItem.caption}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Modal Footer */}
                <div className="modal-footer border-top-0 px-4 py-3.5" style={{ background: isDark ? '#07162c' : '#f8f9fa' }}>
                  <button 
                    type="button" 
                    className={`btn px-4 rounded-pill font-sans fw-bold ${isDark ? 'btn-outline-light' : 'btn-secondary'}`} 
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </button>
                  <Link 
                    href="/contact" 
                    className="btn px-4 rounded-pill font-sans fw-bold text-white shadow border-0" 
                    style={{ background: 'linear-gradient(135deg, var(--brand-royal-blue) 0%, var(--brand-deep-purple) 100%)' }}
                    onClick={() => setSelectedProject(null)}
                  >
                    Request Similar Solutions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
