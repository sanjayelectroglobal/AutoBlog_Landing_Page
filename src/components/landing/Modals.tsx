'use client';

/**
 * Modals Component Suite for AutoBlog Landing Page.
 * 
 * WHY THIS IMPLEMENTATION EXISTS:
 * Encapsulates the 3 interactive dialog overlays:
 * 1. Fullscreen High-Resolution Screenshot Inspector.
 * 2. 14-Day Free Trial Onboarding Modal with interactive submission state.
 * 3. Video Demo Walkthrough Player Modal (triggered by hero video play button & CTAs).
 */

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Play,
  Volume2,
  Maximize2,
  Pause,
  RotateCcw,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   1. SCREENSHOT LIGHTBOX MODAL
   ────────────────────────────────────────────────────────────────────────── */
interface LightboxModalProps {
  imageSrc: string | null;
  onClose: () => void;
}

export function LightboxModal({ imageSrc, onClose }: LightboxModalProps) {
  if (!imageSrc) return null;

  return (
    <div className="autoblog-modal-overlay" onClick={onClose}>
      <div className="autoblog-lightbox-card" onClick={(e) => e.stopPropagation()}>
        {/* Lightbox Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid var(--color-border-light)',
            backgroundColor: 'var(--color-bg-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-text-main)' }}>
              AutoBlog High-Resolution Screen Inspector
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              — Production Interface Preview
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#e2e8f0',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-text-main)',
            }}
            aria-label="Close Lightbox"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Image Area */}
        <div style={{ overflowY: 'auto', padding: '20px', backgroundColor: '#f1f5f9', maxHeight: '76vh' }}>
          <img
            src={imageSrc}
            alt="Enlarged Platform Screenshot"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-light)',
              boxShadow: 'var(--shadow-card)',
            }}
          />
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 24px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--color-border-light)',
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            Direct AutoBlog software capture.
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="#contact-us"
              onClick={onClose}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-brand-primary)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Get Started</span>
              <ExternalLink size={12} />
            </a>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-subtle)',
                color: 'var(--color-text-main)',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid var(--color-border-light)',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   2. 14-DAY FREE TRIAL ONBOARDING MODAL
   ────────────────────────────────────────────────────────────────────────── */
interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrialModal({ isOpen, onClose }: TrialModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="autoblog-modal-overlay" onClick={onClose}>
      <div className="autoblog-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
          }}
          aria-label="Close Trial Modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
              Workspace Ready!
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-text-body)', marginBottom: '24px', lineHeight: 1.6 }}>
              Your 14-day AutoBlog trial has been provisioned for <strong>{storeName || 'your store'}</strong>. Initializing dashboard...
            </p>

            <a
              href="#contact-us"
              onClick={onClose}
              style={{
                display: 'inline-block',
                padding: '13px 26px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-brand-primary)',
                color: '#ffffff',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px var(--color-brand-primary-glow)',
              }}
            >
              Proceed to Contact Us
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--color-brand-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                14-Day Free Trial
              </span>
            </div>

            <h3 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Get Started with AutoBlog
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-body)', marginBottom: '24px', lineHeight: 1.6 }}>
              Automate your blog pipeline with Magic AI. No credit card required.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', display: 'block', marginBottom: '6px' }}>
                  Brand or Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Health or MyStore"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--color-border-light)',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', display: 'block', marginBottom: '6px' }}>
                  Store URL or Domain
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. mystore.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--color-border-light)',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', display: 'block', marginBottom: '6px' }}>
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--color-border-light)',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-shine"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-brand-primary)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px var(--color-brand-primary-glow)',
              }}
            >
              <span>Launch 14-Day Free Trial</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. VIDEO DEMO WALKTHROUGH MODAL
   ────────────────────────────────────────────────────────────────────────── */
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="autoblog-modal-overlay" onClick={onClose}>
      <div
        className="autoblog-lightbox-card"
        style={{ maxWidth: '960px', backgroundColor: '#0a192f' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Video Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: '#0d1f3b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                backgroundColor: 'var(--color-brand-primary)',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              DEMO
            </span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              AutoBlog Platform Walkthrough Demo
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Screen */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#050c18',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <video
            src="/videos/autoblog-demo.mp4"
            controls
            autoPlay
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: '#000000',
              display: 'block',
            }}
          />
        </div>
        
        {/* Modal Bottom Action Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            backgroundColor: '#0a192f',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-accent-cyan)',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                padding: '3px 8px',
                borderRadius: '4px',
              }}
            >
              HD 1080P • FULL DEMO
            </span>
          </div>

          <a
            href="#contact-us"
            onClick={onClose}
            style={{
              fontSize: '12.5px',
              fontWeight: 700,
              color: '#ffffff',
              backgroundColor: 'var(--color-brand-primary)',
              padding: '7px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Get Started With AutoBlog</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
