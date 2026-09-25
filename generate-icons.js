import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="50%" stop-color="#4c1d95" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="gem" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7" />
      <stop offset="50%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#c026d3" />
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background with rounded corners -->
  <rect width="512" height="512" rx="110" fill="url(#bg)" />

  <!-- Outer ambient ring -->
  <circle cx="256" cy="256" r="180" fill="none" stroke="rgba(168, 85, 247, 0.25)" stroke-width="6" stroke-dasharray="16 12" />

  <!-- Diamond / Crystal Shape with Glow -->
  <g filter="url(#glow)">
    <!-- Main diamond polygon -->
    <polygon points="256,90 390,210 256,410 122,210" fill="url(#gem)" stroke="#e9d5ff" stroke-width="4" />
    <!-- Facet highlights -->
    <polygon points="256,90 310,210 256,410" fill="#9333ea" opacity="0.6" />
    <polygon points="256,90 202,210 256,410" fill="#a855f7" opacity="0.8" />
    <polygon points="122,210 256,210 256,90" fill="#c084fc" opacity="0.5" />
    <polygon points="390,210 256,210 256,90" fill="#7e22ce" opacity="0.6" />
    <!-- Top shine reflection -->
    <polygon points="256,98 300,195 256,195 212,195" fill="url(#shine)" opacity="0.75" />
  </g>

  <!-- Controller / Star icon overlay in center -->
  <circle cx="256" cy="256" r="42" fill="#0f172a" opacity="0.85" stroke="#f3e8ff" stroke-width="3" />
  <path d="M246,236 h20 v40 h-20 z M236,246 h40 v20 h-40 z" fill="#facc15" />

  <!-- Branding Text -->
  <text x="256" y="465" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#f5f3ff" text-anchor="middle" letter-spacing="4">NORXSTORE</text>
</svg>`;

async function run() {
  const dirs = [__dirname, path.join(__dirname, 'public'), path.join(__dirname, 'dist')];
  dirs.forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

  // Write SVG
  fs.writeFileSync(path.join(__dirname, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(__dirname, 'public', 'icon.svg'), svgContent);

  const svgBuffer = Buffer.from(svgContent);

  // 512x512
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, 'icon-512.png'), p512);
  fs.writeFileSync(path.join(__dirname, 'public', 'icon-512.png'), p512);

  // 192x192
  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, 'icon-192.png'), p192);
  fs.writeFileSync(path.join(__dirname, 'public', 'icon-192.png'), p192);

  // 180x180 for apple-touch-icon
  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, 'apple-touch-icon.png'), p180);
  fs.writeFileSync(path.join(__dirname, 'public', 'apple-touch-icon.png'), p180);

  // 64x64 favicon.ico (png format inside ico filename)
  const p64 = await sharp(svgBuffer).resize(64, 64).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, 'favicon.ico'), p64);
  fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), p64);

  console.log('All icons generated successfully!');
}

run().catch(console.error);
