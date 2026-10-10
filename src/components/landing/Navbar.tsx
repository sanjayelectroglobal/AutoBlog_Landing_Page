'use client';

/**
 * =====================================================================================
 * AUTOBLOG NAVBAR — MINIMAL MOMMANTUM-STYLE TWO-SIDED HEADER
 * =====================================================================================
 * 
 * Layout Structure:
 * - One Side (Left): AutoBlog Brand Logo
 * - Other Side (Right): Cleanly grouped navigation links & CTA button:
 *     1. Editz (links to Mommantum Editz Video Studio)
 *     2. Real-Time Showcase (#realtime-showcase)
 *     3. Integration (#integrations-hub)
 *     4. Reviews (#customer-reviews)
 *     5. Contact Us (Dark Navy Pill Button with Arrow: "Contact Us →")
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenTrial?: () => void;
}

export default function Navbar({ onOpenTrial }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 48px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px',
          }}
        >
          {/* ===================================================================
              ONE SIDE (LEFT): OFFICIAL AUTOBLOG LOGO
              =================================================================== */}
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'opacity 0.2s ease',
            }}
            title="AutoBlog - Home"
          >
            <img
              src="/images/autoblog-official-logo.jpg"
              alt="AutoBlog Logo"
              style={{
                height: 'clamp(42px, 3.5vw, 50px)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                mixBlendMode: 'multiply',
              }}
            />
          </Link>

          {/* ===================================================================
              OTHER SIDE (RIGHT): EDITZ, SHOWCASE, INTEGRATION, REVIEWS, CONTACT US
              =================================================================== */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Desktop Navigation Links */}
            <nav
              className="desktop-nav-links"
              style={{
                alignItems: 'center',
                gap: 'clamp(20px, 2.4vw, 36px)',
              }}
            >
              <a
                href="https://www.mommantum.com/editz"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item-link"
              >
                Editz
              </a>

              <a
                href="#realtime-showcase"
                className="nav-item-link"
              >
                Real-Time Showcase
              </a>

              <a
                href="#integrations-hub"
                className="nav-item-link"
              >
                Integration
              </a>

              <a
                href="#customer-reviews"
                className="nav-item-link"
              >
                Reviews
              </a>

              <a
                href="#pricing"
                className="nav-item-link"
              >
                Pricing
              </a>

              {/* Styled Pill Button matching "Let's Talk →" in reference design */}
              <a
                href="#contact-us"
                className="nav-pill-cta"
                title="Get in touch with AutoBlog"
              >
                <span>Contact Us</span>
                <ArrowRight size={15} />
              </a>
            </nav>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-trigger"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* =======================================================================
          MOBILE DRAWER MENU (Responsive for tablets & phones)
          ======================================================================= */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '20px 24px 28px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 16px 30px rgba(0, 0, 0, 0.08)',
          }}
        >
          <a
            href="https://www.mommantum.com/editz"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#0e2547',
              textDecoration: 'none',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            Editz
          </a>

          <a
            href="#realtime-showcase"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#0e2547',
              textDecoration: 'none',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            Real-Time Showcase
          </a>

          <a
            href="#integrations-hub"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#0e2547',
              textDecoration: 'none',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            Integration
          </a>

          <a
            href="#customer-reviews"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#0e2547',
              textDecoration: 'none',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            Reviews
          </a>

          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#0e2547',
              textDecoration: 'none',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            Pricing
          </a>

          <a
            href="#contact-us"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#0e2547',
              color: '#ffffff',
              padding: '13px 24px',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              marginTop: '10px',
              boxShadow: '0 6px 18px rgba(14, 37, 71, 0.2)',
            }}
          >
            <span>Contact Us</span>
            <ArrowRight size={16} />
          </a>
        </div>
      )}

      {/* Embedded Component Styles */}
      <style jsx>{`
        .nav-item-link {
          font-size: 15px;
          font-weight: 600;
          color: #0e2547;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.18s ease;
          padding: 8px 0;
          display: inline-flex;
          align-items: center;
        }

        .nav-item-link:hover {
          color: #2b44e7;
        }

        .nav-pill-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #0e2547;
          color: #ffffff;
          padding: 11px 24px;
          border-radius: 9999px;
          font-size: 14.5px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(14, 37, 71, 0.18);
        }

        .nav-pill-cta:hover {
          background-color: #1e35c8;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(30, 53, 200, 0.28);
        }

        .nav-pill-cta:active {
          transform: translateY(0);
        }

        .mobile-menu-trigger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #0e2547;
          cursor: pointer;
          transition: background-color 0.18s ease;
        }

        .mobile-menu-trigger:hover {
          background-color: #f8fafc;
        }

        @media (min-width: 1024px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .mobile-menu-trigger {
            display: none !important;
          }
        }

        @media (max-width: 1023px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-menu-trigger {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
