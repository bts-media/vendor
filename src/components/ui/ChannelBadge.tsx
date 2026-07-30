import useLanguage from '~hooks/useLanguage';
import { ChannelKey } from '~services/campaigns/type';
import { toneOf } from '~theme/index';
import Badge from './Badge';

interface ChannelBadgeProps {
    channels: ChannelKey[];
}

/** Bir kanal — o'z toni bilan, bir nechtasi — "Ikkalasi". */
const ChannelBadge = ({ channels }: ChannelBadgeProps) => {
    const { t } = useLanguage();

    if (!channels.length) return <Badge tone='gray'>—</Badge>;
    if (channels.length > 1) return <Badge tone='gray'>{t('channel_both')}</Badge>;

    return <Badge tone={toneOf(channels[0])}>{t(`channel_${channels[0]}`)}</Badge>;
};

export default ChannelBadge;
