'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useMutation } from '@tanstack/react-query';
import { submitNewsletterSubscription } from '@/lib/api';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaChevronRight, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const schema = zod.object({
  email: zod.string().email({ message: "Please enter a valid email address." }),
});

export default function Footer() {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ email: string }>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: submitNewsletterSubscription,
    onSuccess: () => {
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    },
    onError: (err: any) => {
      alert("Error subscribing: " + (err.response?.data?.email?.[0] || "Already subscribed or connection error."));
    }
  });

  const onSubmit = (data: { email: string }) => {
    mutation.mutate(data.email);
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook className="fs-6" />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter className="fs-6" />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaLinkedin className="fs-6" />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaInstagram className="fs-6" />, url: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer className="position-relative overflow-hidden" style={{ background: '#020c1b', color: '#EEF0F1' }}>
      
      {/* 1. TOP GLOWING ACCENT GRADIENT BORDER */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--brand-royal-blue) 0%, var(--brand-deep-purple) 50%, var(--brand-cyan-blue) 100%)' }}></div>

      <div className="container pt-5 pb-4">
        <div className="row g-4 mb-5">
          
          {/* Column 1: Logo & Info */}
          <div className="col-lg-3 col-md-6">
            <Link href="/" className="d-inline-block mb-3 text-decoration-none bg-white p-2 rounded-3 shadow-sm border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <img 
                src="/logo.jpg" 
                alt="ETHEREAL Company Limited" 
                style={{ 
                  height: '48px', 
                  objectFit: 'contain',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }} 
              />
            </Link>
            <p className="fs-7 font-sans mb-4 text-opacity-75" style={{ color: '#878F9D', lineHeight: '1.6' }}>
              Engineering solutions. Building futures. Delivering value through world-class logistics and civil infrastructure development.
            </p>
            
            {/* Social Icons Grid */}
            <div className="d-flex gap-2">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm text-white rounded-circle d-flex align-items-center justify-content-center hover-scale" 
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    background: 'rgba(255,255,255,0.04)', 
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.3s ease'
                  }} 
                  aria-label={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--brand-royal-blue), var(--brand-deep-purple))';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(6, 62, 118, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold mb-3 font-sans text-uppercase tracking-wider fs-8 text-white">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-7 font-sans">
              <li><Link href="/" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Home</Link></li>
              <li><Link href="/about" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>About Us</Link></li>
              <li><Link href="/projects" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Projects</Link></li>
              <li><Link href="/contact" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold mb-3 font-sans text-uppercase tracking-wider fs-8 text-white">Capabilities</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-7 font-sans">
              <li><Link href="/about#capabilities" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Construction & Engineering</Link></li>
              <li><Link href="/about#capabilities" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Maritime & Port Services</Link></li>
              <li><Link href="/about#capabilities" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Logistics & Supply Chain</Link></li>
              <li><Link href="/about#capabilities" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Real Estate Development</Link></li>
              <li><Link href="/about#capabilities" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Project Management</Link></li>
              <li><Link href="/about#capabilities" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Procurement & Trading</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 font-sans text-uppercase tracking-wider fs-8 text-white">Contact Us</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 fs-7 font-sans" style={{ color: '#878F9D' }}>
              <li className="d-flex align-items-center gap-2">
                <FaPhoneAlt className="text-primary flex-shrink-0" style={{ color: 'var(--brand-cyan-blue)' }} />
                <span>+231 77 555 5545</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaEnvelope className="text-secondary flex-shrink-0" />
                <span style={{ wordBreak: 'break-all' }}>wiston@etherealcompanylimited.com</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <FaMapMarkerAlt className="text-danger flex-shrink-0 mt-1" style={{ color: 'var(--brand-golden-orange)' }} />
                <span>19th Street, Sinkor, Monrovia, Liberia</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 font-sans text-uppercase tracking-wider fs-8 text-white">Newsletter</h6>
            <p className="fs-7 font-sans mb-3" style={{ color: '#878F9D' }}>
              Subscribe to get the latest infrastructure updates and news releases.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
              <div className="input-group" style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '4px' }}>
                <input 
                  type="email" 
                  className="form-control border-0 bg-transparent text-white px-3 fs-7"
                  placeholder="Enter your email" 
                  {...register('email')}
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
                <button 
                  type="submit" 
                  className="btn d-flex align-items-center justify-content-center rounded-circle hover-scale"
                  style={{ background: 'linear-gradient(135deg, var(--brand-royal-blue), var(--brand-deep-purple))', color: '#fff', border: 'none', width: '36px', height: '36px', padding: '0', transition: 'all 0.3s ease' }}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? '...' : <FaChevronRight style={{ fontSize: '11px' }} />}
                </button>
              </div>
              {errors.email && (
                <div className="text-danger fs-8 mt-1 px-2">{errors.email.message}</div>
              )}
            </form>
            {success && (
              <div className="alert alert-success py-2 px-3 rounded-pill fs-8 mt-2 border-0" role="alert" style={{ background: 'rgba(40,167,69,0.15)', color: '#28a745' }}>
                Subscribed successfully!
              </div>
            )}
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

        {/* Footer Bottom Metadata */}
        <div className="row pt-2 justify-content-between align-items-center g-2 text-center text-md-start fs-8 font-sans animate-fade-in" style={{ color: '#878F9D' }}>
          <div className="col-md-6">
            <p className="mb-0">
              &copy; {currentYear} Ethereal Company Limited. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-inline mb-0 d-flex justify-content-center justify-content-md-end gap-3 list-unstyled">
              <li><Link href="/privacy" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-decoration-none hover-link" style={{ color: '#878F9D' }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
