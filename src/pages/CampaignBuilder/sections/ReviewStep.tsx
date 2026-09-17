import { Button } from 'antd';
import { ArrowLeft, Check, Zap } from 'lucide-react';
import { Card, EstimateBreakdown } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { formatCompactSum, formatNumber } from '~utils/helpers';
import styles from '../CampaignBuilder.module.css';
import { SummaryData } from './CampaignSummary';

interface ReviewStepProps extends SummaryData {
    onBack: () => void;
    onLaunch: () => void;
    isLaunching: boolean;
}

const ReviewStep = ({
    creative,
    campaignName,
    channelLabels,
    regionLabels,
    goal,
    days,
    packageLabel,
    lines,
    onBack,
    onLaunch,
    isLaunching,
}: ReviewStepProps) => {
    const { t } = useLanguage();

    const rows = [
        { key: t('campaign_name'), value: campaignName || '—' },
        { key: t('creative'), value: creative?.name ?? '—' },
        { key: t('channels'), value: channelLabels || '—' },
        { key: t('regions'), value: regionLabels || '—' },
        { key: t('impression_goal'), value: formatNumber(goal) },
        { key: t('duration'), value: `${days} ${t('days_short')}` },
        { key: t('package'), value: packageLabel ?? t('package_none') },
        { key: t('est_total'), value: formatCompactSum(lines?.total ?? 0, true) },
    ];

    return (
        <div className={styles.review}>
            <div className={styles.reviewHero}>
                <div className={styles.reviewIcon}>
                    <Check size={26} strokeWidth={2.5} />
                </div>
                <div>
                    <div className={styles.reviewTitle}>{t('review_ready_title')}</div>
                    <div className={styles.reviewDesc}>{t('review_ready_desc')}</div>
                </div>
            </div>

            <Card title={t('final_summary')}>
                {rows.map((row, index) => (
                    <div
                        className={styles.sumRow}
                        key={row.key}
                        style={{ padding: '14px 18px', fontSize: index === rows.length - 1 ? 14 : 13 }}
                    >
                        <span className={styles.sumKey}>{row.key}</span>
                        <span className={`${styles.sumValue} tnum`}>{row.value}</span>
                    </div>
                ))}
            </Card>

            <Card title={t('step_placements')} padded style={{ marginTop: 18 }}>
                <EstimateBreakdown estimate={lines} />
            </Card>

            <div className={styles.reviewActions}>
                <Button onClick={onBack} icon={<ArrowLeft size={16} />}>
                    {t('back')}
                </Button>
                <Button
                    type='primary'
                    style={{ flex: 1 }}
                    onClick={onLaunch}
                    loading={isLaunching}
                    icon={<Zap size={16} />}
                >
                    {t('launch_campaign')}
                </Button>
            </div>
        </div>
    );
};

export default ReviewStep;
