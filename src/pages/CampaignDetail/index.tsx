import { Button, Skeleton } from 'antd';
import { ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Card,
    ChannelBadge,
    EstimateBreakdown,
    PageHeader,
    PageTitle,
    PlacementsEditor,
    SectionTitle,
    StatusBadge,
} from '~components/index';
import { PackageTier } from '~constants/enums';
import useLanguage from '~hooks/useLanguage';
import { useCampaign, useUpdateCampaign } from '~services/campaigns';
import { PackageTierKey, PlacementInput } from '~services/campaigns/type';
import { formatDate, formatNumber } from '~utils/helpers';
import styles from './CampaignDetail.module.css';

const PACKAGE_TIER_ID: Record<PackageTierKey, PackageTier> = {
    econom: PackageTier.ECONOM,
    optimum: PackageTier.OPTIMUM,
    premium: PackageTier.PREMIUM,
};

type Draft = { placements: PlacementInput[]; packageTierId?: number };

/**
 * Kampaniya tafsiloti: qatorlar va paket. Tasdiqdan oldin (`flatChargedAt` bo'sh) tahrirlanadi,
 * ishga tushirilgach backend muzlatgan summalar ko'rsatiladi.
 */
const CampaignDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { campaign, isLoading } = useCampaign(id);
    const { updateCampaign, isUpdating } = useUpdateCampaign();

    const [draft, setDraft] = useState<Draft>({ placements: [] });

    useEffect(() => {
        if (!campaign) return;
        setDraft({
            placements: campaign.placements.map(line => ({
                placementId: line.placementId,
                quantity: line.quantity,
                branchGroupId: line.branchGroupId ?? undefined,
            })),
            packageTierId: campaign.packageTier ? PACKAGE_TIER_ID[campaign.packageTier] : undefined,
        });
    }, [campaign]);

    if (isLoading || !campaign) {
        return isLoading ? (
            <Skeleton active paragraph={{ rows: 8 }} />
        ) : (
            <PageHeader title={t('campaign_not_found')} />
        );
    }

    const isEditable =
        !campaign.isFrozen && (campaign.status === 'draft' || campaign.status === 'moderation');

    const packageLabel = campaign.packageTier
        ? `${t(`package_${campaign.packageTier.toUpperCase()}`)} · −${campaign.discountPercent}%`
        : t('package_none');

    const rows = [
        { key: t('status'), value: <StatusBadge status={campaign.status} /> },
        { key: t('channels'), value: <ChannelBadge channels={campaign.channels} /> },
        { key: t('regions'), value: campaign.regions.join(', ') || '—' },
        { key: t('impression_goal'), value: formatNumber(campaign.goal) },
        { key: t('delivered'), value: formatNumber(campaign.delivered) },
        {
            key: t('duration'),
            value: `${formatDate(campaign.startDate)} – ${formatDate(campaign.endDate)}`,
        },
        { key: t('package'), value: packageLabel },
    ];

    const handleSave = () =>
        updateCampaign(campaign.id, {
            placements: draft.placements,
            packageTierId: draft.packageTierId ?? null,
        });

    return (
        <div>
            <PageTitle title={campaign.name} />
            <PageHeader
                title={campaign.name}
                subtitle={t('campaign_detail')}
                extra={
                    <Button icon={<ArrowLeft size={16} />} onClick={() => navigate('/campaigns')}>
                        {t('back')}
                    </Button>
                }
            />

            <div className={styles.grid}>
                <div className={styles.column}>
                    {isEditable ? (
                        <Card padded>
                            <SectionTitle title={t('edit_placements')} sub={t('placements_sub')} />
                            <PlacementsEditor
                                channelId={campaign.channelId}
                                impressionGoal={campaign.goal}
                                placements={draft.placements}
                                packageTierId={draft.packageTierId}
                                onChange={patch => setDraft(prev => ({ ...prev, ...patch }))}
                            />
                            <div className={styles.actions}>
                                <Button
                                    type='primary'
                                    icon={<Save size={16} />}
                                    loading={isUpdating}
                                    disabled={!draft.placements.length}
                                    onClick={handleSave}
                                >
                                    {t('save')}
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <Card padded>
                            <SectionTitle title={t('step_placements')} />
                            <EstimateBreakdown estimate={campaign.estimate} frozen={campaign.isFrozen} />
                            {!campaign.isFrozen && (
                                <div className={styles.note}>{t('edit_locked_note')}</div>
                            )}
                        </Card>
                    )}
                </div>

                <div className={styles.column}>
                    <Card title={t('summary_title')}>
                        {rows.map(row => (
                            <div className={styles.row} key={row.key}>
                                <span className={styles.key}>{row.key}</span>
                                <span className={`${styles.value} tnum`}>{row.value}</span>
                            </div>
                        ))}
                    </Card>

                    {isEditable && (
                        <Card title={t('est_total')} padded>
                            <EstimateBreakdown estimate={campaign.estimate} />
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampaignDetailPage;
