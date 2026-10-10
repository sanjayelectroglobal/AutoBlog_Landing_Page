'use client';

/**
 * =====================================================================================
 * REAL CUSTOMER REVIEW CARDS (Horizontal Animated Video Gif Cards)
 * =====================================================================================
 * 
 * Design Features:
 * 1. Background Video Autoplay ("background me videos chalega as a gif, autoplay rahega"):
 *    - Each card displays an edge-to-edge looping background video (muted, autoPlay, playsInline).
 *    - 4 Provided Founder Videos:
 *      1. RevCodex.mp4 (/videos/RevCodex.mp4) -> Ayush Makkar (RevCodex)
 *      2. MyRupaya.mp4 (/videos/MyRupaya.mp4) -> Abhijeet Saxena (MyRupaya)
 *      3. Poodles.mp4 (/videos/Poodles.mp4) -> Lokesh Ahir (Poodles PetCare)
 *      4. Jalvyu.mp4 (/videos/Jalvyu.mp4) -> Mayank Sharma (Jalvayu)
 * 
 * 2. Floating Glassmorphic Pill Overlay (Matching User's Sample Design):
 *    - Left side: Circular photo avatar with white border, founder name with blue verified badge,
 *      role subtitle ("Founder & CEO of"), and company icon + brand name.
 *    - Vertical divider line.
 *    - Right side: 5 Gold Stars (★★★★★) and authentic founder testimonial quote.
 * 
 * 3. Horizontal Continuous Animation ("these cards will be move horizontally animated"):
 *    - Seamless, smooth horizontal marquee animation across all screen sizes.
 *    - Hovering any card smoothly pauses the animation so users can watch the video and read the review.
 *    - Soft edge fade gradients on left and right for elegant viewport entry and exit.
 */

import React from 'react';
import {
  Star,
  Check,
  ShieldCheck,
  Terminal,
  Coins,
  Sparkles,
  Leaf,
} from 'lucide-react';

interface ReviewCardItem {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  companyCategory: string;
  photoSrc: string;
  videoSrc: string;
  stars: number;
  reviewText: string;
  accentColor: string;
  companyIcon: React.ReactNode;
}

const REVIEW_CARDS: ReviewCardItem[] = [
  {
    id: 'revdex',
    clientName: 'Ayush Makkar',
    clientRole: 'Founder & CEO',
    companyName: 'RevDex',
    companyCategory: 'B2B Tech & Dev Agency',
    photoSrc: '/images/review-ayush.jpg',
    videoSrc: '/videos/RevDex.mp4',
    stars: 5,
    reviewText:
      'AutoBlog completely automated our inbound SEO pipeline. Technical posts now rank on Google autopilot, tripling our qualified client demo inquiries.',
    accentColor: '#38bdf8',
    companyIcon: <Terminal size={14} color="#38bdf8" />,
  },
  {
    id: 'myrupaya',
    clientName: 'Abhijeet Saxena',
    clientRole: 'Founder & CEO',
    companyName: 'MyRupaya',
    companyCategory: 'FinTech & Wealth',
    photoSrc: '/images/review-abhijeet.jpg',
    videoSrc: '/videos/MyRupaya.mp4',
    stars: 5,
    reviewText:
      'In personal finance, accuracy and topical authority are everything. AutoBlog produced compliant, highly-researched personal finance guides for 280k monthly readers.',
    accentColor: '#34d399',
    companyIcon: <Coins size={14} color="#34d399" />,
  },
  {
    id: 'jalvayu',
    clientName: 'Mayank Sharma',
    clientRole: 'Founder',
    companyName: 'Jalvayu',
    companyCategory: 'CleanTech & Sustainability',
    photoSrc: '/images/review-mayank.jpg',
    videoSrc: '/videos/Jalvyu.mp4',
    stars: 5,
    reviewText:
      'Replaced our expensive content agency and increased our publishing velocity by 14x while cutting organic customer acquisition costs by 64%.',
    accentColor: '#10b981',
    companyIcon: <Leaf size={14} color="#10b981" />,
  },
  {
    id: 'poodles',
    clientName: 'Lokesh Ahir',
    clientRole: 'Co-founder',
    companyName: 'Poodles PetCare',
    companyCategory: 'D2C Pet E-Commerce',
    photoSrc: '/images/review-lokesh.jpg',
    videoSrc: '/videos/Poodles.mp4',
    stars: 5,
    reviewText:
      'Mapped our entire product catalog to buyer searches. In under 90 days, organic traffic exploded by 410%, driving steady checkout volume with zero ad fatigue.',
    accentColor: '#f472b6',
    companyIcon: <Sparkles size={14} color="#f472b6" />,
  },
];

// Duplicated for seamless, infinite horizontal loop
const DUPLICATED_REVIEWS = [...REVIEW_CARDS, ...REVIEW_CARDS];

