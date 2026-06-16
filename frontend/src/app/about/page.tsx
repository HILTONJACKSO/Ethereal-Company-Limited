'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaEye, FaBullseye, FaShieldAlt, FaLightbulb, FaAward, FaHeart, FaHandshake, 
  FaHardHat, FaShip, FaTruck, FaBuilding, FaChartBar, FaShoppingCart, 
  FaGlobe, FaMapMarkerAlt, FaCogs, FaCheckCircle, FaLinkedin, FaEnvelope, FaChevronRight 
} from 'react-icons/fa';
import { useAppStore } from '@/lib/store';

export default function AboutPage() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Premium Corporate Styling Tokens
  const textColor = isDark ? 'var(--foreground)' : '#020c1b';
  const mutedTextColor = isDark ? 'rgba(238, 240, 241, 0.7)' : '#4b5563';
  const primaryColor = 'var(--brand-royal-blue)';
  const secondaryColor = 'var(--brand-deep-purple)';
  const orangeAccent = 'var(--brand-golden-orange)';
  
  const titleGradient = { 
    background: 'linear-gradient(135deg, var(--brand-royal-blue), var(--brand-deep-purple))', 
    WebkitBackgroundClip: 'text', 
    WebkitTextFillColor: 'transparent', 
    display: 'inline-block' 
  };

  const corporatePillars = [
    {
      title: 'Global Execution Standards',
      desc: 'Connecting mining operators, construction firms, NGOs, and government ministries to robust supply lines and world-class standards.',
      icon: <FaGlobe className="fs-3" style={{ color: 'var(--brand-cyan-blue)' }} />,
      bg: 'rgba(2, 161, 201, 0.06)'
    },
    {
      title: 'Local Strategic Expertise',
      desc: 'Directly operating regional offices in Monrovia, Liberia, and Freetown, Sierra Leone to manage ground-level logistics seamlessly.',
      icon: <FaMapMarkerAlt className="fs-3" style={{ color: orangeAccent }} />,
      bg: 'rgba(242, 129, 1, 0.06)'
    },
    {
      title: 'Proven Infrastructure Delivery',
      desc: 'Executing civil engineering, procurement, logistics, and mining consultancy projects with zero-compromise precision.',
      icon: <FaCogs className="fs-3" style={{ color: primaryColor }} />,
      bg: 'rgba(6, 62, 118, 0.06)'
    }
  ];

  const coreCapabilities = [
    {
      title: 'Construction & Civil Engineering',
      desc: 'Spearheading residential and commercial constructions, site preparation, concrete works, structural reinforcements, and renovations with premium materials.',
      icon: <FaHardHat className="fs-4" />,
      color: primaryColor,
      bg: 'rgba(6, 62, 118, 0.05)',
      highlights: ['Structural Civil Engineering', 'Site Preparation & Groundworks', 'Reinforced Concrete Structures', 'Commercial & Residential Fit-outs']
    },
    {
      title: 'Maritime & Port Services',
      desc: 'Facilitating seamless clearing & forwarding operations, bulk cargo customs handling, shipping brokerage, and vessel dispatch coordination.',
      icon: <FaShip className="fs-4" />,
      color: 'var(--brand-cyan-blue)',
      bg: 'rgba(2, 161, 201, 0.05)',
      highlights: ['Customs Clearing & Forwarding', 'Stevedoring & Port Logistics', 'Bulk Cargo Operations', 'Vessel Dispatch Management']
    },
    {
      title: 'Logistics & Supply Chain Management',
      desc: 'Providing heavy haulage transportation, cross-border corridor trucking, port-to-market dispatch, warehousing, and secure inventory management.',
      icon: <FaTruck className="fs-4" />,
      color: orangeAccent,
      bg: 'rgba(242, 129, 1, 0.05)',
      highlights: ['Heavy Duty Freight Transport', 'Regional Supply Corridor Trucking', 'Bulk Mineral Port-Haulage', 'Inventory & Storage Logistics']
    },
    {
      title: 'Real Estate Development',
      desc: 'Building and managing high-value commercial properties, lease administration, land preparation, and quality housing infrastructure projects.',
      icon: <FaBuilding className="fs-4" />,
      color: secondaryColor,
      bg: 'rgba(96, 4, 91, 0.05)',
      highlights: ['Commercial Office Development', 'Leasing & Facility Management', 'Residential Housing Schemes', 'Land Preparation & Surveying']
    },
    {
      title: 'Project Management & Consultancy',
      desc: 'Managing project life cycles from strategy to implementation, providing mining operations consultancy, compliance audits, and safety monitoring.',
      icon: <FaChartBar className="fs-4" />,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.05)',
      highlights: ['Mining Operations Consultancy', 'Compliance & Safety Auditing', 'Project Planning & Controls', 'Stakeholder & Vendor Coordination']
    },
    {
      title: 'Procurement & General Trading',
      desc: 'Source-to-delivery logistics for specialized mining machinery, heavy civil materials, office inventory, and general consumer items.',
      icon: <FaShoppingCart className="fs-4" />,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.05)',
      highlights: ['Industrial Machinery Sourcing', 'Construction Materials Supply', 'Corporate Inventory Procurement', 'Regional Import-Export Management']
    }
  ];

  const coreValues = [
    { title: 'Integrity', icon: <FaShieldAlt className="fs-4" style={{ color: primaryColor }} />, description: 'Honesty and transparency guide every project we implement.' },
    { title: 'Innovation', icon: <FaLightbulb className="text-warning fs-4" />, description: 'Applying modern technology to infrastructure construction and mining.' },
    { title: 'Excellence', icon: <FaAward className="text-info fs-4" />, description: 'Delivering world-class standards in heavy haulage and civil engineering.' },
    { title: 'Sustainability', icon: <FaHeart className="text-danger fs-4" />, description: 'Fostering ecological safety and local communities in all mining and farming setups.' },
    { title: 'Collaboration', icon: <FaHandshake className="text-success fs-4" />, description: 'Fostering mutual success and regional growth with international NGO partners.' }
  ];


  const timelineSteps = [
    { year: '2016', title: 'Company Inception', desc: 'Ethereal registered as a logistics supplier in Monrovia, serving local building sites.' },
    { year: '2019', title: 'Cross-Border Expansion', desc: 'Opened dispatch logistics offices in Freetown, Sierra Leone, securing heavy hauling projects.' },
    { year: '2022', title: 'Mining & Engineering Concessions', desc: 'Added dedicated geological consulting and structural civil engineering units.' },
    { year: '2025', title: 'Large Scale Infrastructure', desc: 'Contracted for stabilized transport corridors and bulk cargo hauling networks.' }
  ];

  return (
    <div className="transition-all" style={{ minHeight: '100vh', background: isDark ? 'var(--background)' : '#ffffff', color: textColor }}>
      
      {/* 1. HERO HEADER BANNER */}
      <section className="py-5 text-center position-relative overflow-hidden transition-all" style={{ background: isDark ? 'linear-gradient(180deg, rgba(2, 161, 201, 0.05) 0%, var(--background) 100%)' : 'linear-gradient(180deg, rgba(6, 62, 118, 0.03) 0%, rgba(255, 255, 255, 1) 100%)' }}>
        <div className="container py-4">
          <div className="mx-auto" style={{ maxWidth: '800px' }} data-aos="fade-up">
            <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-3 py-1.5 rounded-pill mb-3 d-inline-block" style={{ color: primaryColor, background: 'rgba(6, 62, 118, 0.08)' }}>
              Corporate Profile
            </span>
            <h1 className="fw-bold font-montserrat display-4 mb-3" style={titleGradient}>
              About Ethereal Co. Ltd
            </h1>
            <p className="lead font-sans mb-0" style={{ color: mutedTextColor, fontSize: '1.15rem', lineHeight: '1.6' }}>
              A multi-sector business management and logistics firm specialized in construction, procurement, logistics management, mining consultancy, civil engineering, and project implementation.
            </p>
            <div className="mx-auto mt-4" style={{ width: '80px', height: '3px', background: 'var(--brand-cyan-blue)' }}></div>
          </div>
        </div>
      </section>

      {/* 2. STRATEGIC PILLARS */}
      <section className="py-5 border-bottom transition-all" style={{ background: isDark ? 'var(--background)' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div className="row g-4">
            {corporatePillars.map((pillar, idx) => (
              <div key={pillar.title} className="col-lg-4" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="p-4 rounded-4 h-100 transition-all border shadow-sm hover-scale" style={{ background: isDark ? '#07162c' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                  <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: pillar.bg }}>
                    {pillar.icon}
                  </div>
                  <h5 className="fw-bold font-montserrat mb-2" style={{ color: textColor }}>{pillar.title}</h5>
                  <p className="fs-7 font-sans mb-0" style={{ color: mutedTextColor, lineHeight: '1.6' }}>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORPORATE STORY */}
      <section className="py-5 transition-all" style={{ background: isDark ? 'var(--background)' : '#ffffff' }}>
        <div className="container py-3">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 d-block mb-2" style={{ color: orangeAccent }}>Our Roots</span>
              <h2 className="fw-bold mb-4 font-montserrat fs-3" style={{ color: textColor }}>Our Corporate Story</h2>
              <p className="fs-6 mb-4 font-sans" style={{ color: mutedTextColor, lineHeight: '1.7' }}>
                Established to provide reliable local solutions with global execution standards, we connect mining operators, construction firms, NGOs, and government ministries to robust supply lines and first-rate infrastructure outcomes. 
              </p>
              <p className="fs-6 mb-4 font-sans" style={{ color: mutedTextColor, lineHeight: '1.7' }}>
                Our corporate strength lies in building local structural solutions that endure. With specialized offices in Monrovia, Liberia, and Freetown, Sierra Leone, Ethereal bridges logistics bottlenecks and resources transport networks across key growth nodes in West Africa.
              </p>
              <div className="d-flex align-items-center gap-3">
                <a href="#capabilities" className="btn px-4 py-2.5 rounded-pill font-sans fw-bold text-white shadow border-0" style={{ background: 'linear-gradient(135deg, var(--brand-deep-purple) 0%, var(--brand-royal-blue) 100%)' }}>
                  Explore Capabilities
                </a>
                <a href="/contact" className={`btn px-4 py-2.5 rounded-pill font-sans fw-bold ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`}>
                  Get In Touch
                </a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="position-relative overflow-hidden rounded-4 shadow-lg border" style={{ height: '400px', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" 
                  alt="Corporate Story Worksite"
                  className="w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute bottom-0 start-0 right-0 p-4 bg-gradient-dark text-white d-flex align-items-center gap-3" style={{ background: 'linear-gradient(to top, rgba(2,12,27,0.9), transparent)', width: '100%' }}>
                  <FaCheckCircle className="text-warning fs-3 flex-shrink-0" />
                  <span className="fs-7 font-sans fw-semibold">Ethereal Company Limited is fully registered & licensed in Sierra Leone & Liberia.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE CAPABILITIES (INTEGRATED SERVICES PAGE) */}
      <section id="capabilities" className="py-5 transition-all" style={{ background: isDark ? 'linear-gradient(180deg, var(--background) 0%, rgba(6, 62, 118, 0.04) 100%)' : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(6, 62, 118, 0.02) 100%)' }}>
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 d-block mb-2" style={{ color: primaryColor }}>What We Do</span>
            <h2 className="fw-bold font-montserrat display-5" style={{ color: textColor }}>Core Operational Capabilities</h2>
            <p className="font-sans fs-7 mt-2 mx-auto" style={{ color: mutedTextColor, maxWidth: '600px' }}>
              We deploy advanced technical standards, heavy logistics haulage machinery, and project management expertise to deliver values across key business sectors.
            </p>
            <div className="mx-auto mt-3" style={{ width: '50px', height: '3px', background: 'var(--brand-cyan-blue)' }}></div>
          </div>

          <div className="row g-4">
            {coreCapabilities.map((capability, idx) => (
              <div key={capability.title} className="col-lg-6 col-md-12" data-aos="fade-up" data-aos-delay={idx * 50}>
                <div className="p-4 rounded-4 h-100 border transition-all hover-scale" style={{ background: isDark ? '#020c1b' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                  <div className="d-flex align-items-start gap-3 flex-sm-row flex-column">
                    <div className="d-inline-flex p-3 rounded-circle flex-shrink-0 mb-sm-0 mb-3" style={{ background: capability.bg, color: capability.color }}>
                      {capability.icon}
                    </div>
                    <div>
                      <h4 className="fw-bold font-montserrat mb-2 fs-5" style={{ color: textColor }}>{capability.title}</h4>
                      <p className="fs-7 font-sans mb-3" style={{ color: mutedTextColor, lineHeight: '1.6' }}>{capability.desc}</p>
                      
                      {/* Capability Highlights list */}
                      <div className="row g-2">
                        {capability.highlights.map((h, i) => (
                          <div key={i} className="col-sm-6 col-12">
                            <div className="d-flex align-items-center gap-1.5 fs-8 font-sans" style={{ color: textColor }}>
                              <FaChevronRight className="fs-9" style={{ color: capability.color, fontSize: '8px' }} />
                              <span>{h}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VISION & MISSION */}
      <section className="py-5 transition-all" style={{ background: isDark ? 'var(--background)' : '#ffffff' }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="p-4 rounded-4 h-100 text-center border shadow-sm" style={{ background: isDark ? '#07162c' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                <div className="d-inline-flex p-3 rounded-circle bg-opacity-15 mb-3" style={{ background: 'rgba(2, 161, 201, 0.08)' }}>
                  <FaEye className="fs-3" style={{ color: 'var(--brand-cyan-blue)' }} />
                </div>
                <h4 className="fw-bold font-montserrat mb-3" style={{ color: textColor }}>Our Vision</h4>
                <p className="fs-6 mb-0 font-sans italic" style={{ color: mutedTextColor }}>
                  "Building Africa through strategic alliances."
                </p>
              </div>
            </div>

            <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="p-4 rounded-4 h-100 text-center border shadow-sm" style={{ background: isDark ? '#07162c' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                <div className="d-inline-flex p-3 rounded-circle bg-opacity-15 mb-3" style={{ background: 'rgba(242, 129, 1, 0.08)' }}>
                  <FaBullseye className="fs-3" style={{ color: orangeAccent }} />
                </div>
                <h4 className="fw-bold font-montserrat mb-3" style={{ color: textColor }}>Our Mission</h4>
                <p className="fs-6 mb-0 font-sans italic" style={{ color: mutedTextColor }}>
                  "Connecting Trade in Africa the reliable way."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORE VALUES */}
      <section className="py-5 transition-all" style={{ background: isDark ? '#020c1b' : 'rgba(6, 62, 118, 0.015)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 d-block mb-2" style={{ color: orangeAccent }}>Our Principles</span>
            <h3 className="fw-bold font-montserrat fs-3" style={{ color: textColor }}>Corporate Values</h3>
            <div className="mx-auto mt-2" style={{ width: '40px', height: '3px', background: 'var(--brand-cyan-blue)' }}></div>
          </div>
          
          <div className="row g-4 justify-content-center">
            {coreValues.map((value, idx) => (
              <div key={value.title} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={idx * 50}>
                <div className="p-4 rounded-4 h-100 border shadow-sm" style={{ background: isDark ? '#07162c' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="p-2 rounded" style={{ background: 'rgba(6, 62, 118, 0.06)' }}>
                      {value.icon}
                    </div>
                    <h5 className="fw-bold font-montserrat mb-0" style={{ color: textColor }}>{value.title}</h5>
                  </div>
                  <p className="fs-7 font-sans mb-0" style={{ color: mutedTextColor, lineHeight: '1.6' }}>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 8. INTERACTIVE TIMELINE */}
      <section className="py-5 transition-all" style={{ background: isDark ? 'linear-gradient(180deg, var(--background) 0%, rgba(242, 129, 1, 0.04) 100%)' : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242, 129, 1, 0.02) 100%)' }}>
        <div className="container py-3">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 d-block mb-2" style={{ color: orangeAccent }}>Milestones</span>
            <h3 className="fw-bold font-montserrat fs-3" style={{ color: textColor }}>Our Growth Timeline</h3>
            <div className="mx-auto mt-2" style={{ width: '40px', height: '3px', background: 'var(--brand-cyan-blue)' }}></div>
          </div>

          <div className="row g-4">
            {timelineSteps.map((step, idx) => (
              <div key={step.year} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="p-4 rounded-4 h-100 position-relative border shadow-sm transition-all hover-scale" style={{ background: isDark ? '#07162c' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                  <span className="display-6 fw-bold mb-2 d-block font-montserrat" style={{ background: 'linear-gradient(135deg, var(--brand-royal-blue), var(--brand-deep-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                    {step.year}
                  </span>
                  <h6 className="fw-bold font-montserrat mb-2" style={{ color: textColor }}>{step.title}</h6>
                  <p className="fs-7 font-sans mb-0" style={{ color: mutedTextColor, lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
