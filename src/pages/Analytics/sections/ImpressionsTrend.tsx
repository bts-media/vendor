import { Segmented, Tooltip } from 'antd';
import { Card } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { PeriodKey, TrendPointType } from '~services/analytics/type';
import { formatCompactCount, formatNumber } from '~utils/helpers';
import styles from '../Analytics.module.css';

interface ImpressionsTrendProps {
    trend: TrendPointType[];
    period: PeriodKey;
    onPeriodChange: (period: PeriodKey) => void;
}

/**
 * Kanal bo'yicha ko'rsatishlar — to'plamli ustunlar.
 * Ikki seriya: legenda doim ko'rinadi, qiymatlar tooltipda raqam bilan beriladi
 * (rang yolg'iz ma'no tashimaydi).
 */
const ImpressionsTrend = ({ trend, period, onPeriodChange }: ImpressionsTrendProps) => {
    const { t } = useLanguage();

    const max = Math.max(...trend.map(point => point.parcel + point.screen), 1);

    return (
        <Card
            title={t('trend_title')}
            extra={
                <>
                    <div className={styles.legend}>
                        <span className={styles.legendItem}>
                            <span
                                className={styles.legendSwatch}
                                style={{ background: 'var(--chart-parcel)' }}
                            />
                            {t('channel_parcel')}
                        </span>
                        <span className={styles.legendItem}>
                            <span
                                className={styles.legendSwatch}
                                style={{ background: 'var(--chart-screen)' }}
                            />
                            {t('channel_screen')}
                        </span>
                    </div>
                    <Segmented
                        size='small'
                        value={period}
                        onChange={value => onPeriodChange(value as PeriodKey)}
                        options={[
                            { value: '30d', label: t('period_30d') },
                            { value: '90d', label: t('period_90d') },
                            { value: 'year', label: t('period_year') },
                        ]}
                    />
                </>
            }
        >
            <div className={styles.chart}>
                {trend.map(point => {
                    const total = point.parcel + point.screen;
                    return (
                        <div className={styles.column} key={point.label}>
                            <div className={styles.stack} style={{ height: `${(total / max) * 100}%` }}>
                                <Tooltip
                                    title={`${t('channel_screen')}: ${formatNumber(point.screen)}`}
                                >
                                    <span
                                        className={`${styles.segment} ${styles.segmentTop}`}
                                        style={{
                                            height: `${(point.screen / total) * 100}%`,
                                            background: 'var(--chart-screen)',
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip
                                    title={`${t('channel_parcel')}: ${formatNumber(point.parcel)}`}
                                >
                                    <span
                                        className={styles.segment}
                                        style={{
                                            height: `${(point.parcel / total) * 100}%`,
                                            background: 'var(--chart-parcel)',
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            <span className={styles.columnLabel}>{point.label}</span>
                        </div>
                    );
                })}
            </div>

            <div className={styles.chartFooter}>
                <span>{t('trend_sub')}</span>
                <span className='tnum'>
                    {t('total')}: {formatCompactCount(trend.reduce((sum, p) => sum + p.parcel + p.screen, 0))}
                </span>
            </div>
        </Card>
    );
};

export default ImpressionsTrend;
