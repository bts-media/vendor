import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Api } from '~api/axios';
import { useApiQuery } from '~api/index';
import { ApiErrorBody, Paginated } from '~api/types';
import { useNotify } from '~components/NotificationProvider';
import { DEFAULT_PAGE_SIZE } from '~constants/data';
import { CAMPAIGN_STATUS_KEY, CampaignStatus, Channel } from '~constants/enums';
import { urls } from '~constants/urls';
import { useAuthContext } from '~context/AuthProvider';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import {
    fromMinor,
    getApiErrorMessage,
    initialOf,
    parseSearchParams,
} from '~utils/helpers';
import { AnalyticsCreativesResponse } from '~services/analytics/type';
import {
    CampaignResponse,
    CampaignStatsType,
    CampaignType,
    ChannelKey,
    CreateCampaignBody,
    CreateCampaignRequest,
    EstimateRequest,
    EstimateResponse,
} from './type';

const CAMPAIGNS_KEY = 'campaigns';
const STATS_KEY = 'campaign-stats';

/** Reklama beruvchining o'z brendi — portal bitta hisob ichida ishlaydi. */
const BRAND_COLOR = 'var(--brand-500)';

/** Portal statusi → backend `statusIds`. Pauza ikkita holatni qamrab oladi. */
const STATUS_IDS: Record<string, number[]> = {
    draft: [CampaignStatus.DRAFT],
    moderation: [CampaignStatus.PENDING_APPROVAL],
    active: [CampaignStatus.ACTIVE],
    paused: [CampaignStatus.PAUSED, CampaignStatus.PAUSED_NO_BALANCE],
    completed: [CampaignStatus.COMPLETED],
    rejected: [CampaignStatus.CANCELLED],
};

const channelsOf = (name?: string): ChannelKey[] => {
    if (name === 'BOTH') return ['parcel', 'screen'];
    if (name === 'SCREEN') return ['screen'];
    return ['parcel'];
};

const toCampaign = (
    row: CampaignResponse,
    advertiserName: string,
    scansByCampaign: Map<string, number>,
): CampaignType => ({
    id: row.id,
    name: row.name,
    brandColor: BRAND_COLOR,
    brandInitial: initialOf(advertiserName),
    channels: channelsOf(row.channel?.name),
    regions: (row.regions ?? []).map(region => region.region),
    goal: row.impressionGoal,
    delivered: row.deliveredImpressions,
    scans: scansByCampaign.get(row.name) ?? 0,
    pace: Math.round(row.progressPercent),
    status: (CAMPAIGN_STATUS_KEY[row.status?.name] ?? 'draft') as CampaignType['status'],
    startDate: row.startsAt,
    endDate: row.endsAt,
    cpm: fromMinor(row.cpmMinor),
    budget: row.budgetMinor === null ? null : fromMinor(row.budgetMinor),
});

/** Boshqaruv panelidagi KPI kartalari — `GET /advertiser/dashboard/stats`. */
export const useCampaignStats = () => {
    const query = useApiQuery<{
        monthStart: string;
        activeCampaigns: number;
        pendingApprovalCampaigns: number;
        pendingReviewCreatives: number;
        monthImpressions: number;
        monthGoal: number;
        monthSpendMinor: string;
        monthUniqueScans: number;
        scanRatePercent: number;
        billingMode: { id: number; name: string };
        balanceMinor: string | null;
    }>([STATS_KEY], urls.dashboard.stats);

    const stats = useMemo<CampaignStatsType | undefined>(() => {
        const data = query.data;
        if (!data) return undefined;
        return {
            activeCampaigns: data.activeCampaigns,
            pendingApproval: data.pendingApprovalCampaigns,
            pendingCreatives: data.pendingReviewCreatives,
            monthImpressions: data.monthImpressions,
            monthGoal: data.monthGoal,
            monthSpend: fromMinor(data.monthSpendMinor),
            scans: data.monthUniqueScans,
            scanRate: data.scanRatePercent,
            balance: data.balanceMinor === null ? null : fromMinor(data.balanceMinor),
        };
    }, [query.data]);

    return {
        stats,
        isLoading: query.isLoading,
        refetchStats: query.refetch,
    };
};

/**
 * Kampaniyalar ro'yxati. Filtr va sahifalash holati URL query-string'da:
 * `?search=yozgi&status=active&page=2&limit=10` — filtrlash SERVER tomonda bajariladi.
 */
