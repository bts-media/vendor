/** Backend qaytaradigan xato konverti */
export type ApiErrorBody = {
    message?: string;
    error?: string;
    statusCode?: number;
};

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    role?: string;
};

export type RefreshResponse = {
    accessToken: string;
    refreshToken?: string;
};
