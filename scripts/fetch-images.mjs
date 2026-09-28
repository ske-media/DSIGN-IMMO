/**
 * Télécharge les vraies images depuis images.manifest.json et les normalise
 * (orientation, largeur max 2560 px, JPEG progressif ~85) dans
 * src/assets/images/. Astro génère ensuite AVIF/WebP + srcset au build.
 *
 *   1. Renseignez images.manifest.json : { "hero.jpg": "https://…/photo.jpg", … }
 *      (URL http(s) ou chemin local absolu/relatif)
 *   2. npm run images:fetch
 *
 * Option : une carte de profondeur "hero-depth.jpg" (niveaux de gris, blanc =
 * proche) active le relief 3D précis du hero. Sans elle, une profondeur
 * procédurale est utilisée.
 */
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve('src/assets/images');
await mkdir(OUT, { recursive: true });

const manifest = JSON.parse(await readFile(resolve('images.manifest.json'), 'utf8'));
const entries = Object.entries(manifest).filter(([, src]) => src && !String(src).startsWith('TODO'));

if (!entries.length) {
  console.log('images.manifest.json ne contient aucune URL. Rien à faire.');
  process.exit(0);
}

for (const [name, src] of entries) {
  try {
    let input;
    if (/^https?:\/\//.test(src)) {
      const res = await fetch(src, { headers: { 'user-agent': 'Mozilla/5.0 (DSIGN IMMO image sync)' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      input = Buffer.from(await res.arrayBuffer());
    } else {
      const local = resolve(src);
      if (!existsSync(local)) throw new Error(`fichier introuvable : ${local}`);
      input = await readFile(local);
    }
    const isDepth = name.includes('depth');
    const pipeline = sharp(input).rotate().resize({ width: isDepth ? 1024 : 2560, withoutEnlargement: true });
    if (isDepth) pipeline.grayscale();
    await pipeline.jpeg({ quality: isDepth ? 70 : 86, mozjpeg: true, progressive: true }).toFile(resolve(OUT, name));
    console.log('✓', name, '←', src);
  } catch (e) {
    console.error('✗', name, '—', e.message);
  }
}
console.log('\nTerminé. Lancez `npm run build` pour régénérer les formats optimisés.');
