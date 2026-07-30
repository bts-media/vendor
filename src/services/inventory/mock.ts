import { ChannelOptionType, PricingType, RegionOptionType } from './type';

export const mockChannels: ChannelOptionType[] = [
    { key: 'parcel', labelKey: 'channel_parcel_full', descKey: 'channel_parcel_desc', cpm: 112_000 },
    { key: 'screen', labelKey: 'channel_screen_full', descKey: 'channel_screen_desc', cpm: 98_000 },
    {
        key: 'sms',
        labelKey: 'channel_sms',
        descKey: 'channel_sms_desc',
        cpm: 0,
        comingSoon: true, // technical-brief: SMS — 2-bosqich kanali
    },
];

/** Hajmlar mockupdan; ulush eng katta hududga (Toshkent) nisbatan hisoblangan. */
export const mockRegions: RegionOptionType[] = [
    { id: 'tashkent', name: 'Toshkent shahri', monthlyVolume: 82_000, share: 100, isCity: true },
    { id: 'fergana', name: "Farg'ona vodiysi", monthlyVolume: 68_000, share: 83, isCity: false },
    { id: 'samarkand', name: 'Samarqand', monthlyVolume: 41_000, share: 50, isCity: true },
    { id: 'andijan', name: 'Andijon', monthlyVolume: 35_000, share: 43, isCity: true },
    { id: 'namangan', name: 'Namangan', monthlyVolume: 31_000, share: 38, isCity: true },
    { id: 'bukhara', name: 'Buxoro', monthlyVolume: 28_000, share: 34, isCity: true },
    { id: 'kashkadarya', name: 'Qashqadaryo', monthlyVolume: 24_000, share: 29, isCity: false },
    { id: 'khorezm', name: 'Xorazm', monthlyVolume: 19_000, share: 23, isCity: false },
];

export const mockPricing: PricingType = {
    availableImpressions: 1_600_000,
    minGoal: 100_000,
    expectedScanRate: 6.8,
};
