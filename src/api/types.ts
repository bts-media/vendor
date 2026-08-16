/**
 * Backend xato konverti (Swagger §"Error envelope").
 * `message` — barqaror SCREAMING_SNAKE_CASE kod; validatsiya xatosida string massiv.
 */
export type ApiErrorBody = {
    statusCode?: number;
    message?: string | string[];
    description?: string;
    error?: string;
    method?: string;
    path?: string;
    timestamp?: string;
};

/** Backend'dagi har bir enum shu shaklda qaytadi: `{ id: 3, name: 'ACTIVE' }`. */
export type EnumValue = {
    id: number;
    name: string;
};

/** Har bir ro'yxat endpointi shu konvertda qaytadi (`limit` maksimum 100). */
export type Paginated<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
};

export type AdvertiserAccount = {
    id: string;
    name: string;
    legalName: string | null;
    billingMode: EnumValue;
    status: EnumValue;
    /** Faqat prepaid hisobda to'ladi */
    balanceMinor: string | null;
    creditLimitMinor: string;
};

/** `POST /advertiser/auth/login` va `/refresh` javobi. */
export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    role: string;
    advertiser: AdvertiserAccount;
};

export type RefreshResponse = LoginResponse;

export type AdvertiserProfile = {
    id: string;
    email: string | null;
    phone: string;
    firstName: string;
    lastName: string;
    role: string;
    status: EnumValue;
    lastLogin: string | null;
    advertiser: AdvertiserAccount;
};
