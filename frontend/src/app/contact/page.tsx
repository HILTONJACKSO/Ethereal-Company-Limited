'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useMutation } from '@tanstack/react-query';
import { submitContactMessage } from '@/lib/api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaClock, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import { useAppStore } from '@/lib/store';

const schema = zod.object({
  name: zod.string().min(2, { message: "Name must be at least 2 characters." }),
  email: zod.string().email({ message: "Please enter a valid email address." }),
  phone: zod.string().optional(),
  subject: zod.string().min(1, { message: "Please choose a subject." }),
  message: zod.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = zod.infer<typeof schema>;

export default function ContactPage() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    // Read optional service query param to set as default subject
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get('service');
      const subjectParam = urlParams.get('subject');
      if (serviceParam) {
        setValue('subject', `Inquiry about: ${serviceParam}`);
      } else if (subjectParam) {
        setValue('subject', subjectParam);
      }
    }
  }, []);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: 'Logistics Quotation',
    }
  });

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 8000);
    },
    onError: (err: any) => {
      alert("Error sending message: " + (err.response?.data?.detail || "Please check your network connection."));
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  const subjectOptions = [
    'Construction Inquiry',
    'Logistics Quotation',
    'Mining Service Inquiry',
    'Civil Engineering Consultation',
    'General Procurement Services',
    'Strategic Partnership Proposal',
    'General Inquiry / Feedbacks'
  ];

  const faqs = [
    {
      q: "How quickly can I receive a quotation?",
      a: "Our estimation department typically reviews BOQs and provides detailed logistics or civil engineering quotes within 24 to 48 hours."
    },
    {
      q: "Do you operate across both Liberia and Sierra Leone?",
      a: "Yes, we have established operations, equipment fleets, and offices in both Monrovia and Freetown to support sub-regional projects."
    },
    {
      q: "Can you handle cross-border transport of mining equipment?",
      a: "Absolutely. Our logistics division specializes in heavy machinery transport, customs clearance, and route planning across West Africa."
    },
    {
      q: "Are your construction services fully certified?",
      a: "Ethereal holds all required national civil engineering certifications, insurance policies, and compliance standards for large-scale works."
    }
  ];

  return (
    <div className="transition-all py-5" style={{ minHeight: '100vh', background: isDark ? 'var(--background)' : '#ffffff', color: isDark ? 'var(--foreground)' : '#020c1b' }}>
      {/* Header section with clean, elegant styling */}
      <div className="container py-4">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-3 py-1.5 rounded-pill mb-3 d-inline-block" style={{ background: 'rgba(96, 4, 91, 0.06)', color: 'var(--brand-deep-purple)' }}>
            Connect With Us
          </span>
          <h1 className="fw-bold font-montserrat display-4 mb-2">
            Let's Build Together
          </h1>
          <p className="text-muted font-sans mx-auto fs-6 mt-2" style={{ maxWidth: '600px' }}>
            Have a project in West Africa? Reach out today to receive detailed estimation assessments, logistics schedules, and strategic support.
          </p>
          <div className="fs-5 fw-bold mb-3 mt-3" style={{ color: 'var(--brand-golden-orange)', letterSpacing: '4px' }}>◆</div>
          <div className="mx-auto" style={{ width: '40px', height: '3px', background: 'var(--brand-cyan-blue)' }}></div>
        </div>

        {/* Main contact area */}
        <div className="row g-5">
          {/* Left Column: Coordinates */}
          <div className="col-lg-5" data-aos="fade-right">
            <h2 className="fw-bold font-montserrat fs-3 mb-4">Contact Information</h2>

            <div className="d-flex flex-column gap-3">
              {/* Address Card */}
              <div className="card border-0 shadow-sm p-3 rounded-4 hover-scale transition-all" style={{ background: isDark ? '#07162c' : '#f8f9fa', borderLeft: '4px solid var(--brand-cyan-blue)' }}>
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 text-primary p-2.5 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px' }}>
                    <FaMapMarkerAlt className="fs-5" style={{ color: 'var(--brand-cyan-blue)' }} />
                  </div>
                  <div>
                    <h6 className="fw-bold font-montserrat mb-1">Office Location</h6>
                    <p className="text-muted fs-7 font-sans mb-0" style={{ lineHeight: '1.6' }}>
                      19th Street, Sinkor, Blue Diamond Building, Off Tubman Boulevard, Monrovia, Liberia
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="card border-0 shadow-sm p-3 rounded-4 hover-scale transition-all" style={{ background: isDark ? '#07162c' : '#f8f9fa', borderLeft: '4px solid var(--brand-golden-orange)' }}>
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 bg-success bg-opacity-10 text-success p-2.5 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px' }}>
                    <FaPhoneAlt className="fs-5" />
                  </div>
                  <div>
                    <h6 className="fw-bold font-montserrat mb-1">Telephone Contacts</h6>
                    <p className="text-muted fs-7 font-sans mb-0 fw-bold">+231 77 555 5545</p>
                    <p className="text-muted fs-8 font-sans mb-0">Monday - Friday (8:00 AM - 5:00 PM)</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="card border-0 shadow-sm p-3 rounded-4 hover-scale transition-all" style={{ background: isDark ? '#07162c' : '#f8f9fa', borderLeft: '4px solid var(--brand-deep-purple)' }}>
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 bg-info bg-opacity-10 text-info p-2.5 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px' }}>
                    <FaEnvelope className="fs-5" />
                  </div>
                  <div>
                    <h6 className="fw-bold font-montserrat mb-1">Email Enquiries</h6>
                    <p className="text-muted fs-7 font-sans mb-0" style={{ wordBreak: 'break-all' }}>wiston@etherealcompanylimited.com</p>
                    <p className="text-muted fs-8 font-sans mb-0">General response timeline within 24 hours.</p>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="card border-0 shadow-sm p-3 rounded-4 hover-scale transition-all" style={{ background: isDark ? '#07162c' : '#f8f9fa', borderLeft: '4px solid #10b981' }}>
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 bg-warning bg-opacity-10 text-warning p-2.5 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px' }}>
                    <FaClock className="fs-5" />
                  </div>
                  <div>
                    <h6 className="fw-bold font-montserrat mb-1">Operational Hours</h6>
                    <p className="text-muted fs-7 font-sans mb-0">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p className="text-muted fs-7 font-sans mb-0">Sat: 9:00 AM - 1:00 PM (Emergency Dispatch)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive Google Map */}
            <div className="mt-4 rounded-4 overflow-hidden shadow-sm border contact-map-container contact-page-map" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5855073121016!2d-10.78768962534575!3d6.287342625394464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf0f3db1ab4c5db5%3A0x6e9fcd8ba4bb7c4e!2sSinkor%2C%20Monrovia%2C%20Liberia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ethereal Head Office Map"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="col-lg-7" data-aos="fade-left">
            <div className="card p-4 rounded-4 shadow border transition-all" style={{ background: isDark ? '#07162c' : '#ffffff', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
              <h3 className="fw-bold font-montserrat fs-4 mb-3">Send A Direct Message</h3>
              <p className="text-muted fs-7 font-sans mb-4">
                Please complete the form fields below. Our estimating engineers will review your files and contact you.
              </p>

              {success && (
                <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4 animate-fade-in" role="alert">
                  <FaCheckCircle className="fs-5 flex-shrink-0" />
                  <div>
                    <h6 className="fw-bold mb-0">Message Submitted!</h6>
                    <span className="fs-7">Thank you. Your request was securely routed. An agent will contact you shortly.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
                {/* Name */}
                <div>
                  <label className="form-label font-sans fs-7 fw-bold mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter your name"
                    {...register('name')}
                    style={{ background: isDark ? '#020c1b' : '#ffffff', color: isDark ? 'var(--foreground)' : '#374151', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', padding: '12px' }}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name.message}</div>
                  )}
                </div>

                {/* Email and Phone Grid */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label font-sans fs-7 fw-bold mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="your.email@company.com"
                      {...register('email')}
                      style={{ background: isDark ? '#020c1b' : '#ffffff', color: isDark ? 'var(--foreground)' : '#374151', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', padding: '12px' }}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label font-sans fs-7 fw-bold mb-1">Phone Number (Optional)</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="e.g. +231 77 555 5545"
                      {...register('phone')}
                      style={{ background: isDark ? '#020c1b' : '#ffffff', color: isDark ? 'var(--foreground)' : '#374151', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', padding: '12px' }}
                    />
                  </div>
                </div>

                {/* Subject Option Dropdown */}
                <div>
                  <label className="form-label font-sans fs-7 fw-bold mb-1">Subject / Department *</label>
                  <select 
                    className={`form-select ${errors.subject ? 'is-invalid' : ''}`}
                    {...register('subject')}
                    style={{ background: isDark ? '#020c1b' : '#ffffff', color: isDark ? 'var(--foreground)' : '#374151', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', padding: '12px' }}
                  >
                    {subjectOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.subject && (
                    <div className="invalid-feedback">{errors.subject.message}</div>
                  )}
                </div>

                {/* Message block */}
                <div>
                  <label className="form-label font-sans fs-7 fw-bold mb-1">Message Description *</label>
                  <textarea 
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    rows={5}
                    placeholder="Describe your scope of works, quantities list, transport timeline, or cargo details..."
                    {...register('message')}
                    style={{ background: isDark ? '#020c1b' : '#ffffff', color: isDark ? 'var(--foreground)' : '#374151', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', padding: '12px' }}
                  />
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message.message}</div>
                  )}
                </div>

                <div className="mt-3">
                  <button 
                    type="submit" 
                    className="btn px-5 py-3 rounded-pill fw-bold text-white shadow border-0 w-100" 
                    style={{ background: 'linear-gradient(135deg, var(--brand-deep-purple) 0%, var(--brand-royal-blue) 100%)', transition: 'all 0.3s' }}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 'Sending Message...' : <><FaPaperPlane className="me-2" /> Send Message</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* High-fidelity FAQ grid section */}
        <div className="mt-5 pt-5 border-top" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} data-aos="fade-up">
          <div className="text-center mb-5">
            <span className="text-uppercase font-sans fw-bold tracking-widest fs-8 px-3 py-1.5 rounded-pill mb-2 d-inline-block" style={{ background: 'rgba(242, 129, 1, 0.06)', color: 'var(--brand-golden-orange)' }}>
              Got Questions?
            </span>
            <h3 className="fw-bold font-montserrat display-6 mb-1">Frequently Asked Questions</h3>
            <div className="mx-auto" style={{ width: '30px', height: '2px', background: 'var(--brand-cyan-blue)', marginTop: '12px' }}></div>
          </div>

          <div className="row g-4">
            {faqs.map((faq, index) => (
              <div key={index} className="col-md-6">
                <div className="card h-100 p-4 border-0 shadow-sm rounded-4 hover-scale transition-all" style={{ background: isDark ? '#07162c' : '#f8f9fa' }}>
                  <div className="d-flex gap-3 align-items-start">
                    <div className="text-primary mt-1">
                      <FaQuestionCircle className="fs-5" style={{ color: 'var(--brand-cyan-blue)' }} />
                    </div>
                    <div>
                      <h6 className="fw-bold font-montserrat mb-2">{faq.q}</h6>
                      <p className="text-muted fs-7 font-sans mb-0" style={{ lineHeight: '1.6' }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
