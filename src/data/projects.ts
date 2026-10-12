import { globSync } from "node:fs";
import { resolve } from "node:path";

import { parseProjects, type Project } from "../domain/project";

const projectInputs = [
  {
    slug: "maison-doree",
    title: "Maison Dorée",
    sector: "artisans-et-metiers",
    summary:
      "Un concept fictif de boulangerie : découvrir les produits, consulter des horaires d’exemple et essayer une demande spéciale sans envoi, avec des choix de conception expliqués.",
    status: "demonstrator",
    demonstratedCapabilities: [
      "Définition de trois parcours prioritaires et d’un périmètre explicite",
      "Identité visuelle, schémas de page et maquettes graphiques documentés",
      "Améliorations mobiles et images proposées dans plusieurs tailles",
      "Simulation guidée avec erreurs, correction et remise à zéro",
      "Version prête à héberger séparément du portfolio et vérifications documentées",
    ],
    credits: [
      "Conception et développement : StudioB22",
      "Photographies d’illustration : Wesual Click, Richard Bell, Monaz Nazary et Balint Mendlik / Unsplash",
      "Typographies : Inter et Playfair Display, sous licence SIL OFL 1.1",
    ],
    limitations: [
      "Maison Dorée est un scénario fictif, pas une commande client ni un commerce réel.",
      "Aucune vente, réservation ou transmission de demande.",
      "Les tests et observations documentés ne constituent pas une certification d’accessibilité, de sécurité ou de conformité RGPD.",
      "Les contrôles navigateur avec animations réduites et sans JavaScript restent en attente.",
      "Une alerte de dépendance de développement reste ouverte ; la publication n’est pas autorisée.",
      "Cet aperçu éditorial ne contient pas de captures et ne prouve aucun résultat commercial.",
    ],
    reviewedAt: "2026-10-12",
    published: false,
    caseStudy: {
      context:
        "Maison Dorée explore un site de boulangerie artisanale fictive. Le travail de conception, de développement et de vérification est réel ; il ne représente pas une mission réalisée pour un client.",
      objective:
        "Donner la priorité aux produits et aux horaires, puis permettre d’essayer une demande spéciale. Le périmètre exclut la vente, la réservation et l’envoi de message.",
      decisions: [
        {
          title: "Partir des actions importantes",
          reason:
            "Les visiteurs doivent trouver les produits et les horaires sans parcourir toute la page.",
          example:
            "Quatre liens conduisent directement aux produits, au savoir-faire, aux horaires et à la simulation.",
          evidenceLimit:
            "Navigation vérifiée dans le HTML et par des tests ; le propriétaire rapporte un contrôle clavier conforme sur l’export local.",
        },
        {
          title: "Organiser la page et définir son identité visuelle",
          reason:
            "Une ambiance chaleureuse doit rester au service d’une présentation compréhensible.",
          example:
            "Les schémas de page, ou wireframes, montrent l’ordre des informations et les actions importantes. Les maquettes graphiques permettent de comparer couleurs, caractères et photographies dans une ambiance artisanale. Les photographies sont créditées comme illustrations.",
          evidenceLimit:
            "Les documents de conception et le prototype actuel sont des versions distinctes. Le scénario ne repose pas sur des entretiens avec un véritable client.",
        },
        {
          title: "Améliorer à partir des observations",
          reason:
            "Une composition doit aussi fonctionner dans l’espace limité d’un écran mobile.",
          example:
            "Le haut de page a été allégé, certains espaces réduits et les contours des champs renforcés pour rendre la lecture et la saisie plus claires. Les cinq images proposent plusieurs largeurs afin que le navigateur puisse choisir une taille adaptée à l’écran.",
          evidenceLimit:
            "Le propriétaire rapporte un affichage mobile et un zoom à 200 % conformes. Les poids de fichiers annoncés par le service d’images ne prouvent pas la vitesse de chargement réelle de la page ; celle-ci reste à mesurer dans un navigateur.",
        },
        {
          title: "Tester sans simuler une vraie commande",
          reason:
            "Une démonstration doit permettre d’essayer une interaction sans tromper le visiteur.",
          example:
            "Champs vides, adresse mal formée, correction, résultat valide, modification et remise à zéro sont traités sans envoi.",
          evidenceLimit:
            "47 tests passent dans la version documentée de la boulangerie, avec export statique vérifié et observations du propriétaire. Cela ne signifie pas que tous les contrôles de recette sont terminés.",
        },
        {
          title: "Préparer une livraison indépendante",
          reason:
            "La démonstration doit pouvoir évoluer sans reconstruire le portfolio.",
          example:
            "Le code reste dans un dépôt GitHub distinct, avec une version composée de fichiers prêts à héberger séparément. La démonstration peut ainsi évoluer sans modifier le portfolio. Les crédits et licences sont conservés ; une procédure de retour à une version précédente est documentée.",
          evidenceLimit:
            "L’hébergement public, les contrôles en ligne et l’exercice de retour arrière restent à réaliser. Aucune URL publique n’est revendiquée.",
        },
      ],
      milestones: [
        {
          title: "Cadrer le scénario et vérifier la faisabilité",
          methodSteps: [1, 2, 3, 4],
          status: "documented",
          explanation:
            "Objectifs, hypothèses, périmètre et livraison indépendante documentés. Aucun entretien client ou achat de domaine n’est inventé.",
        },
        {
          title: "Préparer les contenus et concevoir l’expérience",
          methodSteps: [5, 6, 7, 8, 9],
          status: "partially-verified",
          explanation:
            "Sources, licences, navigation, identité visuelle, schémas de page et maquettes graphiques disponibles. Ce ne sont pas cinq validations finales d’un client réel.",
        },
        {
          title: "Construire, essayer et contrôler",
          methodSteps: [10, 11, 12],
          status: "partially-verified",
          explanation:
            "Parcours, tests, export et observations du propriétaire documentés. Des vérifications navigateur et de sécurité restent ouvertes.",
        },
        {
          title: "Accepter la version avant publication",
          methodSteps: [13],
          status: "pending",
          explanation:
            "L’accord final sur la version et l’usage de publication reste à obtenir.",
        },
        {
          title: "Mettre en ligne et vérifier",
          methodSteps: [14],
          status: "pending",
          explanation:
            "Déploiement, HTTPS, configuration d’hébergement et retour arrière à vérifier après autorisation.",
        },
        {
          title: "Transmettre et organiser la suite",
          methodSteps: [15],
          status: "pending",
          explanation:
            "Responsabilités, accès et procédure de maintenance à confirmer avant la livraison.",
        },
      ],
    },
  },
  {
    slug: "maison-marceau",
    title: "Maison Marceau — maquette de site de barbier",
    sector: "beaute-et-bien-etre",
    summary:
      "Un concept de site vitrine pour barbier : présenter les prestations, faire découvrir une ambiance et guider les visiteurs grâce à une navigation claire sur mobile et ordinateur.",
    status: "mock-up",
    demonstratedCapabilities: [
      "Parcours multi-pages : accueil, prestations, présentation, galerie et contact",
      "Catalogue de prestations avec durées et tarifs fictifs",
      "Galerie d’inspiration avec photographies d’illustration identifiées",
      "Présentation du parcours de contact, sans collecte ni envoi de données",
    ],
    credits: ["Concept et réalisation : StudioB22"],
    limitations: [
      "Maison Marceau est une enseigne fictive, pas une commande client.",
      "Aucun formulaire d’envoi ni réservation n’est disponible dans cette maquette.",
      "Tarifs, horaires et exemples d’avis sont fictifs ; les photos sont des illustrations, pas des réalisations du salon.",
      "La publication reste soumise aux revues complètes de sécurité, dépendances, accessibilité et performance.",
    ],
    reviewedAt: "2026-10-02",
    published: false,
  },
  {
    slug: "maison-aureline",
    title: "Maison Aureline · maquette de site de joaillerie",
    sector: "commerce",
    summary:
      "Un concept de site vitrine pour une maison de joaillerie : installer un univers éditorial, présenter des collections fictives et guider la découverte sur mobile comme sur ordinateur.",
    status: "mock-up",
    demonstratedCapabilities: [
      "Parcours multi-pages : accueil, collections, présentation de la maison et rendez-vous",
      "Catalogue de bijoux avec filtres et informations commerciales fictives",
      "Direction artistique éditoriale avec photographies d’illustration dont les sources sont documentées",
      "Simulation explicite d’un parcours de rendez-vous, sans collecte ni envoi de données",
    ],
    credits: ["Concept et réalisation : StudioB22"],
    limitations: [
      "Maison Aureline est une marque fictive, pas une commande client.",
      "Aucune vente, réservation ou prise de contact réelle n’est disponible dans cette maquette.",
      "Les pièces, tarifs, dates et promesses de service sont des exemples inventés.",
      "Les photographies sont des illustrations provenant de Pexels et ne représentent pas des créations de StudioB22.",
      "La maquette reste un brouillon local et ne doit pas apparaître dans la galerie publique avant une validation séparée.",
    ],
    reviewedAt: "2026-10-06",
    published: false,
  },
] satisfies readonly Project[];
// Astro relocates this module during prerendering; resolve from the build root.
const publicDirectory = resolve("public");
const publicAssetPaths = new Set(
  globSync("**/*", { cwd: publicDirectory })
    .map((path) => `/${path.replaceAll("\\", "/")}`)
    .filter((path) => path.includes(".")),
);

export const projects = parseProjects(projectInputs, publicAssetPaths);
