import { Card, MiniBar } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { CreativePerfType } from '~services/analytics/type';
import { formatNumber, formatPercent } from '~utils/helpers';
import styles from '../Analytics.module.css';

interface CreativePerformanceProps {
    creatives: CreativePerfType[];
}

const CreativePerformance = ({ creatives }: CreativePerformanceProps) => {
    const { t } = useLanguage();
    const max = Math.max(...creatives.map(creative => creative.scans), 1);

    return (
        <Card title={t('creative_perf_title')}>
            {creatives.map(creative => (
                <div className={styles.rowItem} key={creative.id}>
                    <span className={styles.rowName}>{creative.name}</span>
                    <span className={`${styles.rowValue} tnum`}>{formatNumber(creative.scans)}</span>
                    <span className={styles.rowBar}>
                        <MiniBar
                            value={(creative.scans / max) * 100}
                            width='100%'
                            label={creative.name}
                        />
                    </span>
                    <span className={`${styles.rowSub} tnum`}>
                        {t('scan_rate')}: {formatPercent(creative.scanRate)}
                    </span>
                </div>
            ))}
        </Card>
    );
};

export default CreativePerformance;
