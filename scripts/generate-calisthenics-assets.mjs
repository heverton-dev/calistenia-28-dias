import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CALISTHENICS_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141d33"/>
      <stop offset="50%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#05080e"/>
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#fb923c"/>
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>

  <circle cx="256" cy="256" r="190" fill="none" stroke="#f97316" stroke-width="12" stroke-dasharray="30 15" opacity="0.35"/>
  <circle cx="256" cy="256" r="215" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.1"/>

  <g transform="translate(256, 220) scale(1.1)">
    <rect x="-110" y="-18" width="220" height="36" rx="8" fill="url(#orangeGrad)"/>
    <rect x="-40" y="-28" width="80" height="56" rx="12" fill="#0f172a"/>
    <rect x="-160" y="-60" width="36" height="120" rx="12" fill="url(#orangeGrad)"/>
    <rect x="-195" y="-45" width="22" height="90" rx="8" fill="#ffffff" opacity="0.9"/>
    <rect x="124" y="-60" width="36" height="120" rx="12" fill="url(#orangeGrad)"/>
    <rect x="173" y="-45" width="22" height="90" rx="8" fill="#ffffff" opacity="0.9"/>
  </g>

  <text x="256" y="415" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="52" fill="#ffffff" text-anchor="middle" letter-spacing="4">28 DIAS</text>
  <text x="256" y="355" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="24" fill="#f97316" text-anchor="middle" letter-spacing="6">CALISTENIA</text>
</svg>
`;

fs.writeFileSync('public/calisthenics-icon.svg', CALISTHENICS_ICON_SVG);

const OUTPUT_DIR = 'public/icons';
const SPLASH_DIR = 'public';

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SPLASH_SCREENS = [
  { width: 640, height: 1136, name: 'apple-splash-640x1136.png' },
  { width: 750, height: 1334, name: 'apple-splash-750x1334.png' },
  { width: 828, height: 1792, name: 'apple-splash-828x1792.png' },
  { width: 1125, height: 2436, name: 'apple-splash-1125x2436.png' },
  { width: 1242, height: 2688, name: 'apple-splash-1242x2688.png' },
  { width: 1170, height: 2532, name: 'apple-splash-1170x2532.png' },
  { width: 1290, height: 2796, name: 'apple-splash-1290x2796.png' },
  { width: 1179, height: 2556, name: 'apple-splash-1179x2556.png' },
  { width: 1290, height: 2796, name: 'apple-splash-1290x2796b.png' },
  { width: 1536, height: 2048, name: 'apple-splash-1536x2048.png' },
  { width: 1668, height: 2224, name: 'apple-splash-1668x2224.png' },
  { width: 1668, height: 2388, name: 'apple-splash-1668x2388.png' },
  { width: 2048, height: 2732, name: 'apple-splash-2048x2732.png' },
];

async function run() {
  console.log('💪 Gerando ícones reais de Calistenia...');

  for (const size of ICON_SIZES) {
    await sharp('public/calisthenics-icon.svg')
      .resize(size, size)
      .png()
      .toFile(path.join(OUTPUT_DIR, `icon-${size}x${size}.png`));
  }

  await sharp('public/calisthenics-icon.svg')
    .resize(512, 512)
    .png()
    .toFile(path.join(OUTPUT_DIR, 'icon-512x512-maskable.png'));

  await sharp('public/calisthenics-icon.svg')
    .resize(180, 180)
    .png()
    .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon-180x180.png'));

  console.log('📱 Gerando Splash Screens iOS com tema de Calistenia...');
  for (const splash of SPLASH_SCREENS) {
    const splashSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${splash.width}" height="${splash.height}" viewBox="0 0 ${splash.width} ${splash.height}">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#141d33"/>
            <stop offset="100%" stop-color="#090d16"/>
          </linearGradient>
        </defs>
        <rect width="${splash.width}" height="${splash.height}" fill="url(#bgGrad)"/>
        <g transform="translate(${(splash.width - 320) / 2}, ${(splash.height - 320) / 2}) scale(0.62)">
          ${CALISTHENICS_ICON_SVG}
        </g>
      </svg>
    `;
    await sharp(Buffer.from(splashSvg))
      .resize(splash.width, splash.height)
      .png()
      .toFile(path.join(SPLASH_DIR, splash.name));
  }

  console.log('✅ Ícones e Splash Screens de Calistenia gerados com sucesso!');
}

run().catch(console.error);