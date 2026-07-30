import { ReactNode } from 'react';
import { BadgeTone } from '~theme/index';
import { cn } from '~utils/cn';
import styles from './StatCard.module.css';

/** Ikonka foni va rangi — brend tonlaridan (DESIGN-SYSTEM: 500 to'ldirish, 700 matn) */
const TONE_STYLE: Record<BadgeTone, { background: string; color: string }> = {
    teal: { background: 'var(--badge-teal-bg)', color: 'var(--badge-teal-fg)' },
    orange: { background: 'var(--badge-orange-bg)', color: 'var(--badge-orange-fg)' },
    sky: { background: 'var(--badge-sky-bg)', color: 'var(--badge-sky-fg)' },
    gray: { background: 'var(--badge-gray-bg)', color: 'var(--badge-gray-fg)' },
    danger: { background: 'var(--badge-danger-bg)', color: 'var(--badge-danger-fg)' },
};

interface StatCardProps {
    label: string;
    value: ReactNode;
    /** Qiymatdan keyingi kichik birlik ("so'm") */
    unit?: string;
    icon?: ReactNode;
    tone?: BadgeTone;
    foot?: ReactNode;
    /** Izohni urg'uli (orange) ko'rsatish — ogohlantirish holatida */
    footAccent?: boolean;
    /** Sarlavha o'ngidagi ikonka o'rniga badge qo'yish */
    topRight?: ReactNode;
    children?: ReactNode;
}

const StatCard = ({
    label,
    value,
    unit,
    icon,
    tone = 'gray',
    foot,
    footAccent,
    topRight,
    children,
}: StatCardProps) => (
    <div className={styles.stat}>
        <div className={styles.top}>
            <span className={styles.label}>{label}</span>
            {topRight ?? (icon && <div className={styles.icon} style={TONE_STYLE[tone]}>{icon}</div>)}
        </div>

        <div className={cn(styles.value, 'tnum')}>
            {value}
            {unit && <span className={styles.unit}>{unit}</span>}
        </div>

        {foot && <div className={cn(styles.foot, footAccent && styles.footAccent)}>{foot}</div>}
        {children && <div className={styles.bar}>{children}</div>}
    </div>
);

export default StatCard;
