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
    /** Avtomatik yetkazish yo'q — faqat qo'lda joylashtiriladigan o'rinlar */
    NONE = 4,
}

// ─── Joylashtirishlar (narxlar ro'yxatidagi 12 ta o'rin) ───

export enum Placement {
    PARCEL_STICKER = 1,
    PARCEL_BOX = 2,
    SCREEN_TV = 3,
    COUNTER_CARD = 4,
    ROLLUP_BANNER = 5,
    WEBSITE_BANNER = 6,
    TELEGRAM_POST = 7,
    APP_HOME = 8,
    APP_STORY = 9,
    APP_PUSH = 10,
    INSTAGRAM_REEL = 11,
    INSTAGRAM_STORY = 12,
}

export enum PriceBasis {
    CPM = 1,
    PER_PARCEL_WEIGHT = 2,
    PER_BRANCH_MONTH = 3,
    PER_MONTH = 4,
    PER_POST = 5,
}

export enum BranchGroup {
    TASHKENT = 1,
    OBLAST = 2,
    REGION = 3,
}

export enum PackageTier {
    ECONOM = 1,
    OPTIMUM = 2,
    PREMIUM = 3,
}

/**
 * Har bir o'rin qanday narxlanadi va qaysi kanal uni yetkazadi (backend `PLACEMENT_DEFS`).
 * `channel: null` — platforma o'lchamaydigan, qo'lda joylashtiriladigan o'rin.
 */
export const PLACEMENT_DEFS: Record<Placement, { priceBasis: PriceBasis; channel: Channel | null }> = {
    [Placement.PARCEL_STICKER]: { priceBasis: PriceBasis.PER_PARCEL_WEIGHT, channel: Channel.PARCEL },
    [Placement.PARCEL_BOX]: { priceBasis: PriceBasis.PER_PARCEL_WEIGHT, channel: Channel.PARCEL },
    [Placement.SCREEN_TV]: { priceBasis: PriceBasis.PER_BRANCH_MONTH, channel: Channel.SCREEN },
    [Placement.COUNTER_CARD]: { priceBasis: PriceBasis.PER_BRANCH_MONTH, channel: null },
    [Placement.ROLLUP_BANNER]: { priceBasis: PriceBasis.PER_BRANCH_MONTH, channel: null },
    [Placement.WEBSITE_BANNER]: { priceBasis: PriceBasis.PER_MONTH, channel: null },
    [Placement.TELEGRAM_POST]: { priceBasis: PriceBasis.PER_POST, channel: null },
    [Placement.APP_HOME]: { priceBasis: PriceBasis.PER_POST, channel: null },
    [Placement.APP_STORY]: { priceBasis: PriceBasis.PER_POST, channel: null },
    [Placement.APP_PUSH]: { priceBasis: PriceBasis.PER_POST, channel: null },
    [Placement.INSTAGRAM_REEL]: { priceBasis: PriceBasis.PER_POST, channel: null },
    [Placement.INSTAGRAM_STORY]: { priceBasis: PriceBasis.PER_POST, channel: null },
};

/** Paketlar: chegirma foizi va kiradigan o'rinlar (backend `PACKAGE_DEFS`). */
export const PACKAGE_DEFS: Record<PackageTier, { discountPercent: number; placements: Placement[] }> = {
    [PackageTier.ECONOM]: {
        discountPercent: 5,
        placements: [
            Placement.COUNTER_CARD,
            Placement.WEBSITE_BANNER,
            Placement.TELEGRAM_POST,
            Placement.INSTAGRAM_REEL,
            Placement.INSTAGRAM_STORY,
        ],
    },
    [PackageTier.OPTIMUM]: {
        discountPercent: 10,
        placements: [
            Placement.SCREEN_TV,
            Placement.COUNTER_CARD,
            Placement.WEBSITE_BANNER,
            Placement.TELEGRAM_POST,
            Placement.APP_HOME,
            Placement.APP_STORY,
            Placement.APP_PUSH,
            Placement.INSTAGRAM_REEL,
            Placement.INSTAGRAM_STORY,
        ],
    },
    [PackageTier.PREMIUM]: {
        discountPercent: 15,
        placements: [
            Placement.SCREEN_TV,
            Placement.COUNTER_CARD,
            Placement.ROLLUP_BANNER,
            Placement.WEBSITE_BANNER,
            Placement.TELEGRAM_POST,
            Placement.APP_HOME,
            Placement.APP_STORY,
            Placement.APP_PUSH,
            Placement.INSTAGRAM_REEL,
            Placement.INSTAGRAM_STORY,
        ],
    },
};

/** Posilka kampaniyasi uchun eng kichik buyurtma (backend `MIN_PARCEL_ORDER`). */
export const MIN_PARCEL_ORDER = 10_000;

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

export const CHANNEL_KEY: Record<string, 'parcel' | 'screen' | 'none'> = {
    PARCEL: 'parcel',
    SCREEN: 'screen',
    NONE: 'none',
};
