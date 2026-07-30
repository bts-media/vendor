import { ReactNode } from 'react';
import { BadgeTone } from '~theme/index';
import { cn } from '~utils/cn';
import styles from './Badge.module.css';

interface BadgeProps {
    tone?: BadgeTone;
    /** Chap tomondagi nuqta — holat indikatori sifatida */
    withDot?: boolean;
    children: ReactNode;
}

const Badge = ({ tone = 'gray', withDot = true, children }: BadgeProps) => (
    <span className={cn(styles.badge, styles[tone])}>
        {withDot && <span className={styles.dot} />}
        {children}
    </span>
);

export default Badge;
