# DSIGN IMMO — site vitrine

Refonte complète de [dsignimmo.com](https://www.dsignimmo.com) : architecture d'intérieur par **Elodie Notariani**.
Site statique ultra-léger (Astro 7), scroll-telling GSAP + Lenis, hero WebGL « fake 3D », SEO technique et éditorial.

## Démarrer

```bash
npm install
npm run images:placeholders   # visuels temporaires (déjà générés, ne remplace jamais un fichier existant)
npm run dev                   # http://localhost:4321
npm run build && npm run preview
```

## Intégrer les vraies images

1. Renseignez `images.manifest.json` avec l'URL (ou le chemin local) de chaque visuel réel.
2. `npm run images:fetch` — les images sont normalisées (≤ 2560 px, JPEG progressif) dans `src/assets/images/`.
3. `npm run build` — Astro génère AVIF + WebP + srcset responsive automatiquement.

Option : une carte de profondeur `hero-depth.jpg` (niveaux de gris, blanc = proche) rend le relief 3D du hero exact.
Sans elle, une profondeur procédurale est utilisée.

## Contenu à valider

Tout le contenu est centralisé dans `src/data/site.ts`. Les champs `TODO` (ville, adresse, réseaux sociaux,
vrais projets) et les textes à faire relire par Elodie sont listés dans `CONTENT.md`.

## Structure

| Page | URL | Rôle SEO |
| --- | --- | --- |
| Accueil FR | `/` | requête principale « architecte d'intérieur » + marque |
| Accueil EN | `/en/` | version anglaise (hreflang) |
| Elodie Notariani | `/elodie-notariani/` | page personne (Person / ProfilePage) |
| Expertises | `/architecte-interieur/` | page pilier services |
| Particuliers | `/architecte-interieur-particuliers/` | longue traîne rénovation / aménagement |
| Locatif | `/amenagement-investissement-locatif/` | longue traîne investissement locatif / meublé |
| Commerces | `/agencement-commerce-restaurant-bureaux/` | longue traîne agencement commerce / restaurant |
| Contact | `/contact/` | conversion |
| Mentions légales | `/mentions-legales/` | noindex |

## Performance (Lighthouse, build local)

| | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 94 | 96 | 100 | 100 |
| Desktop | 100 | 96 | 100 | 100 |

Leviers : zéro framework client, CSS inliné, polices auto-hébergées et préchargées, image LCP préchargée
(`fetchpriority=high`, AVIF), GSAP/Lenis chargés en différé, WebGL chargé après le LCP et uniquement si
`prefers-reduced-motion` n'est pas actif, CLS = 0.

## Déploiement

Sortie statique dans `dist/`. `vercel.json` et `public/_headers` (Netlify / Cloudflare Pages) fournissent les
en-têtes de sécurité et de cache immuable pour `/_astro/*` et `/fonts/*`.
