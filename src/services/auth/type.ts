export type LoginBody = {
    username: string;
    password: string;
};

export type LoginResponseType = {
    accessToken: string;
    refreshToken: string;
    role?: string;
    vendor?: {
        id: string;
        name: string;
    };
};
