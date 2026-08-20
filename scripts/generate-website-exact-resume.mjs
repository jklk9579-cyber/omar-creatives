import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = edgePaths.find(p => fs.existsSync(p));
if (!browserPath) {
  console.error('No Chrome or Edge browser found!');
  process.exit(1);
}

// Helper to convert image to base64
function getBase64Image(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return '';
  const ext = path.extname(fullPath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

console.log('Loading all high-res project assets and mockups...');
const imgOmarHero = getBase64Image('public/images/omar-hero.png');
const imgDarrowMockup = getBase64Image('public/images/darrow/darrow-ai-hero-mockup.jpg');
const imgMathwaaMockup = getBase64Image('public/images/mathwaa/mathwaa-ai-hero-mockup.jpg');
const imgAiVideoCover = getBase64Image('public/images/ai-video/ai-cinematic-real-cover.jpg');
const imgArkanLogo = getBase64Image('public/images/logos/arkan-concept.png');
const imgDarrowLogo = getBase64Image('public/images/logos/darrow-logo.png');
const imgMathwaLogo = getBase64Image('public/images/logos/mathwa-logo.jpg');
const imgSouqoomLogo = getBase64Image('public/images/logos/souqoom.png');
const imgKalista = getBase64Image('public/images/scocial-media-designs/The-Shirt-Set-Kalista.jpeg');
const imgFalez = getBase64Image('public/images/scocial-media-designs/2-Falez-Product-Showcase-Social-Media-Design.jpg');
const imgTaraf = getBase64Image('public/images/scocial-media-designs/taraf-work-screen.jpeg');

console.log('Crafting exact Website-Themed A4 Executive Resume...');

const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Omar Abdelfattah - Executive Portfolio Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    :root {
      --bg-primary: #050505;
      --bg-secondary: #0a0a0a;
      --bg-card: rgba(18, 20, 29, 0.85);
      --text-primary: #ffffff;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --accent: #f59e0b;
      --accent-hover: #fbbf24;
      --accent-cyan: #38bdf8;
      --accent-gradient: linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%);
      --border-color: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(245, 158, 11, 0.35);
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg-primary);
      color: #e2e8f0;
      line-height: 1.35;
      font-size: 8pt;
      width: 210mm;
      margin: 0 auto;
    }
    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      padding: 8mm 10mm;
      position: relative;
      background-color: #050505;
      background-image: 
        radial-gradient(circle at 10% 10%, rgba(245, 158, 11, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(56, 189, 248, 0.06) 0%, transparent 40%),
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 24px 24px, 24px 24px;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .page:last-child {
      page-break-after: auto;
    }

    /* Top Glow Line */
    .page-header-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #f59e0b, #38bdf8, #f59e0b);
    }

    /* Nav Bar Style Header */
    .site-nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      background: rgba(10, 12, 20, 0.8);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .nav-logo {
      font-size: 11pt;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .nav-logo span {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nav-links {
      display: flex;
      gap: 12px;
      font-size: 7.2pt;
      font-weight: 600;
      color: #cbd5e1;
    }
    .nav-links span {
      color: #f59e0b;
    }
    .nav-cta-badge {
      background: var(--accent-gradient);
      color: #000;
      font-weight: 700;
      font-size: 7pt;
      padding: 3px 8px;
      border-radius: 6px;
      text-decoration: none;
    }

    /* Exact Hero Layout from Website */
    .hero-container {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 12px;
      background: rgba(15, 18, 30, 0.65);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 10px 14px;
      margin-bottom: 8px;
      position: relative;
      overflow: hidden;
    }
    .hero-container::before {
      content: "";
      position: absolute;
      top: -50px;
      right: -50px;
      width: 140px;
      height: 140px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 2px 8px;
      border-radius: 20px;
      font-size: 6.8pt;
      font-weight: 700;
      color: #fbbf24;
      margin-bottom: 4px;
    }
    .pulse-dot {
      width: 5px;
      height: 5px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 6px #10b981;
    }
    .hero-heading {
      font-size: 15pt;
      font-weight: 800;
      line-height: 1.15;
      color: #ffffff;
      margin-bottom: 3px;
    }
    .hero-heading .gradient {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-heading .outline-text {
      color: #38bdf8;
    }
    .hero-lead {
      font-size: 7.6pt;
      color: #cbd5e1;
      line-height: 1.35;
      margin-bottom: 6px;
    }
    .hero-contacts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px 10px;
      font-size: 7pt;
      color: #94a3b8;
    }
    .hero-contacts-grid strong {
      color: #e2e8f0;
    }
    .hero-contacts-grid a {
      color: #f59e0b;
      text-decoration: none;
    }

    /* Right Avatar Column with Glowing Badge & Quote */
    .hero-visual-side {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .avatar-ring {
      width: 82px;
      height: 82px;
      border-radius: 50%;
      padding: 3px;
      background: linear-gradient(135deg, #f59e0b, #38bdf8);
      box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
      margin-bottom: 6px;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      background: #0f1322;
    }
    .rating-badge {
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid var(--border-accent);
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 6.8pt;
      font-weight: 700;
      color: #fbbf24;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Trust Stats Ribbon (Exact Site Bar) */
    .trust-ribbon {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 6px 10px;
      margin-bottom: 8px;
      text-align: center;
    }
    .trust-metric {
      font-size: 11pt;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      color: #f59e0b;
      line-height: 1.1;
    }
    .trust-label {
      font-size: 6.5pt;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    /* Section Header with Dot */
    .sec-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 2px;
    }
    .sec-title {
      font-size: 8.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .sec-title::before {
      content: "";
      width: 4px;
      height: 11px;
      background: var(--accent);
      border-radius: 2px;
    }
    .sec-subtitle {
      font-size: 6.8pt;
      font-family: 'JetBrains Mono', monospace;
      color: #f59e0b;
    }

    /* 3 Services Pillars (Exact Site Cards) */
    .services-3col {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }
    .service-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--border-color);
      border-top: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 10px;
      padding: 7px 9px;
    }
    .service-icon-box {
      width: 22px;
      height: 22px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
      color: #f59e0b;
      font-weight: 800;
      font-size: 8pt;
    }
    .service-title {
      font-size: 8pt;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2px;
    }
    .service-desc {
      font-size: 6.8pt;
      color: #94a3b8;
      line-height: 1.35;
    }

    /* Production Projects Grid */
    .projects-duo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }
    .prod-card {
      background: rgba(15, 18, 30, 0.7);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .prod-img-box {
      width: 100%;
      height: 92px;
      background: #000;
      overflow: hidden;
      position: relative;
    }
    .prod-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .prod-content {
      padding: 7px 9px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .prod-title-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }
    .prod-name {
      font-size: 8.5pt;
      font-weight: 700;
      color: #ffffff;
    }
    .prod-role {
      font-size: 6.5pt;
      font-family: 'JetBrains Mono', monospace;
      color: #38bdf8;
      font-weight: 600;
    }
    .prod-desc {
      font-size: 7.1pt;
      color: #cbd5e1;
      line-height: 1.35;
      margin-bottom: 4px;
    }
    .prod-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
    }
    .pill {
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.25);
      color: #fbbf24;
      font-size: 6.2pt;
      font-family: 'JetBrains Mono', monospace;
      padding: 1px 4px;
      border-radius: 3px;
    }

    /* Page Footer */
    .page-footer {
      border-top: 1px solid var(--border-color);
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 6.8pt;
      color: #64748b;
      font-family: 'JetBrains Mono', monospace;
    }
    .page-footer a {
      color: #f59e0b;
      text-decoration: none;
    }

    /* Page 2 & 3 specifics */
    .ai-commercial-banner {
      display: grid;
      grid-template-columns: 125px 1fr;
      gap: 10px;
      background: rgba(15, 18, 30, 0.7);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .ai-img-box {
      width: 100%;
      height: 105px;
      background: #000;
    }
    .ai-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .ai-content {
      padding: 7px 10px 7px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .brand-logos-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-bottom: 8px;
    }
    .brand-logo-card {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 5px;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .brand-logo-card img {
      max-height: 32px;
      max-width: 85%;
      object-fit: contain;
      filter: drop-shadow(0 2px 5px rgba(0,0,0,0.6));
    }
    .brand-logo-card span {
      font-size: 6.2pt;
      font-weight: 600;
      color: #94a3b8;
      margin-top: 2px;
    }

    /* Creative Ads Cards */
    .ads-showcase-3col {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }
    .ad-card-item {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
    }
    .ad-card-item img {
      width: 100%;
      height: 82px;
      object-fit: cover;
      display: block;
    }
    .ad-card-details {
      padding: 4px 6px;
    }
    .ad-card-details h5 {
      font-size: 7.2pt;
      font-weight: 700;
      color: #fff;
    }
    .ad-card-details p {
      font-size: 6.5pt;
      color: #94a3b8;
    }

    /* Work Experience Timeline */
    .timeline-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 8px;
    }
    .timeline-card {
      background: rgba(15, 18, 30, 0.6);
      border: 1px solid var(--border-color);
      border-left: 3px solid #f59e0b;
      border-radius: 0 8px 8px 0;
      padding: 6px 9px;
    }
    .timeline-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .timeline-title {
      font-size: 8pt;
      font-weight: 700;
      color: #ffffff;
    }
    .timeline-period {
      font-size: 6.8pt;
      font-family: 'JetBrains Mono', monospace;
      color: #f59e0b;
      font-weight: 600;
    }
    .timeline-sub {
      font-size: 7.2pt;
      color: #38bdf8;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .timeline-bullets {
      padding-left: 10px;
    }
    .timeline-bullets li {
      font-size: 7pt;
      color: #cbd5e1;
      line-height: 1.35;
      margin-bottom: 1px;
    }

    /* Testimonials Box from Website */
    .testimonial-ribbon {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }
    .testi-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 6px 8px;
    }
    .testi-stars {
      color: #f59e0b;
      font-size: 6.5pt;
      margin-bottom: 2px;
    }
    .testi-quote {
      font-size: 6.8pt;
      color: #cbd5e1;
      font-style: italic;
      line-height: 1.3;
      margin-bottom: 3px;
    }
    .testi-author {
      font-size: 6.6pt;
      font-weight: 700;
      color: #fff;
    }
    .testi-role {
      font-size: 6pt;
      color: #94a3b8;
    }

    /* Bottom Big CTA Box */
    .cta-banner {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(56, 189, 248, 0.1));
      border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 8px;
      padding: 6px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: HERO, CAPABILITIES & PRODUCTION WEB PLATFORMS ==================== -->
  <div class="page">
    <div class="page-header-glow"></div>

    <!-- Top Site Navigation Header -->
    <div class="site-nav-header">
      <div class="nav-logo">
        <span>OMAR</span> CREATIVES
      </div>
      <div class="nav-links">
        <span>• EXPERTISE</span>
        <span>• PRODUCTION PLATFORMS</span>
        <span>• AI PIPELINES</span>
        <span>• BRAND IDENTITIES</span>
      </div>
      <div class="nav-cta-badge">AVAILABLE FOR HIRE</div>
    </div>

    <!-- Website Hero Section Replica -->
    <div class="hero-container">
      <div>
        <div class="hero-eyebrow">
          <span class="pulse-dot"></span>
          OPEN TO SENIOR ROLES & ENTERPRISE CONTRACTS
        </div>
        <h1 class="hero-heading">
          I'm <span class="gradient">Omar Abdelfattah</span>,<br>
          <span class="outline-text">Creative Developer</span> & AI Specialist
        </h1>
        <p class="hero-lead">
          I design and build high-performance digital experiences where Figma design systems, modern front-end engineering (Next.js / Astro), and cutting-edge generative AI media pipelines intersect.
        </p>
        <div class="hero-contacts-grid">
          <div><strong>Portfolio:</strong> <a href="https://omarcreatives.com">omarcreatives.com</a></div>
          <div><strong>WhatsApp:</strong> +20 121 186 7464</div>
          <div><strong>Email:</strong> <a href="mailto:contact@omarcreatives.com">contact@omarcreatives.com</a></div>
          <div><strong>Location:</strong> Cairo, Egypt (Remote / Global)</div>
        </div>
      </div>
      <div class="hero-visual-side">
        <div class="avatar-ring">
          <img src="${imgOmarHero}" alt="Omar Abdelfattah" class="avatar-img" />
        </div>
        <div class="rating-badge">★★★★★ 5+ Years Exp</div>
      </div>
    </div>

    <!-- Trust & Metrics Ribbon -->
    <div class="trust-ribbon">
      <div>
        <div class="trust-metric">5+</div>
        <div class="trust-label">Years Experience</div>
      </div>
      <div>
        <div class="trust-metric">20+</div>
        <div class="trust-label">Production Deliveries</div>
      </div>
      <div>
        <div class="trust-metric">98+</div>
        <div class="trust-label">Lighthouse Score</div>
      </div>
      <div>
        <div class="trust-metric">100%</div>
        <div class="trust-label">Client Retention</div>
      </div>
    </div>

    <!-- Core Competencies Pillars -->
    <div class="sec-header">
      <div class="sec-title">What I Design & Build (Core Specializations)</div>
      <div class="sec-subtitle">INTEGRATED DISCIPLINES</div>
    </div>
    <div class="services-3col">
      <div class="service-card">
        <div class="service-icon-box">&lt;/&gt;</div>
        <div class="service-title">Design-to-Code Web Platforms</div>
        <div class="service-desc">Next.js 14/15, Astro, TypeScript, Tailwind CSS, Edge runtime, zero CLS, sub-second TTFB, and full bilingual RTL/LTR.</div>
      </div>
      <div class="service-card">
        <div class="service-icon-box">❖</div>
        <div class="service-title">Design Systems & UI/UX</div>
        <div class="service-desc">Architecting modular Figma component libraries, multi-weight typography scales, design tokens, and high-conversion UX.</div>
      </div>
      <div class="service-card">
        <div class="service-icon-box">✦</div>
        <div class="service-title">Generative AI Media Pipelines</div>
        <div class="service-desc">Consistent virtual video production, LoRA character training, Runway Gen-3, ElevenLabs, and automated creative asset workflows.</div>
      </div>
    </div>

    <!-- Flagship Web Platforms with Visual Mockups -->
    <div class="sec-header">
      <div class="sec-title">Flagship Production Web Platforms</div>
      <div class="sec-subtitle">LIVE CASE STUDIES</div>
    </div>
    <div class="projects-duo">
      
      <!-- D-Arrow Card -->
      <div class="prod-card">
        <div class="prod-img-box">
          <img src="${imgDarrowMockup}" alt="D-Arrow Platform" class="prod-img" />
        </div>
        <div class="prod-content">
          <div>
            <div class="prod-title-line">
              <span class="prod-name">D-Arrow Investment Platform</span>
              <span class="prod-role">Lead Architect & Dev</span>
            </div>
            <p class="prod-desc">
              Built complete platform from scratch: Next.js 14, TypeScript, interactive ROI calculation engine, influencer booking portal, and 120-token Figma system.
            </p>
          </div>
          <div class="prod-tags">
            <span class="pill">Next.js 14</span>
            <span class="pill">TypeScript</span>
            <span class="pill">RTL/LTR</span>
            <span class="pill">d-arrow.com</span>
          </div>
        </div>
      </div>

      <!-- Mathwaa Card -->
      <div class="prod-card">
        <div class="prod-img-box">
          <img src="${imgMathwaaMockup}" alt="Mathwaa Platform" class="prod-img" />
        </div>
        <div class="prod-content">
          <div>
            <div class="prod-title-line">
              <span class="prod-name">Mathwaa Association Ecosystem</span>
              <span class="prod-role">Full-Stack Engineer</span>
            </div>
            <p class="prod-desc">
              Engineered high-speed non-profit platform: Astro SSG, 99/100 Lighthouse performance, responsive Arabic typography, and streamlined donor funnel.
            </p>
          </div>
          <div class="prod-tags">
            <span class="pill">Astro</span>
            <span class="pill">Lighthouse 99</span>
            <span class="pill">Donation Funnel</span>
            <span class="pill">mathwaa.org.sa</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Page Footer -->
    <div class="page-footer">
      <span>OMAR ABDELFATTAH — CREATIVE DEVELOPER & AI SPECIALIST</span>
      <span>PAGE 1 OF 3 • PORTFOLIO: <a href="https://omarcreatives.com">OMARCREATIVES.COM</a></span>
    </div>
  </div>

  <!-- ==================== PAGE 2: AI DIRECTION, BRAND IDENTITIES & METHODOLOGY ==================== -->
  <div class="page">
    <div class="page-header-glow"></div>

    <div class="site-nav-header">
      <div class="nav-logo"><span>OMAR</span> CREATIVES</div>
      <div class="nav-links"><span>• AI VIDEO PRODUCTION</span> <span>• BRAND SYSTEMS</span> <span>• METHODOLOGY</span></div>
      <div class="nav-cta-badge">PAGE 2: AI & IDENTITY</div>
    </div>

    <!-- AI Commercial Video Banner with Visual iPhone Mockup -->
    <div class="sec-header">
      <div class="sec-title">Virtual Production & AI Direction</div>
      <div class="sec-subtitle">COMMERCIAL CASE STUDY</div>
    </div>
    <div class="ai-commercial-banner">
      <div class="ai-img-box">
        <img src="${imgAiVideoCover}" alt="Emirates Real Estate AI Commercial" />
      </div>
      <div class="ai-content">
        <div>
          <div class="prod-title-line">
            <span class="prod-name">Emirates Real Estate (إمارات العقارية) AI Commercial</span>
            <span class="prod-role">AI Director & Synthesizer</span>
          </div>
          <p class="prod-desc">
            Directed and synthesized a luxury architectural television commercial without live filming sets. Engineered consistent multi-angle character rendering across dynamic camera trajectories, integrated neural voice synthesis via ElevenLabs, and mastered spatial audio.
          </p>
        </div>
        <div class="prod-tags">
          <span class="pill">Runway Gen-3</span>
          <span class="pill">Midjourney v6</span>
          <span class="pill">ElevenLabs</span>
          <span class="pill">Character LoRA Consistency</span>
          <span class="pill">1080p Master</span>
        </div>
      </div>
    </div>

    <!-- Brand Identity & Logo Systems Grid -->
    <div class="sec-header">
      <div class="sec-title">Brand Identity Systems & Visual Trademarks</div>
      <div class="sec-subtitle">ENTERPRISE CLIENTS</div>
    </div>
    <div class="brand-logos-row">
      <div class="brand-logo-card">
        <img src="${imgDarrowLogo}" alt="D-Arrow Logo" />
        <span>D-Arrow Investment</span>
      </div>
      <div class="brand-logo-card">
        <img src="${imgArkanLogo}" alt="Arkan Logo" />
        <span>Arkan Contracting</span>
      </div>
      <div class="brand-logo-card">
        <img src="${imgMathwaLogo}" alt="Mathwaa Logo" />
        <span>Mathwaa Association</span>
      </div>
      <div class="brand-logo-card">
        <img src="${imgSouqoomLogo}" alt="Souqoom Logo" />
        <span>Souqoom E-Commerce</span>
      </div>
    </div>

    <!-- Arkan Contracting Platform Case Study -->
    <div class="prod-card" style="margin-bottom: 8px;">
      <div class="prod-content" style="padding: 8px 10px;">
        <div class="prod-title-line">
          <span class="prod-name">Arkan Contracting & Investment Corporate System</span>
          <span class="prod-role">Corporate Identity & Web</span>
        </div>
        <p class="prod-desc">
          Engineered luxury corporate brand identity and interactive web portfolio for Arkan — featuring dynamic category filtering, technical specification modals, and high-ticket B2B inquiry routing.
        </p>
        <div class="prod-tags">
          <span class="pill">Figma Design System</span>
          <span class="pill">Interactive Portfolio</span>
          <span class="pill">B2B Lead Funnel</span>
          <span class="pill">Responsive UI</span>
        </div>
      </div>
    </div>

    <!-- Design-to-Code Methodology (Exact Approach from Site) -->
    <div class="sec-header">
      <div class="sec-title">Design-to-Code Engineering & Production Methodology</div>
      <div class="sec-subtitle">PIPELINE RIGOR</div>
    </div>
    <div class="services-3col">
      <div class="service-card">
        <div class="service-title" style="color: #f59e0b;">1. Tokenized Figma</div>
        <div class="service-desc">Modular typography hierarchy, semantic color tokens, auto-layout components, and bidirectional spacing scales.</div>
      </div>
      <div class="service-card">
        <div class="service-title" style="color: #38bdf8;">2. Zero-Loss Synthesis</div>
        <div class="service-desc">Translating Figma designs into typed Next.js / Astro components with zero handoff fidelity loss and zero CLS.</div>
      </div>
      <div class="service-card">
        <div class="service-title" style="color: #f59e0b;">3. Edge & AI Delivery</div>
        <div class="service-desc">Edge deployment on Cloudflare, JSON-LD structured SEO, sub-second performance, and generative asset automation.</div>
      </div>
    </div>

    <!-- Testimonials Section Replica from Website -->
    <div class="sec-header">
      <div class="sec-title">Verified Client Testimonials</div>
      <div class="sec-subtitle">CLIENT OUTCOMES</div>
    </div>
    <div class="testimonial-ribbon">
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-quote">"Omar delivered an exceptional website that exceeded our expectations. His attention to detail and creative approach made all the difference."</p>
        <div class="testi-author">Ahmed Khalil <span class="testi-role">— CEO, TechStart</span></div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-quote">"The AI content and web platforms Omar created saved us time and the results speak for themselves. Highly recommended!"</p>
        <div class="testi-author">Mohamed Hassan <span class="testi-role">— Startup Founder</span></div>
      </div>
    </div>

    <!-- Page Footer -->
    <div class="page-footer">
      <span>OMAR ABDELFATTAH — CREATIVE DEVELOPER & AI SPECIALIST</span>
      <span>PAGE 2 OF 3 • PORTFOLIO: <a href="https://omarcreatives.com">OMARCREATIVES.COM</a></span>
    </div>
  </div>

  <!-- ==================== PAGE 3: COMMERCIAL CAMPAIGNS, CAREER HISTORY & CONTACT ==================== -->
  <div class="page">
    <div class="page-header-glow"></div>

    <div class="site-nav-header">
      <div class="nav-logo"><span>OMAR</span> CREATIVES</div>
      <div class="nav-links"><span>• COMMERCIAL CAMPAIGNS</span> <span>• WORK HISTORY</span> <span>• HIRING</span></div>
      <div class="nav-cta-badge">PAGE 3: EXPERIENCE</div>
    </div>

    <!-- Commercial Advertising Visuals Showcase -->
    <div class="sec-header">
      <div class="sec-title">Commercial Advertising & High-Impact Visuals</div>
      <div class="sec-subtitle">CAMPAIGNS & PACKAGING</div>
    </div>
    <div class="ads-showcase-3col">
      <div class="ad-card-item">
        <img src="${imgKalista}" alt="Kalista Fashion" />
        <div class="ad-card-details">
          <h5>Kalista Apparel</h5>
          <p>E-Commerce Launch Campaign</p>
        </div>
      </div>
      <div class="ad-card-item">
        <img src="${imgFalez}" alt="Falez Brand" />
        <div class="ad-card-details">
          <h5>Falez Product 3D Ads</h5>
          <p>Commercial Packaging & Social</p>
        </div>
      </div>
      <div class="ad-card-item">
        <img src="${imgTaraf}" alt="Taraf Brand" />
        <div class="ad-card-details">
          <h5>Taraf Winter Collection</h5>
          <p>Fashion Brand Campaign & UI</p>
        </div>
      </div>
    </div>

    <!-- Career History Timeline (Full & Dense) -->
    <div class="sec-header">
      <div class="sec-title">Professional Work Experience & Leadership</div>
      <div class="sec-subtitle">CHRONOLOGICAL RECORD</div>
    </div>
    <div class="timeline-container">
      
      <!-- Role 1 -->
      <div class="timeline-card">
        <div class="timeline-head">
          <span class="timeline-title">Principal Creative Technologist & Founder</span>
          <span class="timeline-period">2022 – Present</span>
        </div>
        <div class="timeline-sub">Omar Creatives | Cairo, Egypt & Remote</div>
        <ul class="timeline-bullets">
          <li>Architected and delivered 20+ bespoke digital web platforms, design systems, and generative AI media systems for enterprises and startups across Saudi Arabia, UAE, and Egypt.</li>
          <li>Elevated client Lighthouse performance scores from &lt;60 to 95+ and decreased edge page response times by over 65%.</li>
          <li>Formulated end-to-end design-to-code pipelines, eliminating designer-developer handoff friction and accelerating time-to-market.</li>
        </ul>
      </div>

      <!-- Role 2 -->
      <div class="timeline-card">
        <div class="timeline-head">
          <span class="timeline-title">Lead UI/UX Engineer & Digital Designer</span>
          <span class="timeline-period">2024 – 2026</span>
        </div>
        <div class="timeline-sub">D-Arrow Marketing & Investment | Full-Stack & Brand Lead</div>
        <ul class="timeline-bullets">
          <li>Engineered company web platform in Next.js 14 & TypeScript, developing customized ROI calculation tools and an influencer management portal.</li>
          <li>Created 50+ modular UI components in Figma and implemented complete brand identity across all digital touchpoints.</li>
        </ul>
      </div>

      <!-- Role 3 -->
      <div class="timeline-card">
        <div class="timeline-head">
          <span class="timeline-title">Senior Visual Designer & Multimedia Producer</span>
          <span class="timeline-period">2019 – 2022</span>
        </div>
        <div class="timeline-sub">Agency & Freelance Contracts | Commercial Branding</div>
        <ul class="timeline-bullets">
          <li>Produced 100+ commercial advertising creatives, packaging systems, and digital marketing assets for FMCG and fashion brands (Falez, Seropipe, Souqoom, Romwear).</li>
        </ul>
      </div>

    </div>

    <!-- Education & Skills Summary -->
    <div class="sec-header">
      <div class="sec-title">Education, Tools & Key Differentiators</div>
      <div class="sec-subtitle">QUALIFICATIONS</div>
    </div>
    <div class="services-3col" style="margin-bottom: 8px;">
      <div class="service-card">
        <div class="service-title">Languages & Tools</div>
        <div class="service-desc">Next.js, Astro, React, TypeScript, Tailwind, Figma, Midjourney, Runway Gen-3, ElevenLabs, Premiere Pro, Photoshop.</div>
      </div>
      <div class="service-card">
        <div class="service-title">Bilingual Native</div>
        <div class="service-desc">Arabic (Native - Expert RTL typography & layout) • English (Professional Working Proficiency).</div>
      </div>
      <div class="service-card">
        <div class="service-title">Education & Credentials</div>
        <div class="service-desc">Bachelor's Degree • Continuous professional learning in Advanced Next.js, Modern CSS & AI Diffusion Models.</div>
      </div>
    </div>

    <!-- Bottom Action CTA Banner -->
    <div class="cta-banner">
      <div>
        <div style="font-size: 8.5pt; font-weight: 800; color: #ffffff;">Let's Build Something Exceptional Together</div>
        <div style="font-size: 7pt; color: #cbd5e1;">Available for Senior Creative Developer roles, Lead UI/UX Engineering, and Enterprise Projects.</div>
      </div>
      <div style="text-align: right; font-size: 7.2pt; color: #fbbf24; font-family: 'JetBrains Mono', monospace;">
        <strong>Direct:</strong> contact@omarcreatives.com<br>
        <strong>WhatsApp:</strong> +20 121 186 7464<br>
        <strong>Portfolio:</strong> omarcreatives.com
      </div>
    </div>

    <!-- Page Footer -->
    <div class="page-footer">
      <span>OMAR ABDELFATTAH — CREATIVE DEVELOPER & AI SPECIALIST</span>
      <span>PAGE 3 OF 3 • PORTFOLIO: <a href="https://omarcreatives.com">OMARCREATIVES.COM</a></span>
    </div>
  </div>

</body>
</html>
`;

const htmlPath = path.join(rootDir, 'dist_website_resume.html');
fs.writeFileSync(htmlPath, resumeHtml, 'utf8');
console.log('Website Exact Resume HTML written to:', htmlPath);

const outputPdfRoot = path.join(rootDir, 'Omar_Abdelfattah_Executive_Resume.pdf');
const outputPdfPublic = path.join(rootDir, 'public', 'Omar_Abdelfattah_Executive_Resume.pdf');

console.log('Generating Pixel-Perfect Website-Themed PDF via headless browser...');

const res = spawnSync(browserPath, [
  '--headless',
  '--disable-gpu',
  '--run-all-compositor-stages-before-draw',
  '--no-pdf-header-footer',
  `--print-to-pdf=${outputPdfRoot}`,
  htmlPath
], { encoding: 'utf8', timeout: 35000 });

if (fs.existsSync(outputPdfRoot)) {
  const sizeKB = (fs.statSync(outputPdfRoot).size / 1024).toFixed(1);
  console.log('SUCCESS! PDF generated successfully at:', outputPdfRoot, `(${sizeKB} KB)`);
  fs.copyFileSync(outputPdfRoot, outputPdfPublic);
  console.log('Copied to public folder:', outputPdfPublic);
} else {
  console.error('PDF generation failed:', res.stderr || res.stdout);
  process.exit(1);
}
