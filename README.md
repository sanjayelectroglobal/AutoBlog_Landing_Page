# AutoBlog — Autonomous AI Blog Automation & Programmatic SEO Engine

> High-converting, production-ready landing page for **AutoBlog**, built with Next.js 14, React, TypeScript, and modern CSS design tokens.

---

## 🚀 Overview

AutoBlog turns search intent and product catalogs into compounding organic rankings on autopilot. This repository contains the complete frontend landing experience featuring:

- **Minimalist Two-Sided Header**: Brand identity on the left, streamlined navigation anchors, and a styled pill CTA on the right.
- **Hero Showcase**: 60% high-definition video player paired with a 40% synchronized interactive feature stepper.
- **Brand Marquee**: Infinite smooth scrolling ticker showcasing verified client partner logos.
- **Capabilities Matrix ("Why AutoBlog?")**: 8-card differentiation grid with pastel decorative doodles articulating core technical advantages.
- **Universal CMS Integrations**: Live sync proofs for WordPress, Shopify, and Webflow.
- **Feature Spotlights**: Deep dives into Keyword Intelligence, Topical Bubble Clusters, and Universal CMS Publishing.
- **3-Tier Pricing Grid**: ChatGPT-styled transparent paid plans (**Starter**, **Pro**, **Enterprise**) with zero free-tier compromises.
- **Impact Stats**: Animated numerical milestone meters (+15k keywords monitored, 96/100 average SEO score, +380% traffic).
- **Video Case Reviews**: Real client video testimonials (RevDex, MyRupaya, JalVyu, Poodles) with measured organic search growth.
- **Contact Form & Funnel**: Interactive inquiry form capturing Name, Email, Mobile, CMS / Store URL, and requirements.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with comprehensive CSS custom properties (`globals.css`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Media**: Self-hosted optimized MP4 video assets & WebP/PNG graphics

---

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sanjayelectroglobal/AutoBlog_Landing_Page.git

# Navigate into the project directory
cd AutoBlog_Landing_Page

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the local Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

---

## 📁 Project Architecture

```
├── public/
│   ├── images/          # Platform screenshots, client logos & avatars
│   ├── logos/           # Partner and integration brand marks
│   └── videos/          # Video demonstration and client case studies
├── src/
│   ├── app/
│   │   ├── globals.css  # Global design system tokens, typography & animations
│   │   ├── layout.tsx   # Root HTML shell & SEO meta configuration
│   │   └── page.tsx     # Main landing page orchestrator & modal state
│   └── components/
│       └── landing/     # Modular section components
│           ├── BrandMarquee.tsx
│           ├── CtaSection.tsx
│           ├── FeatureSpotlights.tsx
│           ├── Footer.tsx
│           ├── HeroSection.tsx
│           ├── ImpactStats.tsx
│           ├── IntegrationsSpotlight.tsx
│           ├── Modals.tsx
│           ├── Navbar.tsx
│           ├── PricingCards.tsx
│           ├── ReviewCards.tsx
│           └── WhyAutoBlog.tsx
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 License

Proprietary © 2026 AutoBlog. All rights reserved.
