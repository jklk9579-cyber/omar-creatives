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

console.log('Loading local visual assets as Base64...');
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

console.log('Building luxury 3-Page Visual Creative Resume HTML...');

const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Omar Abdelfattah - Visual Creative Dossier & Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,600&display=swap" rel="stylesheet">
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
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #070913;
      color: #e2e8f0;
      line-height: 1.4;
      font-size: 8.5pt;
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
    }
    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      padding: 10mm 12mm;
      position: relative;
      background: #070913;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .page:last-child {
      page-break-after: auto;
    }

    /* Ambient Glow & Borders */
    .page::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #f59e0b, #38bdf8, #f59e0b);
    }

    /* Header Profile with Avatar */
    .profile-hero {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-bottom: 10px;
      border-bottom: 1.5px solid rgba(245, 158, 11, 0.25);
      margin-bottom: 10px;
    }
    .avatar-wrapper {
      position: relative;
      width: 68px;
      height: 68px;
      flex-shrink: 0;
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(135deg, #f59e0b, #38bdf8);
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.25);
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      background: #111424;
      display: block;
    }
    .profile-info {
      flex: 1;
    }
    .profile-info h1 {
      font-size: 20pt;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.1;
      letter-spacing: -0.5px;
    }
    .profile-info .title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #f59e0b;
      margin-top: 2px;
      letter-spacing: 0.2px;
    }
    .profile-info .sub {
      font-size: 8pt;
      color: #94a3b8;
      margin-top: 2px;
    }
    .header-contacts {
      text-align: right;
      font-size: 7.5pt;
      color: #cbd5e1;
      line-height: 1.5;
    }
    .header-contacts a {
      color: #f59e0b;
      text-decoration: none;
      font-weight: 600;
    }
    .header-contacts .badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.35);
      color: #fbbf24;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 7pt;
      margin-bottom: 3px;
    }

    /* Section Headings */
    .section-title {
      font-size: 9pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #f59e0b;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 3px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .section-title span.count {
      color: #94a3b8;
      font-size: 7.5pt;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
    }

    /* Visual Showcase Cards */
    .showcase-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }
    .showcase-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .showcase-img-container {
      width: 100%;
      height: 85px;
      overflow: hidden;
      position: relative;
      background: #0f1322;
    }
    .showcase-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .showcase-body {
      padding: 8px 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .showcase-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }
    .showcase-title {
      font-size: 9pt;
      font-weight: 700;
      color: #ffffff;
    }
    .showcase-tag {
      font-size: 6.8pt;
      color: #38bdf8;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
    }
    .showcase-desc {
      font-size: 7.6pt;
      color: #cbd5e1;
      line-height: 1.35;
      margin-bottom: 5px;
    }
    .showcase-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
    }
    .badge-pill {
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.25);
      color: #fbbf24;
      font-size: 6.5pt;
      font-family: 'JetBrains Mono', monospace;
      padding: 1px 4px;
      border-radius: 3px;
    }

    /* Skills Matrix */
    .skills-matrix {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-bottom: 10px;
    }
    .matrix-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 6px;
      padding: 6px 8px;
    }
    .matrix-title {
      font-size: 7.2pt;
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    .matrix-content {
      font-size: 7.4pt;
      color: #cbd5e1;
      line-height: 1.3;
    }

    /* Logos Grid */
    .logos-showcase {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    .logo-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 6px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 68px;
    }
    .logo-item img {
      max-height: 38px;
      max-width: 90%;
      object-fit: contain;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }
    .logo-name {
      font-size: 6.8pt;
      font-weight: 600;
      color: #94a3b8;
      margin-top: 4px;
    }

    /* Creative Ads Grid */
    .ads-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    .ad-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 6px;
      overflow: hidden;
    }
    .ad-card img {
      width: 100%;
      height: 80px;
      object-fit: cover;
      display: block;
    }
    .ad-card-info {
      padding: 5px 6px;
    }
    .ad-card-info h4 {
      font-size: 7.5pt;
      font-weight: 700;
      color: #fff;
    }
    .ad-card-info p {
      font-size: 6.8pt;
      color: #94a3b8;
    }

    /* Experience Timeline Items */
    .exp-item {
      margin-bottom: 8px;
      padding-left: 8px;
      border-left: 2px solid rgba(245, 158, 11, 0.4);
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .exp-title {
      font-size: 8.5pt;
      font-weight: 700;
      color: #ffffff;
    }
    .exp-date {
      font-size: 7.2pt;
      font-family: 'JetBrains Mono', monospace;
      color: #f59e0b;
    }
    .exp-subtitle {
      font-size: 7.6pt;
      font-weight: 600;
      color: #38bdf8;
    }
    .exp-bullets {
      margin-top: 2px;
      padding-left: 10px;
    }
    .exp-bullets li {
      font-size: 7.4pt;
      color: #cbd5e1;
      margin-bottom: 1px;
    }

    /* Footer on pages */
    .page-footer {
      margin-top: auto;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      font-size: 7pt;
      color: #64748b;
      font-family: 'JetBrains Mono', monospace;
    }
    .page-footer a {
      color: #f59e0b;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: EXECUTIVE PROFILE & FLAGSHIP WEB PLATFORMS ==================== -->
  <div class="page">
    
    <!-- Profile Hero Header -->
    <div class="profile-hero">
      <div class="avatar-wrapper">
        <img src="${imgOmarHero}" alt="Omar Abdelfattah" class="avatar-img" />
      </div>
      <div class="profile-info">
        <h1>Omar Abdelfattah</h1>
        <div class="title">Senior Creative Developer & AI Specialist</div>
        <div class="sub">5+ Years Crafting High-Speed Web Platforms, Figma Design Systems & AI Media Pipelines</div>
      </div>
      <div class="header-contacts">
        <div class="badge">OPEN FOR SENIOR & ENTERPRISE ROLES</div>
        <div><strong>Portfolio:</strong> <a href="https://omarcreatives.com">omarcreatives.com</a></div>
        <div><strong>Email:</strong> <a href="mailto:contact@omarcreatives.com">contact@omarcreatives.com</a></div>
        <div><strong>WhatsApp:</strong> +20 121 186 7464</div>
        <div><strong>Location:</strong> Cairo, Egypt (Remote / Global)</div>
      </div>
    </div>

    <!-- Technical Arsenal Matrix -->
    <div class="section-title">
      Core Engineering & Creative Competencies
      <span class="count">FULL-STACK DESIGN-TO-CODE</span>
    </div>
    <div class="skills-matrix">
      <div class="matrix-box">
        <div class="matrix-title">Front-End & Frameworks</div>
        <div class="matrix-content">Next.js 14/15, Astro, React, TypeScript, Tailwind CSS, Vanilla CSS3, Semantic HTML5.</div>
      </div>
      <div class="matrix-box">
        <div class="matrix-title">Edge Architecture</div>
        <div class="matrix-content">Cloudflare Workers/Pages, Static Site Gen (SSG), Bi-directional RTL/LTR, Zero CLS, Core Web Vitals.</div>
      </div>
      <div class="matrix-box">
        <div class="matrix-title">Design Systems</div>
        <div class="matrix-content">Figma (Tokens, Variables, Components), Adobe Illustrator, Photoshop, Motion Graphics.</div>
      </div>
      <div class="matrix-box">
        <div class="matrix-title">Generative AI Pipelines</div>
        <div class="matrix-content">Runway Gen-3, Midjourney v6, Flux.1, Luma AI, ElevenLabs, Consistent LoRA Workflows.</div>
      </div>
    </div>

    <!-- Flagship Web Platforms with Real Mockups -->
    <div class="section-title">
      Flagship Live Web Platforms & Architectures
      <span class="count">PRODUCTION EVIDENCE</span>
    </div>
    <div class="showcase-grid">
      
      <!-- D-Arrow Showcase -->
      <div class="showcase-card">
        <div class="showcase-img-container">
          <img src="${imgDarrowMockup}" alt="D-Arrow Platform Mockup" class="showcase-img" />
        </div>
        <div class="showcase-body">
          <div>
            <div class="showcase-title-row">
              <span class="showcase-title">D-Arrow Investment Platform</span>
              <span class="showcase-tag">Next.js • TypeScript</span>
            </div>
            <p class="showcase-desc">
              Architected the full platform from scratch with bidirectional RTL/LTR support, dynamic investment ROI calculators, and a custom 120-token Figma design system.
            </p>
          </div>
          <div class="showcase-meta">
            <span class="badge-pill">Edge Deployed</span>
            <span class="badge-pill">ROI Calculator</span>
            <span class="badge-pill">Figma Design System</span>
            <span class="badge-pill">d-arrow.com</span>
          </div>
        </div>
      </div>

      <!-- Mathwaa Showcase -->
      <div class="showcase-card">
        <div class="showcase-img-container">
          <img src="${imgMathwaaMockup}" alt="Mathwaa Platform Mockup" class="showcase-img" />
        </div>
        <div class="showcase-body">
          <div>
            <div class="showcase-title-row">
              <span class="showcase-title">Mathwaa Association Platform</span>
              <span class="showcase-tag">Astro • Lighthouse 99</span>
            </div>
            <p class="showcase-desc">
              Engineered institutional non-profit web ecosystem with instant sub-second TTFB, optimized Arabic typography hierarchy, and a streamlined donation funnel.
            </p>
          </div>
          <div class="showcase-meta">
            <span class="badge-pill">Lighthouse 99/100</span>
            <span class="badge-pill">Zero CLS</span>
            <span class="badge-pill">Donation Funnel</span>
            <span class="badge-pill">mathwaa.org.sa</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Career Summary & Executive Value -->
    <div class="section-title">
      Executive Profile & Engineering Philosophy
    </div>
    <div style="background: rgba(245, 158, 11, 0.04); border-left: 3px solid #f59e0b; padding: 7px 10px; border-radius: 0 4px 4px 0; margin-bottom: 8px;">
      <p style="font-size: 7.8pt; line-height: 1.4; color: #f1f5f9;">
        <strong>The Creative Technologist Advantage:</strong> Eliminating the friction between design vision and technical execution. I write clean, performant TypeScript code while simultaneously designing high-craft visual interfaces in Figma. Specializing in high-performance web platforms, Arabic/English bilingual architectures, and production-grade generative AI automation.
      </p>
    </div>

    <!-- Footer Page 1 -->
    <div class="page-footer">
      <span>Omar Abdelfattah — Creative Developer & AI Specialist</span>
      <span>Page 1 of 3 • Portfolio: <a href="https://omarcreatives.com">omarcreatives.com</a></span>
    </div>

  </div>

  <!-- ==================== PAGE 2: GENERATIVE AI DIRECTION & BRAND IDENTITIES ==================== -->
  <div class="page">
    
    <div class="section-title" style="margin-top: 4px;">
      Generative AI Direction & Virtual Production
      <span class="count">COMMERCIAL AI PIPELINES</span>
    </div>

    <!-- AI Video Showcase Card -->
    <div class="showcase-card" style="margin-bottom: 12px; flex-direction: row; height: 110px;">
      <div style="width: 140px; height: 100%; flex-shrink: 0; background: #000; overflow: hidden;">
        <img src="${imgAiVideoCover}" alt="AI Cinematic Commercial" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div class="showcase-body" style="padding: 8px 12px;">
        <div>
          <div class="showcase-title-row">
            <span class="showcase-title">Emirates Real Estate (إمارات العقارية) AI Commercial</span>
            <span class="showcase-tag">Runway Gen-3 • Midjourney v6</span>
          </div>
          <p class="showcase-desc">
            Directed and synthesized a luxury architectural television commercial without live filming sets. Engineered consistent character rendering across dynamic camera trajectories, integrated neural voice synthesis via ElevenLabs, and mastered full spatial audio.
          </p>
        </div>
        <div class="showcase-meta">
          <span class="badge-pill">Character Consistency LoRA</span>
          <span class="badge-pill">Spatial Sound Design</span>
          <span class="badge-pill">Neural Voice Cloning</span>
          <span class="badge-pill">1080p 60fps Master</span>
        </div>
      </div>
    </div>

    <!-- Brand Identity & Logo Systems Grid -->
    <div class="section-title">
      Brand Identity Systems & Visual Trademarks
      <span class="count">ENTERPRISE IDENTITY</span>
    </div>
    
    <div class="logos-showcase">
      <div class="logo-item">
        <img src="${imgDarrowLogo}" alt="D-Arrow Logo" />
        <span class="logo-name">D-Arrow Investment</span>
      </div>
      <div class="logo-item">
        <img src="${imgArkanLogo}" alt="Arkan Logo" />
        <span class="logo-name">Arkan Contracting</span>
      </div>
      <div class="logo-item">
        <img src="${imgMathwaLogo}" alt="Mathwaa Logo" />
        <span class="logo-name">Mathwaa Association</span>
      </div>
      <div class="logo-item">
        <img src="${imgSouqoomLogo}" alt="Souqoom Logo" />
        <span class="logo-name">Souqoom E-Commerce</span>
      </div>
    </div>

    <!-- Design-to-Code Methodology -->
    <div class="section-title">
      Design-to-Code Engineering & Production Methodology
    </div>
    <div class="matrix-box" style="margin-bottom: 10px; padding: 8px 10px;">
      <div style="font-size: 7.6pt; line-height: 1.45; color: #cbd5e1;">
        <strong style="color: #f59e0b;">1. Tokenized Figma Architecture:</strong> Designing with unified tokens for spacing, typography, colors, and responsive layout grids.<br>
        <strong style="color: #38bdf8;">2. Zero-Loss Code Synthesis:</strong> Translating design tokens into modular Next.js / Astro components with strict TypeScript types.<br>
        <strong style="color: #f59e0b;">3. Bilingual RTL Native:</strong> Solving font-metric offsets, text truncation, and bidirectional flexbox/grid alignments flawlessly.<br>
        <strong style="color: #38bdf8;">4. AI Augmentation:</strong> Leveraging custom diffusion workflows for rapid concept validation and dynamic content generation.
      </div>
    </div>

    <!-- Arkan Contracting Case Study -->
    <div class="showcase-card" style="margin-bottom: 10px;">
      <div class="showcase-body" style="padding: 8px 12px;">
        <div class="showcase-title-row">
          <span class="showcase-title">Arkan Contracting & Investment Corporate System</span>
          <span class="showcase-tag">Corporate Identity & Web</span>
        </div>
        <p class="showcase-desc">
          Created the entire luxury corporate brand language and digital project showcase for Arkan — featuring interactive project filtering, technical specifications modals, and high-ticket inquiry routing.
        </p>
        <div class="showcase-meta">
          <span class="badge-pill">Figma Design System</span>
          <span class="badge-pill">Interactive Portfolio</span>
          <span class="badge-pill">B2B Lead Funnel</span>
        </div>
      </div>
    </div>

    <!-- Footer Page 2 -->
    <div class="page-footer">
      <span>Omar Abdelfattah — Creative Developer & AI Specialist</span>
      <span>Page 2 of 3 • Portfolio: <a href="https://omarcreatives.com">omarcreatives.com</a></span>
    </div>

  </div>

  <!-- ==================== PAGE 3: COMMERCIAL ADVERTISING & WORK HISTORY ==================== -->
  <div class="page">
    
    <!-- Commercial Advertising & Social Media Showcase -->
    <div class="section-title" style="margin-top: 4px;">
      Commercial Advertising, Packaging & Visual Campaigns
      <span class="count">HIGH-IMPACT VISUALS</span>
    </div>

    <div class="ads-grid">
      <div class="ad-card">
        <img src="${imgKalista}" alt="Kalista Fashion" />
        <div class="ad-card-info">
          <h4>Kalista Apparel</h4>
          <p>Luxury E-Commerce & Campaign</p>
        </div>
      </div>
      <div class="ad-card">
        <img src="${imgFalez}" alt="Falez Brand" />
        <div class="ad-card-info">
          <h4>Falez Product Showcase</h4>
          <p>Commercial Packaging & 3D Ads</p>
        </div>
      </div>
      <div class="ad-card">
        <img src="${imgTaraf}" alt="Taraf Brand" />
        <div class="ad-card-info">
          <h4>Taraf Winter Collection</h4>
          <p>Fashion Brand Campaign & UI</p>
        </div>
      </div>
    </div>

    <!-- Professional Career History -->
    <div class="section-title">
      Professional Work Experience & Leadership
      <span class="count">CHRONOLOGICAL HISTORY</span>
    </div>

    <!-- Role 1 -->
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">Principal Creative Technologist & Founder</span>
        <span class="exp-date">2022 – Present</span>
      </div>
      <div class="exp-subtitle">Omar Creatives | Cairo, Egypt & Remote</div>
      <ul class="exp-bullets">
        <li>Delivered 20+ bespoke digital web platforms and AI-augmented media systems for enterprises and tech founders across Saudi Arabia, UAE, and Egypt.</li>
        <li>Spearheaded performance optimization workflows, consistently elevating client Lighthouse scores to 95+ and reducing page load times by over 65%.</li>
        <li>Built automated asset delivery pipelines combining generative AI diffusion and custom script automation.</li>
      </ul>
    </div>

    <!-- Role 2 -->
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">Lead UI/UX Engineer & Digital Designer</span>
        <span class="exp-date">2024 – 2026</span>
      </div>
      <div class="exp-subtitle">D-Arrow Marketing & Investment | Full-Stack & Brand Lead</div>
      <ul class="exp-bullets">
        <li>Engineered the core company platform in Next.js 14 with TypeScript, designing the multi-lingual UI/UX in Figma from concept to production deployment.</li>
        <li>Developed customized interactive financial calculators and an influencer management portal.</li>
      </ul>
    </div>

    <!-- Role 3 -->
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">Senior Visual Designer & Multimedia Producer</span>
        <span class="exp-date">2019 – 2022</span>
      </div>
      <div class="exp-subtitle">Freelance & Agency Contracts | Commercial Branding</div>
      <ul class="exp-bullets">
        <li>Designed and executed 100+ commercial advertising creatives, packaging systems, and digital campaigns for regional FMCG and fashion brands (Falez, Seropipe, Souqoom, Romwear).</li>
      </ul>
    </div>

    <!-- Contact & Hiring CTA Box -->
    <div style="margin-top: 8px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(56, 189, 248, 0.1)); border: 1.5px solid rgba(245, 158, 11, 0.4); border-radius: 6px; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 8.5pt; font-weight: 800; color: #ffffff;">Ready for High-Impact Collaboration?</div>
        <div style="font-size: 7.2pt; color: #cbd5e1;">Available for Senior Creative Developer roles, Lead UI/UX Engineering, and Enterprise Consulting.</div>
      </div>
      <div style="text-align: right; font-size: 7.5pt; color: #fbbf24; font-family: 'JetBrains Mono', monospace;">
        <strong>Direct:</strong> contact@omarcreatives.com<br>
        <strong>WhatsApp:</strong> +20 121 186 7464
      </div>
    </div>

    <!-- Footer Page 3 -->
    <div class="page-footer">
      <span>Omar Abdelfattah — Creative Developer & AI Specialist</span>
      <span>Page 3 of 3 • Portfolio: <a href="https://omarcreatives.com">omarcreatives.com</a></span>
    </div>

  </div>

</body>
</html>
`;

const htmlPath = path.join(rootDir, 'dist_visual_resume.html');
fs.writeFileSync(htmlPath, resumeHtml, 'utf8');
console.log('Visual Resume HTML written to:', htmlPath);

const outputPdfRoot = path.join(rootDir, 'Omar_Abdelfattah_Visual_Creative_Resume.pdf');
const outputPdfPublic = path.join(rootDir, 'public', 'Omar_Abdelfattah_Visual_Creative_Resume.pdf');

console.log('Generating High-Resolution Visual PDF via headless browser...');

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
  console.log('SUCCESS! Visual Creative Resume PDF generated successfully at:', outputPdfRoot, `(${sizeKB} KB)`);
  fs.copyFileSync(outputPdfRoot, outputPdfPublic);
  console.log('Copied to public folder:', outputPdfPublic);
} else {
  console.error('PDF generation failed:', res.stderr || res.stdout);
  process.exit(1);
}
