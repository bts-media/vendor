import axios from 'axios';
import { baseURL, urls } from '~constants/urls';
import { clearLocalStorage, getLocalstorage, setLocalstorage } from '~utils/helpers';
import { RefreshResponse } from './types';

const TOKEN_REFRESH_BUFFER_SECONDS = 60;

/** Parallel refreshni bloklaydi: bir vaqtda 10 ta so'rov bo'lsa ham 1 ta refresh ketadi. */
let refreshPromise: Promise<string | null> | null = null;

const decodeJwtPayload = (token: string): { exp?: number } | null => {
    try {
        const payload = token.split('.')[1];
        if (!payload) return null;
        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized.padEnd(
            normalized.length + ((4 - (normalized.length % 4)) % 4),
            '=',
        );
        const json = decodeURIComponent(
            atob(padded)
                .split('')
                .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
                .join(''),
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
};

export const isAccessTokenExpiringSoon = (
    token: string,
    buffer = TOKEN_REFRESH_BUFFER_SECONDS,
) => {
    const payload = decodeJwtPayload(token);
    if (!payload?.exp) return true;
    return payload.exp - Math.floor(Date.now() / 1000) <= buffer;
};

/**
 * Refresh so'rovi `Api` instance'idan EMAS, toza `axios`dan yuboriladi —
 * aks holda interceptor o'zini o'zi chaqiradi (cheksiz rekursiya).
 */
export const refreshAccessToken = async (): Promise<string | null> => {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        const refreshToken = getLocalstorage('refreshToken');
        if (!refreshToken) {
            clearLocalStorage();
            return null;
        }

        try {
            const { data } = await axios.post<RefreshResponse>(
                `${baseURL.replace(/\/$/, '')}${urls.auth.refresh}`,
                { refreshToken },
            );
            if (!data?.accessToken) {
                clearLocalStorage();
                return null;
            }
            setLocalstorage('accessToken', data.accessToken);
            if (data.refreshToken) setLocalstorage('refreshToken', data.refreshToken);
            return data.accessToken;
        } catch {
            clearLocalStorage();
            return null;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
};

export const ensureValidAccessToken = async (): Promise<string | null> => {
    const token = getLocalstorage('accessToken');
    if (!token) return null;
    if (isAccessTokenExpiringSoon(token)) return refreshAccessToken();
    return token;
};
