export type LoginPayload = {
    accessToken: string;
    refreshToken: string;
    role?: string;
    /** Header'da ko'rsatiladigan vendor nomi */
    vendorName?: string;
};

export interface IAuthContextData {
    isAuthenticated: boolean;
    /** Mount'da token tekshirilayotgan payt — bu paytda login sahifasi "chaqnab" ketmasligi kerak */
    isChecking: boolean;
    role: string | null;
    vendorName: string | null;
    login: (payload: LoginPayload) => void;
    logout: () => void;
}
