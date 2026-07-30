import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useMockMutation, useMockQuery } from '~api/mock';
import { useNotify } from '~components/NotificationProvider';
import { DEFAULT_PAGE_SIZE } from '~constants/data';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import { parseSearchParams } from '~utils/helpers';
import { mockCampaignStats, mockCampaigns } from './mock';
import { CampaignType, CreateCampaignBody } from './type';

const CAMPAIGNS_KEY = 'campaigns';
const STATS_KEY = 'campaign-stats';

/** Boshqaruv panelidagi 3 ta KPI. */
export const useCampaignStats = () => {
    // Backend: useCustomGetQuery<CampaignStatsType>(STATS_KEY, urls.dashboard.stats)
    const { data, isLoading, refetch, isRefetching } = useMockQuery(STATS_KEY, mockCampaignStats);

    return {
        stats: data,
        isLoading: isLoading || isRefetching,
        refetchStats: refetch,
    };
};

/**
 * Kampaniyalar ro'yxati. Filtr va sahifalash holati URL query-string'da:
 * ?search=yozgi&status=active&page=2&limit=10
 *
 * Mock rejimida filtrlash klientda bajariladi; backend ulanganda bu `useGetList` ga
 * ko'chadi va server tomonda filtrlanadi (qaytish shakli o'zgarmaydi).
 */
export const useCampaigns = (options?: { pageSize?: number }) => {
    const { search } = useLocation();
    const { t } = useLanguage();
    const notify = useNotify();
    const params = parseSearchParams(search);

    // Backend: useGetList<TResponse<CampaignType, true>>([CAMPAIGNS_KEY, search], urls.campaigns.get)
    const { data, isLoading, refetch, isRefetching } = useMockQuery(CAMPAIGNS_KEY, mockCampaigns);

    const pageSize = Number(params.limit) || options?.pageSize || DEFAULT_PAGE_SIZE;
    const page = Number(params.page) || 1;

    const filtered = useMemo(() => {
        const query = (params.search ?? '').trim().toLowerCase();
        return (data ?? []).filter(campaign => {
            const matchesQuery = !query || campaign.name.toLowerCase().includes(query);
            const matchesStatus = !params.status || campaign.status === params.status;
            return matchesQuery && matchesStatus;
        });
    }, [data, params.search, params.status]);

    const paged = useMemo(
        () => filtered.slice((page - 1) * pageSize, page * pageSize),
        [filtered, page, pageSize],
    );

    const { mutate: pauseMutate, isLoading: isPausing } = useMockMutation<CampaignType, boolean>(
        campaign => campaign.status !== 'paused',
    );

    /** Mock: holat serverda saqlanmaydi — demo uchun bildirishnoma + qayta so'rov. */
    const toggleCampaign = (campaign: CampaignType, callback?: CallbackType) => {
        pauseMutate(campaign, {
            onSuccess: paused => {
                refetch();
                notify.success({
                    type: 'success',
                    message: t(paused ? 'campaign_paused_msg' : 'campaign_resumed_msg'),
                });
                callback?.();
            },
            onError: () => notify.error({ type: 'error', message: t('error') }),
        });
    };

    return {
        campaignsData: paged,
        /** Filtrlanmagan to'liq ro'yxat — dashboard'dagi qisqa jadval uchun */
        allCampaigns: data ?? [],
        pagination: { total: filtered.length, limit: pageSize, page },
        isLoading: isLoading || isRefetching,
        refetchCampaigns: refetch,
        toggleCampaign,
        isPausing,
    };
};

/** Sehrgarning oxirgi qadami — kampaniyani ishga tushirish. */
export const useCreateCampaign = () => {
    const { t } = useLanguage();
    const notify = useNotify();

    // Backend: useCreate<CreateCampaignBody, CampaignType>(urls.campaigns.create)
    const { mutate, isLoading } = useMockMutation<CreateCampaignBody, { id: string }>(body => ({
        id: `cmp-${body.name.length}${body.goal}`,
    }));

    const createCampaign = (body: CreateCampaignBody, callback?: CallbackType) => {
        mutate(body, {
            onSuccess: () => {
                notify.success({ type: 'success', message: t('campaign_created') });
                callback?.();
            },
            onError: () => notify.error({ type: 'error', message: t('error') }),
        });
    };

    const saveDraft = (body: CreateCampaignBody, callback?: CallbackType) => {
        mutate(body, {
            onSuccess: () => {
                notify.info({ type: 'info', message: t('campaign_draft_saved') });
                callback?.();
            },
            onError: () => notify.error({ type: 'error', message: t('error') }),
        });
    };

    return { createCampaign, saveDraft, isCreating: isLoading };
};
