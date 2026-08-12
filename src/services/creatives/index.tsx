import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Api } from '~api/axios';
import { useApiQuery } from '~api/index';
import { ApiErrorBody, Paginated } from '~api/types';
import { useNotify } from '~components/NotificationProvider';
import { CREATIVE_STATUS_KEY, CreativeStatus, CreativeType as CreativeTypeId } from '~constants/enums';
import { urls } from '~constants/urls';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import { getApiErrorMessage, parseSearchParams } from '~utils/helpers';
import { AnalyticsCreativesResponse } from '~services/analytics/type';
import {
    CreateCreativeBody,
    CreateCreativeRequest,
    CreativeResponse,
    CreativeType,
    CreativeUploadResponse,
    UploadedCreative,
} from './type';

const CREATIVES_KEY = 'creatives';
const LIST_LIMIT = 100;

const STATUS_IDS: Record<string, number[]> = {
    draft: [CreativeStatus.ARCHIVED],
    moderation: [CreativeStatus.PENDING_REVIEW],
    approved: [CreativeStatus.APPROVED],
    rejected: [CreativeStatus.REJECTED],
};

type Performance = { impressions: number; scans: number; scanRate: number };

const toCreative = (
    row: CreativeResponse,
    performance: Map<string, Performance>,
): CreativeType => {
    const stats = performance.get(row.id);

    return {
        id: row.id,
        name: row.name,
        kind: row.type?.name === 'SCREEN' ? 'screen' : 'parcel',
        status: (CREATIVE_STATUS_KEY[row.status?.name] ?? 'moderation') as CreativeType['status'],
        fileUrl: row.fileUrl,
        campaignId: row.campaignId,
        campaignName: row.campaignName,
        impressions: stats?.impressions ?? 0,
        scans: stats?.scans ?? 0,
        scanRate: stats?.scanRate ?? 0,
        createdAt: row.createdAt,
        size: row.widthPx && row.heightPx ? `${row.widthPx}×${row.heightPx}` : '—',
    };
};

export const useCreatives = () => {
    const { search } = useLocation();
    const { t } = useLanguage();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const params = parseSearchParams(search);

    const list = useApiQuery<Paginated<CreativeResponse>>(
        [CREATIVES_KEY, search],
        urls.creatives.get,
        {
            limit: LIST_LIMIT,
            search: params.search,
            statusIds: params.status ? STATUS_IDS[params.status] : undefined,
        },
        { keepPreviousData: true },
    );

    /**
     * Ko'rsatish/skanerlash ko'rsatkichlari kreativ ro'yxatida yo'q — ular
     * analitikadan keladi va kreativ `id` bo'yicha ulanadi.
     */
    const performanceQuery = useApiQuery<AnalyticsCreativesResponse>(
        [CREATIVES_KEY, 'performance'],
        urls.analytics.creatives,
    );

    const performance = useMemo(() => {
        const map = new Map<string, Performance>();
        (performanceQuery.data?.data ?? []).forEach(row => {
            map.set(row.id, {
                impressions: row.campaignImpressions,
                scans: row.campaignUniqueScans,
                scanRate: row.campaignScanRatePercent ?? 0,
            });
        });
        return map;
    }, [performanceQuery.data]);

    const { mutateAsync: uploadMutate, isLoading: isUploading } = useMutation<
        CreativeUploadResponse,
        AxiosError<ApiErrorBody>,
        FormData
    >(
        async form =>
            (await Api.post(urls.creatives.upload, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })) as unknown as CreativeUploadResponse,
    );

    const { mutateAsync: createMutate, isLoading: isCreating } = useMutation<
        CreativeResponse,
        AxiosError<ApiErrorBody>,
        CreateCreativeRequest
    >(async body => (await Api.post(urls.creatives.create, body)) as unknown as CreativeResponse);

    /**
     * Ikki qadam: avval fayl yuklanadi va bir martalik tiket olinadi, keyin shu
     * tiket bilan kreativ kampaniyaga biriktiriladi. Kreativ TEKSHIRUVGA tushadi.
     */
    const createCreative = async (body: CreateCreativeBody, callback?: CallbackType) => {
        try {
            const form = new FormData();
            form.append('file', body.file);
            const uploaded = await uploadMutate(form);

            await createMutate({
                campaignId: body.campaignId,
                name: body.name,
                typeId:
                    body.kind === 'screen' ? CreativeTypeId.SCREEN : CreativeTypeId.PARCEL_LABEL,
                uploadTicket: uploaded.uploadTicket,
            });

            void queryClient.invalidateQueries(CREATIVES_KEY);
            notify.success({ type: 'success', message: t('creative_created') });
            callback?.();
        } catch (err) {
            notify.error({ type: 'error', message: getApiErrorMessage(err, t('error')) });
        }
    };

    return {
        creativesData: useMemo(
            () => (list.data?.data ?? []).map(row => toCreative(row, performance)),
            [list.data, performance],
        ),
        pagination: {
            total: list.data?.total ?? 0,
            page: list.data?.page ?? 1,
            limit: list.data?.limit ?? LIST_LIMIT,
        },
        isLoading: list.isLoading,
        refetchCreatives: list.refetch,
        createCreative,
        isCreating: isCreating || isUploading,
    };
};

/**
 * Sehrgar uchun kreativ fayli.
 *
 * Kreativ HAR DOIM kampaniyaga tegishli (`CreateCreativeDto.campaignId` majburiy),
 * shuning uchun sehrgarda uni darhol yaratib bo'lmaydi — kampaniya hali yo'q.
 * Fayl avval yuklanadi va bir martalik `uploadTicket` olinadi; kampaniya
 * yaratilgandan keyin shu tiket bilan kreativ biriktiriladi.
 */
export const useUploadCreativeFile = () => {
    const { t } = useLanguage();
    const notify = useNotify();

    const { mutateAsync, isLoading } = useMutation<
        CreativeUploadResponse,
        AxiosError<ApiErrorBody>,
        FormData
    >(
        async form =>
            (await Api.post(urls.creatives.upload, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })) as unknown as CreativeUploadResponse,
    );

    const uploadFile = async (file: File): Promise<UploadedCreative | null> => {
        const form = new FormData();
        form.append('file', file);

        try {
            const uploaded = await mutateAsync(form);
            return {
                name: file.name.replace(/\.[^.]+$/, ''),
                typeId: file.type.startsWith('video/')
                    ? CreativeTypeId.SCREEN
                    : CreativeTypeId.PARCEL_LABEL,
                uploadTicket: uploaded.uploadTicket,
                fileUrl: uploaded.fileUrl,
                widthPx: uploaded.widthPx,
                heightPx: uploaded.heightPx,
            };
        } catch (err) {
            notify.error({ type: 'error', message: getApiErrorMessage(err, t('error')) });
            return null;
        }
    };

    return { uploadFile, isUploading: isLoading };
};
