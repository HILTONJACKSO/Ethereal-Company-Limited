'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { FaHome, FaArrowLeft, FaEnvelope } from 'react-icons/fa';

export default function NotFound() {
  const router = useRouter();
  const { theme } = useAppStore();
  const isDark = theme === 'dark';

  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100 px-3 transition-all"
      style={{ 
        background: isDark ? '#020c1b' : '#ffffff',
        color: isDark ? '#EEF0F1' : '#020c1b',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Glow Blurs */}
      <div 
        className="glow-blur animate-fade-in" 
        style={{ 
          position: 'absolute',
          top: '20%', 
          left: '15%', 
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          background: 'var(--brand-deep-purple)',
          opacity: isDark ? 0.25 : 0.1 
        }}
      />
      <div 
        className="glow-blur animate-fade-in" 
        style={{ 
          position: 'absolute',
          bottom: '20%', 
          right: '15%', 
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          background: 'var(--brand-cyan-blue)',
          opacity: isDark ? 0.25 : 0.1 
        }}
      />

      <div className="container text-center position-relative z-1 py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            {/* Animated 404 Number */}
            <h1 
              className="display-1 fw-extrabold mb-3 tracking-tighter text-gradient floating-shape"
              style={{ 
                fontSize: 'calc(5rem + 5vw)',
                lineHeight: '0.9'
              }}
            >
              404
            </h1>

            {/* Error Subtitle */}
            <h2 className="fw-bold fs-3 mb-3 font-montserrat" style={{ color: isDark ? '#ffffff' : '#063E76' }}>
              Oops! Page Not Found
            </h2>

            {/* Explanatory Text */}
            <p 
              className="text-muted mx-auto mb-5 font-sans fs-6" 
              style={{ maxWidth: '500px', lineHeight: '1.6' }}
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button 
                onClick={() => router.back()} 
                className="btn btn-outline-secondary px-4 py-2.5 rounded-pill font-sans fw-bold d-flex align-items-center gap-2 hover-scale"
                style={{ 
                  borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                  color: isDark ? '#EEF0F1' : '#374151',
                  background: 'transparent'
                }}
              >
                <FaArrowLeft style={{ fontSize: '12px' }} /> Go Back
              </button>

              <Link 
                href="/" 
                className="btn px-4 py-2.5 rounded-pill font-sans fw-bold text-white d-flex align-items-center gap-2 hover-scale"
                style={{ 
                  background: 'linear-gradient(135deg, var(--brand-deep-purple) 0%, var(--brand-royal-blue) 100%)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(96,4,91,0.25)'
                }}
              >
                <FaHome style={{ fontSize: '12px' }} /> Back to Home
              </Link>

              <Link 
                href="/contact" 
                className="btn px-4 py-2.5 rounded-pill font-sans fw-bold text-white d-flex align-items-center gap-2 hover-scale"
                style={{ 
                  background: 'var(--brand-golden-orange)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(242,129,1,0.25)'
                }}
              >
                <FaEnvelope style={{ fontSize: '12px' }} /> Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
