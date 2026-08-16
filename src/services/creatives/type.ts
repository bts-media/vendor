import { EnumValue } from '~api/types';

export type CreativeStatus = 'draft' | 'moderation' | 'approved' | 'rejected';

/** Kreativ qaysi kanal uchun tayyorlangan */
export type CreativeKind = 'parcel' | 'screen';

// ─── Backend javob shakllari (`[ADVERTISER] Creatives`) ───

export type CreativeResponse = {
    id: string;
    name: string;
    type: EnumValue;
    status: EnumValue;
    campaignId: string;
    campaignName: string;
    fileUrl: string | null;
    mimeType: string;
    widthPx: number;
    heightPx: number;
    durationSeconds: number | null;
    createdAt: string;
};

/** `POST /advertiser/creatives/upload` javobi — tiket bilan kreativ biriktiriladi. */
export type CreativeUploadResponse = {
    uploadTicket: string;
    fileUrl: string;
    mimeType: string;
    widthPx: number;
    heightPx: number;
    sizeBytes: number;
};

export type CreateCreativeRequest = {
    campaignId: string;
    name: string;
    typeId: number;
    uploadTicket: string;
};

// ─── Ekran modeli ───

export type CreativeType = {
    id: string;
    name: string;
    kind: CreativeKind;
    status: CreativeStatus;
    /** Eskiz uchun: fayl URL'i bo'lsa rasm, aks holda nomning bosh harfi */
    fileUrl: string | null;
    campaignId: string;
    campaignName: string;
    impressions: number;
    scans: number;
    scanRate: number;
    createdAt: string;
    /** Ekranda ko'rsatiladigan o'lcham — `1080×1920` */
    size: string;
};

/**
 * Yuklangan, lekin hali kampaniyaga biriktirilmagan fayl.
 * `uploadTicket` bir martalik — kampaniya yaratilgach ishlatiladi.
 */
export type UploadedCreative = {
    name: string;
    typeId: number;
    uploadTicket: string;
    /** Faqat ko'rsatish uchun — saqlanmaydi */
    fileUrl: string;
    widthPx: number;
    heightPx: number;
};

export type CreateCreativeBody = {
    campaignId: string;
    name: string;
    kind: CreativeKind;
    file: File;
};
