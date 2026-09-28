import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dsignimmo.com',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    format: 'directory',
  },
  image: {
    // Modern formats + responsive sizes handled by <Picture>/<Image>
    responsiveStyles: true,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-GB' },
      },
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('lenis')) return 'lenis';
          },
        },
      },
    },
  },
});