export const useCampaigns = (options?: { pageSize?: number }) => {
    const { search } = useLocation();
    const { t } = useLanguage();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const { advertiserName } = useAuthContext();
    const params = parseSearchParams(search);

    const pageSize = Number(params.limit) || options?.pageSize || DEFAULT_PAGE_SIZE;
    const page = Number(params.page) || 1;

    const list = useApiQuery<Paginated<CampaignResponse>>(
        [CAMPAIGNS_KEY, search],
        urls.campaigns.get,
        {
            page,
            limit: pageSize,
            search: params.search,
            statusIds: params.status ? STATUS_IDS[params.status] : undefined,
        },
        { keepPreviousData: true },
    );

    /**
     * Skanerlash soni kampaniya ro'yxatida yo'q — u analitikadan keladi.
     * Kreativ kesimidagi javob har qatorda kampaniya nomi va uning noyob
     * skanerlashlarini tashiydi, shundan nom → skanerlash jadvali quriladi.
     */
    const creativeStats = useApiQuery<AnalyticsCreativesResponse>(
        [CAMPAIGNS_KEY, 'scans'],
        urls.analytics.creatives,
    );

    const scansByCampaign = useMemo(() => {
        const map = new Map<string, number>();
        (creativeStats.data?.data ?? []).forEach(row => {
            map.set(row.campaignName, Math.max(map.get(row.campaignName) ?? 0, row.campaignUniqueScans));
        });
        return map;
    }, [creativeStats.data]);

    const campaignsData = useMemo(
        () => (list.data?.data ?? []).map(row => toCampaign(row, advertiserName ?? '', scansByCampaign)),
        [list.data, advertiserName, scansByCampaign],
    );

    const { mutate: pauseMutate, isLoading: isPausing } = useMutation<
        CampaignResponse,
        AxiosError<ApiErrorBody>,
        { id: string; paused: boolean }
    >(
        async ({ id, paused }) =>
            (await Api.post(urls.campaigns.pause(id), { paused })) as unknown as CampaignResponse,
    );

    /** Pauza / davom ettirish — bitta endpoint, `paused` bayrog'i bilan. */
    const toggleCampaign = (campaign: CampaignType, callback?: CallbackType) => {
        const paused = campaign.status !== 'paused';

        pauseMutate(
            { id: campaign.id, paused },
            {
                onSuccess: () => {
                    void queryClient.invalidateQueries(CAMPAIGNS_KEY);
                    notify.success({
                        type: 'success',
                        message: t(paused ? 'campaign_paused_msg' : 'campaign_resumed_msg'),
                    });
                    callback?.();
                },
                onError: err =>
                    notify.error({ type: 'error', message: getApiErrorMessage(err, t('error')) }),
            },
        );
    };

    return {
        campaignsData,
        /** Dashboard'dagi qisqa jadval uchun — shu sahifadagi qatorlar */
        allCampaigns: campaignsData,
        pagination: {
            total: list.data?.total ?? 0,
            limit: list.data?.limit ?? pageSize,
            page: list.data?.page ?? page,
        },
        isLoading: list.isLoading,
        refetchCampaigns: list.refetch,
        toggleCampaign,
        isPausing,
    };
};

const channelIdOf = (channels: ChannelKey[]): number => {
    const hasParcel = channels.includes('parcel');
    const hasScreen = channels.includes('screen');
    if (hasParcel && hasScreen) return Channel.BOTH;
    if (hasScreen) return Channel.SCREEN;
    return Channel.PARCEL;
};

const toRequest = (body: CreateCampaignBody): CreateCampaignRequest => ({
    name: body.name,
    channelId: channelIdOf(body.channels),
    regions: body.regions,
    impressionGoal: body.goal,
    startsAt: dayjs().add(1, 'day').startOf('day').toISOString(),
    endsAt: dayjs()
        .add(body.days + 1, 'day')
        .endOf('day')
        .toISOString(),
});

/**
 * Sehrgarning oxirgi qadami.
 *
 * Kampaniya yaratilgach u TASDIQ NAVBATIGA tushadi (`PENDING_APPROVAL`) — mijoz uni
 * o'zi ishga tushira olmaydi va QORALAMA holati ham yo'q: advertiser surface'ida
 * `POST /advertiser/campaigns` doim shu statusni qo'yadi
 * (`advertiser-campaigns.policy.ts: SELF_CREATED_CAMPAIGN_STATUS`).
 * Kreativ berilgan bo'lsa u ham shu yerda biriktiriladi.
 */
export const useCreateCampaign = () => {
    const { t } = useLanguage();
    const notify = useNotify();
    const queryClient = useQueryClient();

    const { mutateAsync: createMutate, isLoading } = useMutation<
        CampaignResponse,
        AxiosError<ApiErrorBody>,
        CreateCampaignRequest
    >(async body => (await Api.post(urls.campaigns.create, body)) as unknown as CampaignResponse);

    const { mutateAsync: attachCreative } = useMutation<
        unknown,
        AxiosError<ApiErrorBody>,
        { campaignId: string; name: string; typeId: number; uploadTicket: string }
    >(async body => await Api.post(urls.creatives.create, body));

    const submit = async (body: CreateCampaignBody, message: string, callback?: CallbackType) => {
        try {
            const created = await createMutate(toRequest(body));

            if (body.creative) {
                await attachCreative({ campaignId: created.id, ...body.creative });
            }

            void queryClient.invalidateQueries(CAMPAIGNS_KEY);
            notify.success({ type: 'success', message });
            callback?.();
        } catch (err) {
            notify.error({ type: 'error', message: getApiErrorMessage(err, t('error')) });
        }
    };

    const createCampaign = (body: CreateCampaignBody, callback?: CallbackType) =>
        submit(body, t('campaign_created'), callback);

    return { createCampaign, isCreating: isLoading };
};

/**
 * Sehrgardagi real-vaqt narx hisobi — `POST /advertiser/campaigns/estimate`.
 * Narx narx kartasidan olinadi, klientda taxmin qilinmaydi.
 */
export const useEstimate = () => {
    const { mutateAsync, data, isLoading, reset } = useMutation<
        EstimateResponse,
        AxiosError<ApiErrorBody>,
        EstimateRequest
    >(async body => (await Api.post(urls.campaigns.estimate, body)) as unknown as EstimateResponse);

    const estimate = async (body: CreateCampaignBody) => {
        if (!body.regions.length || body.goal <= 0) {
            reset();
            return;
        }
        const request = toRequest(body);
        await mutateAsync({
            channelId: request.channelId,
            regions: request.regions,
            impressionGoal: request.impressionGoal,
            startsAt: request.startsAt,
            endsAt: request.endsAt,
        }).catch(() => undefined);
    };

    return {
        estimate,
        cost: data ? fromMinor(data.estimatedCostMinor) : 0,
        availableImpressions: data?.availableImpressions ?? 0,
        estimatedReach: data?.estimatedReach ?? 0,
        legs: data?.legs ?? [],
        isEstimating: isLoading,
    };
};
