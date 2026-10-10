'use client';

/**
 * AutoBlog Landing Page Footer.
 * 
 * WHY THIS IMPLEMENTATION EXISTS:
 * Provides structured navigation links, official branding, platform links,
 * and copyright credentials strictly relevant to the AutoBlog product.
 */

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border-light)',
        backgroundColor: '#ffffff',
        padding: '64px 0 32px',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Column 1: Brand Info & Logo */}
          <div>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                marginBottom: '16px',
              }}
            >
              <img
                src="/images/autoblog-official-logo.jpg"
                alt="AutoBlog Logo"
                style={{ height: '44px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }}
              />
            </Link>

            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-text-body)', marginBottom: '16px' }}>
              Autonomous AI Blog Automation &amp; Programmatic SEO Engine for modern e-commerce stores, D2C brands, and digital publishers.
            </p>

            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Built with Next.js 15, React 19, and Google Stitch MCP.
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px' }}>
              Product Features
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#keyword-intelligence" style={{ textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '14px' }}>
                  AI Keyword Intelligence
                </a>
              </li>
              <li>
                <a href="#realtime-showcase" style={{ textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '14px' }}>
                  Platform Showcase
                </a>
              </li>
              <li>
                <a href="#integrations-hub" style={{ textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '14px' }}>
                  CMS Integrations Ecosystem
                </a>
              </li>
              <li>
                <a href="#customer-reviews" style={{ textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '14px' }}>
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Suite */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px' }}>
              Key Highlights
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#impact-stats" style={{ textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '14px' }}>
                  Compounding Traffic Growth
                </a>
              </li>
              <li>
                <a href="#realtime-showcase" style={{ textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '14px' }}>
                  Real-Time Analytics
                </a>
              </li>
              <li>
                <a href="#integrations-hub" style={{ textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '14px' }}>
                  1-Click Storefront Connectors
                </a>
              </li>
              <li>
                <a href="#contact-us" style={{ textDecoration: 'none', color: 'var(--color-text-body)', fontSize: '14px' }}>
                  Support &amp; Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Launch */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '16px' }}>
              Ready to Scale?
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-body)', marginBottom: '14px', lineHeight: 1.6 }}>
              Get in touch with our blog automation team or request a personalized onboarding demo.
            </p>
            <a
              href="#contact-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-brand-primary)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px var(--color-brand-primary-glow)',
              }}
            >
              <span>Contact Us</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '28px',
            borderTop: '1px solid var(--color-border-subtle)',
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            gap: '14px',
          }}
        >
          <div>© {new Date().getFullYear()} AutoBlog Software Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
