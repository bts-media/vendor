export let baseURL = '';
if (import.meta.env.VITE_APP_MODE === 'development') {
    baseURL = import.meta.env.VITE_API_DEVELOPMENT_URL;
} else {
    baseURL = import.meta.env.VITE_API_PRODUCTION_URL;
}

/**
 * Dinamik segmentli URL — funksiya, statik URL — string.
 * Endpoint hech qachon komponent yoki service ichida qattiq yozilmaydi.
 */
export const urls = {
    auth: {
        login: '/vendor/auth/login',
        refresh: '/vendor/auth/refresh',
        logout: '/vendor/auth/logout',
        me: '/vendor/auth/me',
    },
    profile: {
        get: '/vendor/profile',
        update: '/vendor/profile',
    },
    stats: {
        overview: '/vendor/stats/overview',
    },
    /** Namunaviy feature — o'z entity'ngiz bilan almashtiring (§17 checklist). */
    items: {
        get: '/vendor/items',
        create: '/vendor/items',
        update: (id: string) => `/vendor/items/${id}`,
        getById: (id: string) => `/vendor/items/${id}`,
    },
    upload: {
        image: '/vendor/upload/image',
    },
};
