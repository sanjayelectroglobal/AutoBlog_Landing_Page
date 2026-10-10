'use client';

/**
 * =====================================================================================
 * AUTOBLOG LANDING PAGE — ROOT CONTROLLER & EXPERIENCE ORCHESTRATOR
 * =====================================================================================
 * 
 * ARCHITECTURAL ROLE:
 * -------------------------------------------------------------------------------------
 * This file serves as the singular entry point and layout orchestrator for the AutoBlog
 * landing experience. It manages:
 * 1. Narrative sequencing of all 10 marketing folds.
 * 2. Top-level modal state (Screenshot Lightbox, Free Trial Modal, Video Player).
 * 3. Cross-component event delegation and unified theme variable inheritance.
 * 
 * CHRONOLOGICAL VISUAL & CONVERSION JOURNEY:
 * -------------------------------------------------------------------------------------
 *  1. NAVBAR:
 *     Two-sided header: Brand logo on the left; navigation links (Editz, Showcase,
 *     Integration, Reviews, Pricing) and "Contact Us →" pill on the right.
 * 
 *  2. HERO SECTION:
 *     - Top Fold: Centered value proposition, dual CTA triggers ("Start 14-Day Free Trial",
 *       "Watch 2-Min Demo"), and 3 trust badges (no credit card, 60s setup, 99.4% accuracy).
 *     - Downside Stage: 60% high-definition interactive video showcase + 40% automated
 *       feature stepper with synchronized video switching.
 * 
 *  3. BRAND MARQUEE:
 *     Infinite horizontal ticker displaying verified enterprise customer brand logos.
 * 
 *  4. WHY AUTOBLOG? (Capabilities Matrix):
 *     Mommantum-inspired wavy doodles (≋) and an 8-card differentiation grid explaining
 *     autonomous keyword discovery, hallucination guards, topical silos, and publishing.
 * 
 *  5. 1-CLICK INTEGRATIONS SPOTLIGHT:
 *     Universal CMS connection ecosystem (WordPress, Shopify, Webflow) with visual
 *     publishing timeline indicators and live store sync proof.
 * 
 *  6. FEATURE SPOTLIGHTS ("Low Keyword Volume, High Opportunity, Strong Search Intent"):
 *     Deep-dive product showcases illustrating keyword opportunity scanners, semantic
 *     topical bubble clusters, and CMS connector workflows.
 * 
 *  7. PRICING CARDS:
 *     Directly beneath Feature Spotlights per user requirement. 3 ChatGPT-style paid tiers
 *     (Starter at ₹1,499, Pro at ₹4,999, and Enterprise at ₹14,999; no free tier).
 * 
 *  8. IMPACT STATS:
 *     Quantitative milestones (+15,000 keywords, 96/100 average SEO score, +380% organic
 *     traffic) equipped with animated gradient progress meters.
 * 
 *  9. REAL CUSTOMER REVIEWS:
 *     Video-backed client case studies (RevDex, MyRupaya, JalVyu, Poodles) with video
 *     previews, measurable growth percentages, and customer quotes.
 * 
 * 10. CLOSING CTA & CONTACT FORM:
 *     High-converting closing section with integrated inquiry form (Name, Email, Mobile,
 *     CMS / Store URL, Message) and risk-reversal guarantees.
 * 
 * 11. FOOTER:
 *     Comprehensive brand footer with documentation links, social icons, and copyright.
 * 
 * 12. CENTRALIZED MODALS:
 *     Root-mounted overlays (LightboxModal, TrialModal, VideoModal) preventing z-index
 *     stacking issues and ensuring keyboard accessibility (Escape key dismissal).
 */

import React, { useState } from 'react';

// =====================================================================================
// COMPONENT IMPORTS: Modular landing sections organized under src/components/landing/
// =====================================================================================
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import BrandMarquee from '../components/landing/BrandMarquee';
import WhyAutoBlog from '../components/landing/WhyAutoBlog';
import IntegrationsSpotlight from '../components/landing/IntegrationsSpotlight';
import FeatureSpotlights from '../components/landing/FeatureSpotlights';
import PricingCards from '../components/landing/PricingCards';
import ImpactStats from '../components/landing/ImpactStats';
import ReviewCards from '../components/landing/ReviewCards';
import CtaSection from '../components/landing/CtaSection';
import Footer from '../components/landing/Footer';
import { LightboxModal, TrialModal, VideoModal } from '../components/landing/Modals';

