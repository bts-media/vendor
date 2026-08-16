import { LoginResponse } from '~api/types';

export type LoginBody = {
    email: string;
    password: string;
};

/** `{ accessToken, refreshToken, role, advertiser }` */
export type LoginResponseType = LoginResponse;

/** Taklif havolasidagi token + mijoz o'zi tanlagan parol. */
export type AcceptInviteBody = {
    token: string;
    password: string;
};
