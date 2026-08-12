export let baseURL = '';
if (import.meta.env.VITE_APP_MODE === 'development') {
    baseURL = import.meta.env.VITE_API_DEVELOPMENT_URL;
} else {
    baseURL = import.meta.env.VITE_API_PRODUCTION_URL;
}

/** Trailing slash bo'lsa `${baseURL}${url}` ikki slash beradi — bir marta kesib qo'yamiz. */
baseURL = (baseURL ?? '').replace(/\/+$/, '');

/**
 * Reklama beruvchi portali endpointlari (technical-brief §3 "Advertiser portal").
 * Dinamik segmentli URL — funksiya, statik URL — string.
 * Endpoint hech qachon komponent yoki service ichida qattiq yozilmaydi.
 *
 * Barcha marshrut `/advertiser/*` prefiksi ostida (Swagger: `[ADVERTISER]` guruhi).
 */
export const urls = {
    auth: {
        login: '/advertiser/auth/login',
        refresh: '/advertiser/auth/refresh',
        logout: '/advertiser/auth/logout',
        me: '/advertiser/auth/me',
    },
    dashboard: {
        stats: '/advertiser/dashboard/stats',
    },
    campaigns: {
        get: '/advertiser/campaigns',
        create: '/advertiser/campaigns',
        getById: (id: string) => `/advertiser/campaigns/${id}`,
        update: (id: string) => `/advertiser/campaigns/${id}`,
        pause: (id: string) => `/advertiser/campaigns/${id}/pause`,
        /** Sehrgardagi real-vaqt narx hisobi */
        estimate: '/advertiser/campaigns/estimate',
    },
    creatives: {
        get: '/advertiser/creatives',
        create: '/advertiser/creatives',
        getById: (id: string) => `/advertiser/creatives/${id}`,
        upload: '/advertiser/creatives/upload',
    },
    inventory: {
        channels: '/advertiser/inventory/channels',
        regions: '/advertiser/inventory/regions',
        pricing: '/advertiser/inventory/pricing',
    },
    analytics: {
        overview: '/advertiser/analytics/overview',
        funnel: '/advertiser/analytics/funnel',
        channels: '/advertiser/analytics/channels',
        regions: '/advertiser/analytics/regions',
        creatives: '/advertiser/analytics/creatives',
    },
    uploads: {
        create: '/uploads',
    },
    finance: {
        overview: '/advertiser/finance/overview',
        invoices: '/advertiser/finance/invoices',
        invoiceById: (id: string) => `/advertiser/finance/invoices/${id}`,
        payments: '/advertiser/finance/payments',
        topUp: '/advertiser/finance/top-up',
    },
};
