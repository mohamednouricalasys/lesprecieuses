#!/usr/bin/env node
/**
 * Medias - Les Precieuses
 *
 * Toutes les photographies du site proviennent de `img/` (photos transmises par
 * Nadira). Ce script les recadre, les convertit en WebP multi-tailles avec des
 * noms descriptifs et ecrit le manifeste `src/data/media.json` (chemins + dimensions
 * exactes -> attributs width/height, pas de CLS).
 *
 * Usage : node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'img');
const PUBLIC_IMAGES = path.join(ROOT, 'public/images');
const MANIFEST = path.join(ROOT, 'src/data/media.json');

const WEBP = { quality: 80, effort: 6, smartSubsample: true };
const wa = (name) => `WhatsApp Image 2026-11-13 at ${name}.jpeg`;

// Captures "story" (736x1600) : on retire les bandes noires haut / bas.
const STORY_CROP = { left: 0, top: 146, width: 736, height: 1308 };

/*
 * Selection (doublons et photos hors sujet ecartes) :
 * - identiques : 09.39.18 (9) = (7)
 * - quasi-doublons : 09.39.17 (2) ~ (1) ; 09.39.17, 09.39.18, 09.39.18 (3) ~ 09.39.18 (1) ;
 *   09.40.10 (2) ~ (1) ; 09.40.10 (4) ~ (3) ; capture du 10/11 = montage de 09.39.18 (6) + (7)
 * - hors sujet Les Precieuses (gare, reunions, paysages, enfant, montage) :
 *   09.46.53, 09.46.53 (1), 09.46.53 (5), 09.46.54, 09.46.54 (1), 09.46.54 (2)
 */

/** Visuels de page : une source, un cadrage, plusieurs largeurs. */
const PAGE = {
  hero: {
    src: wa('09.39.18 (6)'), slug: 'boutique-portant-seconde-main', ratio: [16, 9], position: 'attention', widths: [800, 1600],
    alt: 'Portant de vêtements de seconde main colorés dans un corner Les Précieuses',
  },
  concept: {
    src: wa('09.46.53 (2)'), slug: 'echange-boutique-solidaire', ratio: [4, 3], position: 'centre', widths: [600, 1200],
    alt: 'Deux femmes échangent sur les marches de la boutique solidaire Les Précieuses, entre portants et sacs',
  },
  collecte: {
    src: wa('09.40.10 (3)'), slug: 'collecte-panier-vetements-entreprise', ratio: [4, 3], position: 'south', widths: [800],
    alt: 'Panier de collecte « Merci pour les vêtements » sous un portant installé en entreprise',
  },
  selection: {
    src: wa('09.40.10 (1)'), slug: 'selection-pieces-seconde-main', ratio: [4, 3], position: 'centre', widths: [800],
    alt: 'Pièces de seconde main sélectionnées et étiquetées sur cintres en bois',
  },
  achat: {
    src: wa('09.48.27 (1)'), crop: STORY_CROP, slug: 'achat-pull-jaune-seconde-main', ratio: [4, 3], position: 'centre', widths: [800],
    alt: 'Une collaboratrice décroche un pull jaune moutarde du portant',
  },
  // Split screens (cadrage 4:5 fait en CSS, on garde le ratio d'origine)
  boutique: {
    src: wa('09.39.18 (4)'), slug: 'corner-boutique-seconde-main', widths: [640, 1080],
    alt: 'Corner Les Précieuses : portant de vêtements, malle en osier, lampe et accessoires',
  },
  bijoux: {
    src: wa('09.48.27'), crop: STORY_CROP, slug: 'cliente-essai-boucles-oreilles', widths: [640, 736],
    alt: 'Cliente souriante essayant des boucles d’oreilles dorées chez Les Précieuses',
  },
  espace: {
    src: wa('09.49.24'), slug: 'petit-espace-corner-precieuses', widths: [640, 1024],
    alt: 'Exemple d’aménagement d’un petit espace : portant, étagères à chapeaux et plante',
  },
};

