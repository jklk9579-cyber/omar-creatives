import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function createVerticalPhoneMockup() {
  const framePath = path.join(process.cwd(), 'public/images/ai-video/frame-1.jpg');
  const outputPath = path.join(process.cwd(), 'public/images/ai-cinematic-cover.jpg');

  const canvasWidth = 1200;
  const canvasHeight = 800;

  // Phone screen dimensions
  const phoneWidth = 380;
  const phoneHeight = 680;
  const phoneX = (canvasWidth - phoneWidth) / 2; // 410
  const phoneY = 60;

  // Resize the actual frame to fit phone screen
  const resizedScreen = await sharp(framePath)
    .resize(phoneWidth, phoneHeight, { fit: 'cover' })
    .toBuffer();

  const svgOverlay = `
  <svg width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Ambient Glow -->
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.18" />
        <stop offset="40%" stop-color="#1c1d24" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#07080c" stop-opacity="1" />
      </radialGradient>

      <!-- Titanium Phone Frame -->
      <linearGradient id="phoneBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8a7538" />
        <stop offset="50%" stop-color="#3a3424" />
        <stop offset="100%" stop-color="#c4a54d" />
      </linearGradient>

      <!-- Drop Shadow -->
      <filter id="phoneShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="35" stdDeviation="40" flood-color="#000000" flood-opacity="0.85" />
        <feDropShadow dx="0" dy="15" stdDeviation="25" flood-color="#D4AF37" flood-opacity="0.15" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${canvasWidth}" height="${canvasHeight}" fill="url(#bgGlow)" />

    <!-- Grid lines -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1" />
    </pattern>
    <rect width="${canvasWidth}" height="${canvasHeight}" fill="url(#grid)" />

    <!-- Outer Phone Body -->
    <rect x="${phoneX - 12}" y="${phoneY - 12}" width="${phoneWidth + 24}" height="${phoneHeight + 24}" rx="48" ry="48" fill="#121318" stroke="url(#phoneBorder)" stroke-width="3" filter="url(#phoneShadow)" />

    <!-- Inner Screen Bezel -->
    <rect x="${phoneX - 2}" y="${phoneY - 2}" width="${phoneWidth + 4}" height="${phoneHeight + 4}" rx="38" fill="#000000" />

    <!-- Dynamic Island Notch -->
    <rect x="${(canvasWidth - 110) / 2}" y="${phoneY + 12}" width="110" height="26" rx="13" fill="#000000" />
    <circle cx="${(canvasWidth / 2) + 30}" cy="${phoneY + 25}" r="4" fill="#0a1526" stroke="#1b283d" stroke-width="1" />

    <!-- Speaker Bar -->
    <rect x="${(canvasWidth - 50) / 2}" y="${phoneY + 4}" width="50" height="3" rx="1.5" fill="#2a2d36" />
  </svg>
  `;

  await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: resizedScreen,
        top: Math.round(phoneY),
        left: Math.round(phoneX)
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log('Generated phone mockup with real video frame:', outputPath);
}

createVerticalPhoneMockup().catch(console.error);
