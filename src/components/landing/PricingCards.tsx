'use client';

/**
 * =====================================================================================
 * AUTOBLOG COMPACT PRICING CARDS COMPONENT
 * =====================================================================================
 * 
 * SPECIFICATIONS:
 * - Reduced vertical height to cleanly fit within standard laptop/desktop viewports.
 * - Faithful ChatGPT-style layout:
 *     [Plan Name + Optional RECOMMENDED Badge]
 *     [Headline Hook]
 *     [1-line Concise Description]
 *     [Full-Width Rounded Pill CTA Button]
 *     [Compact Price in INR + /mo (incl. GST)]
 *     [Divider]
 *     [5 Focused Feature Bullet Points with Custom Icons]
 * - Strictly 3 Paid Tiers (No Free Tier).
 */

import React from 'react';
import {
  Sparkles,
  Bot,
  Zap,
  Layers,
  Globe,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Boxes,
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  headline: string;
  description: string;
  price: string;
  priceSub: string;
  buttonLabel: string;
  isRecommended: boolean;
  features: {
    text: string;
    icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  }[];
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    headline: 'Expanded access',
    description: 'Essential automated blog writing, keyword discovery & single-store sync.',
    price: '₹1,499',
    priceSub: '/ mo (incl. GST)',
    buttonLabel: 'Upgrade to Starter',
    isRecommended: false,
    features: [
      { text: '15 SEO long-form articles / month', icon: Bot },
      { text: '1 connected store (Shopify or WordPress)', icon: Globe },
      { text: 'Buyer intent keyword opportunity scanner', icon: TrendingUp },
      { text: 'Automated featured images & meta tags', icon: Layers },
      { text: 'Guaranteed 90+ on-page SEO health score', icon: ShieldCheck },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'RECOMMENDED',
    headline: 'Your AI assistant',
    description: 'Autonomous daily publishing, semantic topical clusters & multi-CMS sync.',
    price: '₹4,999',
    priceSub: '/ mo (incl. GST)',
    buttonLabel: 'Upgrade to Plus',
    isRecommended: true,
    features: [
      { text: '60 SEO long-form articles / month', icon: Sparkles },
      { text: 'Up to 3 connected stores & blogs', icon: Globe },
      { text: 'Semantic Topical Bubble cluster silos', icon: Boxes },
      { text: 'Universal CMS: WordPress, Shopify, Webflow', icon: Layers },
      { text: '24/7 continuous cron publishing scheduler', icon: Zap },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    headline: 'Maximum power',
    description: 'For high-velocity publishers and agencies requiring unlimited throughput.',
    price: 'From ₹14,999',
    priceSub: '/ mo (incl. GST)',
    buttonLabel: 'Upgrade to Pro',
    isRecommended: false,
    features: [
      { text: 'Unlimited SEO articles / month', icon: Bot },
      { text: 'Unlimited connected domains & client stores', icon: Globe },
      { text: 'Custom headless CMS & REST API delivery', icon: Zap },
      { text: 'Multi-language global SEO translation', icon: Globe },
      { text: 'Dedicated SEO strategist & priority support', icon: ShieldCheck },
    ],
  },
];

interface PricingCardsProps {
  onOpenTrial?: () => void;
}

export default function PricingCards({ onOpenTrial }: PricingCardsProps) {
  return (
    <section
      id="pricing"
      style={{
        padding: 'clamp(44px, 5.5vw, 68px) 0',
        backgroundColor: '#fbfcfd',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 28px)' }}>
        
        {/* ===================================================================
            SECTION HEADER
            =================================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.18)',
              color: 'var(--color-brand-primary)',
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={12} />
            <span>Pricing Plans</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(24px, 2.8vw, 34px)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              margin: '0',
            }}
          >
            Predictable Plans for{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ color: 'var(--color-brand-primary)' }}>Autonomous Growth</span>
              <span className="heading-underline-green" style={{ height: '3px', margin: '3px auto 0' }} />
            </span>
          </h2>
        </div>

        {/* ===================================================================
            BALANCED 3-CARD PRICING GRID
            =================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {PRICING_PLANS.map((plan) => {
            const isRec = plan.isRecommended;

            return (
              <div
                key={plan.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '22px',
                  border: isRec ? '1.5px solid var(--color-brand-primary)' : '1px solid #e2e8f0',
                  boxShadow: isRec
                    ? '0 14px 36px -8px rgba(43, 68, 231, 0.16)'
                    : '0 4px 16px rgba(0, 0, 0, 0.03)',
                  padding: '32px 26px',
                  minHeight: '520px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* 1. Header Row: Name + Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {plan.name}
                  </span>

                  {plan.badge && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#eff6ff',
                        color: 'var(--color-brand-primary)',
                        border: '1px solid rgba(43, 68, 231, 0.2)',
                      }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* 2. Headline Hook */}
                <h3
                  style={{
                    fontSize: '21px',
                    fontWeight: 800,
                    color: 'var(--color-text-main)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    marginBottom: '6px',
                  }}
                >
                  {plan.headline}
                </h3>

                {/* 3. Description */}
                <p
                  style={{
                    fontSize: '13px',
                    color: '#64748b',
                    lineHeight: 1.45,
                    marginBottom: '18px',
                    minHeight: '38px',
                  }}
                >
                  {plan.description}
                </p>

                {/* 4. Full-Width CTA Button */}
                <button
                  type="button"
                  onClick={onOpenTrial}
                  style={{
                    width: '100%',
                    padding: '11px 20px',
                    borderRadius: '9999px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    border: 'none',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.18s ease',
                    backgroundColor: isRec ? 'var(--color-brand-primary)' : '#0f172a',
                    color: '#ffffff',
                    boxShadow: isRec
                      ? '0 4px 14px rgba(43, 68, 231, 0.3)'
                      : '0 2px 8px rgba(15, 23, 42, 0.12)',
                  }}
                  className="btn-shine"
                >
                  {isRec && <Sparkles size={14} />}
                  <span>{plan.buttonLabel}</span>
                  {!isRec && <ArrowRight size={14} />}
                </button>

                {/* 5. Price Display */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '6px',
                    marginTop: '20px',
                    marginBottom: '20px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <span
                    style={{
                      fontSize: '30px',
                      fontWeight: 800,
                      color: 'var(--color-text-main)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#64748b',
                    }}
                  >
                    {plan.priceSub}
                  </span>
                </div>

                {/* 6. Feature List (5 Items) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '13px',
                    flexGrow: 1,
                  }}
                >
                  {plan.features.map((item, idx) => {
                    const IconComponent = item.icon;

                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '11px',
                        }}
                      >
                        <div
                          style={{
                            flexShrink: 0,
                            marginTop: '2px',
                            color: isRec ? 'var(--color-brand-primary)' : '#64748b',
                          }}
                        >
                          <IconComponent size={15} />
                        </div>
                        <span
                          style={{
                            fontSize: '13px',
                            lineHeight: 1.4,
                            color: '#334155',
                            fontWeight: 500,
                          }}
                        >
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
