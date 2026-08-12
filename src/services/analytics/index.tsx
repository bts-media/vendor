import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useApiQuery } from '~api/index';
import { CHANNEL_KEY } from '~constants/enums';
import { urls } from '~constants/urls';
import { fromMinor } from '~utils/helpers';
import {
    AnalyticsChannelsResponse,
    AnalyticsCreativesResponse,
    AnalyticsFunnelResponse,
    AnalyticsOverviewResponse,
    AnalyticsOverviewType,
    AnalyticsRegionsResponse,
    PeriodKey,
} from './type';

const ANALYTICS_KEY = 'analytics';

const DAYS_BY_PERIOD: Record<PeriodKey, number> = {
    '30d': 30,
    '90d': 90,
    year: 365,
};

/**
 * Tahlillar sahifasi ma'lumoti.
 *
 * Beshta endpoint bir davr uchun birga o'qiladi. Vaqt qatori (kunlik trend)
 * advertiser API'sida yo'q — shuning uchun sahifada kanal, hudud va kreativ
 * kesimlari ko'rsatiladi, o'ylab topilgan grafik chizilmaydi.
 */
export const useAnalytics = (period: PeriodKey = 'year') => {
    const days = DAYS_BY_PERIOD[period];
    const params = {
        from: dayjs()
            .subtract(days - 1, 'day')
            .startOf('day')
            .toISOString(),
        to: dayjs().endOf('day').toISOString(),
    };

    const overview = useApiQuery<AnalyticsOverviewResponse>(
        [ANALYTICS_KEY, 'overview', period],
        urls.analytics.overview,
        params,
    );
    const funnel = useApiQuery<AnalyticsFunnelResponse>(
        [ANALYTICS_KEY, 'funnel', period],
        urls.analytics.funnel,
        params,
    );
    const channels = useApiQuery<AnalyticsChannelsResponse>(
        [ANALYTICS_KEY, 'channels', period],
        urls.analytics.channels,
        params,
    );
    const regions = useApiQuery<AnalyticsRegionsResponse>(
        [ANALYTICS_KEY, 'regions', period],
        urls.analytics.regions,
        params,
    );
    const creatives = useApiQuery<AnalyticsCreativesResponse>(
        [ANALYTICS_KEY, 'creatives', period],
        urls.analytics.creatives,
        params,
    );

    const analytics = useMemo<AnalyticsOverviewType | undefined>(() => {
        if (!overview.data) return undefined;

        return {
            kpis: {
                impressions: overview.data.impressions,
                scans: overview.data.scans,
                scanRate: overview.data.scanRatePercent,
                uniqueScans: overview.data.uniqueScans,
                spend: fromMinor(overview.data.spendMinor),
            },
            funnel: {
                delivered: funnel.data?.delivered ?? 0,
                scans: funnel.data?.scans ?? 0,
                uniqueScans: funnel.data?.uniqueScans ?? 0,
            },
            channels: (channels.data?.data ?? []).map(row => ({
                key: CHANNEL_KEY[row.channel?.name] ?? 'parcel',
                impressions: row.impressions,
                scans: row.uniqueScans,
                scanRate: row.scanRatePercent,
                spend: fromMinor(row.spendMinor),
            })),
            regions: (regions.data?.data ?? []).map(row => ({
                id: row.region,
                name: row.region,
                impressions: row.impressions,
                scans: row.uniqueScans,
                share: Math.round(row.sharePercent),
            })),
            creatives: (creatives.data?.data ?? []).map(row => ({
                id: row.id,
                name: row.name,
                scans: row.campaignUniqueScans,
                scanRate: row.campaignScanRatePercent ?? 0,
            })),
        };
    }, [overview.data, funnel.data, channels.data, regions.data, creatives.data]);

    return {
        analytics,
        isLoading:
            overview.isLoading ||
            funnel.isLoading ||
            channels.isLoading ||
            regions.isLoading ||
            creatives.isLoading,
        refetchAnalytics: () => {
            void overview.refetch();
            void funnel.refetch();
            void channels.refetch();
            void regions.refetch();
            void creatives.refetch();
        },
    };
};
