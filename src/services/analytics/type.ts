import { EnumValue } from '~api/types';
import { ChannelKey } from '~services/campaigns/type';

export type PeriodKey = '30d' | '90d' | 'year';

// ─── Backend javob shakllari (`[ADVERTISER] Analytics`) ───

export type AnalyticsPeriod = { from: string; to: string };

export type AnalyticsOverviewResponse = {
    period: AnalyticsPeriod;
    impressions: number;
    spendMinor: string;
    scans: number;
    uniqueScans: number;
    scanRatePercent: number;
    activeCampaigns: number;
};

export type AnalyticsFunnelResponse = {
    period: AnalyticsPeriod;
    delivered: number;
    scans: number;
    uniqueScans: number;
    scanRatePercent: number;
};

export type AnalyticsChannelsResponse = {
    period: AnalyticsPeriod;
    data: {
        channel: EnumValue;
        impressions: number;
        spendMinor: string;
        uniqueScans: number;
        scanRatePercent: number;
    }[];
};

export type AnalyticsRegionsResponse = {
    period: AnalyticsPeriod;
    data: {
        region: string;
        impressions: number;
        spendMinor: string;
        uniqueScans: number;
        sharePercent: number;
    }[];
};

export type AnalyticsCreativesResponse = {
    period: AnalyticsPeriod;
    data: {
        id: string;
        name: string;
        type: EnumValue;
        status: EnumValue;
        campaignName: string;
        campaignImpressions: number;
        campaignUniqueScans: number;
        campaignScanRatePercent: number | null;
    }[];
};

// ─── Ekran modellari ───

export type AnalyticsKpiType = {
    impressions: number;
    scans: number;
    scanRate: number;
    /** Noyob skanerlashlar — bir necha marta skanerlagan bitta odam bir marta sanaladi */
    uniqueScans: number;
    spend: number;
};

export type FunnelType = {
    delivered: number;
    scans: number;
    uniqueScans: number;
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
