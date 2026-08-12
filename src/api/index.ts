import { AxiosError, AxiosRequestConfig } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Api } from './axios';

interface IEditData<T> {
    url: string;
    item: T;
}

type QueryOptions = {
    enabled?: boolean;
    refetchInterval?: number | false;
    keepPreviousData?: boolean;
    staleTime?: number;
};

/** Backend massiv parametrni `?statusIds=1&statusIds=2` ko'rinishida kutadi. */
export type QueryParams = Record<
    string,
    string | number | boolean | (string | number)[] | undefined | null
>;

/** Bo'sh qiymatlar tashlab yuboriladi — `?search=` kabi ma'nosiz parametr ketmasin. */
export const cleanParams = (params?: QueryParams): Record<string, unknown> | undefined => {
    if (!params) return undefined;
    const entries = Object.entries(params).filter(([, value]) => {
        if (value === undefined || value === null || value === '') return false;
        if (Array.isArray(value)) return value.length > 0;
        return true;
    });
    return entries.length ? Object.fromEntries(entries) : undefined;
};

/**
 * Asosiy GET hooki: parametrlar obyekt sifatida beriladi va query keyga ham
 * kiradi — filtr o'zgarganda react-query o'zi qayta so'raydi.
 */
const useApiQuery = <T>(
    key: unknown[],
    url: string,
    params?: QueryParams,
    options?: QueryOptions,
) =>
    useQuery<T>(
        [...key, cleanParams(params) ?? null],
        async () => (await Api.get<T>(url, { params: cleanParams(params) })) as unknown as T,
        options,
    );

/**
 * Sahifalangan / query-string'li GET.
 * key massiv bo'lsa key[1] URL'ga qo'shiladi: (['items', '?page=2'], '/items') → '/items?page=2'
 */
const useGetList = <T>(key: string | string[], url: string, options?: QueryOptions) => {
    const get = async () => {
        if (!url) return null;
        const urlQuery = Array.isArray(key) ? url + (key[1] ?? '') : url;
        const data: T = await Api.get(urlQuery);
        return data;
    };
    // Kalit tipini aniq beramiz — aks holda react-query `QueryKey` bilan mos kelmaydi
    return useQuery<T | null, unknown, T | null, string | string[]>(key, get, options);
};

const useCustomGetQuery = <T>(
    key: string | string[],
    url: string,
    options?: QueryOptions & AxiosRequestConfig,
) => useQuery(key, async () => (await Api.get<T>(url, options)) as T, options);

const useCreate = <T, U, V = Error>(url: string) =>
    useMutation<U, AxiosError<V>, T>(async body => await Api.post(url, body));

const useUpdate = <T, U>() =>
    useMutation(async ({ url, item }: IEditData<T>) => (await Api.patch(url, item)) as U);

const useUpdatePut = <T, U>() =>
    useMutation(async ({ url, item }: IEditData<T>) => (await Api.put(url, item)) as U);

const useDeleteApi = <T>(url: string) =>
    useMutation(async (id: number | string) => (await Api.delete(`${url}/${id}`)) as T);

const useCreateMedia = <T, U, V = Error>(url: string) =>
    useMutation<U, AxiosError<V>, T>(
        async body =>
            await Api.post(url, body, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }),
    );

export {
    useApiQuery,
    useCreate,
    useCreateMedia,
    useCustomGetQuery,
    useDeleteApi,
    useGetList,
    useUpdate,
    useUpdatePut,
};
