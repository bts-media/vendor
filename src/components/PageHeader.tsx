import { Button } from 'antd';
import { Plus, RefreshCw } from 'lucide-react';
import { ReactNode } from 'react';
import useLanguage from '~hooks/useLanguage';
import useWindowSize from '~hooks/useWindowSize';
import { cn } from '~utils/cn';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    /** Yangilash tugmasini ko'rsatish */
    refreshButton?: boolean;
    onRefresh?: () => void;
    isRefreshing?: boolean;
    /** Asosiy amal tugmasi (brend CTA) */
    isBtnIsVisible?: boolean;
    buttonText?: string;
    handleClick?: () => void;
    /** Qidiruv/filtr kabi qo'shimcha elementlar */
    extra?: ReactNode;
}

/** Sahifa sarlavhasi (mockup: .page-head) */
const PageHeader = ({
    title,
    subtitle,
    refreshButton,
    onRefresh,
    isRefreshing,
    isBtnIsVisible,
    buttonText,
    handleClick,
    extra,
}: PageHeaderProps) => {
    const { t } = useLanguage();
    const { isMobile } = useWindowSize();

    return (
        <div className={styles.header}>
            <div>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.desc}>{subtitle}</p>}
            </div>

            <div className={styles.actions}>
                {extra}

                {refreshButton && (
                    <Button
                        size={isMobile ? 'small' : 'middle'}
                        onClick={onRefresh}
                        icon={<RefreshCw size={16} className={cn(isRefreshing && styles.spinning)} />}
                    >
                        {!isMobile && t('refresh')}
                    </Button>
                )}

                {isBtnIsVisible && (
                    <Button
                        type='primary'
                        size={isMobile ? 'small' : 'middle'}
                        icon={<Plus size={16} strokeWidth={2.2} />}
                        onClick={handleClick}
                    >
                        {buttonText ?? t('add')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
