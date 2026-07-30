export type BillingType = 'prepaid' | 'postpaid';

export type LoginPayload = {
    accessToken: string;
    refreshToken: string;
    role?: string;
    /** Sidebar va header'da ko'rsatiladigan reklama beruvchi nomi */
    advertiserName?: string;
    billingType?: BillingType;
};

export interface IAuthContextData {
    isAuthenticated: boolean;
    /** Mount'da token tekshirilayotgan payt — bu paytda login sahifasi "chaqnab" ketmasligi kerak */
    isChecking: boolean;
    role: string | null;
    advertiserName: string | null;
    billingType: BillingType;
    login: (payload: LoginPayload) => void;
    logout: () => void;
}
