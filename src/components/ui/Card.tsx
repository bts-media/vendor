import { CSSProperties, ReactNode } from 'react';
import { cn } from '~utils/cn';
import styles from './Card.module.css';

interface CardProps {
    /** Sarlavha satri — berilsa chegara bilan ajratilgan head chiziladi */
    title?: ReactNode;
    /** Sarlavha o'ngidagi element (havola, filtr, izoh) */
    extra?: ReactNode;
    /** Ichki bo'shliq. Jadval joylashtirsangiz `false` bering. */
    padded?: boolean;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

const Card = ({ title, extra, padded = false, className, style, children }: CardProps) => (
    <div className={cn(styles.card, className)} style={style}>
        {(title || extra) && (
            <div className={styles.head}>
                {title && <div className={styles.title}>{title}</div>}
                {extra && <div className={styles.extra}>{extra}</div>}
            </div>
        )}
        <div className={cn(padded && styles.pad)}>{children}</div>
    </div>
);

interface SectionTitleProps {
    title: string;
    sub?: string;
}

/** Karta ichidagi bo'lim sarlavhasi (mockup: .section-title / .section-sub) */
export const SectionTitle = ({ title, sub }: SectionTitleProps) => (
    <>
        <div className={styles.sectionTitle}>{title}</div>
        {sub && <div className={styles.sectionSub}>{sub}</div>}
    </>
);

export default Card;
