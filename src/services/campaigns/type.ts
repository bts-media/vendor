export type ChannelKey = 'parcel' | 'screen' | 'sms';

export type CampaignStatus =
    | 'draft'
    | 'moderation'
    | 'active'
    | 'paused'
    | 'completed'
    | 'rejected';

export type CampaignType = {
    id: string;
    name: string;
    /** Reklama beruvchi brendi — DESIGN-SYSTEM §5: BTS brendiga bo'ysunmaydi, o'z rangida qoladi */
    brandColor: string;
    brandInitial: string;
    channels: ChannelKey[];
    regions: string[];
    /** Ko'rsatishlar maqsadi */
    goal: number;
    /** Yetkazilgan (tasdiqlangan) ko'rsatishlar */
    delivered: number;
    scans: number;
    /** Sur'at, % — reja bo'yicha ketyaptimi */
    pace: number;
    status: CampaignStatus;
    startDate: string;
    endDate: string;
    /** 1000 ko'rsatish narxi, so'm */
    cpm: number;
    creativeName: string;
};

export type CampaignStatsType = {
    activeCampaigns: number;
    /** Faol kampaniyalarda yetkazilayotgan ko'rsatishlar */
    deliveringImpressions: number;
    monthImpressions: number;
    monthGoal: number;
    scans: number;
    scanRate: number;
};

export type CreateCampaignBody = {
    name: string;
    creativeId: string;
    channels: ChannelKey[];
    regions: string[];
    goal: number;
    days: number;
};
