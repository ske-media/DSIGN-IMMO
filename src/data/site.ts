/**
 * Source unique de vérité pour le contenu et le SEO.
 * ─────────────────────────────────────────────────────────────
 * Les informations factuelles (email, téléphone, cibles clients)
 * proviennent du site dsignimmo.com actuel. Les champs marqués
 * TODO sont à compléter par DSIGN IMMO (voir CONTENT.md).
 */

export const SITE = {
  name: 'DSIGN IMMO',
  legalName: 'DSIGN IMMO',
  url: 'https://www.dsignimmo.com',
  founder: 'Elodie Notariani',
  founderFirst: 'Elodie',
  founderLast: 'Notariani',
  email: 'contact@dsignimmo.com',
  phoneDisplay: '+33 (0)6 50 43 92 98',
  phoneHref: 'tel:+33650439298',
  // TODO : ville / zone d'intervention (ex. "Lyon", "Paris & Île-de-France").
  city: '',
  region: 'France',
  // TODO : adresse postale si vous souhaitez l'afficher (fiche Google Business).
  streetAddress: '',
  postalCode: '',
  // TODO : liens sociaux réels (laisser vide pour masquer).
  social: {
    instagram: '',
    linkedin: '',
    pinterest: '',
  },
  themeColor: '#0f0e0c',
} as const;

export type Locale = 'fr' | 'en';

/* ───────────────────────── Images attendues ─────────────────────────
 * Ces fichiers doivent exister dans src/assets/images/.
 * `npm run images:placeholders` génère des visuels temporaires,
 * `npm run images:fetch` télécharge les vraies images (images.manifest.json).
 */
export const IMAGES = {
  hero: 'hero.jpg',
  heroDepth: 'hero-depth.jpg',
  portrait: 'elodie-portrait.jpg',
  atelier: 'elodie-atelier.jpg',
  particuliers: 'expertise-particuliers.jpg',
  loueurs: 'expertise-loueurs.jpg',
  commerces: 'expertise-commerces.jpg',
  projects: [
    'projet-01.jpg',
    'projet-02.jpg',
    'projet-03.jpg',
    'projet-04.jpg',
    'projet-05.jpg',
    'projet-06.jpg',
  ],
  og: 'og.jpg',
} as const;

/* ───────────────────────── Expertises ───────────────────────── */
export interface Expertise {
  slug: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  short: string;
  intro: string;
  bullets: string[];
  seoTitle: string;
  seoDescription: string;
  image: string;
  keywords: string[];
  chapters: { title: string; text: string }[];
}

