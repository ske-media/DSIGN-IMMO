/**
 * Génère des visuels temporaires (dégradés + grain) pour toutes les images
 * attendues par le site, afin que le build fonctionne avant l'intégration
 * des vraies photos. Ne remplace JAMAIS un fichier existant.
 *
 *   npm run images:placeholders
 */
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve('src/assets/images');
mkdirSync(OUT, { recursive: true });

const palettes = [
  ['#3b2a20', '#b9a58e', '#e6dccb'],
  ['#1b1a18', '#6b4630', '#d9c8b4'],
  ['#2a2723', '#8c7360', '#ece7df'],
  ['#4a2e1e', '#b86b45', '#f1e8dc'],
  ['#14120f', '#4d443b', '#c9b9a5'],
  ['#33261d', '#a08a70', '#eee6d8'],
];

const SPECS = [
  ['hero.jpg', 2560, 1600, 0],
  ['elodie-portrait.jpg', 1400, 1750, 1],
  ['elodie-atelier.jpg', 1600, 1200, 2],
  ['expertise-particuliers.jpg', 1200, 1500, 3],
  ['expertise-loueurs.jpg', 1200, 1500, 4],
  ['expertise-commerces.jpg', 1200, 1500, 5],
  ['projet-01.jpg', 1600, 1200, 1],
  ['projet-02.jpg', 1600, 1200, 2],
  ['projet-03.jpg', 1200, 1600, 3],
  ['projet-04.jpg', 1600, 1200, 4],
  ['projet-05.jpg', 1600, 1200, 5],
  ['projet-06.jpg', 1200, 1600, 0],
  ['og.jpg', 1200, 630, 3],
];

function svg(w, h, [a, b, c], label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <radialGradient id="r" cx=".3" cy=".25" r=".8">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".25"/>
    </radialGradient>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .08 0"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <rect x="${w * 0.08}" y="${h * 0.12}" width="${w * 0.5}" height="${h * 0.76}" fill="none" stroke="${c}" stroke-opacity=".35" stroke-width="2"/>
  <rect x="${w * 0.55}" y="${h * 0.3}" width="${w * 0.37}" height="${h * 0.58}" fill="${a}" fill-opacity=".35"/>
  <rect width="100%" height="100%" filter="url(#n)"/>
  <text x="${w * 0.08}" y="${h * 0.93}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(h * 0.03)}" fill="${c}" fill-opacity=".7" letter-spacing="4">${label}</text>
</svg>`;
}

let made = 0;
for (const [name, w, h, p] of SPECS) {
  const file = resolve(OUT, name);
  if (existsSync(file)) continue;
  const label = name === 'og.jpg' ? 'DSIGN IMMO — ELODIE NOTARIANI' : `PLACEHOLDER — ${name.toUpperCase()}`;
  await sharp(Buffer.from(svg(w, h, palettes[p], label)))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(file);
  made++;
  console.log('✓', name);
}
console.log(made ? `${made} placeholder(s) créé(s) dans src/assets/images/` : 'Toutes les images existent déjà.');
