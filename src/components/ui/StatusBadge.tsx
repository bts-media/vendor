import { useThemeContext } from '~context/ThemeProvider';
import useLanguage from '~hooks/useLanguage';
import { statusColors, statusColorsDark } from '~theme/index';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
    status: string;
    /** Tarjima kaliti sifatida ishlatilmasin desangiz — tayyor matn bering */
    label?: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
    const { t } = useLanguage();
    const { mode } = useThemeContext();

    const palette = mode === 'dark' ? statusColorsDark : statusColors;
    const colors = palette[status] ?? palette.draft;

    return (
        <span className={styles.badge} style={colors}>
            {label ?? t(status)}
        </span>
    );
};

export default StatusBadge;
