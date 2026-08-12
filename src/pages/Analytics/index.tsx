import { Segmented, Skeleton } from 'antd';
import { Eye, QrCode, TrendingUp, Users, Wallet } from 'lucide-react';
import { useState } from 'react';
import { PageHeader, PageTitle, StatCard } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { useAnalytics } from '~services/analytics';
import { PeriodKey } from '~services/analytics/type';
import {
    formatCompactCount,
    formatCompactSum,
    formatNumber,
    formatPercent,
} from '~utils/helpers';
import styles from './Analytics.module.css';
import ChannelPerformance from './sections/ChannelPerformance';
import ConversionFunnel from './sections/ConversionFunnel';
import CreativePerformance from './sections/CreativePerformance';
import RegionBreakdown from './sections/RegionBreakdown';

const AnalyticsPage = () => {
    const { t } = useLanguage();
    const [period, setPeriod] = useState<PeriodKey>('year');
    const { analytics, isLoading, refetchAnalytics } = useAnalytics(period);

    return (
        <div>
            <PageTitle title={t('analytics')} />

            <PageHeader
                title={t('analytics')}
                subtitle={t('analytics_desc')}
                refreshButton
                onRefresh={refetchAnalytics}
                isRefreshing={isLoading}
                extra={
                    <Segmented
                        size='small'
                        value={period}
                        onChange={value => setPeriod(value as PeriodKey)}
                        options={[
                            { value: '30d', label: t('period_30d') },
                            { value: '90d', label: t('period_90d') },
                            { value: 'year', label: t('period_year') },
                        ]}
                    />
                }
            />

            {isLoading || !analytics ? (
                <Skeleton active paragraph={{ rows: 8 }} />
            ) : (
                <>
                    <div className={styles.kpiGrid}>
                        <StatCard
                            label={t('kpi_verified_impressions')}
                            value={formatCompactCount(analytics.kpis.impressions)}
                            icon={<Eye size={15} />}
                            tone='orange'
                        />
                        <StatCard
                            label={t('scans')}
                            value={formatNumber(analytics.kpis.scans)}
                            icon={<QrCode size={15} />}
                            tone='sky'
                        />
                        <StatCard
                            label={t('scan_rate')}
                            value={formatPercent(analytics.kpis.scanRate)}
                            icon={<TrendingUp size={15} />}
                            tone='teal'
                        />
                        <StatCard
                            label={t('unique_scans')}
                            value={formatCompactCount(analytics.kpis.uniqueScans)}
                            icon={<Users size={15} />}
                            tone='gray'
                        />
                        <StatCard
                            label={t('spend')}
                            value={formatCompactSum(analytics.kpis.spend)}
                            unit={t('currency')}
                            icon={<Wallet size={15} />}
                            tone='orange'
                        />
                    </div>

                        <div className={styles.grid2}>
                        <ConversionFunnel funnel={analytics.funnel} />
                        <ChannelPerformance channels={analytics.channels} />
                    </div>

                    <div className={styles.grid2}>
                        <RegionBreakdown regions={analytics.regions} />
                        <CreativePerformance creatives={analytics.creatives} />
                    </div>

                    <p className={styles.note} style={{ borderTop: 'none' }}>
                        {t('audience_hint')}
                    </p>
                </>
            )}
        </div>
    );
};

export default AnalyticsPage;
