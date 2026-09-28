/**
 * Moteur d'animation global : Lenis (scroll fluide) + GSAP ScrollTrigger.
 * Chargé en différé, désactivé si prefers-reduced-motion.
 * Tous les effets ont un fallback CSS (data-in) : le contenu reste
 * visible et indexable sans JavaScript.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

gsap.registerPlugin(ScrollTrigger);

/* ─── Lenis ────────────────────────────────────────────── */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.documentElement.classList.add('lenis');

  // Liens d'ancre : scroll fluide
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href')!.replace(/^\//, '');
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis!.scrollTo(target as HTMLElement, { offset: -20 });
      history.pushState(null, '', hash);
    });
  });
}

/* ─── Split lines (léger, sans plugin payant) ──────────── */
function splitLines(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  const words = el.innerText.trim().split(/\s+/);
  el.innerHTML = '';
  const frag = document.createDocumentFragment();
  words.forEach((w, i) => {
    const s = document.createElement('span');
    s.className = 'w';
    s.textContent = w + (i < words.length - 1 ? ' ' : '');
    s.style.display = 'inline-block';
    s.style.whiteSpace = 'pre';
    frag.appendChild(s);
  });
  el.appendChild(frag);
  // Regroupe par ligne (offsetTop)
  const ws = Array.from(el.querySelectorAll<HTMLSpanElement>('.w'));
  const lines: HTMLSpanElement[][] = [];
  let top = -1;
  ws.forEach((w) => {
    if (w.offsetTop !== top) {
      top = w.offsetTop;
      lines.push([]);
    }
    lines[lines.length - 1].push(w);
  });
  el.innerHTML = '';
  lines.forEach((ln) => {
    const line = document.createElement('span');
    line.className = 'line';
    const inner = document.createElement('span');
    inner.textContent = ln.map((w) => w.textContent).join('').trimEnd();
    line.appendChild(inner);
    el.appendChild(line);
  });
  el.dataset.splitDone = '1';
}

/* ─── Reveals (IntersectionObserver, très bon marché) ──── */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        (en.target as HTMLElement).setAttribute('data-in', '');
        io.unobserve(en.target);
      }
    });
  },
  { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
);

function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (!reduced) splitLines(el);
    io.observe(el);
  });
  document.querySelectorAll<HTMLElement>('.fade-up, .reveal-img').forEach((el) => io.observe(el));
  // Recalcule les lignes au resize (debounce)
  let t = 0;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
  });
}

/* ─── Header : se cache en descendant, réapparaît en montant ── */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 120 && y > last + 4) header.classList.add('is-hidden');
    else if (y < last - 4) header.classList.remove('is-hidden');
    last = y;
  };
  if (lenis) lenis.on('scroll', onScroll);
  else window.addEventListener('scroll', onScroll, { passive: true });

  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (burger && menu) {
    const toggle = (open?: boolean) => {
      const next = open ?? burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', String(next));
      menu.hidden = !next;
      document.body.style.overflow = next ? 'hidden' : '';
      if (next) lenis?.stop();
      else lenis?.start();
    };
    burger.addEventListener('click', () => toggle());
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
    window.addEventListener('keydown', (e) => e.key === 'Escape' && toggle(false));
  }
}

