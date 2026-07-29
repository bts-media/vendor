import dayjs from 'dayjs';

// ===== localStorage =====

export const getLocalstorage = (key: string): string | null => {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
};

export const setLocalstorage = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch {
        /* private mode / kvota to'lgan — jim o'tamiz */
    }
};

export const removeLocalstorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch {
        /* noop */
    }
};

/** Sessiyaga tegishli hamma narsani tozalaydi. 401/403 da redirectdan OLDIN chaqiriladi. */
export const clearLocalStorage = () => {
    ['accessToken', 'refreshToken', 'role', 'vendorName'].forEach(removeLocalstorage);
};

// ===== Formatlash =====

/** "998901234567" → "(90) 123-45-67" */
export const formatPhoneNumber = (phone?: string | null): string => {
    if (!phone) return '';
    const digits = String(phone).replace(/\D/g, '');
    const local = digits.startsWith('998') ? digits.slice(3) : digits;
    if (local.length !== 9) return local;
    return `(${local.slice(0, 2)}) ${local.slice(2, 5)}-${local.slice(5, 7)}-${local.slice(7)}`;
};

/** Backend numeric ustunni string qaytarishi mumkin — ikkalasini ham qabul qiladi. */
export const formatRating = (value?: number | string | null): string => {
    if (value === null || value === undefined || value === '') return '—';
    const num = Number(value);
    if (Number.isNaN(num)) return '—';
    return String(Number(num.toFixed(1)));
};

/**
 * 1234567 → "1 234 567"
 * Ajratgich sifatida oddiy ASCII bo'shliq ishlatiladi: `toLocaleString('ru-RU')` ICU versiyasiga
 * qarab nbsp (U+00A0) qaytaradi va testlar "ko'rinmas" farq tufayli yiqiladi.
 */
export const formatNumber = (value?: number | string | null): string => {
    if (value === null || value === undefined || value === '') return '—';
    const num = Number(value);
    if (Number.isNaN(num)) return '—';
    return num.toLocaleString('en-US').replace(/,/g, ' ');
};

/** 1250000 → "1 250 000 so'm" */
export const formatPrice = (value?: number | string | null, currency = "so'm"): string => {
    const formatted = formatNumber(value);
    return formatted === '—' ? formatted : `${formatted} ${currency}`;
};

/** ISO sana → "28.07.2026" (Date obyekti bilan ishlamaymiz — faqat dayjs) */
export const formatDate = (value?: string | null, template = 'DD.MM.YYYY'): string => {
    if (!value) return '—';
    const date = dayjs(value);
    return date.isValid() ? date.format(template) : '—';
};

export const formatDateTime = (value?: string | null): string =>
    formatDate(value, 'DD.MM.YYYY HH:mm');

// ===== Parsing =====

/** "?page=2&limit=20" → { page: "2", limit: "20" } */
export const parseSearchParams = (search: string): Record<string, string> =>
    Object.fromEntries(new URLSearchParams(search));

/** Bo'sh / undefined qiymatlarni tashlab, query-string yig'adi. */
export const buildSearchParams = (params: Record<string, unknown>): string => {
    const entries = Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== '',
    );
    if (!entries.length) return '';
    return `?${new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()}`;
};
