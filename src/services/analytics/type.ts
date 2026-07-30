import { ChannelKey } from '~services/campaigns/type';

export type PeriodKey = '30d' | '90d' | 'year';

export type AnalyticsKpiType = {
    impressions: number;
    scans: number;
    scanRate: number;
    /** Footfall-as-audience — filialda jismonan bo'lgan auditoriya bahosi */
    audience: number;
    spend: number;
};

export type TrendPointType = {
    label: string;
    parcel: number;
    screen: number;
};

export type FunnelType = {
    delivered: number;
    scans: number;
    clicks: number;
};

export type ChannelPerfType = {
    key: ChannelKey;
    impressions: number;
    scans: number;
    scanRate: number;
    spend: number;
};

export type RegionPerfType = {
    id: string;
    name: string;
    impressions: number;
    scans: number;
    /** Umumiy ko'rsatishlardagi ulush, % */
    share: number;
};

export type CreativePerfType = {
    id: string;
    name: string;
    scans: number;
    scanRate: number;
};

export type AnalyticsOverviewType = {
    kpis: AnalyticsKpiType;
    funnel: FunnelType;
    channels: ChannelPerfType[];
    regions: RegionPerfType[];
    creatives: CreativePerfType[];
};
