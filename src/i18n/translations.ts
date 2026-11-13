export const languages = {
  fr: 'Francais',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'fr';

export const translations = {
  fr: {
    // Navigation
    nav: {
      concept: 'Le Concept',
      impact: 'Impact',
      process: 'Comment ca marche',
      contact: 'Contact',
      installCorner: 'Installer un corner',
      accessCorner: 'Acceder a mon corner',
      backToAssociation: 'Retour au site Nous Avons Des Elles',
      welcome: 'Accueillir Les Précieuses',
      gallery: 'Galerie',
    },

    // Bandeau galerie (diaporama defilant)
    gallery: {
      label: 'Galerie photo : la boutique Les Précieuses en images',
      pause: 'Mettre en pause le défilement des photos',
      play: 'Reprendre le défilement des photos',
    },

    // Galerie (carrousel minute)
    gallerySection: {
      eyebrow: 'Galerie',
      title: 'Chaque pièce a une histoire : chez Les Précieuses, elle continue de s’écrire.',
      label: 'Galerie photo Les Précieuses',
      roledescription: 'carrousel',
      prev: 'Photos précédentes',
      next: 'Photos suivantes',
      pause: 'Mettre en pause le défilement',
      play: 'Reprendre le défilement',
    },

    // Split screens
    splits: {
      boutique: {
        eyebrow: 'La boutique',
        title: 'Une vraie boutique, au cœur de vos locaux',
        p1: 'Portants soignés, accessoires choisis, mise en scène chaleureuse : chaque corner Les Précieuses est pensé comme une petite boutique où l’on prend plaisir à flâner.',
        p2: 'Vêtements, sacs, bijoux et objets chinés sont sélectionnés un à un par nos équipes, puis renouvelés régulièrement pour que vos collaborateurs aient toujours de nouvelles pièces à découvrir.',
        cta: 'Voir comment ça marche',
      },
      bijoux: {
        eyebrow: 'Accessoires & bijoux',
        title: 'Des pièces qui donnent le sourire',
        p1: 'Boucles d’oreilles, broches, colliers… Au-delà des vêtements, Les Précieuses propose une sélection d’accessoires vintage qui révèlent la personnalité de chacune et de chacun.',
        p2: 'Chaque achat est un petit plaisir qui prolonge la vie d’un objet et soutient, dans le même geste, des femmes en situation de précarité.',
        cta: 'Découvrir notre impact',
      },
      espace: {
        eyebrow: 'Quelques mètres carrés suffisent',
        title: 'Un petit espace suffit pour accueillir Les Précieuses !',
        p1: 'Vous disposez d’un coin disponible dans votre entreprise, commerce ou établissement ? Quelques mètres carrés suffisent pour accueillir Les Précieuses et contribuer à une belle initiative solidaire.',
        points: [
          'Un portant, quelques étagères : le corner s’adapte à votre espace',
          'Installation, approvisionnement et gestion pris en charge',
          'Un engagement solidaire concret et visible pour vos équipes et vos visiteurs',
        ],
        tagline: 'Un petit espace chez vous, une grande opportunité pour elles.',
        cta: 'Accueillir Les Précieuses',
      },
    },

    // Hero
    hero: {
      title: 'Les Precieuses',
      titleLine1: 'La boutique du reemploi',
      titleLine2: 'eco-responsable',
      description:
        "Integrez un corner de seconde main, en libre-service et accessible, pour encourager vos collaborateurs vers une consommation durable.",
      primaryCta: 'Installer un corner',
      secondaryCta: 'En savoir plus',
      scrollLabel: 'Decouvrir',
    },

    // Presentation
    presentation: {
      subtitle: 'Le Concept',
      title: 'Le reemploi au coeur de votre demarche RSE',
      p1: "<strong>Les Precieuses</strong> est un projet porte par l'association <strong>Nous Avons Des Elles</strong>. Nous proposons aux entreprises d'installer un corner de vetements de seconde main directement dans leurs locaux.",
      p2: "Un concept simple et impactant : vos collaborateurs deposent et achetent des vetements de qualite, contribuant ainsi a l'economie circulaire tout en soutenant des femmes en situation de precarite.",
      p3: "Chaque achat finance Station-Coeur, un tiers-lieu solidaire en partenariat avec la SNCF, creant un cercle vertueux d'entraide et d'engagement.",
      cta: 'Decouvrir notre impact',
      association: "L'association",
    },

    // Impact
    impact: {
      subtitle: 'Notre Impact',
      title: 'Triple impact positif',
      description:
        'Les Precieuses genere un impact environnemental, social et corporate mesurable pour votre entreprise.',
      items: [
        {
          title: 'Impact Environnemental',
          description:
            'Prolongez la duree de vie des vetements au sein de votre entreprise et luttez contre la pollution textile.',
        },
        {
          title: 'Impact Social',
          description:
            'Soutenez des femmes en situation de vulnerabilite. Les fonds collectes financent Station-Coeur, un tiers-lieu solidaire.',
        },
        {
          title: 'Impact RSE',
          description:
            "Creez des opportunites d'engagement visible et de participation collective pour vos collaborateurs.",
        },
      ],
    },

    // Stats
    stats: {
      subtitle: 'Les Chiffres',
      title: 'Pourquoi agir maintenant',
      items: [
        {
          value: '700 000',
          unit: 'tonnes',
          description: 'de vetements sont jetes en France chaque annee',
        },
        {
          value: '4.9',
          unit: 'millions',
          description: 'de femmes sont en situation de precarite en France',
        },
      ],
    },

    // Process
    process: {
      subtitle: 'Comment ca marche',
      title: 'Un processus simple en 3 etapes',
      description:
        'De la collecte a l\'achat, un parcours fluide et engage pour vos collaborateurs.',
      steps: [
        {
          title: 'Collecte',
          description: 'Vos collaborateurs deposent leurs vetements dans les bacs dedies installes dans vos locaux.',
        },
        {
          title: 'Selection',
          description: 'Nos equipes selectionnent et mettent en valeur les pieces de qualite pour votre corner.',
        },
        {
          title: 'Achat',
          description: 'Vos collaborateurs achetent en toute autonomie, avec des prix solidaires accessibles a tous.',
        },
      ],
    },

    // Benefits
    benefits: {
      subtitle: 'Avantages',
      title: 'Pourquoi choisir Les Precieuses',
      items: [
        {
          title: 'Cle en main',
          description: 'Installation, approvisionnement et gestion du corner entierement pris en charge.',
        },
        {
          title: 'Sans contrainte',
          description: 'Un corner adapte a vos espaces, en libre-service pour vos collaborateurs.',
        },
        {
          title: 'Impactant',
          description: 'Des rapports d\'impact reguliers pour valoriser votre engagement RSE.',
        },
        {
          title: 'Federateur',
          description: 'Creez du lien entre vos collaborateurs autour de valeurs partagees.',
        },
      ],
    },

    // CTA
    cta: {
      title: 'Prets a faire la difference ?',
      description:
        'Rejoignez les entreprises engagees qui ont choisi Les Precieuses pour allier mode durable et impact social.',
      primary: 'Installer un corner',
      secondary: "Decouvrir l'association",
    },

    // Contact
    contact: {
      subtitle: 'Contact',
      title: 'Echangeons ensemble',
      description:
        "Vous souhaitez installer un corner Les Precieuses dans votre entreprise ? Contactez-nous pour en discuter.",
      info: {
        title: 'Prenons contact',
        description:
          'Notre equipe est a votre disposition pour repondre a vos questions et vous accompagner dans la mise en place de votre corner.',
        email: 'Email',
        phone: 'Telephone',
        address: 'Adresse',
        social: 'Suivez-nous sur les reseaux',
      },
      cta: 'Nous envoyer un email',
    },

    // Footer
    footer: {
      description:
        "Les Precieuses, la boutique du reemploi eco-responsable portee par l'association Nous Avons Des Elles. Mode durable et impact social au coeur de votre entreprise.",
      navigation: 'Navigation',
      association: "L'Association",
      legal: 'Mentions legales',
      privacy: 'Confidentialite',
      rights: 'Tous droits reserves.',
    },

    // Legal pages
    legal: {
      title: 'Mentions legales',
      back: "Retour a l'accueil",
    },
    privacy: {
      title: 'Politique de confidentialite',
      back: "Retour a l'accueil",
    },

    // Misc
    misc: {
      ecoResponsible: 'Eco-responsable',
      secondHand: 'Seconde main',
      solidarity: 'Solidarite',
      rse: 'RSE',
      projectImage: 'Image du projet',
    },
  },
} as const;

export type TranslationKeys = typeof translations.fr;
