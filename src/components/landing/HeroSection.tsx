'use client';

/**
 * AutoBlog Hero Section (First Section).
 * 
 * REFINED LAYOUT:
 * 1. Top Section (First Fold):
 *    - Category Badge: "Autonomous AI Blog Engine & Programmatic SEO"
 *    - Main Headline: "Automate your blog. Rank faster, and scale" with animated gradient underline
 *    - Subtitle paragraph, CTA buttons, and trust badges removed per user instruction.
 * 2. Full-Screen Video Player:
 *    - Complete screen width video player container (~1280px full width), continuous autoplay, sound on.
 * 3. Downside Section (Directly underneath the video):
 *    - Interactive Walkthrough heading & description
 *    - Exactly 3 interactive step boxes (Discovery -> Drafting -> Multi-CMS Publishing)
 *    - Stepper cards jump video playback to specific milestones on click.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  Search,
  Bot,
  Globe,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenTrial?: () => void;
  onPlayVideo?: () => void;
}

export default function HeroSection({ onOpenTrial, onPlayVideo }: HeroSectionProps) {
  // State for interactive feature card selection (3 cards)
  const [activeStep, setActiveStep] = useState<number>(0);

  // Video player state & refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Visibility tracking ref
  const isVisibleRef = useRef<boolean>(false);

  // Ensure audio is unmuted anytime the video is active
  const unmuteAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
    }
  };

  // Play video automatically with sound & enforce strict 50% visibility pause/play
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.loop = true;

    // Check exact 50% visibility based on bounding rect relative to viewport
    const check50PercentVisibility = () => {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;

      if (ratio >= 0.5) {
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => { });
          setIsPlaying(true);
        }
      } else {
        if (!videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    // Attempt autoplay with sound on initial load & refresh
    const startAutoplay = () => {
      vid.muted = false;
      vid.volume = 1.0;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If browser blocks unmuted sound on initial load, start playing muted
            vid.muted = true;
            vid.play().then(() => {
              setIsPlaying(true);
            }).catch(() => { });
          });
      }
    };

    startAutoplay();

    // Turn sound ON immediately when user interacts anywhere on the page
    // Note: Does NOT call play() so it never interferes with the 50% pause logic!
    const unlockAudio = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
      }
    };

    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    // Handle 50% visibility pause/resume on scroll and window resize
    window.addEventListener('scroll', check50PercentVisibility, { passive: true });
    window.addEventListener('resize', check50PercentVisibility, { passive: true });

    // Also use IntersectionObserver with 0.5 threshold as an additional native trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isAtLeast50 = entry.isIntersecting && entry.intersectionRatio >= 0.5;
          if (isAtLeast50) {
            if (vid.paused) {
              vid.play().catch(() => { });
              setIsPlaying(true);
            }
          } else {
            if (!vid.paused) {
              vid.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: [0, 0.45, 0.5, 0.55, 1.0],
      }
    );

    observer.observe(vid);

    // Initial check right after mount
    check50PercentVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', check50PercentVisibility);
      window.removeEventListener('resize', check50PercentVisibility);
    };
  }, []);

  const interactiveSteps = [
    {
      step: '01',
      title: 'AI Keyword Intent Discovery',
      badge: '15,000+ Monitored',
      desc: 'Scans real-time search trends and buyer questions. Isolates high-volume opportunities with low competition difficulty scores.',
      metric: 'Exact Volumes • Buyer Intent Filter',
      icon: <Search size={18} />,
      accent: 'var(--color-brand-primary)',
      accentBg: 'var(--color-brand-primary-light)',
      videoTimestamp: '00:15',
      seekSeconds: 15,
    },
    {
      step: '02',
      title: 'Magic AI Long-Form Drafting',
      badge: '1,800+ Words in 12s',
      desc: 'Drafts deeply researched articles with structured H2/H3 subheadings, takeaway bullet lists, product tables, and conversational tone.',
      metric: 'Guaranteed 2.1% Keyword Density',
      icon: <Bot size={18} />,
      accent: 'var(--color-accent-cyan)',
      accentBg: '#ecfeff',
      videoTimestamp: '00:45',
      seekSeconds: 45,
    },
    {
      step: '03',
      title: '1-Click Multi-CMS Publishing',
      badge: 'WordPress • Shopify • Webflow',
      desc: 'Direct REST webhooks automatically push formatted HTML, compressed WebP images, and Google schema metadata straight to your store.',
      metric: 'Zero Manual Copy-Pasting',
      icon: <Globe size={18} />,
      accent: '#059669',
      accentBg: '#ecfdf5',
      videoTimestamp: '01:20',
      seekSeconds: 80,
    },
  ];

  const handleSelectStep = (idx: number) => {
    setActiveStep(idx);
    const targetSeconds = interactiveSteps[idx].seekSeconds;
    if (videoRef.current) {
      if (videoRef.current.duration && targetSeconds <= videoRef.current.duration) {
        videoRef.current.currentTime = targetSeconds;
      }
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => { });
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        paddingTop: 'clamp(40px, 5vw, 64px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}
    >
      {/* Subtle Ambient Brand Glow Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '12%',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          backgroundColor: 'rgba(43, 68, 231, 0.05)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(6, 182, 212, 0.05)',
          filter: 'blur(110px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>

        {/* =========================================================================
            PART 1: CLEAN, IMPACTFUL HEADLINE (TEXT & BUTTONS IN SS REMOVED)
            ========================================================================= */}
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 44px)' }}>
          {/* Top Category Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-brand-primary-light)',
                border: '1px solid rgba(43, 68, 231, 0.2)',
                color: 'var(--color-brand-primary)',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <Zap size={14} color="var(--color-brand-primary)" />
              <span>Autonomous AI Blog Engine &amp; Programmatic SEO</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5.2vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.04em',
              color: 'var(--color-text-main)',
              fontFamily: 'var(--font-heading)',
              margin: 0,
            }}
          >
            Automate your blog.{' '}
            <span style={{ color: 'var(--color-brand-primary)' }}>Rank faster,</span>{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              and scale
              <span className="heading-underline-brand" />
            </span>
          </h1>
        </div>

        {/* =========================================================================
            PART 2: PROPORTIONALLY SIZED VIDEO PLAYER (REDUCED FROM ALL SIDES)
            ========================================================================= */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1020px',
            margin: '0 auto',
            padding: '0 16px',
          }}
          className="hero-video-fullwidth-stage"
        >
          {/* Pure Video Canvas with Active Sound & Interactive Controls */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              boxShadow: '0 20px 50px -12px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(15, 23, 42, 0.08)',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = 1.0;
                if (videoRef.current.paused) {
                  videoRef.current.play().catch(() => { });
                  setIsPlaying(true);
                }
              }
            }}
          >
            {/* Real HTML5 Video Element - Plays continuously with sound on and zero default poster image */}
            <video
              ref={videoRef}
              src="/videos/autoblog-demo.mp4"
              autoPlay
              loop
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#000000',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* =========================================================================
            PART 3: DOWNSIDE INTERACTIVE WALKTHROUGH (3 COMPACT CARDS DIRECTLY UNDER VIDEO)
            ========================================================================= */}
        <div
          style={{
            maxWidth: '1020px',
            margin: 'clamp(24px, 3.5vw, 36px) auto 0 auto',
            padding: '0 16px',
          }}
        >
          {/* 3 Interactive Feature Step Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '20px',
            }}
            className="hero-interactive-3-cards"
          >
            {interactiveSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectStep(idx)}
                  className="interactive-step-card"
                  style={{
                    padding: '18px 20px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: isSelected ? '#ffffff' : 'var(--color-bg-subtle)',
                    border: isSelected ? '2px solid var(--color-brand-primary)' : '1px solid var(--color-border-light)',
                    boxShadow: isSelected ? '0 12px 30px -4px rgba(43, 68, 231, 0.16)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Top row: Icon + Step number & Pill Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: step.accentBg,
                            color: step.accent,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {step.icon}
                        </div>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 800,
                            color: 'var(--color-text-muted)',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Step {step.step}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: step.accent,
                          backgroundColor: step.accentBg,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {step.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h4
                      style={{
                        fontSize: '16px',
                        fontWeight: 800,
                        color: 'var(--color-text-main)',
                        lineHeight: 1.3,
                        margin: 0,
                      }}
                    >
                      {step.title}
                    </h4>
                  </div>

                  {/* Bottom Metric */}
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: step.accent,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      paddingTop: '12px',
                      marginTop: '14px',
                      borderTop: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <span>⚡ {step.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive layout styles */}
      <style jsx>{`
        @media (min-width: 900px) {
          .hero-interactive-3-cards {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .hero-interactive-3-cards {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .interactive-step-card {
            padding: 16px 16px !important;
          }
        }
        .interactive-step-card:hover {
          border-color: var(--color-brand-primary);
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}
