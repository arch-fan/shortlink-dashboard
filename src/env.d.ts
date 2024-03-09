/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly TURSO_URL: string;
  readonly TURSO_TOKEN: string;
  readonly JWT_SECRET: string;
  readonly USERNAME: string;
  readonly PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