/** Galerie (carrousel) : vignettes 4:5 avec legende. */
const GALLERY = [
  { src: wa('09.39.17 (1)'), slug: 'coffret-boucles-oreilles-vintage', tag: 'Bijoux chinés', position: 'west', alt: 'Coffret de boucles d’oreilles vintage sélectionnées par Les Précieuses' },
  { src: wa('09.40.10'), slug: 'manteau-rouge-portant', tag: 'Rouge passion', alt: 'Manteau et robe rouges de seconde main sur le portant' },
  { src: wa('09.39.18 (7)'), slug: 'etagere-objets-chines-portrait', tag: 'Objets chinés', alt: 'Étagère d’objets chinés : portrait peint, vase et carnets' },
  { src: wa('09.39.18 (2)'), slug: 'bracelets-bijoux-fantaisie', tag: 'Bracelets vintage', alt: 'Bracelets et bijoux fantaisie de seconde main' },
  { src: wa('09.48.26'), crop: STORY_CROP, slug: 'vitrine-bijoux-lumineuse', tag: 'Vitrine lumineuse', alt: 'Présentation de bijoux dans une vitrine lumineuse' },
  { src: wa('09.39.18 (10)'), slug: 'ceramique-rouge-chinee', tag: 'Touche de couleur', alt: 'Objets de décoration en céramique rouge chinés' },
  { src: wa('09.39.18 (1)'), slug: 'plateau-broches-dorees', tag: 'Broches dorées', position: 'centre', alt: 'Plateau de broches et boucles d’oreilles dorées' },
  { src: wa('09.39.18 (8)'), slug: 'ceramiques-blanches-vintage', tag: 'Douceur vintage', alt: 'Céramiques blanches vintage : coupe, bonbonnière et mains décoratives' },
  { src: wa('09.39.18 (5)'), slug: 'lampes-design-deco', tag: 'Esprit déco', alt: 'Paire de lampes design et pochette posées sur un plateau' },
];
const GALLERY_WIDTHS = [480, 800];

/**
 * Héro : sélection resserrée de photos fortes (des visages, de la couleur, du
 * lien) recadrées en 4:5 comme le carrousel de l'association.
 */
const HERO = [
  { src: wa('09.48.27'), crop: STORY_CROP, slug: 'cliente-boucles-oreilles', tag: 'Le plaisir de chiner', position: 'attention', alt: 'Une cliente souriante essaie des boucles d’oreilles dorées' },
  { src: wa('09.40.10 (1)'), slug: 'selection-pieces', tag: 'Chaque pièce a une histoire', position: 'attention', alt: 'Pièces de seconde main sélectionnées et étiquetées sur cintres en bois' },
  { src: wa('09.40.10'), slug: 'manteau-rouge', tag: 'Rouge passion', alt: 'Manteau et robe rouges de seconde main sur le portant' },
  { src: wa('09.46.53 (2)'), slug: 'echange-boutique', tag: 'Échange & partage', position: 'attention', alt: 'Deux femmes échangent devant la boutique solidaire et ses portants' },
  { src: wa('09.48.27 (1)'), crop: STORY_CROP, slug: 'achat-pull-jaune', tag: 'Coup de cœur', position: 'attention', alt: 'Une collaboratrice décroche un pull jaune moutarde du portant' },
];
const HERO_WIDTHS = [480, 800];

/** Bandeau defilant : hauteur fixe (1x / 2x), largeur naturelle. Reprend la galerie + les etapes. */
const MARQUEE_SOURCES = [
  GALLERY[0], PAGE.achat, GALLERY[2], PAGE.collecte, GALLERY[3], PAGE.selection, GALLERY[5], GALLERY[6],
  GALLERY[1], GALLERY[7], GALLERY[8], GALLERY[4],
];
const MARQUEE_HEIGHTS = [240, 480];

const kb = (n) => `${(n / 1024).toFixed(0)} Ko`;
const load = (file, crop) => {
  const p = sharp(path.join(SRC, file)).rotate();
  return crop ? p.extract(crop) : p;
};
const rel = (abs) => path.relative(PUBLIC_IMAGES, abs).split(path.sep).join('/');