export const EXPERTISES: Expertise[] = [
  {
    slug: 'architecte-interieur-particuliers',
    eyebrow: '01 — Particuliers',
    title: 'Habiter',
    titleAccent: 'vraiment',
    short:
      'Rénovation, réagencement, décoration : un intérieur pensé pour votre façon de vivre, pas pour un catalogue.',
    intro:
      "Votre appartement ou votre maison raconte déjà quelque chose. Elodie Notariani l'écoute, puis redessine les volumes, la lumière et les matières pour que chaque pièce serve votre quotidien et vous ressemble.",
    bullets: [
      'Rénovation complète ou partielle',
      'Réagencement des volumes et circulations',
      'Cuisine, salle de bain, pièces de vie',
      'Décoration, mobilier sur mesure, matériaux',
      'Plans 2D, visuels 3D, suivi de chantier',
    ],
    seoTitle: "Architecte d'intérieur pour particuliers — Rénovation & aménagement | DSIGN IMMO",
    seoDescription:
      "Architecte d'intérieur pour particuliers : rénovation, réagencement, décoration d'appartement et de maison. Elodie Notariani conçoit un intérieur fonctionnel, esthétique et à votre image.",
    image: IMAGES.particuliers,
    keywords: [
      "architecte d'intérieur particulier",
      'rénovation appartement',
      'aménagement intérieur maison',
      'décoration intérieure sur mesure',
    ],
    chapters: [
      {
        title: 'Comprendre avant de dessiner',
        text: "Le premier rendez-vous ne parle pas de couleurs. Il parle de vous : vos rituels du matin, la lumière que vous cherchez, ce qui vous encombre aujourd'hui. C'est de cette écoute que naît un programme juste.",
      },
      {
        title: 'Des volumes qui respirent',
        text: 'Ouvrir, cloisonner, décaler une porte, capter une fenêtre : le plan est le premier geste de design. Nous travaillons les circulations et la lumière naturelle avant tout choix esthétique.',
      },
      {
        title: 'La matière comme signature',
        text: 'Bois, pierre, textiles, enduits : chaque matériau est choisi pour sa tenue dans le temps et pour la sensation qu’il procure. Le résultat est chaleureux, précis, durable.',
      },
    ],
  },
  {
    slug: 'amenagement-investissement-locatif',
    eyebrow: '02 — Loueurs professionnels',
    title: 'Louer',
    titleAccent: 'mieux',
    short:
      "Aménagement d'investissement locatif et de meublé : des biens qui se louent plus vite, plus cher, plus longtemps.",
    intro:
      "Un bien locatif bien conçu se distingue en une photo. Nous optimisons chaque mètre carré, sélectionnons des matériaux robustes et créons une identité qui attire les bons locataires et valorise votre actif.",
    bullets: [
      'Optimisation des surfaces et des plans',
      'Meublé, colocation, location courte durée',
      'Sélection de mobilier et matériaux résistants',
      'Identité visuelle du bien pour les annonces',
      'Coordination des travaux et livraison clé en main',
    ],
    seoTitle: 'Aménagement investissement locatif & meublé — Architecte d’intérieur | DSIGN IMMO',
    seoDescription:
      "Aménagement d'investissement locatif, meublé et location courte durée : DSIGN IMMO conçoit des biens qui se louent plus vite et valorisent votre patrimoine. Optimisation, mobilier, clé en main.",
    image: IMAGES.loueurs,
    keywords: [
      'aménagement investissement locatif',
      'architecte intérieur location meublée',
      'décoration airbnb',
      'valorisation bien locatif',
    ],
    chapters: [
      {
        title: 'Le mètre carré utile',
        text: 'Un studio peut accueillir une vraie cuisine, un vrai bureau et un vrai rangement. Tout se joue dans le plan et dans le mobilier dessiné pour l’espace.',
      },
      {
        title: 'Robuste et désirable',
        text: 'Les matériaux sont choisis pour résister aux rotations de locataires sans perdre leur élégance. La décoration, elle, crée le coup de cœur en annonce.',
      },
      {
        title: 'Livré, photographié, loué',
        text: 'Nous coordonnons les artisans, livrons un bien prêt à habiter et pensons chaque pièce pour la photo qui fera la différence.',
      },
    ],
  },
  {
    slug: 'agencement-commerce-restaurant-bureaux',
    eyebrow: '03 — Entreprises, commerces & restaurants',
    title: 'Accueillir',
    titleAccent: 'avec style',
    short:
      "Agencement de boutiques, restaurants et bureaux : un espace qui incarne votre marque et fait revenir vos clients.",
    intro:
      "Un lieu commercial est un média. Chaque parcours, chaque assise, chaque source lumineuse influence l'expérience et le chiffre d'affaires. Nous concevons des espaces qui racontent votre marque et fonctionnent au quotidien.",
    bullets: [
      'Concept et identité spatiale de marque',
      'Agencement de boutique et parcours client',
      'Restaurants, bars, cafés : salle, bar, cuisine',
      'Bureaux et espaces de travail',
      'Suivi des normes, artisans et planning',
    ],
    seoTitle: 'Agencement commerce, restaurant & bureaux — Architecte d’intérieur | DSIGN IMMO',
    seoDescription:
      "Agencement de commerce, restaurant, bar et bureaux : DSIGN IMMO conçoit des espaces professionnels à l'image de votre marque, fonctionnels et mémorables. Concept, plans, suivi de chantier.",
    image: IMAGES.commerces,
    keywords: [
      'agencement commerce',
      'architecte intérieur restaurant',
      'aménagement bureaux',
      'design boutique',
    ],
    chapters: [
      {
        title: 'Un concept avant un plan',
        text: 'Nous partons de votre marque, de votre clientèle et de votre offre pour définir un concept spatial clair. Le plan et la décoration en découlent naturellement.',
      },
      {
        title: 'Le parcours client, pièce par pièce',
        text: "Entrée, attente, découverte, achat ou service : chaque séquence est dessinée pour fluidifier l'expérience et augmenter le temps passé sur place.",
      },
      {
        title: 'Ouvrir à l’heure',
        text: 'Planning, normes, artisans : nous pilotons le chantier avec la même rigueur que le dessin, pour une ouverture sereine.',
      },
    ],
  },
];

