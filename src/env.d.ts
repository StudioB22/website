/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_RELEASE_CHANNEL?: "preview" | "public";
  readonly STUDIOB22_LOCAL_DEMO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
