import { Button, Dropdown, Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MoreHorizontal, Pause, Play } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    BrandMark,
    Card,
    ChannelBadge,
    EmptyTable,
    MiniBar,
    PageHeader,
    PageTitle,
    SearchInput,
    StatusBadge,
} from '~components/index';
import { CAMPAIGN_STATUS_OPTIONS, PAGE_SIZE_OPTIONS } from '~constants/data';
import StatusFilter from '~components/Form/StatusFilter';
import useLanguage from '~hooks/useLanguage';
import useWindowSize from '~hooks/useWindowSize';
import { useCampaigns } from '~services/campaigns';
import { CampaignType } from '~services/campaigns/type';
import { formatCompactCount, formatNumber, toPercent } from '~utils/helpers';
import styles from './Campaigns.module.css';

const CampaignsPage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { isMobile } = useWindowSize();
    const [, setSearchParams] = useSearchParams();

    const { campaignsData, pagination, isLoading, refetchCampaigns, toggleCampaign } =
        useCampaigns();

    // Sahifalash holati URL query-string'da — refresh/link ulashish to'g'ri ishlaydi
    const handleChangePage = (page: TablePaginationConfig) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set('page', String(page.current ?? 1));
            next.set('limit', String(page.pageSize ?? pagination.limit));
            return next;
        });
    };

    const columns: ColumnsType<CampaignType> = [
        {
            title: t('campaign'),
            key: 'name',
            render: (_, record) => (
                <div className={styles.rowFlex}>
                    <BrandMark label={record.brandInitial} color={record.brandColor} />
                    <span className={styles.cellName}>{record.name}</span>
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
            title: t('goal'),
            key: 'goal',
            width: 110,
            align: 'right',
            render: (_, record) => (
                <span className='tnum'>{formatCompactCount(record.goal)}</span>
            ),
        },
        {
            title: t('delivered'),
            key: 'delivered',
            width: 150,
            align: 'right',
            render: (_, record) => (
                <div className={styles.delivered}>
                    <span className='tnum'>{formatCompactCount(record.delivered)}</span>
                    <MiniBar
                        value={toPercent(record.delivered, record.goal)}
                        tone={record.delivered >= record.goal ? 'teal' : 'accent'}
                        width='100%'
                        label={t('delivered')}
                    />
                </div>
            ),
        },
        {
            title: t('scans'),
            key: 'scans',
            width: 110,
            align: 'right',
            responsive: ['md'],
            render: (_, record) => <span className='tnum'>{formatNumber(record.scans)}</span>,
        },
        {
            title: t('status'),
            key: 'status',
            width: 130,
            render: (_, record) => <StatusBadge status={record.status} />,
        },
        {
            title: '',
            key: 'actions',
            width: 56,
            align: 'right',
            render: (_, record) => {
                const canToggle = record.status === 'active' || record.status === 'paused';
                if (!canToggle) return null;

                const isPaused = record.status === 'paused';
                return (
                    <Dropdown
                        trigger={['click']}
                        menu={{
                            items: [
                                {
                                    key: 'toggle',
                                    label: t(isPaused ? 'campaign_resume' : 'campaign_pause'),
                                    icon: isPaused ? <Play size={14} /> : <Pause size={14} />,
                                    onClick: () => toggleCampaign(record),
                                },
                            ],
                        }}
                    >
                        <Button type='text' icon={<MoreHorizontal size={16} />} />
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <div>
            <PageTitle title={t('campaigns_mine')} />

            <PageHeader
                title={t('campaigns_mine')}
                subtitle={t('campaigns_desc')}
                refreshButton
                onRefresh={refetchCampaigns}
                isRefreshing={isLoading}
                isBtnIsVisible
                buttonText={t('campaign_new')}
                handleClick={() => navigate('/campaigns/new')}
                extra={
                    <>
                        <SearchInput placeholder={t('campaign_search_ph')} />
                        <StatusFilter options={CAMPAIGN_STATUS_OPTIONS} />
                    </>
                }
            />

            <Card>
                <Table<CampaignType>
                    columns={columns}
                    dataSource={campaignsData}
                    rowKey='id'
                    loading={isLoading}
                    size={isMobile ? 'small' : 'middle'}
                    scroll={{ x: 'max-content' }}
                    locale={{ emptyText: <EmptyTable /> }}
                    onChange={handleChangePage}
                    pagination={{
                        current: pagination.page,
                        pageSize: pagination.limit,
                        total: pagination.total,
                        showSizeChanger: true,
                        pageSizeOptions: PAGE_SIZE_OPTIONS,
                        size: isMobile ? 'small' : 'default',
                        hideOnSinglePage: false,
                    }}
                />
            </Card>
        </div>
    );
};

export default CampaignsPage;
