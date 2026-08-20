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
  console.error('No browser found!');
  process.exit(1);
}

function getBase64Image(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return '';
  const ext = path.extname(fullPath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const imgOmarHero = getBase64Image('public/images/omar-hero.png');
const imgDarrowMockup = getBase64Image('public/images/darrow/darrow-ai-hero-mockup.jpg');
const imgMathwaaMockup = getBase64Image('public/images/mathwaa/mathwaa-ai-hero-mockup.jpg');
const imgAiVideoFrame = getBase64Image('public/images/ai-video/frame-1.jpg');
const imgAiVideoCover = getBase64Image('public/images/ai-cinematic-cover.jpg');
const imgArkanLogo = getBase64Image('public/images/logos/arkan-concept.png');
const imgDarrowLogo = getBase64Image('public/images/logos/darrow-logo.png');
const imgMathwaLogo = getBase64Image('public/images/logos/mathwa-logo.jpg');
const imgSouqoomLogo = getBase64Image('public/images/logos/souqoom.png');
const imgKalista = getBase64Image('public/images/scocial-media-designs/The-Shirt-Set-Kalista.jpeg');
const imgFalez = getBase64Image('public/images/scocial-media-designs/2-Falez-Product-Showcase-Social-Media-Design.jpg');
const imgTaraf = getBase64Image('public/images/scocial-media-designs/taraf-work-screen.jpeg');

const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Omar Abdelfattah - Executive Creative Portfolio Resume</title>
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
      --bg-card: rgba(18, 22, 34, 0.8);
      --text-primary: #ffffff;
      --text-secondary: #cbd5e1;
      --text-muted: #94a3b8;
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
      line-height: 1.4;
      font-size: 8.5pt;
      width: 210mm;
      margin: 0 auto;
    }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 10mm 12mm;
      position: relative;
      background-color: #050505;
      background-image: 
        radial-gradient(circle at 5% 5%, rgba(245, 158, 11, 0.12) 0%, transparent 45%),
        radial-gradient(circle at 95% 95%, rgba(56, 189, 248, 0.08) 0%, transparent 45%),
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 28px 28px, 28px 28px;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .page:last-child {
      page-break-after: auto;
    }

    /* Glowing Top Edge */
    .top-glow-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3.5px;
      background: linear-gradient(90deg, #f59e0b, #38bdf8, #f59e0b);
    }

    /* Website Nav Bar */
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 14px;
      background: rgba(12, 15, 24, 0.85);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      margin-bottom: 12px;
    }
    .nav-logo {
      font-size: 12pt;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 6px;
      letter-spacing: -0.3px;
    }
    .nav-logo span {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nav-tagline {
      font-size: 7.8pt;
      font-weight: 600;
      color: #94a3b8;
      font-family: 'JetBrains Mono', monospace;
    }
    .nav-badge {
      background: var(--accent-gradient);
      color: #000;
      font-weight: 800;
      font-size: 7.2pt;
      padding: 4px 10px;
      border-radius: 6px;
      letter-spacing: 0.3px;
    }

    /* Hero Section Replica */
    .hero-box {
      display: grid;
      grid-template-columns: 1.35fr 0.65fr;
      gap: 16px;
      background: rgba(18, 22, 34, 0.7);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 14px 18px;
      margin-bottom: 12px;
      position: relative;
    }
    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.35);
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 7.2pt;
      font-weight: 700;
      color: #fbbf24;
      margin-bottom: 6px;
    }
    .pulse-dot {
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
    }
    .hero-h1 {
      font-size: 18pt;
      font-weight: 800;
      line-height: 1.15;
      color: #ffffff;
      margin-bottom: 6px;
      letter-spacing: -0.5px;
    }
    .hero-h1 .grad {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-h1 .cyan {
      color: #38bdf8;
    }
    .hero-p {
      font-size: 8.2pt;
      color: #cbd5e1;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    .hero-contacts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 12px;
      font-size: 7.6pt;
      color: #94a3b8;
    }
    .hero-contacts strong {
      color: #fff;
    }
    .hero-contacts a {
      color: #f59e0b;
      text-decoration: none;
      font-weight: 600;
    }

    /* Right Avatar Column */
    .hero-avatar-side {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .avatar-wrapper {
      width: 95px;
      height: 95px;
      border-radius: 50%;
      padding: 3px;
      background: linear-gradient(135deg, #f59e0b, #38bdf8);
      box-shadow: 0 0 25px rgba(245, 158, 11, 0.35);
      margin-bottom: 8px;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      background: #0f1322;
    }
    .rating-pill {
      background: rgba(0, 0, 0, 0.75);
      border: 1px solid var(--border-accent);
      border-radius: 20px;
      padding: 3px 12px;
      font-size: 7.2pt;
      font-weight: 700;
      color: #fbbf24;
    }

    /* Trust Stats Ribbon */
    .stats-ribbon {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 8px 12px;
      margin-bottom: 12px;
      text-align: center;
    }
    .stat-val {
      font-size: 13pt;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      color: #f59e0b;
      line-height: 1.1;
    }
    .stat-lbl {
      font-size: 7pt;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-top: 2px;
    }

    /* Section Headers */
    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 3px;
    }
    .section-title {
      font-size: 9.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-title::before {
      content: "";
      width: 4px;
      height: 13px;
      background: var(--accent);
      border-radius: 2px;
    }
    .section-tag {
      font-size: 7.2pt;
      font-family: 'JetBrains Mono', monospace;
      color: #f59e0b;
      font-weight: 600;
    }

    /* 3 Competencies Pillars */
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 12px;
    }
    .pillar-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--border-color);
      border-top: 1.5px solid rgba(245, 158, 11, 0.4);
      border-radius: 12px;
      padding: 10px 12px;
    }
    .pillar-icon {
      font-size: 11pt;
      color: #f59e0b;
      margin-bottom: 4px;
      font-weight: 800;
    }
    .pillar-title {
      font-size: 8.5pt;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .pillar-desc {
      font-size: 7.4pt;
      color: #94a3b8;
      line-height: 1.4;
    }

    /* Flagship Projects Grid (Large High-Res Mockups) */
    .flagship-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 10px;
    }
    .flagship-card {
      background: rgba(18, 22, 34, 0.85);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .flagship-img-box {
      width: 100%;
      height: 125px;
      background: #000;
      overflow: hidden;
    }
    .flagship-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .flagship-body {
      padding: 10px 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .flagship-name-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    .flagship-name {
      font-size: 9.5pt;
      font-weight: 700;
      color: #ffffff;
    }
    .flagship-role {
      font-size: 7.2pt;
      font-family: 'JetBrains Mono', monospace;
      color: #38bdf8;
      font-weight: 600;
    }
    .flagship-desc {
      font-size: 7.8pt;
      color: #cbd5e1;
      line-height: 1.4;
      margin-bottom: 6px;
    }
    .flagship-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .badge {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: #fbbf24;
      font-size: 6.8pt;
      font-family: 'JetBrains Mono', monospace;
      padding: 1.5px 6px;
      border-radius: 4px;
      font-weight: 600;
    }

    /* Page Footer */
    .page-footer {
      border-top: 1px solid var(--border-color);
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      font-size: 7.2pt;
      color: #64748b;
      font-family: 'JetBrains Mono', monospace;
    }
    .page-footer a {
      color: #f59e0b;
      text-decoration: none;
    }

    /* PAGE 2 ELEMENTS */
    .ai-banner {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 14px;
      background: rgba(18, 22, 34, 0.85);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .ai-img-box {
      width: 100%;
      height: 125px;
      background: #000;
    }
    .ai-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .ai-body {
      padding: 10px 14px 10px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .logos-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 12px;
    }
    .logo-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 8px;
      height: 68px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .logo-card img {
      max-height: 36px;
      max-width: 85%;
      object-fit: contain;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
    }
    .logo-card span {
      font-size: 6.8pt;
      font-weight: 600;
      color: #94a3b8;
      margin-top: 3px;
    }

    /* Commercial Visual Ads 3-Col */
    .commercial-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 12px;
    }
    .ad-card {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
    }
    .ad-card img {
      width: 100%;
      height: 90px;
      object-fit: cover;
      display: block;
    }
    .ad-details {
      padding: 6px 8px;
    }
    .ad-details h4 {
      font-size: 7.8pt;
      font-weight: 700;
      color: #fff;
    }
    .ad-details p {
      font-size: 6.8pt;
      color: #94a3b8;
    }

    /* Career Timeline */
    .career-timeline {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }
    .timeline-item {
      background: rgba(18, 22, 34, 0.7);
      border: 1px solid var(--border-color);
      border-left: 3.5px solid #f59e0b;
      border-radius: 0 10px 10px 0;
      padding: 8px 12px;
    }
    .timeline-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .timeline-role {
      font-size: 8.8pt;
      font-weight: 700;
      color: #ffffff;
    }
    .timeline-date {
      font-size: 7.4pt;
      font-family: 'JetBrains Mono', monospace;
      color: #f59e0b;
      font-weight: 600;
    }
    .timeline-company {
      font-size: 7.8pt;
      color: #38bdf8;
      font-weight: 600;
      margin-bottom: 3px;
    }
    .timeline-list {
      padding-left: 12px;
    }
    .timeline-list li {
      font-size: 7.6pt;
      color: #cbd5e1;
      line-height: 1.4;
      margin-bottom: 1px;
    }

    /* Bottom Big CTA Box */
    .cta-box {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(56, 189, 248, 0.12));
      border: 1.5px solid rgba(245, 158, 11, 0.4);
      border-radius: 12px;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .cta-title {
      font-size: 9.5pt;
      font-weight: 800;
      color: #ffffff;
    }
    .cta-sub {
      font-size: 7.6pt;
      color: #cbd5e1;
      margin-top: 2px;
    }
    .cta-contacts {
      text-align: right;
      font-size: 7.8pt;
      color: #fbbf24;
      font-family: 'JetBrains Mono', monospace;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: HERO, METRICS, CAPABILITIES & PRODUCTION WEB PLATFORMS ==================== -->
  <div class="page">
    <div class="top-glow-line"></div>

    <!-- Navigation Header -->
    <div class="nav-bar">
      <div class="nav-logo">
        <span>OMAR</span> CREATIVES
      </div>
      <div class="nav-tagline">
        CREATIVE DEVELOPER & AI SPECIALIST
      </div>
      <div class="nav-badge">
        AVAILABLE FOR HIRE
      </div>
    </div>

    <!-- Hero Section -->
    <div class="hero-box">
      <div>
        <div class="hero-eyebrow">
          <span class="pulse-dot"></span>
          OPEN TO SENIOR ROLES & ENTERPRISE CONTRACTS
        </div>
        <h1 class="hero-h1">
          I'm <span class="grad">Omar Abdelfattah</span>,<br>
          <span class="cyan">Creative Developer</span> & AI Specialist
        </h1>
        <p class="hero-p">
          I design and build high-performance digital experiences where Figma design systems, modern front-end engineering (Next.js / Astro), and cutting-edge generative AI media pipelines intersect.
        </p>
        <div class="hero-contacts">
          <div><strong>Portfolio:</strong> <a href="https://omarcreatives.com">omarcreatives.com</a></div>
          <div><strong>WhatsApp:</strong> +20 121 186 7464</div>
          <div><strong>Email:</strong> <a href="mailto:contact@omarcreatives.com">contact@omarcreatives.com</a></div>
          <div><strong>Location:</strong> Cairo, Egypt (Remote / Global)</div>
        </div>
      </div>
      <div class="hero-avatar-side">
        <div class="avatar-wrapper">
          <img src="${imgOmarHero}" alt="Omar Abdelfattah" class="avatar-img" />
        </div>
        <div class="rating-pill">★★★★★ 5+ Years Exp</div>
      </div>
    </div>

    <!-- Trust Stats Bar -->
    <div class="stats-ribbon">
      <div>
        <div class="stat-val">5+</div>
        <div class="stat-lbl">Years Experience</div>
      </div>
      <div>
        <div class="stat-val">20+</div>
        <div class="stat-lbl">Production Deliveries</div>
      </div>
      <div>
        <div class="stat-val">98+</div>
        <div class="stat-lbl">Lighthouse Score</div>
      </div>
      <div>
        <div class="stat-val">100%</div>
        <div class="stat-lbl">Client Retention</div>
      </div>
    </div>

    <!-- Core Competencies Pillars -->
    <div class="section-head">
      <div class="section-title">What I Design & Build (Core Specializations)</div>
      <div class="section-tag">INTEGRATED DISCIPLINES</div>
    </div>
    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon">&lt;/&gt;</div>
        <div class="pillar-title">Design-to-Code Platforms</div>
        <div class="pillar-desc">Next.js 14/15, Astro, TypeScript, Tailwind CSS, Edge runtime, zero CLS, sub-second TTFB, and bilingual RTL/LTR.</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">❖</div>
        <div class="pillar-title">Design Systems & UI/UX</div>
        <div class="pillar-desc">Scalable Figma component libraries, multi-weight typography scales, design tokens, and high-conversion UX.</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">✦</div>
        <div class="pillar-title">Generative AI Pipelines</div>
        <div class="pillar-desc">Virtual video production, consistent LoRA character training, Runway Gen-3, ElevenLabs, and automated creative pipelines.</div>
      </div>
    </div>

    <!-- Flagship Web Platforms with Large Visual Mockups -->
    <div class="section-head">
      <div class="section-title">Flagship Production Web Platforms</div>
      <div class="section-tag">LIVE CASE STUDIES</div>
    </div>
    <div class="flagship-grid">
      
      <!-- D-Arrow Platform -->
      <div class="flagship-card">
        <div class="flagship-img-box">
          <img src="${imgDarrowMockup}" alt="D-Arrow Platform" class="flagship-img" />
        </div>
        <div class="flagship-body">
          <div>
            <div class="flagship-name-row">
              <span class="flagship-name">D-Arrow Investment Platform</span>
              <span class="flagship-role">Lead Architect & Dev</span>
            </div>
            <p class="flagship-desc">
              Architected complete platform from scratch: Next.js 14, TypeScript, interactive ROI calculation engine, influencer booking portal, and 120-token Figma design system.
            </p>
          </div>
          <div class="flagship-tags">
            <span class="badge">Next.js 14</span>
            <span class="badge">TypeScript</span>
            <span class="badge">RTL/LTR</span>
            <span class="badge">d-arrow.com</span>
          </div>
        </div>
      </div>

      <!-- Mathwaa Platform -->
      <div class="flagship-card">
        <div class="flagship-img-box">
          <img src="${imgMathwaaMockup}" alt="Mathwaa Platform" class="flagship-img" />
        </div>
        <div class="flagship-body">
          <div>
            <div class="flagship-name-row">
              <span class="flagship-name">Mathwaa Association Ecosystem</span>
              <span class="flagship-role">Full-Stack Engineer</span>
            </div>
            <p class="flagship-desc">
              Engineered high-speed non-profit platform: Astro SSG, 99/100 Lighthouse performance, responsive Arabic typography, and streamlined donor conversion funnel.
            </p>
          </div>
          <div class="flagship-tags">
            <span class="badge">Astro</span>
            <span class="badge">Lighthouse 99</span>
            <span class="badge">Donation Flow</span>
            <span class="badge">mathwaa.org.sa</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Page 1 Footer -->
    <div class="page-footer">
      <span>OMAR ABDELFATTAH — CREATIVE DEVELOPER & AI SPECIALIST</span>
      <span>PAGE 1 OF 2 • PORTFOLIO: <a href="https://omarcreatives.com">OMARCREATIVES.COM</a></span>
    </div>
  </div>

  <!-- ==================== PAGE 2: AI DIRECTION, BRAND IDENTITIES, EXPERIENCE & HIRING ==================== -->
  <div class="page">
    <div class="top-glow-line"></div>

    <div class="nav-bar">
      <div class="nav-logo"><span>OMAR</span> CREATIVES</div>
      <div class="nav-tagline">AI VIRTUAL PRODUCTION • BRAND SYSTEMS • WORK HISTORY</div>
      <div class="nav-badge">PAGE 2: COMPLETE DOSSIER</div>
    </div>

    <!-- AI Video Commercial Case Study Banner -->
    <div class="section-head">
      <div class="section-title">Virtual Production & Generative AI Direction</div>
      <div class="section-tag">COMMERCIAL CASE STUDY</div>
    </div>
    <div class="ai-banner">
      <div class="ai-img-box">
        <img src="${imgAiVideoFrame}" alt="Emirates Real Estate AI Commercial" />
      </div>
      <div class="ai-body">
        <div>
          <div class="flagship-name-row">
            <span class="flagship-name">Emirates Real Estate (إمارات العقارية) AI Commercial</span>
            <span class="flagship-role">AI Director & Synthesizer</span>
          </div>
          <p class="flagship-desc">
            Directed and synthesized a luxury architectural television commercial without live filming sets. Engineered consistent multi-angle character rendering across dynamic camera trajectories, integrated neural voice synthesis via ElevenLabs, and mastered spatial audio.
          </p>
        </div>
        <div class="flagship-tags">
          <span class="badge">Runway Gen-3</span>
          <span class="badge">Midjourney v6</span>
          <span class="badge">ElevenLabs</span>
          <span class="badge">LoRA Character Consistency</span>
          <span class="badge">1080p Master</span>
        </div>
      </div>
    </div>

    <!-- Brand Identity Logos Showcase -->
    <div class="section-head">
      <div class="section-title">Brand Identity Systems & Visual Trademarks</div>
      <div class="section-tag">ENTERPRISE CLIENTS</div>
    </div>
    <div class="logos-grid">
      <div class="logo-card">
        <img src="${imgDarrowLogo}" alt="D-Arrow Logo" />
        <span>D-Arrow Investment</span>
      </div>
      <div class="logo-card">
        <img src="${imgArkanLogo}" alt="Arkan Logo" />
        <span>Arkan Contracting</span>
      </div>
      <div class="logo-card">
        <img src="${imgMathwaLogo}" alt="Mathwaa Logo" />
        <span>Mathwaa Association</span>
      </div>
      <div class="logo-card">
        <img src="${imgSouqoomLogo}" alt="Souqoom Logo" />
        <span>Souqoom E-Commerce</span>
      </div>
    </div>

    <!-- Commercial Advertising & Social Media Showcase -->
    <div class="section-head">
      <div class="section-title">Commercial Advertising & High-Impact Visuals</div>
      <div class="section-tag">CAMPAIGNS & PACKAGING</div>
    </div>
    <div class="commercial-grid">
      <div class="ad-card">
        <img src="${imgKalista}" alt="Kalista Fashion" />
        <div class="ad-details">
          <h4>Kalista Apparel</h4>
          <p>Luxury E-Commerce & Campaign</p>
        </div>
      </div>
      <div class="ad-card">
        <img src="${imgFalez}" alt="Falez Brand" />
        <div class="ad-details">
          <h4>Falez Product 3D Ads</h4>
          <p>Commercial Packaging & Social</p>
        </div>
      </div>
      <div class="ad-card">
        <img src="${imgTaraf}" alt="Taraf Brand" />
        <div class="ad-details">
          <h4>Taraf Winter Collection</h4>
          <p>Fashion Brand Campaign & UI</p>
        </div>
      </div>
    </div>

    <!-- Professional Career History Timeline -->
    <div class="section-head">
      <div class="section-title">Professional Work Experience & Leadership</div>
      <div class="section-tag">CHRONOLOGICAL HISTORY</div>
    </div>
    <div class="career-timeline">
      
      <!-- Role 1 -->
      <div class="timeline-item">
        <div class="timeline-row">
          <span class="timeline-role">Principal Creative Technologist & Founder</span>
          <span class="timeline-date">2022 – Present</span>
        </div>
        <div class="timeline-company">Omar Creatives | Cairo, Egypt & Remote</div>
        <ul class="timeline-list">
          <li>Architected and delivered 20+ bespoke digital web platforms, design systems, and generative AI media systems for enterprises and startups across Saudi Arabia, UAE, and Egypt.</li>
          <li>Elevated client Lighthouse performance scores from &lt;60 to 95+ and decreased edge page response times by over 65%.</li>
        </ul>
      </div>

      <!-- Role 2 -->
      <div class="timeline-item">
        <div class="timeline-row">
          <span class="timeline-role">Lead UI/UX Engineer & Digital Designer</span>
          <span class="timeline-date">2024 – 2026</span>
        </div>
        <div class="timeline-company">D-Arrow Marketing & Investment | Full-Stack & Brand Lead</div>
        <ul class="timeline-list">
          <li>Engineered company web platform in Next.js 14 & TypeScript, developing customized ROI calculation tools and an influencer management portal.</li>
        </ul>
      </div>

      <!-- Role 3 -->
      <div class="timeline-item">
        <div class="timeline-row">
          <span class="timeline-role">Senior Visual Designer & Multimedia Producer</span>
          <span class="timeline-date">2019 – 2022</span>
        </div>
        <div class="timeline-company">Agency & Freelance Contracts | Commercial Branding</div>
        <ul class="timeline-list">
          <li>Produced 100+ commercial advertising creatives, packaging systems, and digital marketing assets for FMCG and fashion brands (Falez, Seropipe, Souqoom, Romwear).</li>
        </ul>
      </div>

    </div>

    <!-- Bottom Contact & Hiring CTA Box -->
    <div class="cta-box">
      <div>
        <div class="cta-title">Let's Build Something Exceptional Together</div>
        <div class="cta-sub">Available for Senior Creative Developer roles, Lead UI/UX Engineering, and Enterprise Projects.</div>
      </div>
      <div class="cta-contacts">
        <strong>Direct:</strong> contact@omarcreatives.com<br>
        <strong>WhatsApp:</strong> +20 121 186 7464<br>
        <strong>Portfolio:</strong> omarcreatives.com
      </div>
    </div>

    <!-- Page 2 Footer -->
    <div class="page-footer">
      <span>OMAR ABDELFATTAH — CREATIVE DEVELOPER & AI SPECIALIST</span>
      <span>PAGE 2 OF 2 • PORTFOLIO: <a href="https://omarcreatives.com">OMARCREATIVES.COM</a></span>
    </div>
  </div>

</body>
</html>
`;

const htmlPath = path.join(rootDir, 'dist_website_master_resume.html');
fs.writeFileSync(htmlPath, resumeHtml, 'utf8');
console.log('Master Resume HTML written to:', htmlPath);

const outputPdfRoot = path.join(rootDir, 'Omar_Abdelfattah_Master_Resume.pdf');
const outputPdfPublic = path.join(rootDir, 'public', 'Omar_Abdelfattah_Master_Resume.pdf');

console.log('Generating 2-Page Master PDF via headless browser...');

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
  console.log('SUCCESS! Master Resume PDF generated successfully at:', outputPdfRoot, `(${sizeKB} KB)`);
  fs.copyFileSync(outputPdfRoot, outputPdfPublic);
  console.log('Copied to public folder:', outputPdfPublic);
} else {
  console.error('PDF generation failed:', res.stderr || res.stdout);
  process.exit(1);
}
