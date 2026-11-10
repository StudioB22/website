import type { ReleaseChannel } from "./brand";

/** Append the private-preview mention to a page description on the preview channel only. */
export const pageDescription = (
  description: string,
  channel: ReleaseChannel,
): string =>
  channel === "preview" ? `${description} Préversion privée.` : description;

/** Copy shown on the preview channel only; `null` keeps it out of the public release. */
export const previewOnly = (
  copy: string,
  channel: ReleaseChannel,
): string | null => (channel === "preview" ? copy : null);
