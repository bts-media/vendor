import { Segmented, Skeleton, Slider } from 'antd';
import { MessageSquare, Monitor, Package } from 'lucide-react';
import { ReactNode, useMemo } from 'react';
import { Card, ChipRow, RegionRow, SectionTitle, SelectableCard } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { ChannelKey } from '~services/campaigns/type';
import { ChannelOptionType, PricingType, RegionOptionType } from '~services/inventory/type';
import { BadgeTone } from '~theme/index';
import { formatCompactCount, formatNumber } from '~utils/helpers';
import styles from '../CampaignBuilder.module.css';
import { WizardState } from '../types';

const CHANNEL_ICON: Record<ChannelKey, ReactNode> = {
    parcel: <Package size={20} />,
    screen: <Monitor size={20} />,
    sms: <MessageSquare size={20} />,
};

const CHANNEL_TONE: Record<ChannelKey, BadgeTone> = {
    parcel: 'orange',
    screen: 'sky',
    sms: 'teal',
};

const DURATION_OPTIONS = [14, 30, 60];

interface TargetingStepProps {
    channels: ChannelOptionType[];
    regions: RegionOptionType[];
    pricing: PricingType;
    isLoading: boolean;
    state: WizardState;
    onChange: (patch: Partial<WizardState>) => void;
}

const TargetingStep = ({
    channels,
    regions,
    pricing,
    isLoading,
    state,
    onChange,
}: TargetingStepProps) => {
    const { t } = useLanguage();

    const toggleChannel = (key: ChannelKey) =>
        onChange({
            channels: state.channels.includes(key)
                ? state.channels.filter(item => item !== key)
                : [...state.channels, key],
        });

    const toggleRegion = (id: string) =>
        onChange({
            regions: state.regions.includes(id)
                ? state.regions.filter(item => item !== id)
                : [...state.regions, id],
        });

    /**
     * Chip faol bo'lishi joriy tanlovdan kelib chiqadi — alohida holat saqlanmaydi.
     * "Yirik hududlar" — hajmi bo'yicha yuqori uchtasi (backend shahar/viloyat
     * ajratmaydi, shuning uchun tanlov posilka oqimiga tayanadi).
     */
    const topRegionIds = useMemo(
        () =>
            [...regions]
                .sort((a, b) => b.monthlyVolume - a.monthlyVolume)
                .slice(0, 3)
                .map(region => region.id),
        [regions],
    );

    const activeChip = useMemo(() => {
        if (!state.regions.length) return 'none';
        if (state.regions.length === regions.length) return 'all';
        const isTopOnly =
            state.regions.length === topRegionIds.length &&
            topRegionIds.every(id => state.regions.includes(id));
        return isTopOnly ? 'cities' : 'custom';
    }, [state.regions, regions, topRegionIds]);

    const handleChip = (key: string) => {
        if (key === 'all') onChange({ regions: regions.map(region => region.id) });
        if (key === 'cities') onChange({ regions: topRegionIds });
        if (key === 'none') onChange({ regions: [] });
    };

    if (isLoading) {
        return (
            <Card padded>
                <Skeleton active paragraph={{ rows: 6 }} />
            </Card>
        );
    }

    return (
        <>
            <Card padded>
                <SectionTitle title={t('section_channels_title')} sub={t('section_channels_sub')} />
                <div className={styles.channelGrid}>
                    {channels.map(channel => (
                        <SelectableChannel
                            key={channel.key}
                            channel={channel}
                            selected={state.channels.includes(channel.key)}
                            onToggle={() => toggleChannel(channel.key)}
                        />
                    ))}
                </div>
            </Card>

            <Card padded>
                <SectionTitle title={t('target_regions')} sub={t('section_regions_sub')} />
                {regions.map(region => (
                    <RegionRow
                        key={region.id}
                        name={region.name}
                        volumeLabel={`${formatCompactCount(region.monthlyVolume)}/${t('per_month')}`}
                        share={region.share}
                        selected={state.regions.includes(region.id)}
                        onToggle={() => toggleRegion(region.id)}
                    />
                ))}
                <ChipRow
                    activeKey={activeChip}
                    onSelect={handleChip}
                    items={[
                        { key: 'all', label: t('chip_all_regions') },
                        { key: 'cities', label: t('chip_cities_only') },
                        { key: 'none', label: t('chip_clear') },
                    ]}
                />
            </Card>

            <Card padded>
                <SectionTitle title={t('impression_goal')} sub={t('section_goal_sub')} />

                <div className={styles.goalRow}>
                    <span className={`${styles.goalValue} tnum`}>{formatNumber(state.goal)}</span>
                    <span className={styles.goalUnit}>{t('verified_impressions')}</span>
                </div>

                <Slider
                    min={pricing.minGoal}
                    max={pricing.availableImpressions}
                    step={50_000}
                    value={state.goal}
                    onChange={goal => onChange({ goal })}
                    tooltip={{ formatter: value => formatNumber(value) }}
                />

                <div className={`${styles.goalScale} tnum`}>
                    <span>{formatCompactCount(pricing.minGoal)}</span>
                    <span>
                        {formatCompactCount(pricing.availableImpressions)} {t('available')}
                    </span>
                </div>

                <div className={styles.durationRow}>
                    <span className={styles.fieldLabel}>{t('duration')}</span>
                    <Segmented
                        value={state.days}
                        onChange={value => onChange({ days: Number(value) })}
                        options={DURATION_OPTIONS.map(days => ({
                            value: days,
                            label: `${days} ${t('days_short')}`,
                        }))}
                    />
                </div>
            </Card>
        </>
    );
};

/** Kanal kartasi — CPM meta qatori bilan */
const SelectableChannel = ({
    channel,
    selected,
    onToggle,
}: {
    channel: ChannelOptionType;
    selected: boolean;
    onToggle: () => void;
}) => {
    const { t } = useLanguage();

    return (
        <SelectableCard
            name={t(`channel_${channel.key}`)}
            desc={channel.description ?? t(`channel_${channel.key}_desc`)}
            icon={CHANNEL_ICON[channel.key]}
            tone={CHANNEL_TONE[channel.key]}
            selected={selected}
            disabled={channel.comingSoon}
            soonLabel={channel.comingSoon ? t('soon') : undefined}
            meta={
                channel.cpm > 0 ? (
                    <span className='tnum'>
                        {formatNumber(channel.cpm)} {t('currency')} · {t('cpm')}
                    </span>
                ) : undefined
            }
            onToggle={onToggle}
        />
    );
};

export default TargetingStep;
