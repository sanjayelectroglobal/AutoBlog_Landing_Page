# AutoBlog — Brand Guidelines & Design System

> **Single Source of Truth** for AutoBlog's Visual Identity, Theme Tokens, and Component Design.  
> *Last Updated: October 2026* • *Version: 2.0*

---

## 1. Brand Identity & Purpose

**AutoBlog** is an autonomous AI blog automation and programmatic SEO engine. It enables fast-growing brands, e-commerce stores, and digital publishers to turn keyword discovery and product catalogs into high-ranking, structured, and search-optimized blog articles published directly into their CMS on complete autopilot.

- **Brand Tone**: Modern, high-performance, intelligent, trustworthy, and precise.
- **Visual Vibe**: Clean editorial layout infused with tech-forward kinetic accents, inspired by top-tier modern agencies (like Momentum) but strictly anchored in AutoBlog’s signature **Electric Royal Blue** visual identity.

---

## 2. Logo & Mark Specifications

The official AutoBlog brand mark consists of:
1. **The Dynamic Logomark**: A document glyph featuring dynamic speed lines on the left and an autonomous automation cog on the lower right corner.
2. **The Wordmark**: "AutoBlog" rendered in clean, italicized geometric typography with high contrast.
3. **Asset Location**: `/images/autoblog-official-logo.jpg`.

### Logo Usage Rules
- **Minimum Clear Space**: Maintain at least `16px` of padding around the mark.
- **Background**: Displays best on clean white (`#ffffff`), whisper-slate (`#f8fafc`), or deep slate navy (`#0a192f`).
- **Forbidden**: Do not distort aspect ratio, recolor the document mark to unrelated greens or pinks, or separate the speed cog from the mark.

---

## 3. Centralized Color Palette

All color values are centralized as CSS custom properties in `:root` inside `src/app/globals.css`. These tokens are designed to be dynamically customized from an administrative control panel without needing code redeployment.

### Primary Brand Palette (Derived from the Official AutoBlog Logo)

| Token Name | Hex Code | RGB | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `--color-brand-primary` | `#2b44e7` | `rgb(43, 68, 231)` | Core brand blue (AutoBlog logo dominant color). Main CTAs, active highlights, key brand accents. |
| `--color-brand-primary-hover`| `#1e35c8` | `rgb(30, 53, 200)` | Darker blue for button and link hover states. |
| `--color-brand-primary-light`| `#eef2ff` | `rgb(238, 242, 255)`| Soft tinted badge and icon background surface. |
| `--color-brand-primary-glow` | `rgba(43, 68, 231, 0.22)` | - | Soft luminescent dropshadows on hero elements and active buttons. |

### Secondary Accents & Kinetic Highlights

| Token Name | Hex Code | RGB | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `--color-accent-cyan` | `#06b6d4` | `rgb(6, 182, 212)` | Electric Cyan for gradient sweeps, growth badges, and search indicators. |
| `--color-accent-sky` | `#0ea5e9` | `rgb(14, 165, 233)` | Secondary sky blue for tags and feature cards. |
| `--color-accent-violet` | `#6366f1` | `rgb(99, 102, 241)`| AI Magic drafting features, topical cluster tags, and sparkle accents. |
| `--color-status-success` | `#10b981` | `rgb(16, 185, 129)`| Live automation indicators, scheduled cron status, active CMS sync. |
| `--color-status-warning` | `#f59e0b` | `rgb(245, 158, 11)`| Keyword difficulty alerts, draft review markers. |

### Surface, Typography & Neutral Scale

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `--color-bg-base` | `#ffffff` | Primary section background, crisp white card surfaces. |
| `--color-bg-subtle` | `#f8fafc` | Alternating section background, subtle pill chip bases. |
| `--color-bg-card` | `#ffffff` | Card surfaces with subtle border and elevation. |
| `--color-text-main` | `#0a192f` | High-contrast deep slate navy for primary headlines and titles. |
| `--color-text-body` | `#475569` | Mid-slate for readable body paragraphs and narrative descriptions. |
| `--color-text-muted`| `#94a3b8` | Muted slate for secondary labels, metadata, and timestamps. |
| `--color-border-subtle` | `#f1f5f9` | Dividers and gentle card separators. |
| `--color-border-light` | `#e2e8f0` | Standard card and input outline borders. |
| `--color-border-hover` | `#cbd5e1` | Interactive borders on card hover and focus states. |

---

## 4. Typography System

AutoBlog utilizes a dual-tier Google Fonts typographic scale:
- **Display & Headings**: `Plus Jakarta Sans` (weights: 700, 800) with tight geometric letter-spacing (`-0.03em` to `-0.05em`) for modern editorial authority.
- **Body & Interface**: `Inter` (weights: 400, 500, 600) for crystal-clear readability across all device viewports.

### Scale Hierarchy
- **Hero Title**: `clamp(40px, 5.5vw, 68px)`, leading `1.08`, tracking `-0.04em`.
- **Section Heading (H2)**: `clamp(30px, 4vw, 48px)`, leading `1.15`, tracking `-0.035em`.
- **Card Heading (H3)**: `20px` to `24px`, leading `1.25`, tracking `-0.025em`.
- **Lead Paragraph**: `18px` (`1.125rem`), line-height `1.85`.
- **Body Regular**: `15px` (`0.9375rem`), line-height `1.7`.
- **Meta / Pills**: `11px` - `12px`, uppercase font weight 800, tracking `0.06em`.

