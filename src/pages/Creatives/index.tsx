import { Empty, Skeleton } from 'antd';
import {
    Card,
    PageHeader,
    PageTitle,
    SearchInput,
    StatusBadge,
    StatusFilter,
} from '~components/index';
import { CREATIVE_STATUS_OPTIONS } from '~constants/data';
import useLanguage from '~hooks/useLanguage';
import useModalState from '~hooks/useModalState';
import { useCreatives } from '~services/creatives';
import { CreateCreativeBody } from '~services/creatives/type';
import { formatCompactCount, formatDate, formatPercent } from '~utils/helpers';
import styles from './Creatives.module.css';
import CreativeFormModal from './sections/CreativeFormModal';

const CreativesPage = () => {
    const { t } = useLanguage();
    const { open, onOpen, onClose } = useModalState();
    const { creativesData, isLoading, refetchCreatives, createCreative, isCreating } =
        useCreatives();

    const handleSubmit = (values: CreateCreativeBody) => createCreative(values, onClose);

    return (
        <div>
            <PageTitle title={t('creatives')} />

            <PageHeader
                title={t('creatives')}
                subtitle={t('creatives_desc')}
                refreshButton
                onRefresh={refetchCreatives}
                isRefreshing={isLoading}
                isBtnIsVisible
                buttonText={t('creative_add')}
                handleClick={onOpen}
                extra={
                    <>
                        <SearchInput placeholder={t('search')} />
                        <StatusFilter options={CREATIVE_STATUS_OPTIONS} />
                    </>
                }
            />

            {isLoading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
            ) : creativesData.length === 0 ? (
                <Card>
                    <div className={styles.empty}>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={t('creative_empty')}
                        />
                    </div>
                </Card>
            ) : (
                <div className={styles.grid}>
                    {creativesData.map(creative => (
                        <Card key={creative.id}>
                            <div className={styles.item}>
                                <div
                                    className={styles.thumb}
                                    style={{ background: creative.brandColor }}
                                >
                                    {creative.badge}
                                </div>

                                <div className={styles.body}>
                                    <div className={styles.topRow}>
                                        <div>
                                            <div className={styles.name}>{creative.name}</div>
                                            <div className={styles.meta}>
                                                {creative.kind === 'parcel'
                                                    ? t('creative_type_parcel')
                                                    : t('creative_type_screen')}
                                                {' · '}
                                                {formatDate(creative.createdAt)}
                                            </div>
                                        </div>
                                        <StatusBadge status={creative.status} />
                                    </div>

                                    {creative.campaignName && (
                                        <div className={styles.meta}>
                                            {t('creative_used_in')}: {creative.campaignName}
                                        </div>
                                    )}

                                    {creative.rejectionReason && (
                                        <div className={styles.rejected}>
                                            {creative.rejectionReason}
                                        </div>
                                    )}

                                    <div className={styles.stats}>
                                        <div>
                                            <div className={styles.statLabel}>
                                                {t('impressions')}
                                            </div>
                                            <div className={`${styles.statValue} tnum`}>
                                                {formatCompactCount(creative.impressions)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.statLabel}>{t('scans')}</div>
                                            <div className={`${styles.statValue} tnum`}>
                                                {formatCompactCount(creative.scans)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.statLabel}>{t('scan_rate')}</div>
                                            <div className={`${styles.statValue} tnum`}>
                                                {formatPercent(creative.scanRate)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <CreativeFormModal
                open={open}
                loading={isCreating}
                onCancel={onClose}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreativesPage;
