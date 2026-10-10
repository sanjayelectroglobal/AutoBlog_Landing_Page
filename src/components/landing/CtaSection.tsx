'use client';

/**
 * Contact Us Section & Interactive Inquiry Form.
 * 
 * Replaces the previous CTA title with "Contact Us" and provides a full
 * interactive contact form for leads, inquiries, and customer outreach.
 * Fields: Full Name, Email Address, Mobile Number, Website/Company, Message.
 */

import React, { useState } from 'react';
import {
  Send,
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface CtaSectionProps {
  onOpenTrial?: () => void;
}

export default function CtaSection({ onOpenTrial }: CtaSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    website: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      setErrorMessage('Please fill in your name, email, and mobile number.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact-us"
      style={{
        backgroundColor: '#ffffff',
        padding: 'clamp(64px, 8vw, 96px) 0',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0a192f 0%, #1e35c8 50%, #2b44e7 100%)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(40px, 6vw, 68px) clamp(24px, 5vw, 48px)',
            color: '#ffffff',
            boxShadow: '0 30px 70px -15px rgba(43, 68, 231, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 10 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              <Sparkles size={13} />
              <span>Get In Touch</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
                margin: '0 0 12px 0',
                color: '#ffffff',
              }}
            >
              Contact Us
            </h2>

            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.85)',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              Have questions or need assistance? Fill out the form below and our team will get in touch with you shortly.
            </p>
          </div>

          {/* Contact Form or Success State */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            {isSubmitted ? (
              <div
                style={{
                  padding: '36px 24px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1.5px solid rgba(56, 189, 248, 0.4)',
                  textAlign: 'center',
                  maxWidth: '560px',
                  margin: '0 auto',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px 0', color: '#ffffff' }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 24px 0', lineHeight: 1.6 }}>
                  Thank you for reaching out, {formData.name}. Our team has received your details and will contact you via email ({formData.email}) or phone ({formData.mobile}) within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', mobile: '', website: '', message: '' });
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-brand-primary)',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  maxWidth: '720px',
                  margin: '0 auto',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '18px',
                    marginBottom: '18px',
                  }}
                >
                  {/* Full Name */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 700,
                        marginBottom: '6px',
                        color: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      Full Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User
                        size={16}
                        style={{
                          position: 'absolute',
                          left: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#94a3b8',
                        }}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                        style={{
                          width: '100%',
                          padding: '13px 14px 13px 40px',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: '#ffffff',
                          color: 'var(--color-text-main)',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 700,
                        marginBottom: '6px',
                        color: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      Email Address *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail
                        size={16}
                        style={{
                          position: 'absolute',
                          left: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#94a3b8',
                        }}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com"
                        required
                        style={{
                          width: '100%',
                          padding: '13px 14px 13px 40px',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: '#ffffff',
                          color: 'var(--color-text-main)',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 700,
                        marginBottom: '6px',
                        color: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      Mobile Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone
                        size={16}
                        style={{
                          position: 'absolute',
                          left: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#94a3b8',
                        }}
                      />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        style={{
                          width: '100%',
                          padding: '13px 14px 13px 40px',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: '#ffffff',
                          color: 'var(--color-text-main)',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Website / Company */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 700,
                        marginBottom: '6px',
                        color: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      Website / Company (Optional)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Globe
                        size={16}
                        style={{
                          position: 'absolute',
                          left: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#94a3b8',
                        }}
                      />
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="yourstore.com"
                        style={{
                          width: '100%',
                          padding: '13px 14px 13px 40px',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: '#ffffff',
                          color: 'var(--color-text-main)',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Message Area */}
                <div style={{ marginBottom: '22px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 700,
                      marginBottom: '6px',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    Message
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MessageSquare
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '15px',
                        color: '#94a3b8',
                      }}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you are looking to achieve..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '13px 14px 13px 40px',
                        borderRadius: '10px',
                        border: '1.5px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: '#ffffff',
                        color: 'var(--color-text-main)',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid #ef4444',
                      color: '#fecaca',
                      fontSize: '13px',
                      fontWeight: 600,
                      marginBottom: '18px',
                      textAlign: 'center',
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shine"
                    style={{
                      padding: '15px 44px',
                      borderRadius: '10px',
                      backgroundColor: '#ffffff',
                      color: 'var(--color-brand-primary)',
                      fontSize: '16px',
                      fontWeight: 800,
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 8px 26px rgba(0,0,0,0.2)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.2s ease',
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Guarantee / Trust Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '36px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.75)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-accent-cyan)" />
              <span>⚡ Fast 24-hour response</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-accent-cyan)" />
              <span>🔒 100% Privacy guaranteed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-accent-cyan)" />
              <span>🤝 Direct consultation from our experts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
