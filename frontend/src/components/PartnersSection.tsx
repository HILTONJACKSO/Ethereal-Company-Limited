'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';

// ==========================================
// CUSTOM HIGH-FIDELITY SVG PARTNER LOGOS
// ==========================================

// 2. M SQUARE
const MSquareMark = ({ size = 45 }: { size?: number }) => {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  return (
    <svg width={size} height={size} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stylized Africa Map representation in Hands-shape */}
      <path d="M36 22C36 16 42 10 46 10C50 10 59 14 62 18C65 22 69 22 69 25C69 28 66 32 64 35C62 38 66 42 68 48C70 54 72 58 69 62C66 66 59 72 54 78C49 84 44 90 40 90C36 90 34 85 34 80C34 75 29 70 27 65C25 60 20 55 20 50C20 45 22 42 26 40C30 38 34 34 34 30C34 26 36 25 36 22Z" fill="#02A1C9" />
      <path d="M42 10C47 10 56 14 59 18C62 22 64 24 61 28C58 32 49 35 44 35C39 35 34 38 32 42C30 46 26 45 24 40C22 35 26 30 30 28C34 26 36 25 36 22Z" fill="#F28101" />
      <path d="M32 42L38 48M36 36L42 42M39 30L45 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Large Letter M */}
      <text x="85" y="65" fill={isDark ? '#ffffff' : '#020c1b'} fontFamily="Montserrat, sans-serif" fontWeight="900" fontSize="55">M</text>
    </svg>
  );
};

const MSquareLogo = () => {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ userSelect: 'none' }}>
      <MSquareMark size={55} />
      <div className="bg-secondary bg-opacity-25 mx-2" style={{ width: '1px', height: '35px' }}></div>
      <div className="text-start" style={{ lineHeight: '0.9' }}>
        <div className="text-uppercase tracking-widest text-muted fw-bold" style={{ fontSize: '0.65rem' }}>SQUARE</div>
        <div className={`fw-extrabold font-montserrat ${isDark ? 'text-white' : 'text-dark'}`} style={{ fontSize: '1.25rem', letterSpacing: '0.05em' }}>AFRICA</div>
      </div>
    </div>
  );
};


// ==========================================
// MAIN PARTNERS SECTION COMPONENT
// ==========================================

