export type LoginBody = {
    username: string;
    password: string;
};

export type LoginResponseType = {
    accessToken: string;
    refreshToken: string;
    role?: string;
    advertiser?: {
        id: string;
        name: string;
        /** PRODUCT-SPEC §3.2: prepaid (balans) yoki postpaid (hisob-faktura) */
        billingType: 'prepaid' | 'postpaid';
    };
};
