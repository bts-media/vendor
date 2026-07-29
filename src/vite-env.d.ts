/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_MODE: 'development' | 'production';
    readonly VITE_API_DEVELOPMENT_URL: string;
    readonly VITE_API_PRODUCTION_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
