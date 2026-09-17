import { EnumValue } from '~api/types';
import { ChannelKey } from '~services/campaigns/type';

// ─── Backend javob shakllari (`[ADVERTISER] Inventory`) ───

export type InventoryChannelsResponse = {
    data: {
        channel: EnumValue;
        description: string | null;
        /** PER_PARCEL_WEIGHT (posilka) yoki PER_BRANCH_MONTH (ekran) */
        priceBasis: EnumValue;
        /** Bir birlik narxi, tiyin: eng yengil posilka stikeri / bir filial bir oy televizor */
        unitPriceMinor: string | null;
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
    /** Posilka narxlari (faqat PARCEL), avval standart, keyin hududlar */
    rules: { channel: EnumValue; region: string | null; parcelPriceMinor: string }[];
    availableImpressionsPerDay: number;
    minImpressionGoal: number;
    /** Reklama beruvchining o'z skanerlash darajasi — hali posilka yetkazilmagan bo'lsa `null` */
    scanRatePercent: number | null;
};

// ─── Ekran modellari ───

export type ChannelOptionType = {
    key: ChannelKey;
    /** Backenddan kelgan tavsif; bo'lmasa i18n kaliti ishlatiladi */
    description: string | null;
    /** Hali sotuvga chiqmagan kanal — tanlab bo'lmaydi */
    comingSoon?: boolean;
    /** Bir birlik narxi, so'm (posilka — bitta stiker, ekran — bir filial bir oy) */
    unitPrice: number;
    /** `PER_PARCEL_WEIGHT` | `PER_BRANCH_MONTH` — birlik nimaligini aytadi */
    priceBasis: string;
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
    /** Standart posilka narxi (eng yengil bosqich), so'm */
    parcelPrice: number;
};
