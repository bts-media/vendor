import { AxiosError, AxiosRequestConfig } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Api } from './axios';

interface IEditData<T> {
    url: string;
    item: T;
}

type QueryOptions = { enabled?: boolean; refetchInterval?: number | false };

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
    useCreate,
    useCreateMedia,
    useCustomGetQuery,
    useDeleteApi,
    useGetList,
    useUpdate,
    useUpdatePut,
};
