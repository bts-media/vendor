import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useMockMutation, useMockQuery } from '~api/mock';
import { useNotify } from '~components/NotificationProvider';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import { parseSearchParams } from '~utils/helpers';
import { mockCreatives } from './mock';
import { CreateCreativeBody, CreativeType } from './type';

const CREATIVES_KEY = 'creatives';

export const useCreatives = () => {
    const { search } = useLocation();
    const { t } = useLanguage();
    const notify = useNotify();
    const params = parseSearchParams(search);

    // Backend: useGetList<TResponse<CreativeType, true>>([CREATIVES_KEY, search], urls.creatives.get)
    const { data, isLoading, refetch, isRefetching } = useMockQuery(CREATIVES_KEY, mockCreatives);

    const filtered = useMemo(() => {
        const query = (params.search ?? '').trim().toLowerCase();
        return (data ?? []).filter(creative => {
            const matchesQuery = !query || creative.name.toLowerCase().includes(query);
            const matchesStatus = !params.status || creative.status === params.status;
            return matchesQuery && matchesStatus;
        });
    }, [data, params.search, params.status]);

    // Backend: useCreate<CreateCreativeBody, CreativeType>(urls.creatives.create)
    const { mutate, isLoading: isCreating } = useMockMutation<CreateCreativeBody, CreativeType>(
        body => ({
            id: `crt-${body.name.length}`,
            name: body.name,
            kind: body.kind,
            status: 'moderation',
            badge: body.badge,
            brandColor: '#16A34A',
            impressions: 0,
            scans: 0,
            scanRate: 0,
            createdAt: new Date().toISOString(),
        }),
    );

    const createCreative = (body: CreateCreativeBody, callback?: CallbackType) => {
        mutate(body, {
            onSuccess: () => {
                refetch();
                notify.success({ type: 'success', message: t('creative_created') });
                callback?.();
            },
            onError: () => notify.error({ type: 'error', message: t('error') }),
        });
    };

    return {
        creativesData: filtered,
        isLoading: isLoading || isRefetching,
        refetchCreatives: refetch,
        createCreative,
        isCreating,
    };
};

/** Sehrgarning 1-qadami uchun — faqat tanlash mumkin bo'lgan (tasdiqlangan) kreativlar. */
export const useSelectableCreatives = () => {
    const { data, isLoading } = useMockQuery(CREATIVES_KEY, mockCreatives);

    const selectable = useMemo(
        () => (data ?? []).filter(creative => creative.status === 'approved'),
        [data],
    );

    return { creatives: selectable, isLoading };
};
