import type { Project } from "../domain/project";

type PublishedProject = Extract<Project, { published: true }>;

export const sectorLabels: Record<Project["sector"], string> = {
  "artisans-et-metiers": "Artisanat et métiers",
  "restauration-et-hospitalite": "Restauration et accueil",
  commerce: "Commerce",
  "beaute-et-bien-etre": "Beauté et bien-être",
  sante: "Santé",
  immobilier: "Immobilier",
  sport: "Sport",
  photographie: "Photographie",
  "services-locaux": "Services de proximité",
};

export const statusLabels: Record<Project["status"], string> = {
  concept: "Concept",
  "mock-up": "Maquette",
  demonstrator: "Démonstration",
  "client-work": "Projet client",
  "archived-experiment": "Expérimentation archivée",
};

export const visualDirectionLabels: Record<
  PublishedProject["visualDirection"],
  string
> = {
  editoriale: "Éditoriale",
  "chaleureuse-et-organique": "Chaleureuse et organique",
  "contemporaine-et-affirmee": "Contemporaine et affirmée",
  "elegante-et-minimale": "Élégante et minimale",
  "ludique-et-coloree": "Ludique et colorée",
  "technique-et-fonctionnelle": "Technique et fonctionnelle",
};

export const reviewDateLabels: Record<
  keyof PublishedProject["reviewDates"],
  string
> = {
  content: "Contenu",
  rights: "Droits",
  security: "Sécurité",
  dependencies: "Dépendances",
  accessibility: "Accessibilité",
  performance: "Performance",
  responsive: "Adaptation aux écrans",
  demoMaturity: "Maturité de la démonstration",
};

export const formatReviewDate = (date: string): string =>
  new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