/* ───────────────────────── Processus ───────────────────────── */
export const PROCESS = [
  {
    n: '01',
    title: 'Écouter',
    text: "Un premier échange pour comprendre votre lieu, vos usages, votre budget et vos envies. C'est ici que le projet trouve sa direction.",
  },
  {
    n: '02',
    title: 'Concevoir',
    text: 'Plans, ambiances, matériaux et visuels 3D : le projet prend forme, se discute et s’affine jusqu’à vous ressembler.',
  },
  {
    n: '03',
    title: 'Réaliser',
    text: 'Sélection des artisans, consultation, planning et suivi de chantier : une seule interlocutrice de la première esquisse à la dernière finition.',
  },
  {
    n: '04',
    title: 'Vivre',
    text: 'Vous entrez dans un espace fini, cohérent et prêt à être habité, loué ou ouvert au public.',
  },
];

/* ───────────────────────── Projets ─────────────────────────
 * TODO : remplacer par les vrais projets (titre, lieu, type, année).
 */
export const PROJECTS = [
  { image: IMAGES.projects[0], title: 'Appartement lumière', type: 'Particulier', place: 'Rénovation complète' },
  { image: IMAGES.projects[1], title: 'Studio locatif', type: 'Loueur professionnel', place: 'Meublé optimisé' },
  { image: IMAGES.projects[2], title: 'Restaurant', type: 'Restaurateur', place: 'Concept & agencement' },
  { image: IMAGES.projects[3], title: 'Maison familiale', type: 'Particulier', place: 'Réagencement' },
  { image: IMAGES.projects[4], title: 'Boutique', type: 'Commerce', place: 'Identité spatiale' },
  { image: IMAGES.projects[5], title: 'Bureaux', type: 'Entreprise', place: 'Espace de travail' },
];

/* ───────────────────────── FAQ (FAQPage) ───────────────────────── */
export const FAQ = [
  {
    q: "Quelle est la différence entre un architecte d'intérieur et un décorateur ?",
    a: "L'architecte d'intérieur intervient sur la structure de l'espace : plans, cloisons, circulations, réseaux, lumière naturelle. Le décorateur travaille l'habillage. DSIGN IMMO fait les deux, dans un seul projet cohérent, du plan à la dernière matière.",
  },
  {
    q: "Pour quels types de projets intervenez-vous ?",
    a: "Pour les particuliers (appartement, maison, rénovation), les loueurs professionnels (investissement locatif, meublé, courte durée) et les professionnels (commerces, restaurants, bureaux). Chaque univers a ses contraintes ; l'exigence est la même.",
  },
  {
    q: 'Comment se déroule un projet avec DSIGN IMMO ?',
    a: "En quatre temps : un échange pour écouter, une phase de conception (plans, ambiances, 3D), la réalisation avec suivi de chantier, puis la livraison d'un espace prêt à vivre. Vous avez une interlocutrice unique du début à la fin.",
  },
  {
    q: 'Travaillez-vous à distance ?',
    a: "Oui. La conception (plans, planches d'ambiance, visuels 3D, listes d'achats) peut être menée à distance. Le suivi de chantier s'organise selon la localisation du bien.",
  },
  {
    q: 'Combien coûte une mission d’architecture d’intérieur ?',
    a: "Chaque projet est chiffré sur mesure après un premier échange gratuit, en fonction de la surface, de l'ampleur des travaux et du niveau d'accompagnement souhaité (conception seule ou conception + suivi de chantier).",
  },
];

