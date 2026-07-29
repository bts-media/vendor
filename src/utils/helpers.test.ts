import { describe, expect, it } from 'vitest';
import {
    buildSearchParams,
    formatDate,
    formatNumber,
    formatPhoneNumber,
    formatPrice,
    formatRating,
    parseSearchParams,
} from './helpers';

describe('formatPhoneNumber', () => {
    it("to'liq raqamni formatlaydi", () => {
        expect(formatPhoneNumber('998901234567')).toBe('(90) 123-45-67');
    });

    it('998 prefiksisiz raqamni ham formatlaydi', () => {
        expect(formatPhoneNumber('901234567')).toBe('(90) 123-45-67');
    });

    it('raqam ichidagi belgilarni tozalaydi', () => {
        expect(formatPhoneNumber('+998 (90) 123-45-67')).toBe('(90) 123-45-67');
    });

    it("bo'sh / null uchun bo'sh string qaytaradi", () => {
        expect(formatPhoneNumber('')).toBe('');
        expect(formatPhoneNumber(null)).toBe('');
        expect(formatPhoneNumber(undefined)).toBe('');
    });
});

describe('formatRating', () => {
    // Backend numeric ustunni string qaytaradi — crash bo'lmasligi kerak
    it('string qiymatni ham formatlaydi', () => {
        expect(formatRating('4.80')).toBe('4.8');
    });

    it('butun sonni ortiqcha nolsiz qaytaradi', () => {
        expect(formatRating(5)).toBe('5');
    });

    it('null/undefined uchun tire qaytaradi', () => {
        expect(formatRating(null)).toBe('—');
        expect(formatRating(undefined)).toBe('—');
    });

    it("son bo'lmagan kirish uchun tire qaytaradi", () => {
        expect(formatRating('abc')).toBe('—');
    });
});

describe('formatNumber', () => {
    it("mingliklarni bo'shliq bilan ajratadi", () => {
        expect(formatNumber(1234567)).toBe('1 234 567');
    });

    it("nolni to'g'ri qaytaradi", () => {
        expect(formatNumber(0)).toBe('0');
    });

    it('null uchun tire qaytaradi', () => {
        expect(formatNumber(null)).toBe('—');
    });
});

describe('formatPrice', () => {
    it('valyuta qo\'shib qaytaradi', () => {
        expect(formatPrice(1250000)).toBe("1 250 000 so'm");
    });

    it('valyutani almashtirish mumkin', () => {
        expect(formatPrice(10, 'USD')).toBe('10 USD');
    });

    it("bo'sh qiymat uchun valyutasiz tire qaytaradi", () => {
        expect(formatPrice(null)).toBe('—');
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