export default function ReviewCards() {
  return (
    <section
      id="customer-reviews"
      style={{
        backgroundColor: '#fbfcfd',
        padding: 'clamp(56px, 7vw, 92px) 0',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65%',
          height: '280px',
          borderRadius: '999px',
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      {/* Section Header */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '780px',
          margin: '0 auto clamp(32px, 4.5vw, 48px)',
          padding: '0 24px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '999px',
            backgroundColor: '#ecfdf5',
            color: '#059669',
            fontSize: '11.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
            border: '1px solid rgba(16, 185, 129, 0.28)',
          }}
        >
          <ShieldCheck size={14} color="#059669" />
          <span>VERIFIED FOUNDER REVIEWS</span>
        </span>

        <h2
          style={{
            fontSize: 'clamp(30px, 4.2vw, 46px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#111111',
            lineHeight: 1.15,
            marginBottom: '10px',
          }}
        >
          <span style={{ color: 'var(--color-brand-primary)' }}>Real Founders.</span>{' '}
          <span style={{ position: 'relative', display: 'inline-block', color: '#059669' }}>
            Honest Feedback.
            <span className="heading-underline-green" />
          </span>
        </h2>

        <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#555555', margin: 0 }}>
          Watch how founders turn programmatic SEO and autonomous blogging into their highest-converting organic customer engine.
        </p>
      </div>

      {/* =========================================================================
          HORIZONTAL ANIMATED VIDEO MARQUEE CAROUSEL
          ========================================================================= */}
      <div className="review-cards-marquee-viewport">
        {/* Continuous Marquee Track */}
        <div className="review-cards-marquee-track">
          {DUPLICATED_REVIEWS.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="review-video-card-item"
            >
              {/* Autoplay Video Loop (Runs like a GIF in background - pure, crisp, un-dimmed) */}
              <video
                src={review.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* ────────────────────────────────────────────────────────────────
                  BOTTOM FLOATING HIGHLY TRANSPARENT GLASSMORPHIC REVIEW OVERLAY
                  (More transparent, frosted glassmorphism, black content)
                  ──────────────────────────────────────────────────────────────── */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  right: '14px',
                  background:
                    'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 100%)',
                  backdropFilter: 'blur(20px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(190%)',
                  border: '1px solid rgba(255, 255, 255, 0.55)',
                  borderRadius: '14px',
                  padding: '12px 18px',
                  boxShadow:
                    '0 10px 30px rgba(0, 0, 0, 0.08), inset 0 1px 1.5px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(255, 255, 255, 0.15)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(190px, auto) 1px 1fr',
                  alignItems: 'center',
                  gap: '16px',
                  zIndex: 2,
                }}
              >
                {/* 1. Left Side: Avatar & Founder Details */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    minWidth: 0,
                  }}
                >
                  {/* Circular Avatar with Clean White Border */}
                  <img
                    src={review.photoSrc}
                    alt={`${review.clientName} - ${review.companyName}`}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      objectFit: 'cover',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                  />

                  {/* Founder Name, Role, and Company (Content in black) */}
                  <div style={{ minWidth: 0 }}>
                    {/* Name with Blue Verified Check Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: '#0f172a',
                          letterSpacing: '-0.01em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {review.clientName}
                      </span>

                      {/* Official Verified Blue Badge */}
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '15px',
                          height: '15px',
                          borderRadius: '50%',
                          backgroundColor: '#1d9bf0',
                          color: '#ffffff',
                          flexShrink: 0,
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
                        }}
                        title="Verified Founder"
                      >
                        <Check size={10} strokeWidth={3.5} />
                      </span>
                    </div>

                    {/* Role Title in Slate/Black */}
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#475569',
                        fontWeight: 600,
                        marginTop: '1px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {review.clientRole} of
                    </div>

                    {/* Company Brand Logo & Name in Black */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        marginTop: '2px',
                      }}
                    >
                      {review.companyIcon}
                      <span
                        style={{
                          fontSize: '13.5px',
                          fontWeight: 700,
                          color: '#0f172a',
                          letterSpacing: '-0.01em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {review.companyName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Middle Vertical Divider */}
                <div
                  style={{
                    width: '1px',
                    height: '40px',
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    flexShrink: 0,
                  }}
                />

                {/* 3. Right Side: 5 Gold Stars & Testimonial Quote in Black */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    minWidth: 0,
                  }}
                >
                  {/* 5 Amber/Gold Stars */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2.5px',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    {[...Array(review.stars)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="#f59e0b"
                        color="#f59e0b"
                      />
                    ))}
                  </div>

                  {/* Testimonial Quote in Deep Black */}
                  <p
                    style={{
                      fontSize: '12.5px',
                      lineHeight: '1.45',
                      color: '#0f172a',
                      fontWeight: 500,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    “{review.reviewText}”
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
