import { useMockQuery } from '~api/mock';
import { mockAnalytics, mockTrend } from './mock';
import { PeriodKey } from './type';

const ANALYTICS_KEY = 'analytics';

/**
 * Tahlillar sahifasi ma'lumoti.
 * KPI va kesimlar — 2026 yil bo'yicha; `period` faqat vaqt qatoriga (trend) ta'sir qiladi.
 */
export const useAnalytics = (period: PeriodKey = 'year') => {
    // Backend: useCustomGetQuery<AnalyticsOverviewType>(ANALYTICS_KEY, urls.analytics.overview)
    const { data, isLoading, refetch, isRefetching } = useMockQuery(ANALYTICS_KEY, mockAnalytics);

    // Backend: useGetList<TrendPointType[]>([`${ANALYTICS_KEY}-trend`, `?period=${period}`], urls.analytics.overview)
    const { data: trend, isLoading: isTrendLoading } = useMockQuery(
        [`${ANALYTICS_KEY}-trend`, period],
        mockTrend[period],
    );

    return {
        analytics: data,
        trend: trend ?? [],
        isLoading: isLoading || isRefetching,
        isTrendLoading,
        refetchAnalytics: refetch,
    };
};
