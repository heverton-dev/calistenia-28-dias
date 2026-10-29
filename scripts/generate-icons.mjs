import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_SVG = 'public/icon.svg';
const OUTPUT_DIR = 'public/icons';
const SPLASH_DIR = 'public';

// Criar diretórios
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(SPLASH_DIR, { recursive: true });

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SPLASH_SCREENS = [
  // iPhone
  { width: 640, height: 1136, name: 'apple-splash-640x1136.png' },     // iPhone 5/SE
  { width: 750, height: 1334, name: 'apple-splash-750x1334.png' },     // iPhone 6/7/8
  { width: 828, height: 1792, name: 'apple-splash-828x1792.png' },     // iPhone XR/11
  { width: 1125, height: 2436, name: 'apple-splash-1125x2436.png' },   // iPhone X/XS/11 Pro
  { width: 1242, height: 2688, name: 'apple-splash-1242x2688.png' },   // iPhone XS Max/11 Pro Max
  { width: 1170, height: 2532, name: 'apple-splash-1170x2532.png' },   // iPhone 12/13/14 Pro
  { width: 1290, height: 2796, name: 'apple-splash-1290x2796.png' },   // iPhone 12/13/14 Pro Max
  { width: 1179, height: 2556, name: 'apple-splash-1179x2556.png' },   // iPhone 15 Pro
  { width: 1290, height: 2796, name: 'apple-splash-1290x2796b.png' },  // iPhone 15 Pro Max
  // iPad
  { width: 1536, height: 2048, name: 'apple-splash-1536x2048.png' },   // iPad 9.7"
  { width: 1668, height: 2224, name: 'apple-splash-1668x2224.png' },   // iPad 10.5"
  { width: 1668, height: 2388, name: 'apple-splash-1668x2388.png' },   // iPad 11"
  { width: 2048, height: 2732, name: 'apple-splash-2048x2732.png' },   // iPad 12.9"
];

async function generateIcons() {
  console.log('🎨 Gerando ícones PWA...');

  for (const size of ICON_SIZES) {
    await sharp(INPUT_SVG)
      .resize(size, size, { fit: 'contain', background: '#090d16' })
      .png()
      .toFile(path.join(OUTPUT_DIR, `icon-${size}x${size}.png`));
    console.log(`  ✓ icon-${size}x${size}.png`);
  }

  // Máscara para ícone maskable (Android)
  await sharp(INPUT_SVG)
    .resize(512, 512, { fit: 'contain', background: '#090d16' })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'icon-512x512-maskable.png'));
  console.log(`  ✓ icon-512x512-maskable.png`);

  // Apple touch icon (180x180 para iOS)
  await sharp(INPUT_SVG)
    .resize(180, 180, { fit: 'contain', background: '#090d16' })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon-180x180.png'));
  console.log(`  ✓ apple-touch-icon-180x180.png`);
}

async function generateSplashScreens() {
  console.log('\n📱 Gerando splash screens iOS...');

  const svgBuffer = fs.readFileSync(INPUT_SVG);

  for (const splash of SPLASH_SCREENS) {
    // Criar SVG em tamanho real com background
    const splashSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${splash.width}" height="${splash.height}" viewBox="0 0 ${splash.width} ${splash.height}">
        <rect width="${splash.width}" height="${splash.height}" fill="#090d16"/>
        <g transform="translate(${(splash.width - 512) / 2}, ${(splash.height - 512) / 2})">
          <rect x="0" y="0" width="512" height="512" rx="128" fill="#090d16"/>
          <circle cx="256" cy="256" r="220" fill="none" stroke="#f97316" stroke-width="16" opacity="0.3"/>
          <path d="M120 256 L200 256 L256 160 L312 352 L368 256 L420 256" fill="none" stroke="#f97316" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    `;

    await sharp(Buffer.from(splashSvg))
      .resize(splash.width, splash.height, { fit: 'fill' })
      .png()
      .toFile(path.join(SPLASH_DIR, splash.name));
    console.log(`  ✓ ${splash.name} (${splash.width}x${splash.height})`);
  }
}

async function generateManifestIcons() {
  console.log('\n📄 Gerando manifest.json atualizado...');

  const manifest = {
    name: "Calistenia 28 Dias",
    short_name: "Calistenia",
    description: "Treinos Diários de Calistenia 28 Dias - 100% Offline",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#090d16",
    orientation: "portrait",
    icons: ICON_SIZES.map(size => ({
      src: `/icons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any"
    })).concat({
      src: "/icons/icon-512x512-maskable.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable"
    })
  };

  fs.writeFileSync(
    path.join('public', 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`  ✓ manifest.json atualizado`);
}

async function main() {
  await generateIcons();
  await generateSplashScreens();
  await generateManifestIcons();
  console.log('\n✅ Tudo gerado com sucesso!');
}

main().catch(console.error);