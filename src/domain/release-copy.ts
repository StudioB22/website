import type { ReleaseChannel } from "./brand";

export const pageDescription = (
  description: string,
  channel: ReleaseChannel,
): string =>
  channel === "preview" ? `${description} Préversion privée.` : description;

export const previewOnly = (
  copy: string,
  channel: ReleaseChannel,
): string | null => (channel === "preview" ? copy : null);