/* ───────────────────────── Textes home FR ───────────────────────── */
export const HOME_FR = {
  seoTitle: "DSIGN IMMO — Architecte d'intérieur | Elodie Notariani",
  seoDescription:
    "DSIGN IMMO, agence d'architecture d'intérieur fondée par Elodie Notariani. Conception d'espaces uniques et fonctionnels pour particuliers, loueurs professionnels, commerces et restaurants. Du plan à la matière.",
  hero: {
    eyebrow: "Architecture d'intérieur — Elodie Notariani",
    line1: "L'ESPACE",
    line2: 'QUI VOUS',
    line3: 'RESSEMBLE',
    accent: 'enfin.',
    lead:
      "Des intérieurs uniques et fonctionnels pour particuliers, loueurs professionnels, commerces et restaurants. Un regard d'artiste, une rigueur d'architecte.",
    cta: 'Parler de votre projet',
    cta2: "Découvrir l'approche",
    tags: ['Sur mesure', 'Fonctionnel', 'Sensible'],
  },
  marquee: ['Particuliers', 'Loueurs professionnels', 'Commerces', 'Restaurants', 'Bureaux', 'Rénovation', 'Agencement'],
  manifesto:
    "Un intérieur n'est pas une décoration. C'est la façon dont la lumière entre le matin, le chemin que fait votre main vers l'interrupteur, le silence d'une pièce bien proportionnée. Chez DSIGN IMMO, nous dessinons cette expérience avant de dessiner un meuble.",
  about: {
    eyebrow: 'Chez',
    text:
      "Nous croyons qu'un espace réussi se reconnaît en une seconde et se vérifie chaque jour. Il est beau parce qu'il est juste : proportions, lumière, matières, usages. Nous concevons des lieux à votre image, fonctionnels et esthétiques, pour les habiter, les louer ou y accueillir vos clients.",
    stats: [
      { value: '3', label: 'univers de projets : particuliers, loueurs, professionnels' },
      { value: '1', label: 'interlocutrice unique, de l’esquisse à la livraison' },
      { value: '100', suffix: '%', label: 'sur mesure : aucun plan type, aucun catalogue' },
    ],
    quote: "Le design n'est pas ce que l'on voit. C'est ce qui reste quand on vit dedans.",
    link: 'Rencontrer Elodie',
  },
  story: {
    eyebrow: "L'artiste derrière DSIGN IMMO",
    title: 'Elodie',
    titleAccent: 'Notariani',
    chapters: [
      {
        n: 'I',
        title: 'Le regard',
        text: "Avant d'être architecte d'intérieur, Elodie est artiste. Elle regarde un lieu comme une toile : ses vides, ses ombres, la manière dont un rayon de soleil traverse une pièce à 17 h. C'est ce regard qui fait la différence entre un espace correct et un espace qui émeut.",
      },
      {
        n: 'II',
        title: 'La main',
        text: "Le dessin vient ensuite. Plans, coupes, perspectives : Elodie donne une forme précise à l'intuition. Chaque centimètre est justifié, chaque matière choisie pour sa lumière, sa texture et sa tenue dans le temps.",
      },
      {
        n: 'III',
        title: 'La signature',
        text: "Un projet DSIGN IMMO se reconnaît à sa retenue : des lignes calmes, des matières franches, une lumière travaillée. Et à ce détail que l'on ne remarque pas tout de suite, mais qui rend le lieu inoubliable.",
      },
    ],
    cta: "Lire l'histoire complète",
  },
  expertises: {
    eyebrow: 'Expertises',
    title: 'Trois univers,',
    titleAccent: 'une exigence.',
  },
  process: {
    eyebrow: 'Méthode',
    title: 'Du premier café',
    titleAccent: 'aux dernières clés.',
  },
  projects: {
    eyebrow: 'Réalisations',
    title: 'Des lieux',
    titleAccent: 'qui restent.',
    text: "Une sélection d'espaces conçus par DSIGN IMMO. Chaque projet commence par une conversation.",
  },
  faq: { eyebrow: 'Questions fréquentes', title: 'Tout ce que vous', titleAccent: 'voulez savoir.' },
  cta: {
    eyebrow: 'Prochaine étape',
    title: 'Parlons de',
    titleAccent: 'votre espace.',
    text: "Un premier échange, sans engagement, pour comprendre votre projet et vous dire franchement comment nous pouvons l'accompagner.",
    button: 'Prendre contact',
  },
};

