import { EnumValue } from '~api/types';
import { ChannelKey } from '~services/campaigns/type';

// ─── Backend javob shakllari (`[ADVERTISER] Inventory`) ───

export type InventoryChannelsResponse = {
    data: {
        channel: EnumValue;
        description: string | null;
        defaultCpmMinor: string | null;
        available: boolean;
    }[];
};

export type InventoryRegionsResponse = {
    data: {
        region: string;
        branchCount: number;
        dailyParcelVolume: number;
        sharePercent: number;
    }[];
};

export type InventoryPricingResponse = {
    rules: { channel: EnumValue; region: string | null; cpmMinor: string }[];
    availableImpressionsPerDay: number;
    minImpressionGoal: number;
    /** Tarmoq bo'ylab skanerlash darajasi — hali ma'lumot yetarli bo'lmasa `null` */
    networkScanRatePercent: number | null;
};

// ─── Ekran modellari ───

export type ChannelOptionType = {
    key: ChannelKey;
    /** Backenddan kelgan tavsif; bo'lmasa i18n kaliti ishlatiladi */
    description: string | null;
    /** Hali sotuvga chiqmagan kanal — tanlab bo'lmaydi */
    comingSoon?: boolean;
    /** 1000 ko'rsatish narxi, so'm */
    cpm: number;
};

export type RegionOptionType = {
    id: string;
    name: string;
    /** Oylik taxminiy posilka hajmi (kunlik × 30) */
    monthlyVolume: number;
    /** Eng katta hududga nisbatan ulush, % — progress chizig'i uchun */
    share: number;
    branchCount: number;
};

export type PricingType = {
    /** Tanlanishi mumkin bo'lgan kunlik ko'rsatishlar hajmi */
    availableImpressions: number;
    minGoal: number;
    /** Skanerlash darajasi prognozi, % */
    expectedScanRate: number;
};
