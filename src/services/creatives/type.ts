export type CreativeStatus = 'draft' | 'moderation' | 'approved' | 'rejected';

/** Kreativ qaysi kanal uchun tayyorlangan */
export type CreativeKind = 'parcel' | 'screen';

export type CreativeType = {
    id: string;
    name: string;
    kind: CreativeKind;
    status: CreativeStatus;
    /** Eskizdagi qisqa matn ("−20%") va reklama beruvchining o'z brend rangi */
    badge: string;
    brandColor: string;
    campaignName?: string;
    impressions: number;
    scans: number;
    scanRate: number;
    createdAt: string;
    rejectionReason?: string;
};

export type CreateCreativeBody = {
    name: string;
    kind: CreativeKind;
    badge: string;
};
