/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_NEWS_ENGINE_API_KEY: string
  readonly VITE_FINNHUB_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}