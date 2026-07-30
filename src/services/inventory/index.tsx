import { useMockQuery } from '~api/mock';
import { ChannelKey } from '~services/campaigns/type';
import { mockChannels, mockPricing, mockRegions } from './mock';

const INVENTORY_KEY = 'inventory';

/**
 * Sehrgar uchun sotiladigan inventar: kanallar, hududlar va narxlash.
 * Uchtasi bitta ekranda kerak bo'lgani uchun bitta hookda birlashtirilgan.
 */
export const useInventory = () => {
    // Backend: useCustomGetQuery<...>(INVENTORY_KEY, urls.inventory.channels) va h.k.
    const { data: channels, isLoading: isChannelsLoading } = useMockQuery(
        `${INVENTORY_KEY}-channels`,
        mockChannels,
    );
    const { data: regions, isLoading: isRegionsLoading } = useMockQuery(
        `${INVENTORY_KEY}-regions`,
        mockRegions,
    );
    const { data: pricing, isLoading: isPricingLoading } = useMockQuery(
        `${INVENTORY_KEY}-pricing`,
        mockPricing,
    );

    return {
        channels: channels ?? [],
        regions: regions ?? [],
        pricing: pricing ?? { availableImpressions: 0, minGoal: 0, expectedScanRate: 0 },
        isLoading: isChannelsLoading || isRegionsLoading || isPricingLoading,
    };
};

/**
 * Tanlangan kanallar bo'yicha o'rtacha CPM.
 * Mockupdagi kabi: posilka + ekran → (112 000 + 98 000) / 2 = 105 000 so'm.
 */
export const blendedCpm = (
    channels: ChannelKey[],
    catalog: { key: ChannelKey; cpm: number }[],
): number => {
    const selected = catalog.filter(c => channels.includes(c.key) && c.cpm > 0);
    if (!selected.length) return 0;
    return Math.round(selected.reduce((sum, c) => sum + c.cpm, 0) / selected.length);
};

/** Taxminiy jami = maqsad / 1000 × CPM */
export const estimateCost = (goal: number, cpm: number): number => Math.round((goal / 1000) * cpm);

/** Taxminiy QR skanerlash = maqsad × skanerlash darajasi */
export const estimateScans = (goal: number, scanRate: number): number =>
    Math.round((goal * scanRate) / 100);
