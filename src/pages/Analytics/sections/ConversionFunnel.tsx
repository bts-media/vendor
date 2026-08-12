import { Card, MiniBar } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { FunnelType } from '~services/analytics/type';
import { formatNumber, formatPercent, toPercent } from '~utils/helpers';
import styles from '../Analytics.module.css';

interface ConversionFunnelProps {
    funnel: FunnelType;
}

/** Uch bosqichli voronka — har bosqichda raqam va oldingi bosqichga nisbatan ulush. */
const ConversionFunnel = ({ funnel }: ConversionFunnelProps) => {
    const { t } = useLanguage();

    const stages = [
        {
            key: 'funnel_delivered',
            value: funnel.delivered,
            previous: funnel.delivered,
            tone: 'accent' as const,
        },
        { key: 'funnel_scans', value: funnel.scans, previous: funnel.delivered, tone: 'sky' as const },
        {
            key: 'funnel_unique_scans',
            value: funnel.uniqueScans,
            previous: funnel.scans,
            tone: 'teal' as const,
        },
    ];

    return (
        <Card title={t('funnel_title')}>
            {stages.map((stage, index) => (
                <div className={styles.funnelStage} key={stage.key}>
                    <div className={styles.funnelTop}>
                        <span className={styles.funnelLabel}>{t(stage.key)}</span>
                        <span className={`${styles.funnelValue} tnum`}>
                            {formatNumber(stage.value)}
                        </span>
                    </div>
                    <MiniBar
                        value={toPercent(stage.value, funnel.delivered)}
                        tone={stage.tone}
                        width='100%'
                        thick
                        label={t(stage.key)}
                    />
                    {index > 0 && (
                        <div className={`${styles.funnelRate} tnum`}>
                            {formatPercent((stage.value / stage.previous) * 100)} ·{' '}
                            {t(stages[index - 1].key)}
                        </div>
                    )}
                </div>
            ))}
        </Card>
    );
};

export default ConversionFunnel;
