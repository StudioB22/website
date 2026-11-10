import type { Brand } from "../domain/brand";

/** Working identity (ADR-0003): provisional until the brand, origin and mailbox are approved. */
export const brand = {
  name: "StudioB22",
  descriptor: "Sites web clairs, soignés et conçus avec méthode",
  founder: "Benoît Bremaud",
  locale: "fr-FR",
  isProvisional: true,
  publicLaunchApproved: false,
  canonicalOrigin: null,
  contactEmail: null,
} as const satisfies Brand;
