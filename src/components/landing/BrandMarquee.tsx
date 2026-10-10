'use client';

/**
 * BRANDS WE HELP GROW — Infinite Brand Logo Marquee.
 * 
 * WHY THIS IMPLEMENTATION EXISTS:
 * Faithfully mirrors the Momentum.com client ticker specification:
 * - Centered monospace uppercase tracking label: "BRANDS WE HELP GROW"
 * - Warm background #FFFDFA with subtle border separation
 * - High-fidelity brand logos (Jalvayu, MLA, Altie Reality, Electro Globalz, Socialveins, MyRupaya, Revcodex, Poodles)
 * - Seamless continuous infinite marquee scrolling with hover pause and mix-blend-multiply
 */

import React from 'react';

interface BrandItem {
  name: string;
  src: string;
  height: number;
  maxWidth: number;
}

const BRAND_LOGOS: BrandItem[] = [
  { name: 'Poodles PetCare', src: '/logos/logo1.jpeg', height: 26, maxWidth: 130 },
  { name: 'Jalvayu', src: '/logos/logo2.jpeg', height: 26, maxWidth: 130 },
  { name: 'MLA', src: '/logos/logo3.jpeg', height: 26, maxWidth: 130 },
  { name: 'Altie Reality', src: '/logos/logo4.png', height: 26, maxWidth: 130 },
  { name: 'Electro Globalz', src: '/logos/logo5.png', height: 26, maxWidth: 130 },
  { name: 'Socialveins', src: '/logos/logo6.jpeg', height: 26, maxWidth: 130 },
  { name: 'MyRupaya', src: '/logos/logo7.jpeg', height: 26, maxWidth: 130 },
  { name: 'Revcodex', src: '/logos/logo8.png', height: 26, maxWidth: 130 },
];

export default function BrandMarquee() {
  // Repeated 4 times (even multiple) so the -50% CSS translate creates a seamless, perfect infinite loop
  const repeatedLogos = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section
      style={{
        backgroundColor: '#FFFDFA',
        padding: 'clamp(28px, 4vw, 44px) 0',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', textAlign: 'center', marginBottom: '22px' }}>
        <p
          style={{
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(10, 25, 47, 0.45)',
          }}
        >
          BRANDS WE HELP GROW
        </p>
      </div>

      {/* Infinite Logo Track with Edge Fade Masks */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {/* Soft Left & Right Fade Gradients */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '120px',
            background: 'linear-gradient(to right, #FFFDFA 25%, transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '120px',
            background: 'linear-gradient(to left, #FFFDFA 25%, transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        <div className="brand-marquee-track" style={{ gap: 'clamp(36px, 5vw, 64px)' }}>
          {repeatedLogos.map((brand, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '140px',
                height: '48px',
                padding: '0 8px',
                opacity: 0.88,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              className="brand-logo-item"
            >
              <img
                src={brand.src}
                alt={brand.name}
                style={{
                  height: `${brand.height}px`,
                  maxWidth: `${brand.maxWidth}px`,
                  width: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.05)',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brand-logo-item:hover {
          opacity: 1 !important;
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
