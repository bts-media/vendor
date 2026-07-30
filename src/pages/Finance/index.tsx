import { Button, Skeleton } from 'antd';
import { AlertTriangle, Clock, Download, Info, Wallet } from 'lucide-react';
import { useRef } from 'react';
import { PageHeader, PageTitle, StatCard } from '~components/index';
import { useNotify } from '~components/NotificationProvider';
import useLanguage from '~hooks/useLanguage';
import { useFinance } from '~services/finance';
import { PaymentMethodKey } from '~services/finance/type';
import { formatCompactSum } from '~utils/helpers';
import styles from './Finance.module.css';
import BalanceCards from './sections/BalanceCards';
import InvoicesTable from './sections/InvoicesTable';
import PaymentsTable from './sections/PaymentsTable';
import TopUpCard from './sections/TopUpCard';

const FinancePage = () => {
    const { t } = useLanguage();
    const notify = useNotify();
    const topUpRef = useRef<HTMLDivElement>(null);
    const { finance, invoices, payments, isLoading, refetchFinance, topUp, isToppingUp } =
        useFinance();

    const handleTopUp = (method: PaymentMethodKey, amount: number) => topUp({ method, amount });

    return (
        <div>
            <PageTitle title={t('finance')} />

            <PageHeader
                title={t('finance')}
                subtitle={t('finance_desc')}
                refreshButton
                onRefresh={refetchFinance}
                isRefreshing={isLoading}
                extra={
                    <Button
                        icon={<Download size={16} />}
                        onClick={() =>
                            // Eksport backend tayyor bo'lganda urls.finance.invoices ga ulanadi
                            notify.info({ type: 'info', message: t('soon') })
                        }
                    >
                        {t('download_invoices')}
                    </Button>
                }
            />

            {isLoading || !finance ? (
                <Skeleton active paragraph={{ rows: 8 }} />
            ) : (
                <>
                    <BalanceCards
                        finance={finance}
                        onTopUp={() =>
                            topUpRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }
                    />

                    <div className={styles.kpiGrid}>
                        <StatCard
                            label={`${t('total_spend')} (2026)`}
                            value={formatCompactSum(finance.totalSpend)}
                            unit={t('currency')}
                            icon={<Wallet size={15} />}
                            tone='teal'
                            foot={t('total_spend_foot')}
                        />
                        <StatCard
                            label={t('outstanding')}
                            value={formatCompactSum(finance.outstanding)}
                            unit={t('currency')}
                            icon={<AlertTriangle size={15} />}
                            tone='orange'
                            foot={`${finance.outstandingCount} ${t('outstanding_foot')}`}
                        />
                        <StatCard
                            label={t('overdue_amount')}
                            value={formatCompactSum(finance.overdue)}
                            unit={t('currency')}
                            icon={<Clock size={15} />}
                            tone='danger'
                            footAccent
                            foot={`${finance.overdueInvoiceNumber} · ${finance.overduePeriod}`}
                        />
                    </div>

                    <div ref={topUpRef}>
                        <TopUpCard isLoading={isToppingUp} onSubmit={handleTopUp} />
                    </div>

                    <InvoicesTable invoices={invoices} isLoading={isLoading} />
                    <PaymentsTable payments={payments} isLoading={isLoading} />

                    <div className={styles.vatNote}>
                        <Info size={17} />
                        <span>{t('vat_note')}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default FinancePage;
