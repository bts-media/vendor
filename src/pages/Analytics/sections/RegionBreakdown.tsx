import { Card, MiniBar } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { RegionPerfType } from '~services/analytics/type';
import { formatCompactCount, formatNumber, formatPercent } from '~utils/helpers';
import styles from '../Analytics.module.css';

interface RegionBreakdownProps {
    regions: RegionPerfType[];
}

/** Hudud kesimi — bitta o'lchov (ko'rsatishlar) kattaligi, shuning uchun yagona rang. */
const RegionBreakdown = ({ regions }: RegionBreakdownProps) => {
    const { t } = useLanguage();
    const max = Math.max(...regions.map(region => region.impressions), 1);

    return (
        <Card title={t('region_split_title')}>
            {regions.map(region => (
                <div className={styles.rowItem} key={region.id}>
                    <span className={styles.rowName}>{region.name}</span>
                    <span className={`${styles.rowValue} tnum`}>
                        {formatCompactCount(region.impressions)} · {formatPercent(region.share, 0)}
                    </span>
                    <span className={styles.rowBar}>
                        <MiniBar
                            value={(region.impressions / max) * 100}
                            width='100%'
                            label={region.name}
                        />
                    </span>
                    <span className={`${styles.rowSub} tnum`}>
                        {t('scans')}: {formatNumber(region.scans)}
                    </span>
                </div>
            ))}
        </Card>
    );
};

export default RegionBreakdown;
