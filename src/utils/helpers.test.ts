import { describe, expect, it } from 'vitest';
import {
    buildSearchParams,
    formatCompactCount,
    formatCompactSum,
    formatDate,
    formatNumber,
    formatPercent,
    formatPhoneNumber,
    formatSum,
    initialOf,
    parseSearchParams,
    toPercent,
} from './helpers';

describe('formatNumber', () => {
    it("mingliklarni bo'shliq bilan ajratadi", () => {
        expect(formatNumber(1234567)).toBe('1 234 567');
    });

    it("nolni to'g'ri qaytaradi", () => {
        expect(formatNumber(0)).toBe('0');
    });

    it('null/undefined uchun tire qaytaradi', () => {
        expect(formatNumber(null)).toBe('—');
        expect(formatNumber(undefined)).toBe('—');
    });

    it("son bo'lmagan kirish uchun tire qaytaradi", () => {
        expect(formatNumber('abc')).toBe('—');
    });
});

describe('formatSum', () => {
    it("valyuta qo'shib qaytaradi", () => {
        expect(formatSum(12400000)).toBe("12 400 000 so'm");
    });

    it("bo'sh qiymat uchun valyutasiz tire qaytaradi", () => {
        expect(formatSum(null)).toBe('—');
    });
});

describe('formatCompactSum', () => {
    // PRODUCT-SPEC §1: "603 mln so'm", "2.1 mlrd so'm"
    it('millionni "mln" bilan qisqartiradi', () => {
        expect(formatCompactSum(486_000_000)).toBe('486 mln');
    });

    it('milliardni "mlrd" bilan qisqartiradi va bir kasr xona qoldiradi', () => {
        expect(formatCompactSum(2_100_000_000)).toBe('2.1 mlrd');
    });

    it('yarim million uchun kasr xonani ko\'rsatadi', () => {
        expect(formatCompactSum(51_500_000)).toBe('51.5 mln');
    });

    it('milliondan kichik summani to\'liq ko\'rsatadi', () => {
        expect(formatCompactSum(105_000)).toBe('105 000');
    });

    it("valyutani qo'shishi mumkin", () => {
        expect(formatCompactSum(486_000_000, true)).toBe("486 mln so'm");
    });

    it('null uchun tire qaytaradi', () => {
        expect(formatCompactSum(null)).toBe('—');
    });
});

describe('formatCompactCount', () => {
    it('millionni M bilan qisqartiradi', () => {
        expect(formatCompactCount(1_600_000)).toBe('1.6M');
    });

    it('100 mingdan kattani K bilan qisqartiradi', () => {
        expect(formatCompactCount(680_000)).toBe('680K');
    });

    it("100 mingdan kichikni to'liq ko'rsatadi", () => {
        expect(formatCompactCount(46_200)).toBe('46 200');
    });

    it('chegaraviy qiymat 100 000 uchun K ishlatadi', () => {
        expect(formatCompactCount(100_000)).toBe('100K');
    });
});

describe('formatPercent', () => {
    it('kasr foizni qaytaradi', () => {
        expect(formatPercent(6.8)).toBe('6.8%');
    });

    it("butun foizda ortiqcha nol qoldirmaydi", () => {
        expect(formatPercent(68)).toBe('68%');
    });

    it('null uchun tire qaytaradi', () => {
        expect(formatPercent(null)).toBe('—');
    });
});

describe('toPercent', () => {
    it('ulushni foizga aylantiradi', () => {
        expect(toPercent(680_000, 1_000_000)).toBe(68);
    });

    it('100 dan oshirmaydi', () => {
        expect(toPercent(1_200, 1_000)).toBe(100);
    });

    it('nol yoki bo\'sh qiymatda 0 qaytaradi', () => {
        expect(toPercent(0, 1_000)).toBe(0);
        expect(toPercent(500, 0)).toBe(0);
        expect(toPercent(null, null)).toBe(0);
    });
});

describe('formatPhoneNumber', () => {
    it("to'liq raqamni formatlaydi", () => {
        expect(formatPhoneNumber('998901234567')).toBe('(90) 123-45-67');
    });

    it('raqam ichidagi belgilarni tozalaydi', () => {
        expect(formatPhoneNumber('+998 (90) 123-45-67')).toBe('(90) 123-45-67');
    });

    it("bo'sh / null uchun bo'sh string qaytaradi", () => {
        expect(formatPhoneNumber('')).toBe('');
        expect(formatPhoneNumber(null)).toBe('');
    });
});

describe('formatDate', () => {
    it('ISO sanani formatlaydi', () => {
        expect(formatDate('2026-07-28T10:30:00.000Z')).toBe('28.07.2026');
    });

    it("noto'g'ri sana uchun tire qaytaradi", () => {
        expect(formatDate('not-a-date')).toBe('—');
        expect(formatDate(null)).toBe('—');
    });
});

describe('initialOf', () => {
    it('birinchi harfni katta qilib qaytaradi', () => {
        expect(initialOf('Korzinka')).toBe('K');
    });

    it("bo'sh qiymat uchun tire qaytaradi", () => {
        expect(initialOf('')).toBe('—');
        expect(initialOf(null)).toBe('—');
    });
});

describe('search params', () => {
    it('query-stringni obyektga aylantiradi', () => {
        expect(parseSearchParams('?page=2&limit=20')).toEqual({ page: '2', limit: '20' });
    });

    it("bo'sh qiymatlarni tashlab yuboradi", () => {
        expect(buildSearchParams({ page: 1, status: '', q: undefined })).toBe('?page=1');
    });

    it("hamma qiymat bo'sh bo'lsa bo'sh string qaytaradi", () => {
        expect(buildSearchParams({ q: '', page: null })).toBe('');
    });
});
