import { AdvertiserAccount } from '~api/types';

export type BillingType = 'prepaid' | 'postpaid';

export type LoginPayload = {
    accessToken: string;
    refreshToken: string;
    role?: string;
    /** Login javobi hisob ma'lumotini ham qaytaradi — qo'shimcha `/me` so'rovi kerak emas. */
    advertiser?: AdvertiserAccount;
};

export interface IAuthContextData {
    isAuthenticated: boolean;
    /** Mount'da token tekshirilayotgan payt — bu paytda login sahifasi "chaqnab" ketmasligi kerak */
    isChecking: boolean;
    role: string | null;
    advertiser: AdvertiserAccount | null;
    advertiserName: string | null;
    billingType: BillingType;
    login: (payload: LoginPayload) => void;
    logout: () => void;
}
