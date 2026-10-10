'use client';

/**
 * =====================================================================================
 * DEEP-DIVE INTERACTIVE FEATURE SPOTLIGHTS COMPONENT
 * =====================================================================================
 * 
 * 10-YEAR ARCHITECTURAL SPECIFICATION & PURPOSE:
 * -------------------------------------------------------------------------------------
 * This component walks prospective customers through the 3 foundational pillars of AutoBlog:
 * 
 * 1. SPOTLIGHT 1: KEYWORD INTELLIGENCE & INTENT SCANNER:
 *    - Explains real-time Google search volume tracking, opportunity scoring, and automated
 *      4-week publishing roadmap generation.
 *    - Mounted screenshot: `/images/sc-keyword-research.png`.
 * 
 * 2. SPOTLIGHT 2: TOPICAL BUBBLE CLUSTERS & WORKFLOW PIPELINE:
 *    - Demonstrates semantic topic clustering, 4-stage execution taxonomy (Setting Workflow ->
 *      Finding Trends -> Creating Plan -> Review & Publish).
 *    - Mounted screenshot: `/images/sc-workflow-bubbles.png`.
 * 
 * 3. SPOTLIGHT 3: UNIVERSAL CMS & STOREFRONT PUBLISHING ECOSYSTEM:
 *    - Demonstrates 1-click publishing directly into WordPress, Shopify, Webflow, WooCommerce,
 *      Ghost, PrestaShop, Wix, Blogger, and modern stacks (React, Next.js, Flutter, Custom API).
 *    - Mounted screenshot: `/images/sc-integrations.png`.
 *    - DIRECTLY UNDERNEATH THIS SCREENSHOT:
 *      A single-line CONTINUOUS HORIZONTAL MOVING MINIATURE CARDS TRACK.
 *      Each card faithfully models the visual structure shown inside the screenshot:
 *      [Brand Logo + Name] -> [2-line Description Text] -> [Status Dot + Action Button].
 *      The conveyor scrolls continuously and horizontally without making the section
 *      unnecessarily taller, staying compact and perfectly aligned.
 * 
 * KEY VISUAL & ACCESSIBILITY DECISIONS:
 * -------------------------------------------------------------------------------------
 * - Clean titlebars: Browser mockup frames use software view titles instead of raw web URLs.
 * - Lightbox Zoom: Clicking any screenshot or "Enlarge Screenshot" button calls `onOpenLightbox(src)`.
 * - Horizontal Kinetic Motion: The integration cards move horizontally directly below the screenshot,
 *   pausing on hover so users can easily read any platform card.
 * - High-DPI Vector SVGs: Pixel-perfect branded vector logos ensure crisp rendering on 4K/retina displays.
 */

import React from 'react';
import {
  Search,
  Calendar,
  Layers,
  Globe,
  Maximize2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Bot,
  Zap,
} from 'lucide-react';

/**
 * PROPS SPECIFICATION:
 * Decoupled from modal mounting logic. Passes the active image path up to the root
 * `page.tsx` controller so a single LightboxModal handles all fullscreen zooms.
 */
interface FeatureSpotlightsProps {
  onOpenLightbox: (imageSrc: string) => void;
}

/**
 * Interactive cursor-tracking benefit card:
 * Follows mouse movement with 3D tilt, dynamic radial spotlight, and smooth elevation.
 */
function InteractiveBenefitCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}) {
  const [transformStyle, setTransformStyle] = React.useState({
    transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
    spotlight: 'none',
  });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 6;
    const moveX = ((x - centerX) / centerX) * 7;
    const moveY = ((y - centerY) / centerY) * 3;

    setTransformStyle({
      transform: `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 10px)`,
      spotlight: `radial-gradient(240px circle at ${x}px ${y}px, rgba(43, 68, 231, 0.08), transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle({
      transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
      spotlight: 'none',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding: '18px 20px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: isHovered ? '#ffffff' : 'var(--color-bg-subtle)',
        border: `1px solid ${isHovered ? 'rgba(43, 68, 231, 0.35)' : 'var(--color-border-light)'}`,
        boxShadow: isHovered
          ? '0 16px 36px -8px rgba(43, 68, 231, 0.16), 0 4px 12px rgba(0, 0, 0, 0.04)'
          : '0 2px 6px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        cursor: 'pointer',
        transform: transformStyle.transform,
        transition: isHovered
          ? 'border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease'
          : 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        userSelect: 'none',
        willChange: 'transform',
      }}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: transformStyle.spotlight,
          pointerEvents: 'none',
          transition: 'background 0.05s ease',
          zIndex: 1,
        }}
      />

      {/* Leading Icon with Depth Lift */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '8px',
          borderRadius: '10px',
          backgroundColor: iconBg,
          color: iconColor,
          flexShrink: 0,
          transform: isHovered ? 'scale(1.12) translateZ(14px)' : 'scale(1) translateZ(0)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isHovered ? `0 6px 16px -4px ${iconColor}40` : 'none',
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 800,
            color: isHovered ? 'var(--color-brand-primary)' : 'var(--color-text-main)',
            letterSpacing: '-0.015em',
            transition: 'color 0.25s ease',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '13px',
            color: 'var(--color-text-body)',
            marginTop: '4px',
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

export default function FeatureSpotlights({ onOpenLightbox }: FeatureSpotlightsProps) {
  return (
    <>
      {/* =========================================================================
          FEATURE 1: KEYWORD INTELLIGENCE & 4-WEEK PUBLISHING ROADMAPS
          ========================================================================= */}
      <section
        id="keyword-intelligence"
        style={{
          backgroundColor: '#ffffff',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid var(--color-border-subtle)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
          {/* Top Section Header: Single-Line Headline spanning full width */}
          <div style={{ marginBottom: 'clamp(28px, 4vw, 42px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--color-brand-primary-light)',
                  color: 'var(--color-brand-primary)',
                  padding: '4px 14px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Step 01 • Search Volume &amp; Intent Discovery
              </span>
            </div>

            <h2
              className="feature-single-line-heading"
              style={{
                fontSize: 'clamp(22px, 2.7vw, 38px)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.25,
                letterSpacing: '-0.035em',
                margin: 0,
              }}
            >
              Low Keyword Volume,{' '}
              <span style={{ color: 'var(--color-brand-primary)' }}>High Opportunity,</span>{' '}
              <span style={{ position: 'relative', display: 'inline-block', color: '#059669' }}>
                Strong Search Intent.
                <span className="heading-underline-green" />
              </span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(40px, 5vw, 64px)',
              alignItems: 'stretch',
            }}
          >
            {/* Left Column: Narrative Copy & 2 Benefit Cards (Aligned to bottom) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--color-text-body)', margin: '0 0 20px 0' }}>
                AutoBlog finds low-volume keywords with strong buyer intent and high growth potential, helping you uncover valuable opportunities your competitors miss.
              </p>

              {/* 2 Structured Benefit Highlights with Cursor Tracking & Interactive Motion */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <InteractiveBenefitCard
                  icon={<Search size={20} />}
                  iconBg="var(--color-brand-primary-light)"
                  iconColor="var(--color-brand-primary)"
                  title="Buyer Intent & High-Opportunity Scoring"
                  description="Uncovers untapped, low-competition terms where customers are actively looking to buy—prioritizing qualified conversion intent over meaningless vanity traffic."
                />

                <InteractiveBenefitCard
                  icon={<Calendar size={20} />}
                  iconBg="#ecfeff"
                  iconColor="var(--color-accent-cyan)"
                  title="Automated Niche Scanning & Monthly Content Roadmap"
                  description="Scans competitor content gaps and your specific niche to automatically structure a complete 4-week publishing plan aligned with real search demand."
                />
              </div>
            </div>

            {/* Right Column: Mounted Screenshot Device Mockup Frame (Aligned to bottom) */}
            <div
              className="autoblog-device-frame autoblog-zoom-frame"
              onClick={() => onOpenLightbox('/images/sc-keyword-research.png')}
              title="Click to zoom high-resolution screenshot"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Clean Browser Chrome Titlebar (Software view title without raw external URL) */}
              <div className="autoblog-browser-bar" style={{ flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div className="autoblog-browser-dot" style={{ backgroundColor: '#ef4444' }} />
                  <div className="autoblog-browser-dot" style={{ backgroundColor: '#eab308' }} />
                  <div className="autoblog-browser-dot" style={{ backgroundColor: '#22c55e' }} />
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                  AutoBlog Intelligence • Keyword Research &amp; Intent Scanner
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                  🔍 Verified Scanner
                </span>
              </div>

              {/* Screenshot Image Presentation with Smooth Cursor Zoom Effect */}
              <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f4f6fa', flex: 1, display: 'flex', alignItems: 'center' }}>
                <img
                  src="/images/sc-keyword-research.png"
                  alt="AutoBlog Finding Trending & High-Potential Keywords"
                  className="zoom-target-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons: Both 2 Buttons Centered Beneath Columns */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginTop: 'clamp(32px, 4.5vw, 44px)',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#contact-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 26px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-brand-primary)',
                color: '#ffffff',
                fontSize: '14.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px var(--color-brand-primary-glow)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Schedule Keyword Intelligence Demo</span>
              <ExternalLink size={15} />
            </a>

            <button
              type="button"
              onClick={() => onOpenLightbox('/images/sc-keyword-research.png')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 22px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff',
                border: '1.5px solid var(--color-border-light)',
                color: 'var(--color-text-main)',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              <Maximize2 size={15} />
              <span>Enlarge Screenshot</span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (min-width: 900px) {
          .feature-single-line-heading {
            white-space: nowrap !important;
          }
        }
      `}</style>
    </>
  );
}
