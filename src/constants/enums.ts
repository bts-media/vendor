/**
 * Backend enumlarining klient nusxasi.
 *
 * So'rovda raqamli `id` yuboriladi, javobda esa `{ id, name }` keladi.
 * Shart yozganda `name` ishlatiladi — u barqaror ommaviy API, raqam esa so'rov formati.
 */

export enum Channel {
    PARCEL = 1,
    SCREEN = 2,
    BOTH = 3,
}

export enum CampaignStatus {
    DRAFT = 1,
    PENDING_APPROVAL = 2,
    ACTIVE = 3,
    PAUSED = 4,
    PAUSED_NO_BALANCE = 5,
    COMPLETED = 6,
    CANCELLED = 7,
}

export enum CampaignPacing {
    EVEN = 1,
    ASAP = 2,
}

export enum CreativeType {
    PARCEL_LABEL = 1,
    SCREEN = 2,
}

export enum CreativeStatus {
    PENDING_REVIEW = 1,
    APPROVED = 2,
    REJECTED = 3,
    ARCHIVED = 4,
}

export enum InvoiceStatus {
    NEW = 1,
    SENT = 2,
    PARTIAL = 3,
    PAID = 4,
    OVERDUE = 5,
    CANCELLED = 6,
}

export enum PaymentMethod {
    BANK_TRANSFER = 1,
    PAYME = 2,
    CLICK = 3,
    UZUM = 4,
}

export enum PaymentStatus {
    PENDING = 1,
    COMPLETED = 2,
    FAILED = 3,
}

export enum BillingMode {
    PREPAID = 1,
    POSTPAID = 2,
}

// ─── Backend `name` → portaldagi kalit ───

/** Portal beshta holatni ko'rsatadi; backendning ikkita pauzasi bittaga tushadi. */
export const CAMPAIGN_STATUS_KEY: Record<string, string> = {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'moderation',
    ACTIVE: 'active',
    PAUSED: 'paused',
    PAUSED_NO_BALANCE: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'rejected',
};

export const CREATIVE_STATUS_KEY: Record<string, string> = {
    PENDING_REVIEW: 'moderation',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ARCHIVED: 'draft',
};

export const INVOICE_STATUS_KEY: Record<string, string> = {
    NEW: 'new',
    SENT: 'new',
    PARTIAL: 'partial',
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'new',
};

export const PAYMENT_STATUS_KEY: Record<string, string> = {
    PENDING: 'processing',
    COMPLETED: 'succeeded',
    FAILED: 'failed',
};

export const PAYMENT_METHOD_KEY: Record<string, string> = {
    BANK_TRANSFER: 'bank',
    PAYME: 'payme',
    CLICK: 'click',
    UZUM: 'uzum',
};

export const PAYMENT_METHOD_ID: Record<string, PaymentMethod> = {
    bank: PaymentMethod.BANK_TRANSFER,
    payme: PaymentMethod.PAYME,
    click: PaymentMethod.CLICK,
    uzum: PaymentMethod.UZUM,
};

export const CHANNEL_KEY: Record<string, 'parcel' | 'screen'> = {
    PARCEL: 'parcel',
    SCREEN: 'screen',
};