---

## 5. Spacing, Geometry & Shadows

### Border Radii
- Small Elements (Chips/Pills): `999px` (fully rounded)
- Buttons & Inputs: `12px` to `14px`
- Cards & Feature Blocks: `20px` to `24px`
- Device Mockup Frames & Bento Containers: `24px` to `28px`

### Elevation & Shadows
- `--shadow-card`: `0 4px 20px -2px rgba(10, 25, 47, 0.05), 0 2px 6px -1px rgba(10, 25, 47, 0.03)`
- `--shadow-card-hover`: `0 20px 35px -5px rgba(43, 68, 231, 0.10), 0 10px 15px -3px rgba(10, 25, 47, 0.04)`
- `--shadow-brand-glow`: `0 8px 30px rgba(43, 68, 231, 0.28)`

---

## 6. Motion & Kinetic Polish (Momentum-Inspired)

To achieve the modern, high-converting energy seen on platforms like Momentum without visual clutter:

1. **Animated Gradient Underline (`.heading-underline-brand`)**:
   - Sweeps smoothly under key headline phrases using keyframe `paintStroke` (`#2b44e7` to `#06b6d4`).
   - Followed by subtle ongoing glow pulsing (`glowPulseBrand`).
2. **Smooth Bobbing Micro-Badges (`.badge-bob`)**:
   - Floating metric tags and status chips gently float up and down (`translateY(-6px)` over `3s ease-in-out infinite`).
3. **Video Stage Pulse Glow (`.video-play-pulse`)**:
   - Concentric expanding rings on the video play button inviting user interaction.
4. **Button Shimmer Sweep (`.btn-shine`)**:
   - Sliding diagonal light sheen across primary buttons on hover (`transform: translateX(100%)`).
5. **Continuous Horizontal Automation Reel (`.engine-reel-track`)**:
   - 8-stage continuous conveyor showing Keyword Intelligence, Drafting, SEO Scoring, Multi-CMS Publishing, Topical Silos, Cron Scheduler, Catalog Sync, and Media Generation. Pauses on hover.
6. **Continuous Infinite Marquee (`.brand-marquee-track`)**:
   - Seamless horizontal ticker of brands and publishing platforms.

---

## 7. First Section / Hero Layout Standard

Per explicit product requirement:
- **Left Column**: Dedicated **Interactive Video Showcase Stage** with 16:9 responsive frame, custom video player preview, floating kinetic status badges, and 1-click video modal walkthrough.
- **Right Column**: Hero copy, category tag, headline with animated gradient underline, value proposition narrative, dual call-to-action buttons, and trust metrics.

---

## 8. Admin Panel Dynamic Theming Map

When admin theme overrides are sent from the backend or settings dashboard, the following CSS custom properties can be updated via JavaScript on `document.documentElement.style.setProperty(...)`:

```typescript
// Example Admin Panel Dynamic Theme Application
const applyAdminTheme = (theme: {
  primaryColor: string;
  accentColor: string;
  headlineFont: string;
  borderRadius: string;
}) => {
  const root = document.documentElement;
  root.style.setProperty('--color-brand-primary', theme.primaryColor);
  root.style.setProperty('--color-accent-cyan', theme.accentColor);
  root.style.setProperty('--font-heading', theme.headlineFont);
  root.style.setProperty('--radius-card', theme.borderRadius);
};
```

---

## 9. Sticky Stacking Cards Pattern (Editz-Inspired)

Applied across both `AdvertisementCards` (Video Ads) and `ReviewCards` (Customer Proof):
- **Stacking Physics**: `position: sticky` with top offsets (`top: 90px`, `112px`, `134px`, `156px`). As users scroll, cards dock sequentially into an organic physical card deck.
- **Micro-Rotation**: Subtle organic tilt angles (`rotate(1.5deg)`, `rotate(-1.5deg)`, `rotate(1.2deg)`, `rotate(-1deg)`). Straightens to `0deg` with elevated drop-shadow on hover.
- **Left Accent Pill**: Thick `6px solid <accent>` border matching the card's category theme (`#E32759`, `#9333ea`, `#2b44e7`, `#16a34a`).
- **40% / 60% Split Standard**:
  - **40% Left Column**: Dedicated visual canvas (video player HUD with soundwave bars or customer portrait photo stage).
  - **60% Right Column**: Structured copy (step number `01`, `02`, `03`, `04`, pill badge, headline quote, body explanation, 2 verified outcome bullet points, and action CTA).
- **Compact Vertical Profile**: Card inner padding `16px–24px`, widescreen `16:9.5` media aspect ratio, concise typography to guarantee clean viewport fit on 13"–15" laptop screens.

---

## 10. Device Mockup & Screenshot Chrome Standards

To ensure a clean, distraction-free software showcase:
- **Browser Window Chrome**: Clean minimalist macOS/desktop titlebar with 3 window control dots (`#ef4444`, `#eab308`, `#22c55e`).
- **No Raw URL Strings**: Never display awkward browser URL links like `https://autoblog.io/...` in screenshot headers. Instead, display clean software view titles (e.g. `AutoBlog Intelligence • Keyword Research`, `AutoBlog Pipeline • Topical Clusters`, `AutoBlog Integrations • Universal CMS Hub`).
- **Interactive Lightbox Inspection**: All high-resolution screenshots feature pointer cursor and 1-click modal zoom inspection via `LightboxModal`.

