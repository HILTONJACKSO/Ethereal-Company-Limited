'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { FaSun, FaMoon, FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, mobileMenuOpen, setMobileMenuOpen } = useAppStore();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <nav 
      className="navbar navbar-expand-lg sticky-top py-2 transition-all" 
      style={{ 
        zIndex: 1000, 
        backgroundColor: isDark ? '#020c1b' : '#ffffff', 
        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)' 
      }}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
          <img 
            src="/logo.jpg" 
            alt="ETHEREAL Company Limited" 
            style={{ 
              height: '72px', 
              objectFit: 'contain',
              borderRadius: '10px',
              overflow: 'hidden',
              filter: isDark ? 'brightness(0.95)' : 'none'
            }} 
          />
        </Link>

        {/* Mobile Toggler controls */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <button 
            onClick={toggleTheme} 
            className="btn btn-sm btn-link text-decoration-none rounded-circle border-0 p-2"
            style={{ color: isDark ? '#f3f4f6' : '#374151' }}
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun className="fs-5 text-warning" /> : <FaMoon className="fs-5 text-primary" />}
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-sm border-0 p-2"
            style={{ color: isDark ? '#ffffff' : '#111827' }}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <FaTimes className="fs-4" /> : <FaBars className="fs-4" />}
          </button>
        </div>

        {/* Desktop Links Grid */}
        <div className="d-none d-lg-flex justify-content-between align-items-center flex-grow-1" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path} className="nav-item">
                  <Link 
                    href={link.path} 
                    className={`nav-link nav-link-custom py-1 ${isActive ? 'active fw-bold' : ''}`}
                    style={{ 
                      color: isActive 
                        ? (isDark ? 'var(--brand-cyan-blue)' : 'var(--brand-deep-purple)') 
                        : (isDark ? '#e5e7eb' : '#374151'),
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Contact details */}
            <div 
              className="d-none d-xl-flex flex-column text-end font-sans fs-8 me-2" 
              style={{ 
                lineHeight: '1.3', 
                color: isDark ? '#9ca3af' : '#4b5563' 
              }}
            >
              <span 
                className="d-flex align-items-center gap-1 justify-content-end fw-semibold" 
                style={{ 
                  fontSize: '12px', 
                  color: isDark ? '#f3f4f6' : '#111827' 
                }}
              >
                <FaPhoneAlt className="text-primary" style={{ fontSize: '10px' }} /> +231 77 555 5545
              </span>
              <span className="d-flex align-items-center gap-1 justify-content-end" style={{ fontSize: '11px' }}>
                <FaEnvelope className="text-secondary" style={{ fontSize: '10px' }} /> wiston@etherealcompanylimited.com
              </span>
            </div>

            {/* Theme Toggle desktop button */}
            <button 
              onClick={toggleTheme} 
              className="btn btn-link text-decoration-none rounded-circle p-2 border-0" 
              style={{ color: isDark ? '#f3f4f6' : '#374151', transition: 'transform 0.3s ease' }}
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun className="fs-5 text-warning" /> : <FaMoon className="fs-5 text-primary" />}
            </button>

            <Link href="/contact" className="btn px-4 py-2 rounded-pill font-sans fw-bold d-flex align-items-center gap-1" style={{ background: 'var(--brand-golden-orange)', color: 'white', border: 'none', transition: 'all 0.3s', boxShadow: '0 4px 10px rgba(242,129,1,0.2)' }}>
              Contact Us <FaArrowRight style={{ fontSize: '10px' }} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="position-absolute w-100 d-lg-none animate-fade-in" 
          style={{ 
            top: '100%', 
            left: 0, 
            right: 0, 
            backgroundColor: isDark ? '#020c1b' : '#ffffff', 
            borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)', 
            paddingBottom: '20px', 
            zIndex: 999 
          }}
        >
          <div className="container">
            <ul className="navbar-nav flex-column gap-3 py-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.path} className="nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Link 
                      href={link.path} 
                      className={`nav-link fs-5 px-3 py-2 rounded ${isActive ? 'bg-primary text-white fw-bold' : ''}`}
                      style={{ 
                        color: isActive ? '#fff' : (isDark ? '#e5e7eb' : '#374151'),
                        background: isActive ? 'linear-gradient(135deg, var(--brand-deep-purple), var(--brand-royal-blue))' : 'transparent'
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="px-3 mt-2 d-flex flex-column gap-3 text-center">
              <div className="font-sans fs-7" style={{ lineHeight: '1.3', color: isDark ? '#9ca3af' : '#4b5563' }}>
                <div className="fw-semibold" style={{ color: isDark ? '#f3f4f6' : '#111827' }}><FaPhoneAlt className="text-primary me-1" /> +231 77 555 5545</div>
                <div><FaEnvelope className="text-secondary me-1" /> wiston@etherealcompanylimited.com</div>
              </div>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)} 
                className="btn w-100 py-2 rounded-pill font-sans fw-bold d-flex align-items-center justify-content-center gap-2" 
                style={{ 
                  background: 'var(--brand-golden-orange)', 
                  color: 'white', 
                  border: 'none',
                  transition: 'all 0.3s'
                }}
              >
                Contact Us <FaArrowRight style={{ fontSize: '10px' }} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
