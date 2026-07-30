import { cn } from '~utils/cn';
import styles from './MiniBar.module.css';

type BarTone = 'accent' | 'teal' | 'sky' | 'danger';

interface MiniBarProps {
    /** 0–100 */
    value: number;
    tone?: BarTone;
    width?: number | string;
    thick?: boolean;
    label?: string;
}

/** Sur'at / ulush chizig'i (mockup: .mini-bar) */
const MiniBar = ({ value, tone = 'accent', width = 90, thick, label }: MiniBarProps) => (
    <div
        className={cn(styles.track, thick && styles.thick)}
        style={{ width }}
        role='progressbar'
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
    >
        <span
            className={cn(styles.fill, tone !== 'accent' && styles[tone])}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
    </div>
);

export default MiniBar;
