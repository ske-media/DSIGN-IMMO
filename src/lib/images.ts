import type { ImageMetadata } from 'astro';

/**
 * Charge les images de src/assets/images par nom de fichier.
 * Astro optimise (AVIF/WebP, srcset) au build.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/').pop()!;
  byName.set(name, mod.default);
}

export function img(name: string): ImageMetadata {
  const meta = byName.get(name);
  if (!meta) {
    throw new Error(
      `Image manquante : src/assets/images/${name}. Lancez "npm run images:placeholders" ou "npm run images:fetch".`
    );
  }
  return meta;
}

export function hasImg(name: string): boolean {
  return byName.has(name);
}
