import { Check } from 'lucide-react';
import { cn } from '~utils/cn';
import MiniBar from './MiniBar';
import styles from './RegionRow.module.css';

interface RegionRowProps {
    name: string;
    /** "82K/oy" kabi tayyor matn */
    volumeLabel: string;
    /** 0–100 — eng katta hududga nisbatan ulush */
    share: number;
    selected?: boolean;
    onToggle: () => void;
}

/** Hudud tanlash qatori (mockup: .region-row) */
const RegionRow = ({ name, volumeLabel, share, selected, onToggle }: RegionRowProps) => (
    <button
        type='button'
        className={cn(styles.row, selected && styles.selected)}
        onClick={onToggle}
        aria-pressed={Boolean(selected)}
    >
        <span className={styles.check}>
            <Check size={11} strokeWidth={3} />
        </span>
        <span className={styles.name}>{name}</span>
        <span className={cn(styles.volume, 'tnum')}>{volumeLabel}</span>
        <span className={styles.bar}>
            <MiniBar value={share} width={64} label={name} />
        </span>
    </button>
);

export default RegionRow;
