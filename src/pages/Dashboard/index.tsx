import { Skeleton, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CircleCheck, Eye, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    BrandMark,
    Card,
    ChannelBadge,
    EmptyTable,
    MiniBar,
    PageHeader,
    PageTitle,
    StatCard,
    StatusBadge,
} from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { useCampaignStats, useCampaigns } from '~services/campaigns';
import { CampaignType } from '~services/campaigns/type';
import {
    formatCompactCount,
    formatDate,
    formatNumber,
    formatPercent,
    toPercent,
} from '~utils/helpers';
import styles from './Dashboard.module.css';

const DashboardPage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { stats, isLoading: isStatsLoading, refetchStats } = useCampaignStats();
    const { allCampaigns, isLoading } = useCampaigns();

    const columns: ColumnsType<CampaignType> = [
        {
            title: t('campaign'),
            key: 'name',
            render: (_, record) => (
                <div className={styles.rowFlex}>
                    <BrandMark label={record.brandInitial} color={record.brandColor} />
                    <div>
                        <div className={styles.cellName}>{record.name}</div>
                        <div className={styles.cellSub}>
                            {record.status === 'completed'
                                ? t('status_completed')
                                : `${formatDate(record.endDate)} ${t('campaign_ends_at')}`}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: t('channel'),
            key: 'channel',
            width: 140,
            render: (_, record) => <ChannelBadge channels={record.channels} />,
        },
        {
            title: t('pace'),
            key: 'pace',
            width: 120,
            render: (_, record) => (
                <MiniBar
                    value={record.pace}
                    tone={record.pace >= 100 ? 'teal' : 'accent'}
                    label={t('pace')}
                />
            ),
        },
        {
            title: t('scans'),
            key: 'scans',
            width: 120,
            align: 'right',
            render: (_, record) => <span className='tnum'>{formatNumber(record.scans)}</span>,
        },
        {
            title: t('status'),
            key: 'status',
            width: 130,
            render: (_, record) => <StatusBadge status={record.status} />,
        },
    ];

    return (
        <div>
            <PageTitle title={t('dashboard')} />

            <PageHeader
                title={t('dashboard')}
                subtitle={t('dashboard_desc')}
                refreshButton
                onRefresh={refetchStats}
                isRefreshing={isStatsLoading}
                isBtnIsVisible
                buttonText={t('campaign_new')}
                handleClick={() => navigate('/campaigns/new')}
            />

            {isStatsLoading || !stats ? (
                <Skeleton active paragraph={{ rows: 3 }} style={{ marginBottom: 18 }} />
            ) : (
                <div className={styles.kpiGrid}>
                    <StatCard
                        label={t('kpi_active_campaigns')}
                        value={stats.activeCampaigns}
                        icon={<CircleCheck size={15} />}
                        tone='teal'
                        foot={`${stats.pendingApproval} ${t('kpi_pending_approval_foot')}`}
                    />
                    <StatCard
                        label={t('kpi_month_impressions')}
                        value={formatCompactCount(stats.monthImpressions)}
                        icon={<Eye size={15} />}
                        tone='orange'
                        foot={`${t('kpi_month_impressions_foot')} · ${formatPercent(
                            toPercent(stats.monthImpressions, stats.monthGoal),
                            0,
                        )} · ${t('pace_on_track')}`}
                    />
                    <StatCard
                        label={t('kpi_scans')}
                        value={formatNumber(stats.scans)}
                        icon={<QrCode size={15} />}
                        tone='sky'
                        foot={`${formatPercent(stats.scanRate)} ${t('kpi_scans_foot')}`}
                    />
                </div>
            )}

            <Card
                title={t('campaigns_mine')}
                extra={
                    <button
                        type='button'
                        className={styles.viewAll}
                        onClick={() => navigate('/campaigns')}
                    >
                        {t('view_all')} →
                    </button>
                }
            >
                <Table<CampaignType>
                    columns={columns}
                    dataSource={allCampaigns.filter(campaign => campaign.status !== 'draft')}
                    rowKey='id'
                    loading={isLoading}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    locale={{ emptyText: <EmptyTable /> }}
                />
            </Card>
        </div>
    );
};

export default DashboardPage;
