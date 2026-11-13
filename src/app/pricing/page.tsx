'use client';

import React, { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import PricingCards from '../../components/landing/PricingCards';
import ReviewCards from '../../components/landing/ReviewCards';
import CtaSection from '../../components/landing/CtaSection';
import Footer from '../../components/landing/Footer';
import { LightboxModal, TrialModal, VideoModal } from '../../components/landing/Modals';

export default function PricingPage() {
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
        <PricingCards onOpenTrial={() => setTrialModalOpen(true)} />
        <ReviewCards />
        <CtaSection onOpenTrial={() => setTrialModalOpen(true)} />
      </main>

      <Footer />

      <LightboxModal imageSrc={lightboxImage} onClose={() => setLightboxImage(null)} />
      <TrialModal isOpen={trialModalOpen} onClose={() => setTrialModalOpen(false)} />
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
}

