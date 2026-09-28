import type { Brand } from "../domain/brand";

export const brand = {
  name: "StudioB22",
  descriptor: "Sites web clairs, soignés et conçus avec méthode",
  founder: "Benoît Bremaud",
  locale: "fr-FR",
  isProvisional: true,
  canonicalOrigin: null,
  contactEmail: null,
} as const satisfies Brand;