/* ───────────────────────── EN ───────────────────────── */
export const HOME_EN = {
  seoTitle: 'DSIGN IMMO — Interior Architect | Elodie Notariani',
  seoDescription:
    'DSIGN IMMO, an interior architecture studio founded by Elodie Notariani. Unique, functional spaces for private clients, professional landlords, shops and restaurants. From the plan to the material.',
  hero: {
    eyebrow: 'Interior architecture — Elodie Notariani',
    line1: 'SPACES',
    line2: 'THAT FEEL',
    line3: 'LIKE YOU',
    accent: 'at last.',
    lead:
      "Unique, functional interiors for private clients, professional landlords, shops and restaurants. An artist's eye, an architect's rigour.",
    cta: 'Talk about your project',
    cta2: 'Discover the approach',
    tags: ['Bespoke', 'Functional', 'Sensitive'],
  },
  marquee: ['Private clients', 'Professional landlords', 'Shops', 'Restaurants', 'Offices', 'Renovation', 'Fit-out'],
  manifesto:
    "An interior is not decoration. It is the way light enters in the morning, the path your hand takes to the switch, the quiet of a well-proportioned room. At DSIGN IMMO, we design that experience before we design a single piece of furniture.",
  about: {
    eyebrow: 'At',
    text:
      'We believe a successful space is recognised in a second and proven every day. It is beautiful because it is right: proportions, light, materials, use. We design places in your image, functional and elegant, to live in, to rent out or to welcome your customers.',
    stats: [
      { value: '3', label: 'project worlds: private clients, landlords, businesses' },
      { value: '1', label: 'single point of contact, from sketch to handover' },
      { value: '100', suffix: '%', label: 'bespoke: no standard plan, no catalogue' },
    ],
    quote: 'Design is not what you see. It is what remains when you live in it.',
    link: 'Meet Elodie',
  },
  story: {
    eyebrow: 'The artist behind DSIGN IMMO',
    title: 'Elodie',
    titleAccent: 'Notariani',
    chapters: [
      {
        n: 'I',
        title: 'The eye',
        text: 'Before being an interior architect, Elodie is an artist. She reads a place like a canvas: its voids, its shadows, the way a ray of sun crosses a room at 5 pm. That eye is what separates a correct space from a moving one.',
      },
      {
        n: 'II',
        title: 'The hand',
        text: 'Then comes the drawing. Plans, sections, perspectives: Elodie gives intuition a precise form. Every centimetre is justified, every material chosen for its light, its texture and how it ages.',
      },
      {
        n: 'III',
        title: 'The signature',
        text: 'A DSIGN IMMO project is recognised by its restraint: calm lines, honest materials, crafted light. And by that detail you do not notice at first, which makes the place unforgettable.',
      },
    ],
    cta: 'Read the full story',
  },
  expertises: [
    {
      eyebrow: '01 — Private clients',
      title: 'Live',
      titleAccent: 'fully',
      short: 'Renovation, re-planning, decoration: an interior designed for the way you live, not for a catalogue.',
    },
    {
      eyebrow: '02 — Professional landlords',
      title: 'Rent',
      titleAccent: 'better',
      short: 'Rental and furnished-let design: properties that let faster, for more, for longer.',
    },
    {
      eyebrow: '03 — Businesses, shops & restaurants',
      title: 'Welcome',
      titleAccent: 'with style',
      short: 'Shop, restaurant and office fit-out: a space that embodies your brand and brings customers back.',
    },
  ],
  process: [
    { n: '01', title: 'Listen', text: 'A first conversation to understand your place, your habits, your budget and your wishes.' },
    { n: '02', title: 'Design', text: 'Plans, moods, materials and 3D visuals: the project takes shape and is refined until it looks like you.' },
    { n: '03', title: 'Build', text: 'Craftsmen, schedule and site supervision: one point of contact from first sketch to last finish.' },
    { n: '04', title: 'Live', text: 'You step into a finished, coherent space, ready to be lived in, rented out or opened to the public.' },
  ],
  cta: {
    eyebrow: 'Next step',
    title: "Let's talk about",
    titleAccent: 'your space.',
    text: 'A first conversation, with no commitment, to understand your project and tell you honestly how we can help.',
    button: 'Get in touch',
  },
};
