/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_XSTATE_DEBUG: '1' | '0'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
