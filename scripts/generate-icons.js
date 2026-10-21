import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create SVG for Tareq Portfolio icon with warm gold theme
const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff4d0" />
      <stop offset="45%" stop-color="#f59e0b" />
      <stop offset="85%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#78350f" />
    </radialGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181510" />
      <stop offset="50%" stop-color="#2a2215" />
      <stop offset="100%" stop-color="#130f0a" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#f59e0b" flood-opacity="0.5"/>
    </filter>
  </defs>
  
  <!-- Outer rounded rect -->
  <rect width="512" height="512" rx="100" fill="url(#bgGrad)" />
  
  <!-- Outer Gold Ring -->
  <circle cx="256" cy="256" r="210" fill="none" stroke="url(#borderGrad)" stroke-width="8" opacity="0.9" />
  <circle cx="256" cy="256" r="195" fill="none" stroke="#fef08a" stroke-width="2" opacity="0.6" stroke-dasharray="10 6" />

  <!-- Inner Soft Gold Glow Circle -->
  <circle cx="256" cy="256" r="170" fill="url(#bgGrad)" filter="url(#shadow)" stroke="url(#borderGrad)" stroke-width="3" />
  
  <!-- Monogram MT with Gold Styling -->
  <text x="256" y="270" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="140" fill="url(#borderGrad)" text-anchor="middle" dominant-baseline="middle" letter-spacing="4">MT</text>
  
  <!-- Subtitle Tareq Portfolio -->
  <text x="256" y="360" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="28" fill="#fef08a" text-anchor="middle" letter-spacing="6">MD TAREQ</text>
  <text x="256" y="160" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="22" fill="#fde68a" text-anchor="middle" letter-spacing="3">PORTFOLIO</text>
</svg>
`;

// Maskable icon with 15% safe padding
const svgMaskable = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c160e" />
      <stop offset="50%" stop-color="#2c2214" />
      <stop offset="100%" stop-color="#120e09" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
  </defs>
  
  <rect width="512" height="512" fill="url(#bgGrad)" />
  
  <!-- Safe zone inner circle (around 75% size) -->
  <circle cx="256" cy="256" r="175" fill="none" stroke="url(#borderGrad)" stroke-width="8" opacity="0.9" />
  <circle cx="256" cy="256" r="160" fill="none" stroke="#fef08a" stroke-width="2" opacity="0.6" stroke-dasharray="8 6" />
  
  <text x="256" y="270" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="120" fill="url(#borderGrad)" text-anchor="middle" dominant-baseline="middle" letter-spacing="4">MT</text>
  <text x="256" y="340" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="24" fill="#fef08a" text-anchor="middle" letter-spacing="5">MD TAREQ</text>
</svg>
`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon.trim());

async function generate() {
  await sharp(Buffer.from(svgIcon))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  await sharp(Buffer.from(svgIcon))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  await sharp(Buffer.from(svgIcon))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(Buffer.from(svgMaskable))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  await sharp(Buffer.from(svgIcon))
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('All PWA icons generated successfully!');
}

generate().catch(console.error);
