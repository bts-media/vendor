import { LoginBody, LoginResponseType } from './type';

const base64Url = (value: object) =>
    btoa(JSON.stringify(value).replace(/[^\x20-\x7E]/g, ''))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

/**
 * Demo uchun haqiqiy shakldagi JWT.
 * `api/tokenManager.ts` payloaddan `exp` ni o'qiydi — oddiy satr bo'lsa token "muddati o'tgan"
 * deb hisoblanadi va app darhol login sahifasiga qaytadi.
 */
const createDemoToken = (username: string, days = 30) =>
    [
        base64Url({ alg: 'HS256', typ: 'JWT' }),
        base64Url({
            sub: username,
            role: 'advertiser',
            exp: Math.floor(Date.now() / 1000) + days * 24 * 60 * 60,
        }),
        'demo-signature',
    ].join('.');

/** Backend ulangunga qadar: istalgan login/parol qabul qilinadi. */
export const mockLogin = ({ username }: LoginBody): LoginResponseType => ({
    accessToken: createDemoToken(username),
    refreshToken: createDemoToken(username, 60),
    role: 'advertiser',
    advertiser: { id: 'adv-1', name: 'Korzinka', billingType: 'postpaid' },
});
