'use client';

/**
 * =====================================================================================
 * HIGH-IMPACT NUMERICAL STATS BANNER WITH RE-TRIGGERABLE 3s COUNT-UP ANIMATION
 * =====================================================================================
 * 
 * 10-YEAR ARCHITECTURAL PURPOSE & DESIGN RATIONALE:
 * -------------------------------------------------------------------------------------
 * 1. Social Proof & Quantitative Authority:
 *    Showcases the 3 foundational platform metrics of AutoBlog:
 *    - Metric 1: `+15k` Keywords monitored (Search intelligence scale)
 *    - Metric 2: `96/100` Average SEO health score (Content optimization rigor)
 *    - Metric 3: `+380%` Compounding organic traffic (Real business outcome)
 * 
 * 2. Re-triggerable Viewport-Driven Counting Animation:
 *    - Triggers EVERY TIME this section enters the user's visible viewport.
 *    - Whenever the user scrolls away from this section, the metrics cleanly reset to 0
 *      and any ongoing animation frame is safely cancelled.
 *    - Whenever the user navigates or scrolls back to this section:
 *        * Metric 1 resets to `+0k`   and smoothly counts up to `+15k`
 *        * Metric 2 resets to `0/100`  and smoothly counts up to `96/100`
 *        * Metric 3 resets to `+0%`   and smoothly counts up to `+380%`
 *    - Synchronized Progress Meters: Underline bars smoothly grow from `0%` to their
 *      respective target widths (`82%`, `96%`, `88%`).
 *    - Duration: Exactly 3,000ms (~3 seconds per specification).
 *    - After reaching the final values, they stop and remain locked in place until the
 *      section exits the viewport again.
 *    - Fully compatible with SPA route navigation without requiring page reloads.
 * 
 * 3. Strict Layout & Design Preservation:
 *    - Preserves existing fonts (`var(--font-heading)`), font sizes (`clamp(46px, 5vw, 64px)`),
 *      font weight (800), card dimensions, container padding, borders, and brand colors.
 */

import React, { useState, useEffect, useRef } from 'react';

// Total animation duration in milliseconds (~3 seconds)
const COUNT_ANIMATION_DURATION_MS = 3000;

// Final target numeric values to count toward
const TARGET_KEYWORDS = 15;   // Target for +15k
const TARGET_SEO_SCORE = 96;  // Target for 96/100
const TARGET_TRAFFIC = 380;   // Target for +380%

// Final target progress bar widths (%)
const TARGET_BAR_KEYWORDS = 82;
const TARGET_BAR_SEO_SCORE = 96;
const TARGET_BAR_TRAFFIC = 88;

