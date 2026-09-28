import { z } from "zod";

export const releaseChannelSchema = z.enum(["preview", "public"]);

export type ReleaseChannel = z.infer<typeof releaseChannelSchema>;

export const brandSchema = z.object({
  name: z.string().trim().min(1),
  descriptor: z.string().trim().min(1),
  founder: z.string().trim().min(1),
  locale: z.literal("fr-FR"),
  isProvisional: z.boolean(),
  canonicalOrigin: z.url().nullable(),
  contactEmail: z.email().nullable(),
});

export type Brand = z.infer<typeof brandSchema>;

export const validateBrandForRelease = (
  input: unknown,
  releaseChannel: ReleaseChannel,
): Brand => {
  const brand = brandSchema.parse(input);

  if (
    releaseChannel === "public" &&
    (brand.isProvisional ||
      brand.canonicalOrigin === null ||
      brand.contactEmail === null)
  ) {
    throw new Error(
      "A public release requires an approved brand, canonical origin, and contact email.",
    );
  }

  return brand;
};
