import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { useCreate, useCustomGetQuery, useDeleteApi, useGetList, useUpdate } from '~api/index';
import { ApiErrorBody } from '~api/types';
import { useNotify } from '~components/NotificationProvider';
import { urls } from '~constants/urls';
import useLanguage from '~hooks/useLanguage';
import { CallbackType, TResponse } from '~types/index';
import { CreateItemBody, ItemType, UpdateItemBody } from './type';

const ITEMS_KEY = 'items';

/**
 * Ro'yxat + mutatsiyalar.
 * URL-driven pagination: holat URL query-string'da saqlanadi, React state'da emas —
 * `search` o'zgarganda react-query kaliti o'zgaradi → avtomatik qayta so'raladi.
 */
export const useItems = () => {
    const { search } = useLocation();
    const { t } = useLanguage();
    const notify = useNotify();

    const { data, isLoading, refetch, isRefetching } = useGetList<TResponse<ItemType, true>>(
        [ITEMS_KEY, search],
        urls.items.get,
    );

    const { mutate: createMutate, isLoading: isCreating } = useCreate<CreateItemBody, ItemType>(
        urls.items.create,
    );
    const { mutate: updateMutate, isLoading: isUpdating } = useUpdate<UpdateItemBody, ItemType>();
    const { mutate: deleteMutate, isLoading: isDeleting } = useDeleteApi<void>(urls.items.get);

    // Mutatsiyalarning xato tipi turlicha (AxiosError / unknown) — bitta joyda narrow qilamiz
    const onError = (err: unknown) =>
        notify.error({
            type: 'error',
            message: (err as AxiosError<ApiErrorBody>)?.response?.data?.message || t('error'),
        });

    const createItem = (body: CreateItemBody, callback?: CallbackType) => {
        createMutate(body, {
            onSuccess: () => {
                refetch();
                notify.success({ type: 'success', message: t('item_created') });
                callback?.();
            },
            onError,
        });
    };

    const updateItem = (id: string, body: UpdateItemBody, callback?: CallbackType) => {
        updateMutate(
            { url: urls.items.update(id), item: body },
            {
                onSuccess: () => {
                    refetch();
                    notify.success({ type: 'success', message: t('item_updated') });
                    callback?.();
                },
                onError,
            },
        );
    };

    const deleteItem = (id: string, callback?: CallbackType) => {
        deleteMutate(id, {
            onSuccess: () => {
                refetch();
                notify.success({ type: 'success', message: t('item_deleted') });
                callback?.();
            },
            onError,
        });
    };

    return {
        itemsData: data?.data ?? [],
        pagination: {
            total: data?.total || 0,
            limit: data?.limit || 10,
            page: data?.page || 1,
        },
        isLoading: isLoading || isRefetching,
        refetchItems: refetch,
        createItem,
        updateItem,
        deleteItem,
        isCreating,
        isUpdating,
        isDeleting,
    };
};

/** Detail so'rovi — id yo'q bo'lsa so'rov umuman yuborilmaydi. */
export const useItemDetail = (id?: string) => {
    const { data, isLoading } = useCustomGetQuery<ItemType>(
        ['item', id || ''],
        urls.items.getById(id!),
        { enabled: Boolean(id) },
    );

    return { item: data, isLoading };
};