export default function PartnersSection() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  const partnersData = [
    {
      id: 'foison',
      name: 'FOISON RESOURCE SIERRA LEONE LIMITED',
      description: 'A trusted partner in resource development and supply solutions across Sierra Leone.',
      logoComp: <img src="/foison.jpg" alt="Foison Resource Sierra Leone Limited" style={{ width: '80%', maxHeight: '120px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />,
      markComp: <img src="/foison.jpg" alt="Foison" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />,
      bgImage: 'https://images.unsplash.com/photo-1579847259164-e35f5835ee0c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'msquare',
      name: 'M SQUARE AFRICA',
      description: 'Subcontracted Ethereal Company Limited to carry out road marking works on major corridor roads, contributing to improved traffic management and infrastructure quality.',
      logoComp: <MSquareLogo />,
      markComp: <MSquareMark size={45} />,
      bgImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'talentia',
      name: 'TALENTIA AFRICA LIBERIA',
      description: 'Ethereal Company Limited partnered with Talentia Africa Liberia in a joint venture to execute the installation of cat eye studs and guardrails, significantly improving road safety and visibility across key routes.',
      logoComp: <img src="/talentia.jpg" alt="Talentia Africa Liberia" style={{ width: '80%', maxHeight: '120px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />,
      markComp: <img src="/talentia.jpg" alt="Talentia" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />,
      bgImage: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'sierramineral',
      name: 'SIERRA MINERAL',
      description: 'Partnered with Ethereal Company Limited to manage mining site logistics, resource transportation, and haulage services, ensuring seamless port-to-market supply chain flow.',
      logoComp: <img src="/sierra_mineral.jpg" alt="Sierra Mineral" style={{ width: '80%', maxHeight: '120px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />,
      markComp: <img src="/sierra_mineral.jpg" alt="Sierra Mineral" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />,
      bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-5 position-relative overflow-hidden transition-all" style={{ background: isDark ? 'var(--background)' : '#ffffff' }}>
      {/* Decorative Swirl in bottom-right corner */}
      <div 
        className="position-absolute bottom-0 end-0 opacity-25 d-none d-lg-block" 
        style={{ 
          width: '500px', 
          height: '500px', 
          background: isDark ? 'radial-gradient(circle, rgba(2, 161, 201, 0.1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(242, 129, 1, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      ></div>
      <div 
        className="position-absolute bottom-0 end-0 d-none d-lg-block" 
        style={{ 
          width: '1000px', 
          height: '2px', 
          background: isDark ? 'linear-gradient(to left, rgba(2, 161, 201, 0.1), transparent)' : 'linear-gradient(to left, rgba(242, 129, 1, 0.15), transparent)', 
          transform: 'rotate(-15deg)', 
          transformOrigin: 'bottom right',
          pointerEvents: 'none',
          zIndex: 0
        }}
      ></div>

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-5">
          {/* Left Column: Partners List */}
          <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-right">
            <div>
              {/* Header Title */}
              <h2 className="fw-extrabold font-montserrat mb-1" style={{ color: isDark ? 'var(--foreground)' : 'var(--brand-deep-purple)', fontSize: '2.5rem', letterSpacing: '-0.02em' }}>
                OUR PARTNERS
              </h2>
              {/* Divider design */}
              <div className="d-flex align-items-center gap-2 mb-4">
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2 L22 6 L12 10 L2 6 Z" fill="none" stroke="var(--brand-golden-orange)" strokeWidth="2" />
                  <path d="M12 4 L17 6 L12 8 L7 6 Z" fill="var(--brand-golden-orange)" />
                </svg>
                <div style={{ height: '2px', width: '150px', background: 'linear-gradient(to right, var(--brand-golden-orange), transparent)' }}></div>
              </div>
              
              <p className="lead text-muted font-sans mb-5" style={{ fontSize: '1.05rem', maxWidth: '500px' }}>
                Strategic partnerships that power our mission and drive sustainable growth across the region.
              </p>
            </div>

            {/* List */}
            <div className="d-flex flex-column gap-4">
              {partnersData.map((partner, index) => (
                <div key={partner.id} className="w-100">
                  <div className="d-flex align-items-start gap-3">
                    {/* Circle logo container */}
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center shadow-sm transition-all" 
                      style={{ 
                        width: '76px', 
                        height: '76px', 
                        background: isDark ? '#07162c' : '#ffffff',
                        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #eef0f3', 
                        flexShrink: 0,
                        padding: '10px'
                      }}
                    >
                      {partner.id === 'talentia' ? (
                        <div style={{ transform: 'scale(0.7)' }}>
                          {partner.markComp}
                        </div>
                      ) : (
                        partner.markComp
                      )}
                    </div>

                    {/* Vertical line indicator */}
                    <div className="align-self-stretch mt-2 mb-2" style={{ width: '3px', background: 'var(--brand-golden-orange)', flexShrink: 0 }}></div>

                    {/* Text container */}
                    <div className="flex-grow-1 ps-2">
                      <h5 className="fw-extrabold font-montserrat mb-1" style={{ color: isDark ? 'var(--brand-cyan-blue)' : 'var(--brand-deep-purple)', fontSize: '0.95rem', letterSpacing: '0.02em', lineHeight: '1.3' }}>
                        {partner.name}
                      </h5>
                      <p className="text-muted font-sans mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                        {partner.description}
                      </p>
                    </div>
                  </div>

                  {/* Dotted horizontal line separator between partners */}
                  {index < partnersData.length - 1 && (
                    <div className="pt-4 mt-2 border-bottom" style={{ borderStyle: 'dotted', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0', borderWidth: '0 0 2px 0' }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 2x2 Grid Cards */}
          <div className="col-lg-6 d-flex align-items-center" data-aos="fade-left">
            <div className="row g-4 w-100">
              {partnersData.map((partner, index) => (
                <div key={partner.id} className="col-md-6" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div 
                    className="card border-0 overflow-hidden shadow-sm hover-scale rounded-5 position-relative transition-all partner-grid-card" 
                    style={{ 
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f0f2f5' 
                    }}
                  >
                    {/* Background Image */}
                    <div 
                      className="position-absolute inset-0 w-100 h-100" 
                      style={{ 
                        backgroundImage: `url(${partner.bgImage})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        filter: 'brightness(0.9)'
                      }}
                    ></div>

                    {/* White frosted glass overlay */}
                    <div 
                      className="position-absolute inset-0 d-flex align-items-center justify-content-center p-4 transition-all" 
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.92)', 
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      {/* Logo Component */}
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center text-center mix-blend-multiply-fallback">
                        {partner.logoComp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
