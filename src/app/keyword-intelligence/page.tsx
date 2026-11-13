'use client';

import React, { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import WhyAutoBlog from '../../components/landing/WhyAutoBlog';
import FeatureSpotlights from '../../components/landing/FeatureSpotlights';
import PricingCards from '../../components/landing/PricingCards';
import Footer from '../../components/landing/Footer';
import { LightboxModal, TrialModal, VideoModal } from '../../components/landing/Modals';

export default function KeywordIntelligencePage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [trialModalOpen, setTrialModalOpen] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-base)',
        minHeight: '100vh',
        color: 'var(--color-text-main)',
        fontFamily: 'var(--font-sans)',
        position: 'relative',
        overflowX: 'clip',
      }}
    >
      <Navbar onOpenTrial={() => setTrialModalOpen(true)} />

      <main style={{ paddingTop: '20px' }}>
        <WhyAutoBlog onOpenLightbox={(src) => setLightboxImage(src)} />
        <FeatureSpotlights onOpenLightbox={(src) => setLightboxImage(src)} />
        <PricingCards onOpenTrial={() => setTrialModalOpen(true)} />
      </main>

      <Footer />

      <LightboxModal imageSrc={lightboxImage} onClose={() => setLightboxImage(null)} />
      <TrialModal isOpen={trialModalOpen} onClose={() => setTrialModalOpen(false)} />
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
}