/**
 * CUBIC EASE-OUT MATHEMATICAL FUNCTION:
 * @param t - Normalized linear time elapsed between 0.0 (start) and 1.0 (completion)
 * @returns Eased progress value between 0.0 and 1.0
 * 
 * Generates an energetic initial burst that decelerates into the final numbers,
 * providing a tactile, high-polish counting feel that is comfortable to read.
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function ImpactStats() {
  /**
   * DOM REFERENCE:
   * Attached to root `<section>` to monitor continuous viewport entry/exit events.
   */
  const sectionRef = useRef<HTMLElement | null>(null);

  /**
   * ANIMATION FRAME HANDLE REFERENCE:
   * Tracks active rAF ID so it can be cleanly cancelled when the user scrolls away
   * or when the component unmounts.
   */
  const animationFrameIdRef = useRef<number | null>(null);

  /**
   * VIEWPORT STATE REF:
   * Tracks whether the section is currently visible inside the viewport.
   * Using a ref avoids triggering extra React re-renders upon scrolling.
   */
  const isInViewRef = useRef<boolean>(false);

  /**
   * LIVE NUMERIC DISPLAY STATES:
   * Initialized to 0 values, updated on every animation frame until reaching final strings.
   */
  const [keywordsDisplay, setKeywordsDisplay] = useState<string>('+0k');
  const [seoScoreDisplay, setSeoScoreDisplay] = useState<string>('0/100');
  const [trafficDisplay, setTrafficDisplay] = useState<string>('+0%');

  /**
   * LIVE PROGRESS BAR WIDTH STATES:
   * Initialized to 0%, expanding smoothly in synchronization with the number counters.
   */
  const [keywordsBarWidth, setKeywordsBarWidth] = useState<string>('0%');
  const [seoScoreBarWidth, setSeoScoreBarWidth] = useState<string>('0%');
  const [trafficBarWidth, setTrafficBarWidth] = useState<string>('0%');

  /**
   * RESET METRICS TO ZERO:
   * Invoked whenever the section scrolls completely out of view.
   */
  const resetToZero = () => {
    // Cancel any active animation frame in flight
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    // Reset numbers back to zero
    setKeywordsDisplay('+0k');
    setKeywordsBarWidth('0%');

    setSeoScoreDisplay('0/100');
    setSeoScoreBarWidth('0%');

    setTrafficDisplay('+0%');
    setTrafficBarWidth('0%');
  };

  /**
   * START 3-SECOND COUNT-UP ANIMATION:
   * Smoothly animates numbers from 0 to their targets over 3 seconds using cubic ease-out.
   */
  const startCounting = () => {
    // Clean up any lingering frame
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    // Explicitly initialize state at 0 before starting count-up
    setKeywordsDisplay('+0k');
    setKeywordsBarWidth('0%');
    setSeoScoreDisplay('0/100');
    setSeoScoreBarWidth('0%');
    setTrafficDisplay('+0%');
    setTrafficBarWidth('0%');

    let startTime: number | null = null;

    const tick = (now: number) => {
      // Establish baseline timestamp on first frame
      if (startTime === null) {
        startTime = now;
      }

      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / COUNT_ANIMATION_DURATION_MS, 1);
      const easedProgress = easeOutCubic(rawProgress);

      if (rawProgress < 1) {
        // 1. Metric 1: Keyword count (+0k -> +15k)
        const currentKeywords = Math.round(easedProgress * TARGET_KEYWORDS);
        setKeywordsDisplay(`+${currentKeywords}k`);
        setKeywordsBarWidth(`${(easedProgress * TARGET_BAR_KEYWORDS).toFixed(1)}%`);

        // 2. Metric 2: SEO score (0/100 -> 96/100)
        const currentScore = Math.round(easedProgress * TARGET_SEO_SCORE);
        setSeoScoreDisplay(`${currentScore}/100`);
        setSeoScoreBarWidth(`${(easedProgress * TARGET_BAR_SEO_SCORE).toFixed(1)}%`);

        // 3. Metric 3: Organic traffic (+0% -> +380%)
        const currentTraffic = Math.round(easedProgress * TARGET_TRAFFIC);
        setTrafficDisplay(`+${currentTraffic}%`);
        setTrafficBarWidth(`${(easedProgress * TARGET_BAR_TRAFFIC).toFixed(1)}%`);

        // Schedule next animation frame
        animationFrameIdRef.current = requestAnimationFrame(tick);
      } else {
        // Animation finished: firmly lock into exact final target strings and stop
        setKeywordsDisplay(`+${TARGET_KEYWORDS}k`);
        setKeywordsBarWidth(`${TARGET_BAR_KEYWORDS}%`);

        setSeoScoreDisplay(`${TARGET_SEO_SCORE}/100`);
        setSeoScoreBarWidth(`${TARGET_BAR_SEO_SCORE}%`);

        setTrafficDisplay(`+${TARGET_TRAFFIC}%`);
        setTrafficBarWidth(`${TARGET_BAR_TRAFFIC}%`);

        animationFrameIdRef.current = null;
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(tick);
  };

  /**
   * CONTINUOUS VIEWPORT OBSERVER LIFECYCLE:
   * - Fires whenever the user scrolls into view (entry.isIntersecting: true) -> runs count-up.
   * - Fires whenever the user scrolls away (entry.isIntersecting: false) -> resets to zero.
   * - Guarantees re-triggering every time the section comes into view, without page reload.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const target = sectionRef.current;
    if (!target) return;

    // Feature detection for IntersectionObserver
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (entry.isIntersecting) {
            // Section has entered the viewport
            if (!isInViewRef.current) {
              isInViewRef.current = true;
              startCounting();
            }
          } else {
            // Section has scrolled out of view -> reset to 0 so it can re-animate on return
            if (isInViewRef.current) {
              isInViewRef.current = false;
              resetToZero();
            }
          }
        },
        {
          threshold: 0.15, // Triggers when 15% of the card is visible in the viewport
        }
      );

      observer.observe(target);

      return () => {
        observer.disconnect();
        if (animationFrameIdRef.current !== null) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
      };
    } else {
      // Fallback for environments without IntersectionObserver
      startCounting();

      return () => {
        if (animationFrameIdRef.current !== null) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
      };
    }
  }, []);

  /**
   * STATIC CARD METADATA:
   * Colors, labels, and background tokens strictly preserved.
   */
  const statCardsConfig = [
    {
      value: keywordsDisplay,
      label: 'Keywords monitored',
      color: '#6366f1', // Violet glow
      barColor: '#818cf8',
      barBg: '#e0e7ff',
      progressWidth: keywordsBarWidth,
    },
    {
      value: seoScoreDisplay,
      label: 'Average SEO health score',
      color: 'var(--color-brand-primary)', // Royal blue
      barColor: 'var(--color-brand-primary)',
      barBg: 'var(--color-brand-primary-light)',
      progressWidth: seoScoreBarWidth,
    },
    {
      value: trafficDisplay,
      label: 'Compounding organic traffic',
      color: 'var(--color-accent-cyan)', // Cyan teal
      barColor: 'var(--color-accent-cyan)',
      barBg: '#cffafe',
      progressWidth: trafficBarWidth,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="impact-stats"
      style={{
        backgroundColor: '#f3f4f6',
        padding: 'clamp(56px, 7vw, 84px) 0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Main Stat Card Elevated Frame (Layout, padding, and drop shadow strictly preserved) */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: '#ffffff',
            padding: 'clamp(36px, 5vw, 56px) clamp(24px, 4vw, 48px)',
            boxShadow: '0 20px 50px rgba(10, 25, 47, 0.06)',
            border: '1px solid var(--color-border-light)',
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0.8) 0%, transparent 100%)',
            }}
          />

          {/* 3-Column Responsive Grid */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(32px, 4vw, 48px)',
              alignItems: 'center',
            }}
          >
            {statCardsConfig.map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Metric Display Row: Animated Number + Accompanying Label */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px' }}>
                  {/* Animated Large Counter Number */}
                  <span
                    style={{
                      fontSize: 'clamp(46px, 5vw, 64px)',
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: '-0.05em',
                      color: stat.color,
                      fontFamily: 'var(--font-heading)',
                      fontVariantNumeric: 'tabular-nums', // Keeps width stable while numbers tick upward
                      minWidth: 'clamp(140px, 14vw, 210px)',
                    }}
                  >
                    {stat.value}
                  </span>

                  {/* Accompanying Descriptive Label */}
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--color-text-body)',
                      lineHeight: 1.35,
                      paddingBottom: '4px',
                      maxWidth: '150px',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>

                {/* Progress Bar Meter (Expands smoothly in synchronization with count) */}
                <div
                  style={{
                    marginTop: '18px',
                    height: '9px',
                    width: '100%',
                    maxWidth: '240px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: stat.barBg,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: stat.progressWidth,
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: stat.barColor,
                      transition: 'width 0.05s linear',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
