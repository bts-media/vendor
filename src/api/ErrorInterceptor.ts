import { notification } from 'antd';
import { AxiosError, AxiosRequestConfig } from 'axios';
// Interceptor React tree'dan TASHQARIDA ishlaydi — shu sababli bu yerda antd'ning
// statik `notification`ini ishlatish MUMKIN. Komponentlarda esa faqat useNotify().
import { clearLocalStorage } from '~utils/helpers';
import { Api } from './axios';
import { refreshAccessToken } from './tokenManager';
import { ApiErrorBody } from './types';

type RetriableConfig = AxiosRequestConfig & { _retry?: boolean };

const goToLogin = () => {
    clearLocalStorage();
    // ⚠️ Avval tozalash, keyin redirect. Aks holda app hali "authenticated" ko'rinadi →
    // himoyalangan route → yana 401 → cheksiz reload sikli.
    if (window.location.pathname !== '/login') window.location.replace('/login');
};

export const errorInterceptor = async (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status;
    const originalRequest = error.config as RetriableConfig | undefined;

    // 1. Tarmoq xatosi
    if (!error.response) {
        notification.error({
            message: 'Network error',
            description: error.message,
            placement: 'bottomRight',
        });
        return Promise.reject(error);
    }

    // 2. 401 — bir marta refresh urinib ko'ramiz
    if (status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = await refreshAccessToken();
        if (token) {
            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
            };
            return Api.request(originalRequest);
        }
        goToLogin();
        return Promise.reject(error);
    }

    if (status === 401) {
        goToLogin();
        return Promise.reject(error);
    }

    // 3. 403 — sessiya yaroqsiz bo'lsa chiqarib yuboramiz, aks holda xabar
    if (status === 403) {
        const hasToken = Boolean(localStorage.getItem('accessToken'));
        if (!hasToken) {
            goToLogin();
        } else {
            notification.error({
                message: 'Forbidden',
                description: error.response?.data?.message || "Ruxsat yo'q",
                placement: 'bottomRight',
            });
        }
        return Promise.reject(error);
    }

    // 4. Qolgani — service qatlami hal qiladi
    return Promise.reject(error);
};