/* ─── Boutons magnétiques ─────────────────────────────── */
function initMagnet() {
  if (!finePointer || reduced) return;
  document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.25);
      yTo((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ─── Hero : parallaxe & sortie ───────────────────────── */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || reduced) return;
  const title = hero.querySelector('[data-hero-title]');
  const media = hero.querySelector('[data-hero-media]');
  const card = hero.querySelector('[data-hero-card]');

  // Entrée 3D des lignes du titre
  const lines = hero.querySelectorAll('[data-hero-line]');
  gsap.set(hero, { perspective: 1200 });
  gsap.fromTo(
    lines,
    { yPercent: 60, rotateX: -55, opacity: 0, transformOrigin: '50% 100% -40px' },
    { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.4, ease: 'expo.out', stagger: 0.09, delay: 0.15 }
  );
  gsap.from(hero.querySelectorAll('[data-hero-fade]'), {
    y: 24,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    stagger: 0.08,
    delay: 0.6,
  });

  // Scroll : le texte monte plus vite que l'image (profondeur)
  gsap
    .timeline({
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
    .to(title, { yPercent: -30, opacity: 0.2, ease: 'none' }, 0)
    .to(media, { yPercent: 18, scale: 1.08, ease: 'none' }, 0)
    .to(card, { yPercent: -60, opacity: 0, ease: 'none' }, 0);
}

/* ─── Manifeste : révélation mot à mot (pinned) ───────── */
function initManifesto() {
  const el = document.querySelector<HTMLElement>('[data-manifesto]');
  if (!el) return;
  const text = el.querySelector<HTMLElement>('[data-manifesto-text]');
  if (!text) return;
  const words = text.innerText.trim().split(/\s+/);
  text.innerHTML = words.map((w) => `<span class="mw">${w}</span>`).join(' ');
  if (reduced) return;
  gsap.fromTo(
    text.querySelectorAll('.mw'),
    { color: '#6e675d' },
    {
      color: '#0f0e0c',
      stagger: 0.04,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 55%', scrub: 0.6 },
    }
  );
}

/* ─── Compteurs ───────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    if (reduced || Number.isNaN(target)) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
    });
  });
}

/* ─── Histoire : défilement horizontal épinglé ────────── */
function initStory() {
  const wrap = document.querySelector<HTMLElement>('[data-story]');
  const track = wrap?.querySelector<HTMLElement>('[data-story-track]');
  if (!wrap || !track || reduced) return;

  ScrollTrigger.matchMedia({
    '(min-width: 900px)': () => {
      const getX = () => -(track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: getX,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 200}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      // Parallaxe interne des images des chapitres
      track.querySelectorAll<HTMLElement>('[data-story-img]').forEach((im) => {
        gsap.fromTo(
          im,
          { xPercent: -12 },
          { xPercent: 12, ease: 'none', scrollTrigger: { trigger: im, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }
        );
      });
      const prog = wrap.querySelector<HTMLElement>('[data-story-progress]');
      if (prog) gsap.to(prog, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top top', end: () => `+=${track.scrollWidth - window.innerWidth + 200}`, scrub: true } });
    },
  });
}

/* ─── Cartes 3D (tilt) ────────────────────────────────── */
function initTilt() {
  if (!finePointer || reduced) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotateX', { duration: 0.8, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotateY', { duration: 0.8, ease: 'power3' });
    gsap.set(card, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx(-py * 10);
      ry(px * 12);
      card.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
      card.style.setProperty('--my', `${(py + 0.5) * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      rx(0);
      ry(0);
    });
  });
}

/* ─── Galerie : plans 3D au scroll ────────────────────── */
function initGallery() {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('[data-gallery-item]').forEach((item, i) => {
    gsap.fromTo(
      item,
      { rotateY: i % 2 ? 18 : -18, z: -160, y: 80, transformPerspective: 1200 },
      {
        rotateY: 0,
        z: 0,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 95%', end: 'top 45%', scrub: 0.5 },
      }
    );
    const im = item.querySelector('img');
    if (im)
      gsap.fromTo(im, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/* ─── Processus : ligne qui se dessine + étapes ───────── */
function initProcess() {
  const line = document.querySelector<HTMLElement>('[data-process-line]');
  if (!line || reduced) return;
  gsap.fromTo(
    line,
    { scaleY: 0 },
    { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: line.parentElement, start: 'top 70%', end: 'bottom 60%', scrub: true } }
  );
}

/* ─── Parallaxe générique data-parallax="0.2" ─────────── */
function initParallax() {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 0.15) * 100;
    gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/* ─── Boot ────────────────────────────────────────────── */
function boot() {
  initReveals();
  initHeader();
  initMagnet();
  initHero();
  initManifesto();
  initCounters();
  initStory();
  initTilt();
  initGallery();
  initProcess();
  initParallax();
  // Hero WebGL (fake 3D) — chargé après le LCP
  const gl = document.querySelector<HTMLCanvasElement>('[data-hero-gl]');
  if (gl && !reduced && !(navigator as any).connection?.saveData) {
    const start = () => import('./hero-gl').then((m) => m.mountHeroGL(gl)).catch(() => {});
    'requestIdleCallback' in window ? (window as any).requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 600);
  }
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
