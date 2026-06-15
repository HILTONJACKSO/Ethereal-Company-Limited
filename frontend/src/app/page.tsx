'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchServices, fetchProjects, fetchPartners } from '@/lib/api';
import DynamicIcon from '@/components/DynamicIcon';
import PartnersSection from '@/components/PartnersSection';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaArrowRight, 
  FaPlay, 
  FaTimes,
  FaCheck, 
  FaBuilding, 
  FaShip, 
  FaTruck, 
  FaCogs, 
  FaHandshake, 
  FaUsers, 
  FaClock, 
  FaLightbulb, 
  FaShieldAlt, 
  FaAward, 
  FaSmile,
  FaArrowDown,
  FaGlobe,
  FaEye,
  FaBullseye,
  FaBoxOpen,
  FaSeedling,
  FaHammer,
  FaWrench,
  FaRoad,
  FaHardHat,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';

import { useAppStore } from '@/lib/store';

export default function HomePage() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  const [videoOpen, setVideoOpen] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Fetch Services from Django API
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  // Fetch Projects from Django API
  const { data: projects = [] } = useQuery({
    queryKey: ['projects', { is_featured: true }],
    queryFn: () => fetchProjects({ is_featured: true }),
  });

  // Fetch Partners from Django API
  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
  });

  // Mapper to style backend services dynamically like the mockup
  const getServiceStyles = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('construction') || lowerTitle.includes('civil')) {
      return { 
        icon: <FaBuilding className="fs-3" />, 
        color: '#60045B', 
        bg: 'rgba(96, 4, 91, 0.1)' 
      };
    } else if (lowerTitle.includes('maritime') || lowerTitle.includes('import') || lowerTitle.includes('port')) {
      return { 
        icon: <FaShip className="fs-3" />, 
        color: '#063E76', 
        bg: 'rgba(6, 62, 118, 0.1)' 
      };
    } else if (lowerTitle.includes('logistics') || lowerTitle.includes('truck')) {
      return { 
        icon: <FaTruck className="fs-3" />, 
        color: '#02A1C9', 
        bg: 'rgba(2, 161, 201, 0.1)' 
      };
    } else if (lowerTitle.includes('real estate') || lowerTitle.includes('building') || lowerTitle.includes('towers')) {
      return { 
        icon: <FaBuilding className="fs-3" />, 
        color: '#F28101', 
        bg: 'rgba(242, 129, 1, 0.1)' 
      };
    } else if (lowerTitle.includes('project') || lowerTitle.includes('consultancy') || lowerTitle.includes('implementation')) {
      return { 
        icon: <FaCogs className="fs-3" />, 
        color: '#8A2BE2', 
        bg: 'rgba(138, 43, 226, 0.1)' 
      };
    } else {
      return { 
        icon: <FaHandshake className="fs-3" />, 
        color: '#063E76', 
        bg: 'rgba(6, 62, 118, 0.1)' 
      };
    }
  };

  // Why Choose Us list
  const whyChooseUsData = [
    {
      title: 'Experienced Team',
      icon: <FaUsers className="fs-4" />,
      color: '#60045B',
      description: 'Skilled professionals with global expertise.'
    },
    {
      title: 'Timely Delivery',
      icon: <FaClock className="fs-4" />,
      color: '#063E76',
      description: 'On-time project completion, every time.'
    },
    {
      title: 'Innovative Solutions',
      icon: <FaLightbulb className="fs-4" />,
      color: '#02A1C9',
      description: 'Technology-driven smart solutions.'
    },
    {
      title: 'Safety First',
      icon: <FaShieldAlt className="fs-4" />,
      color: '#F28101',
      description: 'Zero compromise on safety standards.'
    },
    {
      title: 'Global Standards',
      icon: <FaAward className="fs-4" />,
      color: '#8A2BE2',
      description: 'International quality and compliance.'
    },
    {
      title: 'Client Satisfaction',
      icon: <FaSmile className="fs-4" />,
      color: '#063E76',
      description: 'Our clients are at the heart of our success.'
    }
  ];



  // Mockup Featured Projects per image
  const mockupProjects = [
    {
      title: 'Monrovia Business Complex',
      location: 'Monrovia, Liberia',
      category: 'Construction',
      image: '/monrovia_complex.png'
    },
    {
      title: 'East-West Highway Project',
      location: 'Gbarnga, Liberia',
      category: 'Infrastructure',
      image: '/east_west_highway.png'
    },
    {
      title: 'Freeport Operations Support',
      location: 'Monrovia, Liberia',
      category: 'Maritime',
      image: '/freeport_operations.png'
    },
    {
      title: 'Ethereal Towers',
      location: 'Monrovia, Liberia',
      category: 'Real Estate',
      image: '/ethereal_towers.png'
    }
  ];





  return (
    <div className="overflow-hidden transition-all" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* 1. HERO SECTION */}
      <section 
        className="position-relative overflow-hidden" 
        style={{ 
          background: 'linear-gradient(to right, rgba(2, 12, 27, 0.95) 0%, rgba(2, 12, 27, 0.7) 50%, rgba(2, 12, 27, 0.3) 100%), url("/hero_workers.png") center bottom/cover no-repeat',
          paddingTop: '3rem',
          paddingBottom: 'clamp(8rem, 20vw, 16.25rem)'
        }}
      >
        <div className="container position-relative z-1 py-5">
          <div className="row align-items-center">
            <div className="col-lg-8 text-white" data-aos="fade-right">
              <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-4 py-1.5 rounded-pill mb-4 d-inline-block" style={{ color: 'var(--brand-golden-orange)', border: '1px solid rgba(242, 129, 1, 0.5)', background: 'transparent' }}>
                Liberia &middot; Sierra Leone
              </span>
              <h1 className="fluid-display-1 fw-extrabold mb-3.5 font-montserrat tracking-tight leading-none" style={{ lineHeight: '1.1' }}>
                <span className="text-white">Building Africa's</span><br />
                <span className="text-white">Future</span>
              </h1>
              <p className="lead text-white text-opacity-85 mb-5 font-sans fluid-text-lg" style={{ maxWidth: '600px', lineHeight: '1.6' }}>
                Ethereal Company Limited: a business entity with specialization in Logistics, Mining, Construction and Civil Engineering.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link href="#projects" className="btn px-4 py-3 rounded-pill fw-bold d-flex align-items-center gap-3" style={{ background: 'var(--brand-golden-orange)', color: '#020c1b', border: 'none', transition: 'transform 0.3s' }}>
                  Explore Projects
                  <span className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                    <FaArrowRight style={{ fontSize: '12px', color: 'var(--brand-golden-orange)' }} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS PILL OVERLAY */}
      <div className="container position-relative z-2 hero-stats-container" style={{ marginBottom: '20px' }}>
        <div className="rounded-4 shadow-lg mx-auto transition-all overflow-hidden max-w-tv" style={{ background: isDark ? '#020c1b' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', border: '1px solid' }}>
          <div className="row g-0 text-center align-items-stretch">
            <div className="col-lg-3 col-6 p-3 p-md-5 border-end" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05) !important' : 'rgba(0,0,0,0.05) !important' }} data-aos="zoom-in" data-aos-delay="100">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2 gap-sm-3 text-center text-sm-start h-100">
                <div style={{ color: 'var(--brand-golden-orange)' }}>
                  <FaAward className="fs-1" />
                </div>
                <div>
                  <h3 className="fw-bold font-montserrat mb-0 fluid-text-lg">
                    <CountUp end={25} enableScrollSpy scrollSpyOnce />+
                  </h3>
                  <p className="text-muted font-sans fs-8 fw-bold mb-0" style={{ lineHeight: '1.2' }}>Years of Experience</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6 p-3 p-md-5 border-end" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05) !important' : 'rgba(0,0,0,0.05) !important' }} data-aos="zoom-in" data-aos-delay="200">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2 gap-sm-3 text-center text-sm-start h-100">
                <div style={{ color: 'var(--brand-golden-orange)' }}>
                  <FaBuilding className="fs-1" />
                </div>
                <div>
                  <h3 className="fw-bold font-montserrat mb-0 fluid-text-lg">
                    <CountUp end={450} enableScrollSpy scrollSpyOnce />+
                  </h3>
                  <p className="text-muted font-sans fs-8 fw-bold mb-0" style={{ lineHeight: '1.2' }}>Projects Completed</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6 p-3 p-md-5 border-end border-sm-0" data-aos="zoom-in" data-aos-delay="300">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2 gap-sm-3 text-center text-sm-start h-100">
                <div style={{ color: 'var(--brand-golden-orange)' }}>
                  <FaUsers className="fs-1" />
                </div>
                <div>
                  <h3 className="fw-bold font-montserrat mb-0 fluid-text-lg">
                    <CountUp end={320} enableScrollSpy scrollSpyOnce />+
                  </h3>
                  <p className="text-muted font-sans fs-8 fw-bold mb-0" style={{ lineHeight: '1.2' }}>Happy Clients</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6 p-3 p-md-5 d-flex align-items-center justify-content-center" style={{ background: 'var(--brand-golden-orange)', color: '#020c1b' }} data-aos="zoom-in" data-aos-delay="400">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2 gap-sm-3 text-center text-sm-start h-100">
                <div className="d-flex align-items-center justify-content-center border border-dark rounded-circle flex-shrink-0" style={{ width: '40px', height: '40px', borderColor: 'rgba(2, 12, 27, 0.4) !important', borderWidth: '2px !important' }}>
                  <FaShieldAlt className="fs-5" style={{ color: '#020c1b' }} />
                </div>
                <div>
                  <h3 className="fw-bold font-montserrat mb-0" style={{ fontSize: '1.25rem', color: '#020c1b' }}>
                    24/7
                  </h3>
                  <p className="font-sans fs-8 fw-bold mb-0" style={{ lineHeight: '1.2', color: 'rgba(2, 12, 27, 0.7)' }}>Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. OUR CORE SERVICES */}
      <section id="services" className="py-5 transition-all" style={{ background: isDark ? '#07162c' : '#f8f9fa' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="text-uppercase font-sans text-muted fw-bold tracking-widest fs-8 d-block mb-1">WHAT WE DO</span>
            <h2 className="fw-bold fs-2 font-montserrat mb-2" style={{ color: 'var(--foreground)' }}>Our Core Services</h2>
            <div className="mx-auto mt-2" style={{ width: '40px', height: '3px', background: 'var(--brand-golden-orange)' }}></div>
          </div>

          <div className="row g-4">
            {[
              { title: 'Construction Works & Renovations', icon: <FaBuilding className="fs-5" /> },
              { title: 'Procurement of General Goods', icon: <FaBoxOpen className="fs-5" /> },
              { title: 'Logistics Services', icon: <FaTruck className="fs-5" /> },
              { title: 'Agriculture Equipment', icon: <FaSeedling className="fs-5" /> },
              { title: 'Mining Consultancy', icon: <FaHammer className="fs-5" /> },
              { title: 'Civil Engineering Works', icon: <FaWrench className="fs-5" /> },
              { title: 'Road Maintenance & Construction', icon: <FaArrowRight className="fs-5" /> },
              { title: 'Import & Export of Goods', icon: <FaShip className="fs-5" /> },
            ].map((service, index) => (
              <div key={index} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="p-4 rounded-4 shadow-sm border h-100 d-flex flex-column justify-content-between hover-scale transition-all" style={{ background: isDark ? '#020c1b' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', transition: 'all 0.3s ease' }}>
                  <div>
                    <div className="d-inline-flex rounded-3 mb-3 border align-items-center justify-content-center" style={{ background: 'rgba(96, 4, 91, 0.04)', borderColor: 'rgba(96, 4, 91, 0.08)', color: '#60045B', width: '48px', height: '48px' }}>
                      {service.icon}
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <h6 className="fw-bold mb-0 font-montserrat fs-7 transition-all" style={{ lineHeight: '1.4', color: isDark ? '#ffffff' : '#063E76' }}>
                        {service.title}
                      </h6>
                      <span className="fw-bold fs-5 ms-2" style={{ color: 'var(--brand-golden-orange)', userSelect: 'none' }}>+</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT ETHEREAL */}
      <section className="py-5 transition-all" style={{ background: isDark ? '#020c1b' : '#ffffff' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <span className="text-uppercase font-sans text-muted fw-bold tracking-widest fs-8 d-block mb-1">ABOUT ETHEREAL</span>
              <h2 className="fw-bold fs-2 font-montserrat mb-4" style={{ color: 'var(--foreground)' }}>Corporate Profile</h2>
              <p className="text-muted fs-7 mb-3 font-sans" style={{ lineHeight: '1.7' }}>
                Ethereal Company Limited is a business management and logistics firm specialized in Construction, Procurement, Logistics management, Project implementation, Mining, and Civil Engineering and Business Partnerships.
              </p>
              <p className="text-muted fs-7 mb-4 font-sans" style={{ lineHeight: '1.7' }}>
                We believe in the power of collaboration to deliver tailored solutions and promote overall organizational growth. We currently operate in Liberia and Sierra Leone, building infrastructure and empowering communities across the sub-region.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="p-3.5 rounded-4 border h-100 transition-all" style={{ background: isDark ? 'rgba(2, 161, 201, 0.08)' : 'rgba(2, 161, 201, 0.04)', borderColor: isDark ? 'rgba(2, 161, 201, 0.15)' : 'rgba(2, 161, 201, 0.08)' }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <FaEye className="fs-6" style={{ color: 'var(--brand-cyan-blue)' }} />
                      <h6 className="fw-bold mb-0 font-montserrat" style={{ color: 'var(--foreground)' }}>Our Vision</h6>
                    </div>
                    <p className="fs-7 font-sans mb-0 text-muted" style={{ lineHeight: '1.5' }}>
                      Building Africa through strategic alliances.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3.5 rounded-4 border h-100 transition-all" style={{ background: isDark ? 'rgba(242, 129, 1, 0.08)' : 'rgba(242, 129, 1, 0.04)', borderColor: isDark ? 'rgba(242, 129, 1, 0.15)' : 'rgba(242, 129, 1, 0.08)' }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <FaBullseye className="fs-6" style={{ color: 'var(--brand-golden-orange)' }} />
                      <h6 className="fw-bold mb-0 font-montserrat" style={{ color: 'var(--foreground)' }}>Our Mission</h6>
                    </div>
                    <p className="fs-7 font-sans mb-0 text-muted" style={{ lineHeight: '1.5' }}>
                      Connecting Trade in Africa the reliable way.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="btn px-4 py-2.5 rounded-pill text-white fw-bold shadow border-0" style={{ background: 'var(--brand-deep-purple)' }}>
                Learn More About Us
              </Link>
            </div>
            
            <div className="col-lg-6" data-aos="fade-left">
              <div className="position-relative">
                <img 
                  src="/about_road_construction.png" 
                  alt="African workers building road" 
                  className="w-100 rounded-5 shadow-lg object-fit-cover" 
                  style={{ height: '420px' }}
                />
                <div className="position-absolute bottom-4 start-4 p-4 rounded-4 shadow border transition-all" style={{ maxWidth: '280px', backgroundColor: isDark ? '#020c1b' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)' }}>
                  <span className="text-uppercase font-sans text-muted fw-bold tracking-widest mb-1 d-block" style={{ fontSize: '10px' }}>Our Commitment</span>
                  <h6 className="fw-bold mb-0 font-montserrat" style={{ lineHeight: '1.4', color: 'var(--foreground)' }}>Safety, Quality and Sustainability in everything we do.</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-5 transition-all" style={{ background: isDark ? '#07162c' : '#f8f9fa' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <span className="text-uppercase font-sans text-muted fw-bold tracking-widest fs-8 d-block mb-1">WHY CHOOSE US</span>
              <h2 className="fw-bold fs-2 font-montserrat mb-4">Built on Trust. Driven by Results.</h2>
              
              <div className="row g-4">
                {whyChooseUsData.map((item, idx) => (
                  <div key={idx} className="col-sm-6">
                    <div className="d-flex gap-3">
                      <div className="flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center text-white" style={{ background: item.color, width: '40px', height: '40px' }}>
                        {item.icon}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1 font-montserrat">{item.title}</h6>
                        <p className="text-muted fs-8 mb-0 font-sans">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <img 
                src="/about_house_construction.png" 
                alt="African workers building house" 
                className="w-100 rounded-5 shadow-lg object-fit-cover" 
                style={{ height: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5.5. ON THE GROUND - OPERATIONAL EXCELLENCE */}
      <section className="py-5 border-bottom transition-all" style={{ background: isDark ? 'var(--background)' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            {/* Left Column: Context */}
            <div className="col-lg-5" data-aos="fade-right">
              <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-3 py-1.5 rounded-pill mb-3 d-inline-block" style={{ background: 'rgba(96, 4, 91, 0.06)', color: 'var(--brand-deep-purple)' }}>
                On the Ground
              </span>
              <h2 className="fw-bold fs-1 font-montserrat mb-3" style={{ lineHeight: '1.2' }}>
                Our Work Across<br />the Sub Region
              </h2>
              <div className="fs-5 fw-bold mb-3" style={{ color: 'var(--brand-golden-orange)', letterSpacing: '4px' }}>◆</div>
              <p className="text-muted fs-6 mb-0 font-sans" style={{ lineHeight: '1.7' }}>
                Delivering infrastructure, logistics, and field operations excellence across the region.
              </p>
            </div>

            {/* Right Column: 2x2 Grid of Focus Areas */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="row g-4">
                {[
                  { title: 'Road Infrastructure Development', desc: 'Connecting communities through robust transport networks.', icon: <FaRoad className="fs-4" />, color: 'var(--brand-cyan-blue)', bg: 'rgba(2, 161, 201, 0.05)' },
                  { title: 'Road Construction & Installations', desc: 'Building durable pavements and safety installations.', icon: <FaHardHat className="fs-4" />, color: 'var(--brand-deep-purple)', bg: 'rgba(96, 4, 91, 0.05)' },
                  { title: 'Logistics & Haulage Services', desc: 'Streamlining cargo dispatch and resource transport.', icon: <FaTruck className="fs-4" />, color: 'var(--brand-golden-orange)', bg: 'rgba(242, 129, 1, 0.05)' },
                  { title: 'Mining & Earthworks', desc: 'Expert site preparation and resource excavation.', icon: <FaCogs className="fs-4" />, color: 'var(--brand-royal-blue)', bg: 'rgba(6, 62, 118, 0.05)' },
                ].map((item, idx) => (
                  <div key={idx} className="col-sm-6">
                    <div className="p-4 rounded-4 border h-100 transition-all shadow-sm hover-scale" style={{ background: isDark ? '#020c1b' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                      <div className="d-inline-flex p-3 rounded-3 mb-3" style={{ background: item.bg, color: item.color }}>
                        {item.icon}
                      </div>
                      <h6 className="fw-bold mb-2 font-montserrat" style={{ fontSize: '0.95rem' }}>{item.title}</h6>
                      <p className="text-muted fs-7 mb-0 font-sans" style={{ lineHeight: '1.5' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS */}
      <section className="py-5 transition-all" style={{ background: isDark ? 'var(--background)' : '#ffffff' }}>
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <span className="text-uppercase font-sans text-muted fw-bold tracking-widest fs-8 d-block mb-1">FEATURED PROJECTS</span>
              <h2 className="fw-bold fs-2 font-montserrat mb-0">Projects That Inspire Confidence</h2>
            </div>
            <Link href="/projects" className={`text-decoration-none fw-bold fs-7 d-flex align-items-center gap-1 hover-link ${isDark ? 'text-white' : 'text-dark'}`}>
              View All Projects <FaArrowRight className="fs-8" />
            </Link>
          </div>

          <div className="row g-4">
            {mockupProjects.map((project, idx) => (
              <div key={idx} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="card rounded-4 border-0 overflow-hidden shadow-sm h-100 hover-scale" style={{ background: isDark ? '#07162c' : '#f8f9fa' }}>
                  <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span 
                      className={`position-absolute fs-8 font-sans px-2.5 py-1 rounded-pill fw-semibold ${isDark ? 'bg-dark text-white border border-secondary' : 'bg-white text-dark'}`}
                      style={{ top: '15px', left: '15px', color: isDark ? 'white' : 'var(--brand-deep-purple)' }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <span className="text-muted fs-8 font-sans d-block mb-1">{project.location}</span>
                    <h6 className="fw-bold font-montserrat mb-0 text-truncate">{project.title}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center gap-1.5 mt-4">
            <span className={`rounded-circle ${isDark ? 'bg-light' : 'bg-dark'}`} style={{ width: '8px', height: '8px' }}></span>
            <span className={`rounded-circle ${isDark ? 'bg-white bg-opacity-25' : 'bg-black bg-opacity-15'}`} style={{ width: '8px', height: '8px' }}></span>
            <span className={`rounded-circle ${isDark ? 'bg-white bg-opacity-25' : 'bg-black bg-opacity-15'}`} style={{ width: '8px', height: '8px' }}></span>
          </div>
        </div>
      </section>





      {/* 9. PARTNERS */}
      {/* Partners Section (High Fidelity PDF Design) */}
      <PartnersSection />


      {/* 11. VIDEO SHOWCASE */}
      <section 
        id="video-showcase" 
        className="position-relative py-5 text-white text-center overflow-hidden d-flex align-items-center" 
        style={{ 
          background: 'linear-gradient(rgba(2, 12, 27, 0.75), rgba(2, 12, 27, 0.75)), url("/video_showcase_africa.png") center/cover no-repeat',
          minHeight: '400px'
        }}
      >
        <div className="container py-5 z-1">
          <span className="text-uppercase font-sans text-opacity-75 tracking-widest fs-8 d-block mb-2" style={{ color: '#878F9D' }}>VIDEO SHOWCASE</span>
          <h2 className="display-5 fw-bold font-montserrat mb-4 hero-title-theme">Building the Future. Together.</h2>
          <div 
            onClick={() => setVideoOpen(true)}
            className="d-inline-flex align-items-center justify-content-center rounded-circle border border-2 border-white mb-3 hover-scale cursor-pointer" 
            style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.15)' }}
          >
            <FaPlay className="text-white fs-4 ms-1" />
          </div>
          <p className="lead text-white text-opacity-75 font-sans fs-6 mt-2">Watch Our Story</p>
        </div>
      </section>

      {/* 11.5. REACH US - CONTACT & MAP SECTION */}
      <section className="py-5 border-bottom transition-all" style={{ background: isDark ? 'var(--background)' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            {/* Left Column: Coordinates */}
            <div className="col-lg-5" data-aos="fade-right">
              <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-3 py-1.5 rounded-pill mb-3 d-inline-block" style={{ background: 'rgba(242, 129, 1, 0.06)', color: 'var(--brand-golden-orange)' }}>
                Reach Us
              </span>
              <h2 className="fw-bold fs-1 font-montserrat mb-3">Contact Us</h2>
              <div className="fs-5 fw-bold mb-4" style={{ color: 'var(--brand-cyan-blue)', letterSpacing: '4px' }}>◆</div>

              <div className="d-flex flex-column gap-4">
                {/* Office Location */}
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 text-primary p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', color: 'var(--brand-cyan-blue)' }}>
                    <FaMapMarkerAlt className="fs-5" style={{ color: 'var(--brand-cyan-blue)' }} />
                  </div>
                  <div>
                    <h6 className="fw-bold font-montserrat mb-1">Office Location</h6>
                    <p className="text-muted fs-7 font-sans mb-0" style={{ lineHeight: '1.6' }}>
                      19th Street, Sinkor, Blue Diamond Building,<br />
                      Off Tubman Boulevard,<br />
                      Monrovia, Montserrado County, Liberia.
                    </p>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 bg-success bg-opacity-10 text-success p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <FaPhoneAlt className="fs-5" />
                  </div>
                  <div>
                    <h6 className="fw-bold font-montserrat mb-1">Contact Number</h6>
                    <p className="text-muted fs-7 font-sans mb-0">+231 77 555 5545</p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 bg-info bg-opacity-10 text-info p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <FaEnvelope className="fs-5" />
                  </div>
                  <div>
                    <h6 className="fw-bold font-montserrat mb-1">Email</h6>
                    <p className="text-muted fs-7 font-sans mb-0" style={{ wordBreak: 'break-all' }}>wiston@etherealcompanylimited.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Google Map */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="rounded-4 overflow-hidden shadow-lg border contact-map-container" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5855073121016!2d-10.78768962534575!3d6.287342625394464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf0f3db1ab4c5db5%3A0x6e9fcd8ba4bb7c4e!2sSinkor%2C%20Monrovia%2C%20Liberia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ethereal Office Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. OUR COMMITMENT & CALL TO ACTION */}
      <section className="py-5 text-white position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--brand-deep-purple) 0%, var(--brand-royal-blue) 100%)' }}>
        {/* Subtle background abstract shapes */}
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)' }}></div>
        <div className="container py-5 text-center position-relative z-1">
          <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-3 py-1 rounded-pill mb-3 d-inline-block text-white text-opacity-75" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            Our Commitment
          </span>
          <h2 className="display-5 fw-bold font-montserrat mb-3" data-aos="fade-up">Our Promise</h2>
          <div className="fs-4 fw-bold mb-4" data-aos="fade-up" data-aos-delay="50" style={{ color: 'var(--brand-golden-orange)', letterSpacing: '4px' }}>◆</div>
          <p className="lead mb-5 mx-auto font-sans italic fw-light text-white text-opacity-90" style={{ maxWidth: '750px', fontSize: '1.25rem', lineHeight: '1.6' }} data-aos="fade-up" data-aos-delay="100">
            "To deliver quality services, meet clients' expectations, and contribute to the growth and development of the communities we operate in."
          </p>
          <Link href="/contact" className="btn btn-light px-5 py-3 rounded-pill fw-bold font-sans hover-lift shadow-lg border-0 transition-all" data-aos="fade-up" data-aos-delay="150" style={{ color: 'var(--brand-royal-blue)' }}>
            Work With Us
          </Link>
        </div>
      </section>

      {/* Video Modal Overlay */}
      {videoOpen && (
        <div className="modal show d-block animate-fade-in" tabIndex={-1} style={{ background: 'rgba(2, 12, 27, 0.85)', zIndex: 2000, backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 bg-dark text-white rounded-4 overflow-hidden shadow-2xl">
              <div className="modal-header border-bottom-0 py-3 px-4 d-flex justify-content-between align-items-center" style={{ background: '#07162c' }}>
                <h5 className="modal-title fw-bold font-montserrat m-0 text-white">Ethereal Corporate Video</h5>
                <button 
                  type="button" 
                  className="btn btn-close btn-close-white border-0 p-2.5 rounded-circle d-flex align-items-center justify-content-center" 
                  onClick={() => setVideoOpen(false)}
                  aria-label="Close video"
                  style={{ background: 'rgba(255,255,255,0.1)', width: '32px', height: '32px' }}
                >
                  <FaTimes style={{ fontSize: '14px', color: 'white' }} />
                </button>
              </div>
              <div className="modal-body p-0 position-relative" style={{ aspectRatio: '16/9' }}>
                <video 
                  src="https://assets.mixkit.co/videos/preview/mixkit-heavy-machinery-developing-a-highway-road-42777-large.mp4" 
                  controls 
                  autoPlay 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
