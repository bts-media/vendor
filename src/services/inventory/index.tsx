import { useMemo } from 'react';
import { useApiQuery } from '~api/index';
import { CHANNEL_KEY } from '~constants/enums';
import { urls } from '~constants/urls';
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
                // BOTH / NONE — alohida sotiladigan kanal emas, sehrgar ularni o'zi hosil qiladi
                .filter(row => row.channel?.name === 'PARCEL' || row.channel?.name === 'SCREEN')
                .map(row => ({
                    key: CHANNEL_KEY[row.channel?.name] ?? 'parcel',
                    description: row.description,
                    comingSoon: !row.available,
                    unitPrice: fromMinor(row.unitPriceMinor),
                    priceBasis: row.priceBasis?.name ?? '',
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
            expectedScanRate: pricing.data?.scanRatePercent ?? 0,
            parcelPrice: fromMinor(
                pricing.data?.rules.find(rule => rule.region === null)?.parcelPriceMinor,
            ),
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

/** Taxminiy QR skanerlash = maqsad × skanerlash darajasi */
export const estimateScans = (goal: number, scanRate: number): number =>
    Math.round((goal * scanRate) / 100);