export default function AutoBlogLandingPage() {
  /**
   * LIGHTBOX MODAL STATE:
   * Holds the image URL string whenever a user clicks to inspect any software screenshot.
   * - When string: The fullscreen lightbox overlay renders with the target image.
   * - When null: The modal is completely unmounted from the active viewport.
   */
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  /**
   * FREE TRIAL ONBOARDING MODAL STATE:
   * Manages the visibility of the 14-day free trial registration dialog.
   * Triggered by Navbar, Hero Section, Pricing Cards, and the closing CTA.
   */
  const [trialModalOpen, setTrialModalOpen] = useState<boolean>(false);

  /**
   * INTERACTIVE VIDEO DEMO MODAL STATE:
   * Manages the fullscreen high-resolution product demo video player dialog.
   * Triggered by the Hero Section "Watch Demo" button.
   */
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  /**
   * HANDLER: Open screenshot inspection modal with the selected asset path.
   * @param src - Relative or absolute path to the target image (e.g. '/images/sc-dashboard.png')
   */
  const handleOpenLightbox = (src: string) => {
    setLightboxImage(src);
  };

  /**
   * HANDLER: Close the screenshot inspection modal and restore scroll.
   */
  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  /**
   * HANDLER: Open the 14-day free trial registration modal.
   */
  const handleOpenTrial = () => {
    setTrialModalOpen(true);
  };

  /**
   * HANDLER: Close the free trial registration modal.
   */
  const handleCloseTrial = () => {
    setTrialModalOpen(false);
  };

  /**
   * HANDLER: Open the fullscreen video walkthrough modal.
   */
  const handleOpenVideo = () => {
    setVideoModalOpen(true);
  };

  /**
   * HANDLER: Close the fullscreen video walkthrough modal and pause playback.
   */
  const handleCloseVideo = () => {
    setVideoModalOpen(false);
  };

  return (
    <div
      style={{
        // Uses centralized design system tokens from globals.css
        backgroundColor: 'var(--color-bg-base)',
        minHeight: '100vh',
        color: 'var(--color-text-main)',
        fontFamily: 'var(--font-sans)',
        // Ensures smooth relative stacking context for sticky elements and modal overlays
        position: 'relative',
        overflowX: 'clip',
      }}
    >
      {/* =======================================================================
          SECTION 1: GLOBAL BRAND NAVBAR
          Sticky header containing the official AutoBlog logo, navigation links,
          and "Contact Us →" pill button.
          ======================================================================= */}
      <Navbar onOpenTrial={handleOpenTrial} />

      {/* =======================================================================
          SECTION 2: HERO SECTION (TOP FOLD + DOWNSIDE INTERACTIVE STAGE)
          - Top Fold: Centered headline, value pitch, dual CTA buttons, trust badges.
          - Downside Stage: 60% interactive video player + 40% feature stepper.
          ======================================================================= */}
      <HeroSection
        onOpenTrial={handleOpenTrial}
        onPlayVideo={handleOpenVideo}
      />

      {/* =======================================================================
          SECTION 3: "BRANDS WE HELP GROW" BRAND MARQUEE
          Continuous infinite horizontal ticker displaying verified client brand logos.
          ======================================================================= */}
      <BrandMarquee />

      {/* =======================================================================
          SECTION 4: "WHY AUTOBLOG?" CAPABILITIES & DIFFERENTIATION MATRIX
          Features Mommantum-style pastel wavy doodles (≋) and an 8-card capability
          grid articulating the core technical advantages of automated SEO.
          ======================================================================= */}
      <WhyAutoBlog onOpenLightbox={handleOpenLightbox} />

      {/* =======================================================================
          SECTION 5: 1-CLICK PUBLISHING ECOSYSTEM (UNIVERSAL CMS & STOREFRONT HUB)
          Demonstrates automated direct publishing into WordPress, Shopify, and Webflow.
          ======================================================================= */}
      <IntegrationsSpotlight onOpenLightbox={handleOpenLightbox} />

      {/* =======================================================================
          SECTION 6: DEEP-DIVE FEATURE SPOTLIGHTS
          "Low Keyword Volume, High Opportunity, Strong Search Intent."
          Features detailed technical breakdowns with software previews.
          ======================================================================= */}
      <FeatureSpotlights onOpenLightbox={handleOpenLightbox} />

      {/* =======================================================================
          SECTION 7: 3-TIER PRICING CARDS (No Free Tier, ChatGPT Style)
          Positioned directly beneath "Low Keyword Volume..." per user instruction.
          Features Starter (₹1,499), Pro (₹4,999), and Enterprise (₹14,999) tiers.
          ======================================================================= */}
      <PricingCards onOpenTrial={handleOpenTrial} />

      {/* =======================================================================
          SECTION 8: HIGH-IMPACT NUMERICAL STATS BANNER
          Displays quantitative milestones (+15k keywords, 96/100 average SEO score,
          +380% organic traffic) equipped with animated colored progress meters.
          ======================================================================= */}
      <ImpactStats />

      {/* =======================================================================
          SECTION 9: DOWNSIDE SOCIAL PROOF — REAL CUSTOMER REVIEW CARDS
          Features video-backed customer proof cards pairing verified case videos
          with measurable organic search growth metrics and testimonial quotes.
          ======================================================================= */}
      <ReviewCards />

      {/* =======================================================================
          SECTION 10: CLOSING CALL TO ACTION & CONTACT FORM
          Closing conversion section featuring an integrated inquiry contact form
          (Name, Email, Mobile, Store URL, Message) and risk-reversal guarantees.
          ======================================================================= */}
      <CtaSection onOpenTrial={handleOpenTrial} />

      {/* =======================================================================
          SECTION 11: GLOBAL BRAND FOOTER
          Contains navigation index, documentation links, social icons, and copyright.
          ======================================================================= */}
      <Footer />

      {/* =======================================================================
          COORDINATED MODAL DIALOG OVERLAYS
          Centrally managed modals mounted at root level to guarantee proper z-index
          hierarchy and avoid nested stacking context clipping issues.
          ======================================================================= */}

      {/* Fullscreen High-Resolution Screenshot Inspector Lightbox */}
      <LightboxModal
        imageSrc={lightboxImage}
        onClose={handleCloseLightbox}
      />

      {/* 14-Day Free Trial Onboarding Modal Dialog */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={handleCloseTrial}
      />

      {/* Interactive Product Walkthrough Video Player Modal Dialog */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={handleCloseVideo}
      />
    </div>
  );
}
