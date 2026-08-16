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
	['accessToken', 'refreshToken', 'role', 'advertiserName', 'billingType'].forEach(
		removeLocalstorage,
	);
};

// ===== Raqam formati =====
// PRODUCT-SPEC §1: `603 mln so'm`, `2.1 mlrd so'm`, `105 000 so'm` (probel bilan).

/**
 * 1234567 → "1 234 567"
 * Ajratgich — oddiy ASCII bo'shliq: `toLocaleString('ru-RU')` ICU versiyasiga qarab nbsp
 * qaytaradi va testlar "ko'rinmas" farq tufayli yiqiladi.
 */
export const formatNumber = (value?: number | string | null): string => {
	if (value === null || value === undefined || value === '') return '—';
	const num = Number(value);
	if (Number.isNaN(num)) return '—';
	return num.toLocaleString('en-US').replace(/,/g, ' ');
};

/** 12400000 → "12 400 000 so'm" */
export const formatSum = (value?: number | string | null): string => {
	const formatted = formatNumber(value);
	return formatted === '—' ? formatted : `${formatted} so'm`;
};

/**
 * Yirik summalar uchun qisqa shakl (PRODUCT-SPEC §1):
 * 486_000_000 → "486 mln", 2_100_000_000 → "2.1 mlrd", 105_000 → "105 000"
 */
export const formatCompactSum = (value?: number | string | null, withCurrency = false): string => {
	if (value === null || value === undefined || value === '') return '—';
	const num = Number(value);
	if (Number.isNaN(num)) return '—';

	const suffix = withCurrency ? " so'm" : '';
	const abs = Math.abs(num);
	const short = (divider: number, unit: string) => {
		const scaled = num / divider;
		// 486.0 → "486", 51.5 → "51.5" (bir kasr xonadan ortiq ko'rsatilmaydi)
		const text = String(Number(scaled.toFixed(1)));
		return `${text} ${unit}${suffix}`;
	};

	if (abs >= 1_000_000_000) return short(1_000_000_000, 'mlrd');
	if (abs >= 1_000_000) return short(1_000_000, 'mln');
	return `${formatNumber(num)}${suffix}`;
};

/**
 * Ko'rsatishlar/skanerlashlar uchun ixcham shakl (mockupdagi kabi):
 * 1_600_000 → "1.6M", 680_000 → "680K", 46_200 → "46 200"
 */
export const formatCompactCount = (value?: number | string | null): string => {
	if (value === null || value === undefined || value === '') return '—';
	const num = Number(value);
	if (Number.isNaN(num)) return '—';

	const abs = Math.abs(num);
	if (abs >= 1_000_000) return `${Number((num / 1_000_000).toFixed(1))}M`;
	if (abs >= 100_000) return `${Math.round(num / 1000)}K`;
	return formatNumber(num);
};

/** 6.8 → "6.8%" · 68 → "68%" */
export const formatPercent = (value?: number | string | null, digits = 1): string => {
	if (value === null || value === undefined || value === '') return '—';
	const num = Number(value);
	if (Number.isNaN(num)) return '—';
	return `${Number(num.toFixed(digits))}%`;
};

/** Ulush foizi: 680000 / 1000000 → 68 (0–100 oralig'ida qirqiladi) */
export const toPercent = (part?: number | null, total?: number | null): number => {
	if (!part || !total) return 0;
	return Math.min(100, Math.max(0, Math.round((part / total) * 100)));
};

/** Backend numeric ustunni string qaytarishi mumkin — ikkalasini ham qabul qiladi. */
export const formatRating = (value?: number | string | null): string => {
	if (value === null || value === undefined || value === '') return '—';
	const num = Number(value);
	if (Number.isNaN(num)) return '—';
	return String(Number(num.toFixed(1)));
};

/** "998901234567" → "(90) 123-45-67" */
export const formatPhoneNumber = (phone?: string | null): string => {
	if (!phone) return '';
	const digits = String(phone).replace(/\D/g, '');
	const local = digits.startsWith('998') ? digits.slice(3) : digits;
	if (local.length !== 9) return local;
	return `(${local.slice(0, 2)}) ${local.slice(2, 5)}-${local.slice(5, 7)}-${local.slice(7)}`;
};

// ===== Sana =====

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

/** Ism/nomdan avatar harfi: "Korzinka" → "K" */
export const initialOf = (value?: string | null): string =>
	value?.trim()?.charAt(0)?.toUpperCase() || '—';

// ===== Pul birligi =====

/**
 * Backend puldagi barcha maydonni TIYINDA va JSON string sifatida yuboradi
 * (`...Minor` qo'shimchasi bilan). UI so'mda ishlaydi — chegara shu funksiya.
 */
export const fromMinor = (value?: string | number | null): number => {
	if (value === null || value === undefined || value === '') return 0;
	const num = Number(value);
	return Number.isNaN(num) ? 0 : Math.round(num) / 100;
};

/** Teskari yo'nalish: so'm → tiyin, backend kutgan string ko'rinishida. */
export const toMinor = (value?: number | null): string => {
	if (value === null || value === undefined || Number.isNaN(Number(value))) return '0';
	return String(Math.round(Number(value) * 100));
};

// ===== Xatolar =====

/**
 * Axios xatosidan backend xabarini xavfsiz ajratib oladi.
 * Validatsiya xatosida `message` string massiv bo'ladi — birinchi qatorini olamiz.
 */
export const getApiErrorMessage = (err: unknown, fallback: string): string => {
	const data = (
		err as { response?: { data?: { message?: string | string[]; description?: string } } }
	)?.response?.data;
	if (!data) return fallback;
	if (Array.isArray(data.message)) return data.message[0] || fallback;
	return data.description || data.message || fallback;
};

/** "2 daqiqa oldin" · "3 soat oldin" · undan uzoq bo'lsa sana. */
export const formatRelativeTime = (value?: string | null): string => {
	if (!value) return '—';
	const date = dayjs(value);
	if (!date.isValid()) return '—';

	const seconds = dayjs().diff(date, 'second');
	if (seconds < 60) return 'hozir';
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes} daqiqa oldin`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} soat oldin`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `${days} kun oldin`;
	return date.format('DD.MM.YYYY');
};
