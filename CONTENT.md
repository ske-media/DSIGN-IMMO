# Contenu à valider / compléter

Le site a été construit à partir des informations publiques de dsignimmo.com (positionnement, cibles,
e-mail, téléphone). Le domaine n'étant pas accessible depuis l'environnement de développement, les
photos et certaines informations factuelles restent à intégrer.

## 1. Images réelles (`images.manifest.json` → `npm run images:fetch`)

| Fichier | Usage | Format conseillé |
| --- | --- | --- |
| `hero.jpg` | Plein écran d'accueil (image LCP, relief 3D) | paysage, ≥ 2400 px, sujet centré |
| `hero-depth.jpg` | Optionnel : carte de profondeur du hero | niveaux de gris, blanc = proche |
| `elodie-portrait.jpg` | Portrait d'Elodie (home + page Elodie) | portrait 4:5 |
| `elodie-atelier.jpg` | Matières / atelier (section « Chez DSIGN IMMO ») | paysage 4:3 |
| `expertise-particuliers.jpg` | Carte + page Particuliers | portrait 4:5 |
| `expertise-loueurs.jpg` | Carte + page Locatif | portrait 4:5 |
| `expertise-commerces.jpg` | Carte + page Commerces | portrait 4:5 |
| `projet-01.jpg` … `projet-06.jpg` | Galerie réalisations (03 et 06 en portrait) | ≥ 1600 px |
| `og.jpg` | Image de partage (réseaux sociaux) | 1200 × 630 |

## 2. Données factuelles (`src/data/site.ts` → `SITE`)

- `city` / `region` : ville et zone d'intervention (fort levier SEO local : « architecte d'intérieur + ville »).
- `streetAddress` / `postalCode` : si une adresse peut être affichée (fiche Google Business Profile).
- `social.instagram` / `linkedin` / `pinterest` : liens réels (masqués tant qu'ils sont vides).
- `PROJECTS` : titre, type, lieu et année des vraies réalisations.

## 3. Textes à faire relire par Elodie Notariani

Le storytelling (« Le regard / La main / La signature ») décrit une approche, volontairement sans
inventer de faits biographiques (formation, dates, distinctions). À enrichir avec :

- parcours réel (formation, expériences, année de création de DSIGN IMMO) ;
- deux ou trois témoignages clients (un bloc « Ils en parlent » est facile à ajouter) ;
- chiffres réels si souhaités (nombre de projets, années d'expérience) — les statistiques actuelles
  (« 3 univers », « 1 interlocutrice », « 100 % sur mesure ») sont non chiffrées à dessein.

## 4. Mentions légales (`src/pages/mentions-legales.astro`)

Forme juridique, SIREN, adresse du siège, hébergeur.

## 5. Formulaire de contact

Le formulaire ouvre la messagerie du visiteur (mailto pré-rempli) : aucun backend requis.
Pour un envoi serveur, brancher Formspree / Netlify Forms / Resend sur `data-contact-form` dans
`src/pages/contact.astro`.
