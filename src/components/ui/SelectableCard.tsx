import { Check } from 'lucide-react';
import { ReactNode } from 'react';
import { BadgeTone } from '~theme/index';
import { cn } from '~utils/cn';
import styles from './SelectableCard.module.css';

const TONE_STYLE: Record<BadgeTone, { background: string; color: string }> = {
    teal: { background: 'var(--badge-teal-bg)', color: 'var(--badge-teal-fg)' },
    orange: { background: 'var(--badge-orange-bg)', color: 'var(--badge-orange-fg)' },
    sky: { background: 'var(--badge-sky-bg)', color: 'var(--badge-sky-fg)' },
    gray: { background: 'var(--badge-gray-bg)', color: 'var(--badge-gray-fg)' },
    danger: { background: 'var(--badge-danger-bg)', color: 'var(--badge-danger-fg)' },
};

interface SelectableCardProps {
    name: string;
    desc?: string;
    /** Kartaning butun eni bo'ylab eskiz (kreativ preview) — ikonka o'rniga */
    media?: ReactNode;
    icon?: ReactNode;
    tone?: BadgeTone;
    selected?: boolean;
    disabled?: boolean;
    /** "Tez kunda" kabi yorliq */
    soonLabel?: string;
    /** Qo'shimcha qator (masalan CPM) */
    meta?: ReactNode;
    onToggle?: () => void;
}

/** Kanal / to'lov usuli / kreativ tanlash kartasi (mockup: .channel-opt) */
const SelectableCard = ({
    name,
    desc,
    media,
    icon,
    tone = 'orange',
    selected,
    disabled,
    soonLabel,
    meta,
    onToggle,
}: SelectableCardProps) => (
    <button
        type='button'
        className={cn(styles.option, selected && styles.selected, disabled && styles.disabled)}
        onClick={disabled ? undefined : onToggle}
        disabled={disabled}
        aria-pressed={Boolean(selected)}
    >
        <span className={styles.check}>
            <Check size={12} strokeWidth={3} />
        </span>

        {media}

        {!media && icon && (
            <div className={styles.icon} style={TONE_STYLE[tone]}>
                {icon}
            </div>
        )}

        <div className={styles.name}>{name}</div>
        {desc && <div className={styles.desc}>{desc}</div>}
        {soonLabel && <span className={styles.soon}>{soonLabel}</span>}
        {meta && <div className={styles.meta}>{meta}</div>}
    </button>
);

export default SelectableCard;
