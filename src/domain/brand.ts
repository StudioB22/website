import { z } from "zod";

/** `preview` is the private release 0.1; `public` requires an approved brand (ADR-0004). */
export const releaseChannelSchema = z.enum(["preview", "public"]);

/** Release channel selected by `PUBLIC_RELEASE_CHANNEL`. */
export type ReleaseChannel = z.infer<typeof releaseChannelSchema>;

const webOriginSchema = z.url().refine((value) => {
  if (!URL.canParse(value)) {
    return false;
  }

  const url = new URL(value);

  return (
    (url.protocol === "https:" || url.protocol === "http:") &&
    url.pathname === "/" &&
    url.search === "" &&
    url.hash === "" &&
    url.username === "" &&
    url.password === ""
  );
}, "Expected an HTTP(S) origin without credentials, path, query, or fragment");

/** Brand contract: a provisional identity may leave the origin and contact email unset. */
export const brandSchema = z.object({
  name: z.string().trim().min(1),
  descriptor: z.string().trim().min(1),
  founder: z.string().trim().min(1),
  locale: z.literal("fr-FR"),
  isProvisional: z.boolean(),
  publicLaunchApproved: z.boolean(),
  canonicalOrigin: webOriginSchema.nullable(),
  contactEmail: z.email().nullable(),
});

/** Validated brand identity. */
export type Brand = z.infer<typeof brandSchema>;

/** Refuse a public release until the brand, launch approval, origin and contact email exist. */
export const validateBrandForRelease = (
  input: unknown,
  releaseChannel: ReleaseChannel,
): Brand => {
  const brand = brandSchema.parse(input);

  if (
    releaseChannel === "public" &&
    (brand.isProvisional ||
      !brand.publicLaunchApproved ||
      brand.canonicalOrigin === null ||
      brand.contactEmail === null)
  ) {
    throw new Error(
      "A public release requires an approved brand, explicit launch approval, canonical origin, and contact email.",
    );
  }

  return brand;
};
