import axios from 'axios';
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
