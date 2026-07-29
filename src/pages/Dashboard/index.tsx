import { Eye, Package, PackageCheck, Wallet } from 'lucide-react';
import { ReactNode } from 'react';
import { PageHeader, PageTitle } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { formatNumber, formatPrice } from '~utils/helpers';
import styles from './Dashboard.module.css';

type StatCard = {
    id: number;
    labelKey: string;
    value: string;
    icon: ReactNode;
};

/**
 * Namunaviy ko'rsatkichlar. Backend tayyor bo'lgach `services/stats` hookini yozing
 * (`urls.stats.overview`) va shu massivni uning javobidan yig'ing.
 */
const STATS: StatCard[] = [
    { id: 1, labelKey: 'stat_items_total', value: formatNumber(128), icon: <Package size={16} /> },
    {
        id: 2,
        labelKey: 'stat_items_active',
        value: formatNumber(94),
        icon: <PackageCheck size={16} />,
    },
    { id: 3, labelKey: 'stat_views', value: formatNumber(48210), icon: <Eye size={16} /> },
    { id: 4, labelKey: 'stat_revenue', value: formatPrice(12450000), icon: <Wallet size={16} /> },
];

const DashboardPage = () => {
    const { t } = useLanguage();

    return (
        <div>
            <PageTitle title={t('dashboard')} />
            <PageHeader title={t('dashboard')} subtitle={t('dashboard_subtitle')} />

            <div className={styles.grid}>
                {STATS.map(({ id, labelKey, value, icon }) => (
                    <div key={id} className='card'>
                        <div className={styles.statLabel}>
                            {icon}
                            <span>{t(labelKey)}</span>
                        </div>
                        <div className={styles.statValue}>{value}</div>
                    </div>
                ))}
            </div>

            <p className={styles.hint}>{t('dashboard_hint')}</p>
        </div>
    );
};

export default DashboardPage;
