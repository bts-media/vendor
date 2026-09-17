import { EnumValue } from '~api/types';

/** `none` — avtomatik kanal yo'q, faqat qo'lda joylashtiriladigan o'rinlar */
export type ChannelKey = 'parcel' | 'screen' | 'sms' | 'none';

export type CampaignStatus =
    | 'draft'
    | 'moderation'
    | 'active'
    | 'paused'
    | 'completed'
    | 'rejected';

// ─── Backend javob shakllari (`[ADVERTISER] Campaigns`) ───

/** `cpmMinor` — hudud uchun kelishilgan posilka narxi (tiyin), null = narxlar jadvali */
export type CampaignRegionResponse = { region: string; cpmMinor: string | null };

/** Buyurtma qatori — so'rovda yuboriladigan shakl */
export type PlacementInput = {
    placementId: number;
    /** Posilka qatorida e'tiborga olinmaydi (= ko'rsatishlar maqsadi) */
    quantity: number;
    /** Faqat filial-oy asosidagi o'rinlarda (televizor, kartochka, roll-ap) */
    branchGroupId?: number;
};

export type CampaignLineResponse = {
    placement: EnumValue;
    priceBasis: EnumValue;
    branchGroup: EnumValue | null;
    quantity: number;
    unitPriceMinor: string;
    surchargeMinor: string;
    amountMinor: string;
    /** `RATE_CARD_*` | `CAMPAIGN*` | `FROZEN` (ishga tushirilgandan keyin) | null (narx yo'q) */
    pricingSource: string | null;
};

export type LinesEstimateResponse = {
    lines: CampaignLineResponse[];
    /** Chegirmadan keyingi barcha belgilangan qatorlar — ishga tushirishda yechiladi */
    flatTotalMinor: string;
    /** Posilka qatori eng yengil bosqichda — prognoz */
    parcelEstimateMinor: string;
    discountPercent: number;
    discountMinor: string;
    totalMinor: string;
};

export type CampaignResponse = {
    id: string;
    name: string;
    status: EnumValue;
    channel: EnumValue;
    pacing: EnumValue;
    regions: CampaignRegionResponse[];
    placements: CampaignLineResponse[];
    packageTier: EnumValue | null;
    discountPercent: number;
    /** Belgilangan to'lovlar yechilgan vaqt — null bo'lsa qatorlar hali tahrirlanadi */
    flatChargedAt: string | null;
    /** Faqat tafsilot javobida */
    estimate?: LinesEstimateResponse;
    impressionGoal: number;
    deliveredImpressions: number;
    /** Yetkazilgan ÷ maqsad, butun foizda */
    progressPercent: number;
    cpmMinor: string;
    budgetMinor: string | null;
    startsAt: string;
    endsAt: string;
    approvedAt: string | null;
    createdAt: string;
};

export type CreateCampaignRequest = {
    name: string;
    channelId: number;
    regions: string[];
    impressionGoal: number;
    budgetMinor?: string;
    startsAt: string;
    endsAt: string;
    pacingId?: number;
    placements?: PlacementInput[];
    packageTierId?: number;
};

/** `packageTierId: null` — paketni olib tashlaydi (qatorlar qoladi, chegirma ketadi) */
export type UpdateCampaignRequest = Partial<
    Omit<CreateCampaignRequest, 'channelId' | 'packageTierId'>
> & { packageTierId?: number | null };

export type EstimateRequest = {
    channelId: number;
    regions: string[];
    impressionGoal: number;
    startsAt: string;
    endsAt: string;
    placements?: PlacementInput[];
    packageTierId?: number;
};

export type EstimateResponse = {
    impressionGoal: number;
    flightDays: number;
    estimatedCostMinor: string;
    availableImpressions: number;
    estimatedReach: number;
    legs: {
        channel: EnumValue;
        region: string;
        impressions: number;
        /** Bitta yetkazish narxi (tiyin): posilka uchun eng yengil bosqich, ekran uchun 0 */
        unitPriceMinor: string;
        /** `RATE_CARD_REGION` | `RATE_CARD_DEFAULT` | `FLAT_PLACEMENT` — narx qayerdan olingani */
        pricingSource: string;
        costMinor: string;
    }[];
    estimate: LinesEstimateResponse;
};

// ─── Ekran modellari ───

export type CampaignType = {
    id: string;
    name: string;
    /** Reklama beruvchi brendi — DESIGN-SYSTEM §5: o'z rangida qoladi */
    brandColor: string;
    brandInitial: string;
    channels: ChannelKey[];
    regions: string[];
    goal: number;
    delivered: number;
    /** Kampaniya bo'yicha noyob QR skanerlashlar (analitikadan) */
    scans: number;
    /** Bajarilish ulushi, % */
    pace: number;
    status: CampaignStatus;
    startDate: string;
    endDate: string;
    budget: number | null;
    channelId: number;
    packageTier: PackageTierKey | null;
    discountPercent: number;
    /** Ishga tushirilgan — belgilangan to'lovlar muzlatilgan, qatorlar tahrirlanmaydi */
    isFrozen: boolean;
    placements: CampaignLineType[];
    /** Faqat tafsilot so'rovida */
    estimate?: LinesEstimateType;
};

export type PackageTierKey = 'econom' | 'optimum' | 'premium';

/** Bitta buyurtma qatori — so'mda */
export type CampaignLineType = {
    placementId: number;
    placement: string;
    priceBasis: string;
    branchGroupId: number | null;
    quantity: number;
    unitPrice: number;
    surcharge: number;
    amount: number;
    /** Narx topilmadi — ishga tushirishdan oldin BTS narxlashi kerak */
    unpriced: boolean;
};

export type LinesEstimateType = {
    lines: CampaignLineType[];
    flatTotal: number;
    parcelEstimate: number;
    discountPercent: number;
    discount: number;
    total: number;
};

export type CampaignStatsType = {
    activeCampaigns: number;
    /** Tasdiqni kutayotgan kampaniyalar */
    pendingApproval: number;
    /** Tekshiruvdagi kreativlar */
    pendingCreatives: number;
    monthImpressions: number;
    monthGoal: number;
    monthSpend: number;
    scans: number;
    scanRate: number;
    /** Prepaid hisobda balans, aks holda null */
    balance: number | null;
};

/** Sehrgar yig'adigan ma'lumot */
export type CreateCampaignBody = {
    name: string;
    channels: ChannelKey[];
    regions: string[];
    goal: number;
    days: number;
    placements: PlacementInput[];
    packageTierId?: number;
    /** Ixtiyoriy: yuklangan kreativ (upload tiketi bilan) */
    creative?: { name: string; typeId: number; uploadTicket: string };
};
