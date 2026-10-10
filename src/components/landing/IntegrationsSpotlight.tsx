'use client';

import React from 'react';

interface IntegrationsSpotlightProps {
  onOpenLightbox: (imageSrc: string) => void;
}

interface IntegrationCardItem {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'Connected' | 'Not Connected';
  actionText: 'Manage' | 'Connect';
  brandBg: string;
  renderLogo: () => React.ReactNode;
}

export default function IntegrationsSpotlight({ onOpenLightbox }: IntegrationsSpotlightProps) {
  const integrationPlatforms: IntegrationCardItem[] = [
    {
      id: 'wordpress',
      name: 'WordPress',
      category: 'CMS',
      description: 'Connect your WordPress site to automatically create and publish blogs.',
      status: 'Connected',
      actionText: 'Manage',
      brandBg: '#f0f7ff',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="WordPress Logo">
          <circle cx="16" cy="16" r="15" fill="#21759B" />
          <path
            d="M4.6 16c0 4.8 2.9 8.9 7 10.7L6.2 12.3C5.2 13.4 4.6 14.6 4.6 16zm17.6-.8c0-1.8-.7-3.1-1.3-4.1-.8-1.3-1.6-2.4-1.6-3.7 0-1.4 1.1-2.7 2.6-2.7.1 0 .2 0 .3.1C20.3 3.6 18.2 3 16 3c-4.9 0-9.2 2.8-11.4 6.9.3 0 .7.1 1 .1 1.6 0 4.1-.2 4.1-.2.8 0 .9 1.2.1 1.3 0 0-.8.1-1.8.2l5.7 17 3.4-10.2-2.4-7c-.8-.1-1.6-.2-1.6-.2-.8 0-.7-1.3.1-1.3 0 0 2.5.2 4 .2 1.6 0 4.1-.2 4.1-.2.8 0 .9 1.2.1 1.3 0 0-.8.1-1.8.2l5.6 16.7 1.6-5.3c.7-2.1 1.2-3.6 1.2-4.9z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      id: 'shopify',
      name: 'Shopify',
      category: 'Store',
      description: 'Publish product blogs and SEO content to your Shopify store.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#ecfdf5',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="Shopify Logo">
          <rect width="32" height="32" rx="7" fill="#ecfdf5" />
          <path
            d="M21.5 8.5L20 7.8c-.2-.1-.5 0-.6.2l-.7 1.7h-2.1c-.2-.5-.6-1-1.1-1.3-.7-.4-1.6-.4-2.3 0-.6.3-1.1.9-1.2 1.6l-2.4.7c-.4.1-.7.5-.6.9l2.2 13.5c.1.4.4.7.8.7h8.8c.4 0 .8-.3.8-.7l1.7-15.5c0-.2-.1-.4-.2-.5zm-6.7 0c.4-.2.9-.2 1.3 0 .3.2.5.5.6.8h-2.4c.1-.4.3-.6.5-.8zm-1.8 7.3c0-1.3 1-2.1 2.4-2.1 1.1 0 1.9.5 2.2 1.2l-1.3.6c-.2-.3-.5-.6-1-.6-.6 0-1 .4-1 1 0 .8.8 1.1 1.6 1.5 1.2.6 1.8 1.4 1.8 2.4 0 1.5-1.1 2.4-2.6 2.4-1.4 0-2.3-.7-2.6-1.5l1.3-.6c.2.5.6.8 1.2.8.7 0 1.1-.4 1.1-1 0-.8-.7-1.2-1.6-1.6-1.1-.6-1.7-1.3-1.7-2.1z"
            fill="#008060"
          />
        </svg>
      ),
    },
    {
      id: 'prestashop',
      name: 'PrestaShop',
      category: 'Store',
      description: 'Automatically publish blogs to your PrestaShop store.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#fdf4ff',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="PrestaShop Logo">
          <rect width="32" height="32" rx="7" fill="#f8fafc" />
          <circle cx="16" cy="16" r="11" fill="#1e293b" />
          <ellipse cx="13.5" cy="15" rx="3.5" ry="4" fill="#ffffff" />
          <ellipse cx="18.5" cy="15" rx="3.5" ry="4" fill="#ffffff" />
          <circle cx="13.5" cy="15" r="1.5" fill="#0f172a" />
          <circle cx="18.5" cy="15" r="1.5" fill="#0f172a" />
          <path d="M14 18c1 .8 3 .8 4 0l-2 3-2-3z" fill="#ef4444" />
          <path d="M11 9l4 2-2 2-2-4z" fill="#f59e0b" />
        </svg>
      ),
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      category: 'Store',
      description: 'Integrate with WooCommerce for seamless blog publishing.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#faf5ff',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="WooCommerce Logo">
          <rect width="32" height="32" rx="7" fill="#7f54b3" />
          <text x="16" y="20.5" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">
            Woo
          </text>
        </svg>
      ),
    },
    {
      id: 'webflow',
      name: 'Webflow',
      category: 'CMS',
      description: 'Publish SEO blogs directly to your Webflow site.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#eff6ff',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="Webflow Logo">
          <rect width="32" height="32" rx="7" fill="#146ef5" />
          <path
            d="M24 10l-3.3 12h-3.4l2.1-7.5-3.5 7.5h-3.1L9 14.5V22H6V10h3.5l3.2 7.6 2.1-7.6h3.2l-2.1 7.6L18 10h6z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      id: 'wix',
      name: 'Wix',
      category: 'CMS',
      description: 'Automatically create and publish blogs to your Wix website.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#f8fafc',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="Wix Logo">
          <rect width="32" height="32" rx="7" fill="#0f172a" />
          <text x="16" y="20.5" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">
            WiX
          </text>
        </svg>
      ),
    },
    {
      id: 'custom-api',
      name: 'Custom API',
      category: 'API',
      description: 'Use our API to integrate with any platform or custom website.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#f1f5f9',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="Custom API Webhook Logo">
          <rect width="32" height="32" rx="7" fill="#f1f5f9" />
          <path d="M14 11a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4v-1" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M18 21a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v1" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'blogger',
      name: 'Blogger',
      category: 'CMS',
      description: 'Publish blogs to your Blogger site.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#fff7ed',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="Blogger Logo">
          <rect width="32" height="32" rx="7" fill="#ff5722" />
          <path
            d="M12 9h5a4 4 0 0 1 4 4c0 1.2-.5 2.2-1.3 2.9.9.6 1.5 1.7 1.5 3 0 2.2-1.8 4-4 4h-5.2V9zm3.2 5.5h1.8c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-1.8v3zm0 5.6h2c.9 0 1.6-.7 1.6-1.6 0-.8-.7-1.5-1.6-1.5h-2v3.1z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      id: 'flutter',
      name: 'Flutter',
      category: 'SDK',
      description: 'Integrate with your Flutter app to manage blog content.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#f0f9ff',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="Flutter Logo">
          <rect width="32" height="32" rx="7" fill="#f0f9ff" />
          <path d="M17.5 7L9 15.5l2.6 2.6L22.7 7H17.5zm0 8.5L13.8 19.2l3.7 3.7h5.2l-6.3-6.3 6.3-6.3h-5.2z" fill="#02569b" />
          <path d="M17.5 22.9l-2.6 2.6 2.6 2.6h5.2l-5.2-5.2z" fill="#0175c2" />
        </svg>
      ),
    },
    {
      id: 'react',
      name: 'React',
      category: 'SDK',
      description: 'Use our SDK to integrate blog features into your React app.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#f0fdfa',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="React Logo">
          <rect width="32" height="32" rx="7" fill="#0b1329" />
          <ellipse cx="16" cy="16" rx="9" ry="3.5" stroke="#00d8ff" strokeWidth="1.5" />
          <ellipse cx="16" cy="16" rx="9" ry="3.5" transform="rotate(60 16 16)" stroke="#00d8ff" strokeWidth="1.5" />
          <ellipse cx="16" cy="16" rx="9" ry="3.5" transform="rotate(120 16 16)" stroke="#00d8ff" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="2.2" fill="#00d8ff" />
        </svg>
      ),
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Framework',
      description: 'Easily integrate blog publishing in your Next.js application.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#0f172a',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="Next.js Logo">
          <rect width="32" height="32" rx="7" fill="#000000" />
          <path d="M21.5 22L13 11h-2v10h2v-6.5l7 9c.5.4 1 .2 1.5-.5z" fill="#ffffff" />
          <path d="M19 11h2v5.5l-2-2.5V11z" fill="#94a3b8" />
        </svg>
      ),
    },
    {
      id: 'ghost',
      name: 'Ghost',
      category: 'CMS',
      description: 'Publish blogs to your Ghost CMS.',
      status: 'Not Connected',
      actionText: 'Connect',
      brandBg: '#18181b',
      renderLogo: () => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="Ghost CMS Logo">
          <rect width="32" height="32" rx="7" fill="#18181b" />
          <rect x="9" y="11" width="14" height="2.5" rx="1.25" fill="#ffffff" />
          <rect x="9" y="15.5" width="9" height="2.5" rx="1.25" fill="#ffffff" />
          <rect x="9" y="20" width="12" height="2.5" rx="1.25" fill="#ffffff" />
        </svg>
      ),
    },
  ];

  const repeatedPlatforms = [...integrationPlatforms, ...integrationPlatforms];

  return (
    <>
      {/* =========================================================================
          STEP 03: UNIVERSAL CMS & STOREFRONT PUBLISHING ECOSYSTEM
          ========================================================================= */}
      <section
        id="integrations-hub"
        style={{
          backgroundColor: '#ffffff',
          padding: 'clamp(64px, 8vw, 96px) 0',
          borderTop: '1px solid var(--color-border-subtle)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--color-brand-primary-light)',
                color: 'var(--color-brand-primary)',
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                marginBottom: '12px',
                display: 'inline-block',
              }}
            >
              Step 03 • 1-Click Publishing Ecosystem
            </span>

            <h2
              style={{
                fontSize: 'clamp(30px, 4.5vw, 48px)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
              }}
            >
              Connect{' '}
              <span style={{ position: 'relative', display: 'inline-block', color: '#059669' }}>
                Directly
                <span className="heading-underline-green" />
              </span>{' '}
              with Your Favorite{' '}
              <span style={{ color: 'var(--color-brand-primary)' }}>Storefront &amp; CMS</span>
            </h2>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--color-text-body)', marginTop: '14px' }}>
              Our team handles everything—from setting up your CMS to connecting and configuring it with AutoBlog.{' '}
              <strong style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>
                Get started today, and let us take care of the technical setup for you.
              </strong>
            </p>
          </div>

          {/* Mounted Screenshot Display (Clean, High-Resolution, As-Is) */}
          <div
            style={{
              maxWidth: '1160px',
              margin: '0 auto 24px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 16px 40px -10px rgba(15, 23, 42, 0.08)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
            }}
            onClick={() => onOpenLightbox('/images/autoblog-integrations-dashboard.png')}
            title="Click to view full screen"
          >
            <img
              src="/images/autoblog-integrations-dashboard.png"
              alt="AutoBlog Integrations Dashboard"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* =======================================================================
              CONTINUOUS HORIZONTAL MOVING MINI-CARDS CONVEYOR (DIRECTLY BELOW SCREENSHOT)
              ======================================================================= */}
          <div
            className="integrations-horizontal-scroll-container"
            style={{
              position: 'relative',
              maxWidth: '1160px',
              margin: '0 auto',
              overflow: 'hidden',
              padding: '10px 0 16px',
              maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
            }}
          >
            {/* Infinite Horizontal Conveyor Marquee Track */}
            <div className="integrations-horizontal-track">
              {repeatedPlatforms.map((platform, i) => (
                <div
                  key={`${platform.id}-${i}`}
                  className="integration-mini-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '14px',
                    width: '232px',
                    height: '72px',
                    boxSizing: 'border-box',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: 'none',
                    padding: '0 20px',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)',
                    flexShrink: 0,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                  }}
                >
                  {/* Branded Icon Matching Upper Dashboard Image */}
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden',
                      backgroundColor: '#f8fafc',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <img
                      src={`/images/integrations-icons/${platform.id}.png`}
                      alt={`${platform.name} Logo`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Platform Name */}
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEYFRAME STYLES & HORIZONTAL MARQUEE ANIMATION
          ========================================================================= */}
      <style jsx>{`
        .integrations-horizontal-track {
          display: flex;
          align-items: center;
          gap: 18px;
          width: max-content;
          animation: integrationsMarqueeScroll 42s linear infinite;
        }

        .integrations-horizontal-scroll-container:hover .integrations-horizontal-track {
          animation-play-state: paused;
        }

        .integration-mini-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px -4px rgba(15, 23, 42, 0.12) !important;
        }

        @keyframes integrationsMarqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}
