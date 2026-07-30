import { Card, ChannelBadge, MiniBar } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { ChannelPerfType } from '~services/analytics/type';
import { formatCompactCount, formatCompactSum, formatNumber, formatPercent } from '~utils/helpers';
import styles from '../Analytics.module.css';

interface ChannelPerformanceProps {
    channels: ChannelPerfType[];
}

/** Kanal kesimi — jadval ko'rinishi (barcha qiymatlar matn bilan). */
const ChannelPerformance = ({ channels }: ChannelPerformanceProps) => {
    const { t } = useLanguage();
    const maxImpressions = Math.max(...channels.map(channel => channel.impressions), 1);

    return (
        <Card title={t('channel_perf_title')}>
            {channels.map(channel => (
                <div className={styles.channelCard} key={channel.key}>
                    <div className={styles.channelHead}>
                        <ChannelBadge channels={[channel.key]} />
                        <MiniBar
                            value={(channel.impressions / maxImpressions) * 100}
                            tone={channel.key === 'screen' ? 'sky' : 'accent'}
                            width='100%'
                            label={t(`channel_${channel.key}`)}
                        />
                    </div>

                    <div className={styles.channelStats}>
                        <div>
                            <div className={styles.channelStatLabel}>{t('impressions')}</div>
                            <div className={`${styles.channelStatValue} tnum`}>
                                {formatCompactCount(channel.impressions)}
                            </div>
                        </div>
                        <div>
                            <div className={styles.channelStatLabel}>{t('scans')}</div>
                            <div className={`${styles.channelStatValue} tnum`}>
                                {formatNumber(channel.scans)}
                            </div>
                        </div>
                        <div>
                            <div className={styles.channelStatLabel}>{t('scan_rate')}</div>
                            <div className={`${styles.channelStatValue} tnum`}>
                                {formatPercent(channel.scanRate)}
                            </div>
                        </div>
                        <div>
                            <div className={styles.channelStatLabel}>{t('spend')}</div>
                            <div className={`${styles.channelStatValue} tnum`}>
                                {formatCompactSum(channel.spend)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Card>
    );
};

export default ChannelPerformance;
