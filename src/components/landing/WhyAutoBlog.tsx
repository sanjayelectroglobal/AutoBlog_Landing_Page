'use client';

/**
 * =====================================================================================
 * REAL-TIME PLATFORM SHOWCASE — HORIZONTAL SLIDER WITH PINNED SCROLL SYNC
 * =====================================================================================
 * 
 * SPECIFICATIONS:
 * 1. PURE PAGES ONLY:
 *    - No outer frames, borders, or box-shadows around the page screenshots.
 *    - Extra buttons (prev/next, step pills) removed per user instruction.
 * 2. REPLACED THIRD IMAGE:
 *    - Exact image from "C:\Users\BIT\Downloads\AutoBlog Dashboard_ Blog Automation Analytics.png".
 *    - objectFit: 'contain' ensures zero cropping of the dashboard.
 * 3. HORIZONTAL SLIDER:
 *    - Smooth horizontal transition (translateX) between the 3 uncropped pages.
 * 4. SYNCHRONIZED SCROLL TIMING:
 *    - Sliding never starts when the page is only partially visible.
 *    - Slide 1 remains stationary until the section is 100% visible on screen.
 *    - Slide 2 is fully visible and rested before any transition to Slide 3.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface ScreenshotCardItem {
  id: string;
  src: string;
  alt: string;
}

const CARDS: ScreenshotCardItem[] = [
  {
    id: 'card-workflow',
    src: '/images/autoblog-realtime-1.png',
    alt: 'AutoBlog Blog Automation & Planned Workflow',
  },
  {
    id: 'card-keywords',
    src: '/images/autoblog-realtime-2.png',
    alt: 'AutoBlog AI Keyword Research & Calendar',
  },
  {
    id: 'card-dashboard',
    src: '/images/autoblog-dashboard-analytics.png',
    alt: 'AutoBlog Dashboard: Blog Automation Analytics',
  },
];

interface WhyAutoBlogProps {
  onOpenLightbox?: (src: string) => void;
}

export default function WhyAutoBlog({ onOpenLightbox }: WhyAutoBlogProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sync scroll position with horizontal slide index
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;
        if (totalDistance <= 0) return;

        // Container is pinned at top: 70px (below fixed navbar)
        const pinnedTop = 70;
        const scrolled = pinnedTop - rect.top;

        // Only calculate slide when pinned / 100% fully visible inside section
        if (scrolled < 0) {
          // Above section: firmly on slide 0, no transitions
          setCurrentSlide(0);
          return;
        }

        const progress = Math.max(0, Math.min(1, scrolled / totalDistance));

        // Discrete comfortable zones ensuring full visibility of each image:
        // 0.00 - 0.33 => Image 1 fully visible
        // 0.33 - 0.66 => Image 2 fully visible
        // 0.66 - 1.00 => Image 3 fully visible
        if (progress < 0.33) {
          setCurrentSlide(0);
        } else if (progress < 0.66) {
          setCurrentSlide(1);
        } else {
          setCurrentSlide(2);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCardClick = (src: string) => {
    if (onOpenLightbox) {
      onOpenLightbox(src);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="realtime-showcase"
      style={{
        position: 'relative',
        height: '175vh', // Compact pinned scroll track requiring minimal wheel rotation
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      {/* Sticky Viewport Container - Locked 100% on screen during transitions */}
      <div
        style={{
          position: 'sticky',
          top: '70px',
          height: 'calc(100vh - 70px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 20px',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Soft Ambient Depth Glow */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '380px',
            borderRadius: '999px',
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />

        {/* Section Header */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto 16px auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.18)',
              color: '#2563eb',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            <Sparkles size={12} />
            <span>Inside the Platform</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(22px, 3.2vw, 34px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--color-text-main)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            See How <span style={{ color: 'var(--color-brand-primary)' }}>AutoBlog Works</span> in{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              Real-Time
              <span className="heading-underline-green" style={{ height: '3px', margin: '2px auto 0' }} />
            </span>
          </h2>
        </div>

        {/* Pure Horizontal Slider: Pure Pages without Outer Frame/Shadow, Zero Cropping */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1160px',
            height: 'calc(100vh - 160px)',
            maxHeight: '600px',
            minHeight: '340px',
            margin: '0 auto',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            zIndex: 10,
          }}
        >
          {/* Horizontal Track containing all 3 pure full images */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: `${CARDS.length * 100}%`,
              height: '100%',
              transform: `translateX(-${(currentSlide * 100) / CARDS.length}%)`,
              transition: 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.src)}
                style={{
                  width: `${100 / CARDS.length}%`,
                  height: '100%',
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Click to view full-resolution screenshot"
              >
                {/* Edge-to-edge pure page screenshot - objectFit: contain ensures zero cropping */}
                <img
                  src={card.src}
                  alt={card.alt}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    backgroundColor: '#ffffff',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
