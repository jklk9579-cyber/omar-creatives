import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const darrowDir = path.join(process.cwd(), 'public/images/darrow');

async function createMacBookMockup(screenshotPath, outputPath, title = 'D-Arrow Platform') {
  if (!fs.existsSync(screenshotPath)) {
    console.error('Screenshot not found:', screenshotPath);
    return;
  }

  const canvasWidth = 1920;
  const canvasHeight = 1080;

  // Screen dimensions inside the MacBook
  const screenWidth = 1440;
  const screenHeight = 900;
  const screenX = (canvasWidth - screenWidth) / 2; // 240
  const screenY = 80;

  // Resize the actual screenshot to fit the screen
  const resizedScreen = await sharp(screenshotPath)
    .resize(screenWidth, screenHeight, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Create MacBook Frame SVG
  const bezelPadding = 24;
  const frameWidth = screenWidth + (bezelPadding * 2); // 1488
  const frameHeight = screenHeight + bezelPadding + 16; // 940
  const frameX = screenX - bezelPadding; // 216
  const frameY = screenY - bezelPadding; // 56

  // Laptop Base dimensions
  const baseWidth = frameWidth + 160; // 1648
  const baseHeight = 22;
  const baseX = (canvasWidth - baseWidth) / 2;
  const baseY = frameY + frameHeight;

  const notchWidth = 160;
  const notchHeight = 6;
  const notchX = (canvasWidth - notchWidth) / 2;
  const notchY = baseY;

  const svgOverlay = `
  <svg width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Ambient Glow -->
      <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#FF4D6D" stop-opacity="0.15" />
        <stop offset="40%" stop-color="#FF9A3C" stop-opacity="0.08" />
        <stop offset="80%" stop-color="#070913" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#05060B" stop-opacity="1" />
      </radialGradient>

      <!-- Aluminum Frame Gradient -->
      <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2a2d3d" />
        <stop offset="50%" stop-color="#181a24" />
        <stop offset="100%" stop-color="#0f111a" />
      </linearGradient>

      <!-- Bezel Border Highlight -->
      <linearGradient id="borderHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 0.3)" />
        <stop offset="50%" stop-color="rgba(255, 77, 109, 0.2)" />
        <stop offset="100%" stop-color="rgba(255, 255, 255, 0.1)" />
      </linearGradient>

      <!-- Laptop Base Gradient -->
      <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#3a3d4d" />
        <stop offset="30%" stop-color="#222533" />
        <stop offset="100%" stop-color="#10121a" />
      </linearGradient>

      <!-- Drop Shadow Filter -->
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="40" stdDeviation="50" flood-color="#000000" flood-opacity="0.8" />
        <feDropShadow dx="0" dy="15" stdDeviation="25" flood-color="#FF4D6D" flood-opacity="0.12" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${canvasWidth}" height="${canvasHeight}" fill="url(#bgGlow)" />

    <!-- Grid lines -->
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1" />
    </pattern>
    <rect width="${canvasWidth}" height="${canvasHeight}" fill="url(#grid)" />

    <!-- MacBook Top Lid with Shadow -->
    <rect x="${frameX}" y="${frameY}" width="${frameWidth}" height="${frameHeight}" rx="24" ry="24" fill="url(#chassisGrad)" stroke="url(#borderHighlight)" stroke-width="2" filter="url(#dropShadow)" />

    <!-- Inner Screen Bezel -->
    <rect x="${screenX - 4}" y="${screenY - 4}" width="${screenWidth + 8}" height="${screenHeight + 8}" rx="8" fill="#000000" stroke="#11131a" stroke-width="1" />

    <!-- Top Camera Notch -->
    <rect x="${(canvasWidth - 140) / 2}" y="${screenY - 4}" width="140" height="18" rx="6" fill="#000000" />
    <circle cx="${canvasWidth / 2}" cy="${screenY + 4}" r="3.5" fill="#1c202d" stroke="#2c3245" stroke-width="1" />
    <circle cx="${(canvasWidth / 2) + 25}" cy="${screenY + 4}" r="1.5" fill="#00ff66" opacity="0.6" />

    <!-- Laptop Base Lip -->
    <path d="M ${baseX} ${baseY} L ${baseX + baseWidth} ${baseY} Q ${baseX + baseWidth - 8} ${baseY + baseHeight} ${baseX + baseWidth - 30} ${baseY + baseHeight} L ${baseX + 30} ${baseY + baseHeight} Q ${baseX + 8} ${baseY + baseHeight} ${baseX} ${baseY} Z" fill="url(#baseGrad)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />

    <!-- Laptop Thumb Notch -->
    <rect x="${notchX}" y="${notchY}" width="${notchWidth}" height="${notchHeight}" rx="3" fill="#0a0c12" />

    <!-- Glass Glare Reflex -->
    <path d="M ${screenX} ${screenY} L ${screenX + 500} ${screenY} L ${screenX} ${screenY + 700} Z" fill="rgba(255, 255, 255, 0.018)" pointer-events="none" />
  </svg>
  `;

  // Composite the real screenshot into the screen position
  await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: resizedScreen,
        top: Math.round(screenY),
        left: Math.round(screenX)
      }
    ])
    .webp({ quality: 92 })
    .toFile(outputPath);

  console.log('Generated realistic mockup:', outputPath);
}

async function run() {
  await createMacBookMockup(
    path.join(darrowDir, 'darrow-web-hero.png'),
    path.join(darrowDir, 'mockup-darrow-hero.webp'),
    'D-Arrow Official Platform'
  );

  await createMacBookMockup(
    path.join(darrowDir, 'darrow-influencer.png'),
    path.join(darrowDir, 'mockup-darrow-influencer.webp'),
    'D-Arrow Influencer Portal'
  );

  await createMacBookMockup(
    path.join(darrowDir, 'darrow-pricing-full.png'),
    path.join(darrowDir, 'mockup-darrow-pricing.webp'),
    'D-Arrow Interactive Packages'
  );

  await createMacBookMockup(
    path.join(darrowDir, 'darrow-cafe.png'),
    path.join(darrowDir, 'mockup-darrow-cafe.webp'),
    'D-Arrow Industry Solutions'
  );

  await createMacBookMockup(
    path.join(darrowDir, 'darrow-store.png'),
    path.join(darrowDir, 'mockup-darrow-store.webp'),
    'D-Arrow Digital Store'
  );

  const webDir = path.join(process.cwd(), 'public/images/webdesigns');
  await createMacBookMockup(
    path.join(webDir, 'al-awsat-news.jpg'),
    path.join(webDir, 'mockup-al-awsat.webp'),
    'Al-Awsat News Digital Publishing'
  );

  await createMacBookMockup(
    path.join(webDir, 'arkan-website.jpg'),
    path.join(webDir, 'mockup-arkan.webp'),
    'Arkan Architecture Web Experience'
  );
}

run().catch(console.error);
