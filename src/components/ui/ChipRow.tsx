import { cn } from '~utils/cn';
import styles from './ChipRow.module.css';

export interface ChipItem {
    key: string;
    label: string;
}

interface ChipRowProps {
    items: ChipItem[];
    activeKey?: string;
    onSelect: (key: string) => void;
}

/** Tez filtr chiplari (mockup: .chip-row) */
const ChipRow = ({ items, activeKey, onSelect }: ChipRowProps) => (
    <div className={styles.row}>
        {items.map(({ key, label }) => (
            <button
                key={key}
                type='button'
                className={cn(styles.chip, key === activeKey && styles.active)}
                onClick={() => onSelect(key)}
                aria-pressed={key === activeKey}
            >
                {label}
            </button>
        ))}
    </div>
);

export default ChipRow;
