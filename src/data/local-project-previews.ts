import type { LocalProjectPreviewInput } from "../domain/local-project-preview";

/** Registered local previews: fictional concepts reviewed locally, never published as client work. */
export const localProjectPreviewInputs = [
  {
    projectSlug: "maison-marceau",
    displayTitle: "Maison Marceau",
    formatLabel: "Site vitrine fictif et responsive",
    overviewTitle: "Un univers de barbier premium",
    overview:
      "Une ambiance sombre, une palette dorée et des photographies d’illustration. Maison Marceau est un concept fictif, pas une réalisation client.",
    demoUrl: "http://127.0.0.1:4401/",
    demoUrlEnv: "STUDIOB22_LOCAL_DEMO_URL",
    captureDate: "2026-10-02",
    sourceCommit: "8c8bb05898280f4d636555b5f0b0fb27a9adfb70",
    captureCredits: [
      "Photo visible dans les captures : Halem Mumtaz Mahal, Pexels 34865582. Illustration d’un salon, sans lien avec un commerce réel Maison Marceau. La licence de banque d’images ne garantit pas tous les droits des éléments représentés.",
    ],
    captures: [
      {
        name: "desktop",
        sourceFilename: "desktop-8c8bb05.png",
        width: 1280,
        height: 900,
        alt: "Accueil de la maquette fictive Maison Marceau sur ordinateur.",
      },
      {
        name: "mobile",
        sourceFilename: "mobile-8c8bb05.png",
        width: 780,
        height: 1688,
        alt: "Accueil de la maquette fictive Maison Marceau sur mobile.",
      },
    ],
  },
  {
    projectSlug: "maison-aureline",
    displayTitle: "Maison Aureline",
    formatLabel: "Site vitrine fictif et responsive",
    overviewTitle: "Une joaillerie éditoriale et lumineuse",
    overview:
      "Une palette ivoire et champagne, une composition éditoriale et des photographies d’illustration vérifiées. Maison Aureline est un concept fictif, pas une réalisation client.",
    demoUrl: "http://127.0.0.1:4403/",
    demoUrlEnv: "STUDIOB22_LOCAL_MAISON_AURELINE_URL",
    captureDate: "2026-10-06",
    sourceCommit: "20801cd73c92bbde4165a53f131570722f29491c",
    captureCredits: [
      "Photo principale visible dans les captures : Melike Baran, Pexels 32922844. Illustration de bijoux portée pour une marque fictive, sans lien avec un commerce réel Maison Aureline. La licence de banque d’images ne garantit pas tous les droits des éléments représentés.",
    ],
    captures: [
      {
        name: "desktop",
        sourceFilename: "desktop-20801cd.png",
        width: 1280,
        height: 900,
        alt: "Accueil de la maquette fictive Maison Aureline sur ordinateur.",
      },
      {
        name: "mobile",
        sourceFilename: "mobile-20801cd.png",
        width: 390,
        height: 1688,
        alt: "Accueil de la maquette fictive Maison Aureline sur mobile.",
      },
    ],
  },
] satisfies readonly LocalProjectPreviewInput[];
