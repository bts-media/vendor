import { EnumValue } from '~api/types';

export type ChannelKey = 'parcel' | 'screen' | 'sms';

export type CampaignStatus =
    | 'draft'
    | 'moderation'
    | 'active'
    | 'paused'
    | 'completed'
    | 'rejected';

// ─── Backend javob shakllari (`[ADVERTISER] Campaigns`) ───

export type CampaignRegionResponse = { region: string; cpmMinor: string | null };

export type CampaignResponse = {
    id: string;
    name: string;
    status: EnumValue;
    channel: EnumValue;
    pacing: EnumValue;
    regions: CampaignRegionResponse[];
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
};

export type UpdateCampaignRequest = Partial<Omit<CreateCampaignRequest, 'channelId'>>;

export type EstimateRequest = {
    channelId: number;
    regions: string[];
    impressionGoal: number;
    startsAt: string;
    endsAt: string;
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
        cpmMinor: string;
        /** `campaign` | `region` | `channel` | `default` — narx qayerdan olingani */
        pricingSource: string;
        costMinor: string;
    }[];
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
    /** 1000 ko'rsatish narxi, so'm */
    cpm: number;
    budget: number | null;
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
    /** Ixtiyoriy: yuklangan kreativ (upload tiketi bilan) */
    creative?: { name: string; typeId: number; uploadTicket: string };
};
