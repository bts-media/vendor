import { AnalyticsOverviewType, PeriodKey, TrendPointType } from './type';

/**
 * Raqamlar o'zaro muvofiq: hudud va kanal kesimlari KPI yig'indisiga teng.
 * (ko'rsatishlar 4 630 000 · skanerlash 314 800 · skanerlash darajasi 6.8%)
 */
export const mockAnalytics: AnalyticsOverviewType = {
    kpis: {
        impressions: 4_630_000,
        scans: 314_800,
        scanRate: 6.8,
        audience: 1_240_000,
        spend: 486_000_000,
    },
    funnel: {
        delivered: 4_630_000,
        scans: 314_800,
        clicks: 96_500,
    },
    channels: [
        {
            key: 'parcel',
            impressions: 3_380_000,
            scans: 253_500,
            scanRate: 7.5,
            spend: 364_000_000,
        },
        {
            key: 'screen',
            impressions: 1_250_000,
            scans: 61_300,
            scanRate: 4.9,
            spend: 122_000_000,
        },
    ],
    regions: [
        { id: 'tashkent', name: 'Toshkent shahri', impressions: 1_950_000, scans: 138_900, share: 42 },
        { id: 'fergana', name: "Farg'ona vodiysi", impressions: 920_000, scans: 61_200, share: 20 },
        { id: 'samarkand', name: 'Samarqand', impressions: 720_000, scans: 48_600, share: 16 },
        { id: 'andijan', name: 'Andijon', impressions: 430_000, scans: 27_400, share: 9 },
        { id: 'namangan', name: 'Namangan', impressions: 320_000, scans: 19_800, share: 7 },
        { id: 'bukhara', name: 'Buxoro', impressions: 290_000, scans: 18_900, share: 6 },
    ],
    creatives: [
        { id: 'crt-5', name: 'Qishki savdo · yorliq', scans: 61_300, scanRate: 7.7 },
        { id: 'crt-3', name: 'Bahor · yorliq', scans: 52_100, scanRate: 10.4 },
        { id: 'crt-1', name: 'Kreativ A · Korzinka −20%', scans: 38_400, scanRate: 5.6 },
        { id: 'crt-2', name: 'Bayram · ekran 16:9', scans: 7_800, scanRate: 4.8 },
    ],
};

/** Vaqt qatori — davr almashtirgichi faqat shu grafikga ta'sir qiladi. */
export const mockTrend: Record<PeriodKey, TrendPointType[]> = {
    year: [
        { label: 'Yan', parcel: 440_000, screen: 190_000 },
        { label: 'Fev', parcel: 400_000, screen: 175_000 },
        { label: 'Mar', parcel: 320_000, screen: 150_000 },
        { label: 'Apr', parcel: 360_000, screen: 160_000 },
        { label: 'May', parcel: 520_000, screen: 185_000 },
        { label: 'Iyun', parcel: 640_000, screen: 195_000 },
        { label: 'Iyul', parcel: 700_000, screen: 195_000 },
    ],
    '90d': [
        { label: 'May', parcel: 520_000, screen: 185_000 },
        { label: 'Iyun', parcel: 640_000, screen: 195_000 },
        { label: 'Iyul', parcel: 700_000, screen: 195_000 },
    ],
    '30d': [
        { label: '1-hafta', parcel: 160_000, screen: 48_000 },
        { label: '2-hafta', parcel: 175_000, screen: 50_000 },
        { label: '3-hafta', parcel: 180_000, screen: 48_000 },
        { label: '4-hafta', parcel: 185_000, screen: 49_000 },
    ],
};
