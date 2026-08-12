import { useMemo } from 'react';
import { useApiQuery } from '~api/index';
import { CHANNEL_KEY } from '~constants/enums';
import { urls } from '~constants/urls';
import { ChannelKey } from '~services/campaigns/type';
import { fromMinor } from '~utils/helpers';
import {
    ChannelOptionType,
    InventoryChannelsResponse,
    InventoryPricingResponse,
    InventoryRegionsResponse,
    PricingType,
    RegionOptionType,
} from './type';

const INVENTORY_KEY = 'inventory';
const DAYS_IN_MONTH = 30;

/**
 * Sehrgar uchun sotiladigan inventar: kanallar, hududlar va narxlash.
 * Uchtasi bitta ekranda kerak bo'lgani uchun bitta hookda birlashtirilgan.
 */
export const useInventory = () => {
    const channels = useApiQuery<InventoryChannelsResponse>(
        [INVENTORY_KEY, 'channels'],
        urls.inventory.channels,
    );
    const regions = useApiQuery<InventoryRegionsResponse>(
        [INVENTORY_KEY, 'regions'],
        urls.inventory.regions,
    );
    const pricing = useApiQuery<InventoryPricingResponse>(
        [INVENTORY_KEY, 'pricing'],
        urls.inventory.pricing,
    );

    const channelOptions = useMemo<ChannelOptionType[]>(
        () =>
            (channels.data?.data ?? [])
                // BOTH — bu alohida kanal emas, ikkovini birga tanlash natijasi
                .filter(row => row.channel?.name !== 'BOTH')
                .map(row => ({
                    key: CHANNEL_KEY[row.channel?.name] ?? 'parcel',
                    description: row.description,
                    comingSoon: !row.available,
                    cpm: fromMinor(row.defaultCpmMinor),
                })),
        [channels.data],
    );

    const regionOptions = useMemo<RegionOptionType[]>(() => {
        const rows = regions.data?.data ?? [];
        const max = Math.max(...rows.map(row => row.dailyParcelVolume), 1);

        return rows.map(row => ({
            id: row.region,
            name: row.region,
            monthlyVolume: row.dailyParcelVolume * DAYS_IN_MONTH,
            share: Math.round((row.dailyParcelVolume / max) * 100),
            branchCount: row.branchCount,
        }));
    }, [regions.data]);

    const pricingInfo = useMemo<PricingType>(
        () => ({
            availableImpressions: pricing.data?.availableImpressionsPerDay ?? 0,
            minGoal: pricing.data?.minImpressionGoal ?? 0,
            expectedScanRate: pricing.data?.networkScanRatePercent ?? 0,
        }),
        [pricing.data],
    );

    return {
        channels: channelOptions,
        regions: regionOptions,
        pricing: pricingInfo,
        isLoading: channels.isLoading || regions.isLoading || pricing.isLoading,
    };
};

/**
 * Tanlangan kanallar bo'yicha o'rtacha CPM — faqat ko'rsatish uchun.
 * Yakuniy narxni backend `POST /advertiser/campaigns/estimate` hisoblaydi.
 */
export const blendedCpm = (
    channels: ChannelKey[],
    catalog: { key: ChannelKey; cpm: number }[],
): number => {
    const selected = catalog.filter(c => channels.includes(c.key) && c.cpm > 0);
    if (!selected.length) return 0;
    return Math.round(selected.reduce((sum, c) => sum + c.cpm, 0) / selected.length);
};

/** Taxminiy QR skanerlash = maqsad × skanerlash darajasi */
export const estimateScans = (goal: number, scanRate: number): number =>
    Math.round((goal * scanRate) / 100);