async function out(pipeline, abs) {
  const info = await pipeline.webp(WEBP).toFile(abs);
  return { file: rel(abs), width: info.width, height: info.height, size: info.size };
}

/** Plusieurs largeurs, ratio optionnel (recadrage cover). */
async function responsive(item, dir, widths, ratio) {
  const sources = [];
  for (const w of widths) {
    const abs = path.join(dir, `${item.slug}-${w}.webp`);
    const resize = ratio
      ? { width: w, height: Math.round((w * ratio[1]) / ratio[0]), fit: 'cover', position: item.position ?? 'centre' }
      : { width: w, withoutEnlargement: true };
    sources.push(await out(load(item.src, item.crop).resize(resize), abs));
  }
  const largest = sources[sources.length - 1];
  console.log(`  ${rel(path.join(dir, item.slug)).padEnd(52)} ${sources.map((s) => `${s.width}w ${kb(s.size)}`).join(' / ')}`);
  return {
    alt: item.alt,
    src: largest.file,
    srcset: sources.map((s) => `${s.file} ${s.width}w`),
    width: largest.width,
    height: largest.height,
  };
}

await mkdir(path.join(PUBLIC_IMAGES, 'galerie'), { recursive: true });
await mkdir(path.join(PUBLIC_IMAGES, 'hero'), { recursive: true });
await mkdir(path.join(PUBLIC_IMAGES, 'bandeau'), { recursive: true });
await mkdir(path.dirname(MANIFEST), { recursive: true });

console.log('Visuels de page :');
const page = {};
for (const [key, item] of Object.entries(PAGE)) {
  page[key] = await responsive(item, PUBLIC_IMAGES, item.widths, item.ratio);
}

// Image de partage (Open Graph / Twitter) : 1200x630, nom stable pour les caches sociaux
const og = await out(
  load(PAGE.hero.src, PAGE.hero.crop).resize({ width: 1200, height: 630, fit: 'cover', position: PAGE.hero.position }),
  path.join(PUBLIC_IMAGES, 'og-image.webp'),
);
console.log(`  ${'og-image'.padEnd(52)} ${og.width}x${og.height} ${kb(og.size)}`);

console.log('Galerie :');
const gallery = [];
for (const item of GALLERY) {
  const r = await responsive(item, path.join(PUBLIC_IMAGES, 'galerie'), GALLERY_WIDTHS, [4, 5]);
  gallery.push({ ...r, tag: item.tag });
}

console.log('Héro :');
const hero = [];
for (const item of HERO) {
  const r = await responsive(item, path.join(PUBLIC_IMAGES, 'hero'), HERO_WIDTHS, [4, 5]);
  hero.push({ ...r, tag: item.tag });
}

console.log('Bandeau :');
const marquee = [];
for (const item of MARQUEE_SOURCES) {
  const files = [];
  for (const h of MARQUEE_HEIGHTS) {
    const abs = path.join(PUBLIC_IMAGES, 'bandeau', `${item.slug}-h${h}.webp`);
    files.push(await out(load(item.src, item.crop).resize({ height: h }), abs));
  }
  console.log(`  ${`bandeau/${item.slug}`.padEnd(52)} ${files.map((f) => kb(f.size)).join(' / ')}`);
  marquee.push({
    alt: item.alt,
    src: files[0].file,
    src2x: files[1].file,
    width: files[0].width,
    height: files[0].height,
    width2x: files[1].width,
  });
}

// Logo (seul visuel hors `img/`, identite de marque) : carre affiche a 44-180 px
const logo = path.join(PUBLIC_IMAGES, 'logo/logo-les-precieuses.webp');
if (existsSync(logo) && (await sharp(logo).metadata()).width !== 360) {
  const buffer = await sharp(logo).toBuffer();
  await sharp(buffer).resize(360, 360).webp(WEBP).toFile(logo);
  console.log('Logo redimensionne en 360x360');
}

await writeFile(MANIFEST, `${JSON.stringify({ page, hero, gallery, marquee }, null, 2)}\n`);
console.log(`Manifeste ecrit : ${path.relative(ROOT, MANIFEST)}`);
