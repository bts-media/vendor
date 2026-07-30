import { ChannelKey } from '~services/campaigns/type';

export type ChannelOptionType = {
    key: ChannelKey;
    /** i18n kalitlari */
    labelKey: string;
    descKey: string;
    /** Hali sotuvga chiqmagan kanal — tanlab bo'lmaydi */
    comingSoon?: boolean;
    /** 1000 ko'rsatish narxi, so'm */
    cpm: number;
};

export type RegionOptionType = {
    id: string;
    name: string;
    /** Oylik taxminiy posilka hajmi */
    monthlyVolume: number;
    /** Eng katta hududga nisbatan ulush, % — progress chizig'i uchun */
    share: number;
    isCity: boolean;
};

export type PricingType = {
    /** Tanlanishi mumkin bo'lgan umumiy ko'rsatishlar hajmi */
    availableImpressions: number;
    minGoal: number;
    /** Skanerlash darajasi prognozi, % — taxminiy QR skanerlashni hisoblash uchun */
    expectedScanRate: number;
};
