import { AxiosResponse } from 'axios';

// `response.data` ni qaytaradi — shuning uchun butun app'da `.data.data` yozilmaydi
export const responseInterceptor = async (response: AxiosResponse) => response.data;
