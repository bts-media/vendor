import { Button } from 'antd';
import { ArrowRight, Info } from 'lucide-react';
import { Card } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { UploadedCreative } from '~services/creatives/type';
import { formatCompactSum, formatNumber } from '~utils/helpers';
import styles from '../CampaignBuilder.module.css';

export interface SummaryData {
    /** Sehrgarda yuklangan, hali biriktirilmagan fayl */
    creative?: UploadedCreative;
    campaignName: string;
    channelLabels: string;
    regionLabels: string;
    goal: number;
    days: number;
    estimatedScans: number;
    estimatedCost: number;
    cpm: number;
}

interface CampaignSummaryProps extends SummaryData {
    /** Narx backenddan so'ralmoqda — summa o'rniga "…" ko'rsatiladi */
    isEstimating?: boolean;
    /** Keyingi qadam tugmasining matni — oxirgi qadamdan oldin "Ko'rib chiqishga o'tish" */
    nextLabel: string;
    onNext: () => void;
}

const CampaignSummary = ({
    creative,
    campaignName,
    channelLabels,
    regionLabels,
    goal,
    days,
    estimatedScans,
    estimatedCost,
    cpm,
    isEstimating,
    nextLabel,
    onNext,
}: CampaignSummaryProps) => {
    const { t } = useLanguage();

    const rows = [
        { key: t('channels'), value: channelLabels || '—' },
        { key: t('regions'), value: regionLabels || '—' },
        { key: t('goal'), value: `${formatNumber(goal)} ${t('impressions').toLowerCase()}` },
        { key: t('duration'), value: `${days} ${t('days_short')}` },
        { key: t('sum_est_scans'), value: `~${formatNumber(estimatedScans)}` },
    ];

    return (
        <Card className={styles.summary} title={t('summary_title')}>
            <div className={styles.sumCreative}>
                {/* Kreativ eskizi — reklama beruvchining o'z brendi (DESIGN-SYSTEM §5) */}
                {creative?.fileUrl ? (
                    <img className={styles.sumThumb} src={creative.fileUrl} alt={creative.name} />
                ) : (
                    <div className={styles.sumThumb} style={{ background: 'var(--nv-700)' }}>
                        {creative?.name.charAt(0).toUpperCase() ?? '—'}
                    </div>
                )}
                <div style={{ minWidth: 0 }}>
                    <div className={styles.sumCname}>{campaignName || t('campaign_name')}</div>
                    <div className={styles.sumCsub}>{creative?.name ?? t('creative_required')}</div>
                </div>
            </div>

            <div style={{ padding: '8px 0' }}>
                {rows.map(row => (
                    <div className={styles.sumRow} key={row.key}>
                        <span className={styles.sumKey}>{row.key}</span>
                        <span className={`${styles.sumValue} tnum`}>{row.value}</span>
                    </div>
                ))}
            </div>

            <div className={styles.estBanner}>
                <Info size={17} />
                <span>{t('est_banner')}</span>
            </div>

            <div className={styles.sumTotal}>
                <div className={styles.sumTotalRow}>
                    <span className={styles.sumTotalLabel}>{t('est_total')}</span>
                    <span className={`${styles.sumTotalValue} tnum`}>
                        {isEstimating ? '…' : formatCompactSum(estimatedCost)}
                    </span>
                </div>
                <div className={styles.sumNote}>
                    {t('currency')} · {t('est_note')} · {formatNumber(cpm)} {t('currency')}{' '}
                    {t('cpm')}
                </div>

                <Button
                    type='primary'
                    block
                    style={{ marginTop: 16 }}
                    onClick={onNext}
                    icon={<ArrowRight size={16} strokeWidth={2.2} />}
                    iconPosition='end'
                >
                    {nextLabel}
                </Button>
            </div>
        </Card>
    );
};

export default CampaignSummary;
