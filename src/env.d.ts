/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_RELEASE_CHANNEL?: "preview" | "public";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
