import useLanguage from '~hooks/useLanguage';
import { toneOf } from '~theme/index';
import Badge from './Badge';

interface StatusBadgeProps {
    /** Backend qiymati: active | moderation | paid | overdue ... */
    status: string;
    /** Tayyor matn berilsa i18n kaliti ishlatilmaydi */
    label?: string;
}

/** Status → ton + tarjima. Kalit konvensiyasi: t(`status_${status}`) */
const StatusBadge = ({ status, label }: StatusBadgeProps) => {
    const { t } = useLanguage();

    return <Badge tone={toneOf(status)}>{label ?? t(`status_${status}`)}</Badge>;
};

export default StatusBadge;
