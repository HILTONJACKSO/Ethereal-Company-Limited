'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/lib/api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaTimes, FaExpand, FaTag, FaInfoCircle } from 'react-icons/fa';
import { useAppStore } from '@/lib/store';

// Mockup gallery items in case database projects do not contain gallery items
const mockupGallery = [
  {
    id: 'mock-1',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    category: 'Civil Engineering',
    caption: 'Monrovia Business Complex Structural Works',
    projectTitle: 'Monrovia Business Complex'
  },
  {
    id: 'mock-2',
    url: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80',
    category: 'Road Construction',
    caption: 'East-West Highway Asphalt Laying',
    projectTitle: 'East-West Highway Project'
  },
  {
    id: 'mock-3',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    category: 'Logistics & Haulage',
    caption: 'Freeport Container Dispatch Operations',
    projectTitle: 'Freeport Operations Support'
  },
  {
    id: 'mock-4',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    category: 'Infrastructure Development',
    caption: 'Ethereal Towers Structural Inspections',
    projectTitle: 'Ethereal Towers'
  },
  {
    id: 'mock-5',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    category: 'Civil Engineering',
    caption: 'Foundation Excavation Monrovia Site',
    projectTitle: 'Monrovia Business Complex'
  },
  {
    id: 'mock-6',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    category: 'Logistics & Haulage',
    caption: 'Cargo Handling & Port Warehousing',
    projectTitle: 'Freeport Operations Support'
  }
];

export default function GalleryPage() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<any | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

  // Extract all gallery photos from projects
  const galleryItems: any[] = [];
  
  projects.forEach((proj) => {
    if (proj.cover_image_url) {
      galleryItems.push({
        id: `cover-${proj.id}`,
        url: proj.cover_image_url,
        category: proj.category,
        caption: `${proj.title} - Cover Photo`,
        projectTitle: proj.title,
      });
    }
    
    if (proj.gallery) {
      proj.gallery.forEach((item) => {
        if (item.image_url) {
          galleryItems.push({
            id: `sub-${item.id}`,
            url: item.image_url,
            category: proj.category,
            caption: item.caption || `${proj.title} Operations`,
            projectTitle: proj.title,
          });
        }
      });
    }
  });

  const finalGalleryItems = galleryItems.length > 0 ? galleryItems : mockupGallery;

  const categories = ['All', 'Road Construction', 'Mining Operations', 'Logistics & Haulage', 'Civil Engineering', 'Infrastructure Development'];

  const filteredItems = activeFilter === 'All'
    ? finalGalleryItems
    : finalGalleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="transition-all py-5" style={{ minHeight: '100vh', background: isDark ? 'var(--background)' : '#ffffff', color: isDark ? 'var(--foreground)' : '#020c1b' }}>
      <div className="container py-4">

        {/* Header banner */}
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-3 py-1.5 rounded-pill mb-3 d-inline-block" style={{ background: 'rgba(96, 4, 91, 0.06)', color: 'var(--brand-deep-purple)' }}>
            Media Center
          </span>
          <h1 className="fw-bold font-montserrat display-4 mb-2">
            Operational Gallery
          </h1>
          <div className="fs-5 fw-bold mb-3" style={{ color: 'var(--brand-golden-orange)', letterSpacing: '4px' }}>◆</div>
          <div className="mx-auto" style={{ width: '40px', height: '3px', background: 'var(--brand-cyan-blue)' }}></div>
        </div>

        {/* Filter categories list */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5" data-aos="fade-up">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="btn px-4 py-2 rounded-pill font-sans fs-7 fw-bold transition-all"
                style={{
                  background: isActive ? 'linear-gradient(135deg, var(--brand-deep-purple) 0%, var(--brand-royal-blue) 100%)' : (isDark ? '#07162c' : '#ffffff'),
                  color: isActive ? '#ffffff' : (isDark ? 'var(--foreground)' : '#374151'),
                  border: isActive ? '1px solid transparent' : (isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)'),
                  boxShadow: isActive ? '0 4px 12px rgba(96, 4, 91, 0.2)' : 'none',
                  outline: 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Loader status */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading gallery...</span>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="row g-4">
          {filteredItems.map((item, idx) => (
            <div key={item.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={idx * 50}>
              <div 
                className="card rounded-4 overflow-hidden position-relative border cursor-pointer hover-scale shadow-sm"
                style={{ height: '280px', background: isDark ? '#07162c' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
                onClick={() => setLightboxItem(item)}
              >
                <img 
                  src={item.url} 
                  alt={item.caption}
                  className="w-100 h-100 object-fit-cover"
                />
                
                {/* hover mask overlay */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-3 opacity-0 hover-opacity-100 transition-all duration-300" 
                  style={{ background: 'rgba(2, 12, 27, 0.7)' }}
                >
                  <div className="d-flex justify-content-end">
                    <span className="p-2 bg-white bg-opacity-20 rounded-circle text-white">
                      <FaExpand />
                    </span>
                  </div>
                  <div className="text-white">
                    <span className="badge bg-primary fs-9 font-sans text-uppercase mb-2 d-inline-block" style={{ background: 'var(--brand-cyan-blue)' }}>
                      <FaTag className="me-1" /> {item.category}
                    </span>
                    <h6 className="fw-bold font-montserrat mb-1 text-truncate">{item.caption}</h6>
                    <span className="fs-8 text-white text-opacity-75 font-sans d-block">{item.projectTitle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && !isLoading && (
            <div className="text-center text-muted py-5 col-12">
              <p className="fs-6 font-sans">No gallery photos discovered for this operational filter.</p>
            </div>
          )}
        </div>

        {/* 6. LIGHTBOX MODAL OVERLAY */}
        {lightboxItem && (
          <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(2, 12, 27, 0.95)', zIndex: 1100 }} onClick={() => setLightboxItem(null)}>
            <button 
              type="button" 
              className="btn position-absolute text-white border-0" 
              style={{ top: '24px', right: '24px', zIndex: 1101 }}
              onClick={() => setLightboxItem(null)}
              aria-label="Close Lightbox"
            >
              <FaTimes className="fs-3" />
            </button>
            
            <div className="modal-dialog modal-xl modal-dialog-centered h-100 max-h-screen my-0" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content bg-transparent border-0 d-flex align-items-center justify-content-center">
                <div className="position-relative text-center w-100 max-h-screen p-3 d-flex flex-column align-items-center">
                  <img 
                    src={lightboxItem.url} 
                    alt={lightboxItem.caption}
                    className="img-fluid rounded-3 shadow-lg"
                    style={{ maxHeight: '75vh', objectFit: 'contain' }}
                  />
                  <div className="mt-3 text-white max-w-lg text-center">
                    <span className="badge px-3 py-1.5 rounded-pill mb-2 text-uppercase font-sans fs-8" style={{ background: 'var(--brand-cyan-blue)' }}>
                      {lightboxItem.category}
                    </span>
                    <h4 className="fw-bold font-montserrat mb-1">{lightboxItem.caption}</h4>
                    <p className="fs-7 text-white text-opacity-75 font-sans d-flex align-items-center justify-content-center gap-1">
                      <FaInfoCircle /> Associated with: {lightboxItem.projectTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
