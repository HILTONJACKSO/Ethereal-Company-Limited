'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '@/lib/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

// Swiper CSS styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading testimonials...</span>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-5" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-uppercase font-sans text-primary fw-bold tracking-widest fs-7 d-block mb-2">Testimonials</span>
          <h2 className="fw-bold fs-2 font-montserrat">Trusted By Industry Leaders</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '3px', background: 'var(--brand-cyan-blue)' }}></div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            }
          }}
          className="pb-5"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="glass-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
                <FaQuoteLeft className="position-absolute text-muted opacity-10" style={{ right: '20px', top: '20px', fontSize: '60px' }} />
                
                <div>
                  {/* Rating */}
                  <div className="d-flex gap-1 text-warning mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  
                  {/* Feedback comment */}
                  <p className="text-muted fs-6 italic mb-4 font-sans" style={{ fontStyle: 'italic' }}>
                    &quot;{t.feedback}&quot;
                  </p>
                </div>

                {/* Client Profile */}
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative overflow-hidden rounded-circle bg-secondary" style={{ width: '50px', height: '50px' }}>
                    <img 
                      src={t.image_url || "/avatar-fallback.png"} 
                      alt={t.client_name}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0" style={{ color: 'var(--foreground)' }}>{t.client_name}</h6>
                    <span className="text-muted fs-8 d-block">{t.designation} at {t.company}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
