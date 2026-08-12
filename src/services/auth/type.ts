import { LoginResponse } from '~api/types';

export type LoginBody = {
    email: string;
    password: string;
};

/** `{ accessToken, refreshToken, role, advertiser }` */
export type LoginResponseType = LoginResponse;
