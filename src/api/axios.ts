import axios, { AxiosRequestConfig } from 'axios';
import { baseURL } from '~constants/urls';
import { errorInterceptor } from './ErrorInterceptor';
import { responseInterceptor } from './ResponseInterceptor';
import { ensureValidAccessToken } from './tokenManager';

export const Api = axios.create({ baseURL });

Api.interceptors.request.use(async config => {
    const token = await ensureValidAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

Api.interceptors.response.use(
    response => responseInterceptor(response),
    error => errorInterceptor(error),
);

/**
 * Tiplangan so'rov qatlami.
 *
 * ⚠️ `responseInterceptor` `response.data` ni qaytaradi — ya'ni axios e'lon qilgan
 * qaytish tipi HAQIQATGA MOS EMAS. Ilgari bu har bir chaqiruv joyida `as unknown as T`
 * bilan yamalardi; axios 1.19 generic qaytish tipini o'zgartirgach (`AxiosResponseResult`)
 * yamoqsiz qolgan joylar build'ni yiqitdi.
 *
 * Endi kelishuv FAQAT shu yerda beriladi: bu qatlam interceptor nima qilishini tip
 * darajasida e'lon qiladi va qolgan kod axios versiyasiga umuman bog'liq emas.
 */
export const request = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        Api.get(url, config) as unknown as Promise<T>,
    post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
        Api.post(url, body, config) as unknown as Promise<T>,
    patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
        Api.patch(url, body, config) as unknown as Promise<T>,
    put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
        Api.put(url, body, config) as unknown as Promise<T>,
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        Api.delete(url, config) as unknown as Promise<T>,
};
