import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { Badge, Card, MiniBar } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { FinanceOverviewType } from '~services/finance/type';
import { formatCompactSum, formatNumber, formatPercent, formatSum } from '~utils/helpers';
import styles from '../Finance.module.css';

interface BalanceCardsProps {
    finance: FinanceOverviewType;
    onTopUp: () => void;
}

/** Gibrid billing (PRODUCT-SPEC §3.2): chapda prepaid balans, o'ngda postpaid kredit limiti. */
const BalanceCards = ({ finance, onTopUp }: BalanceCardsProps) => {
    const { t } = useLanguage();

    return (
        <div className={styles.topGrid}>
            <Card padded>
                <div className={styles.balanceHead}>
                    <span className={styles.balanceLabel}>{t('balance_prepaid')}</span>
                    <Badge tone='teal'>{t('prepaid')}</Badge>
                </div>

                <div className={`${styles.balanceValue} tnum`}>
                    {formatNumber(finance.balance)}
                    <span className={styles.balanceUnit}>{t('currency')}</span>
                </div>

                <div className={`${styles.balanceFoot} tnum`}>
                    {t('daily_burn')} ~{formatSum(finance.dailyBurn)}
                    {finance.estimatedDays !== null &&
                        ` · ${t('est_depletion')} ~${finance.estimatedDays} ${t('days_short')}`}
                </div>

                {/* Chiziq balansning past chegaraga nisbatini ko'rsatadi */}
                <div className={styles.bar}>
                    <MiniBar
                        value={
                            finance.lowThreshold > 0
                                ? Math.min(100, (finance.balance / (finance.lowThreshold * 4)) * 100)
                                : 100
                        }
                        tone={finance.balance <= finance.lowThreshold ? 'danger' : 'teal'}
                        width='100%'
                        thick
                    />
                </div>

                <Button
                    type='primary'
                    block
                    style={{ marginTop: 16 }}
                    icon={<Plus size={16} strokeWidth={2.2} />}
                    onClick={onTopUp}
                >
                    {t('top_up')}
                </Button>
            </Card>

            <Card padded>
                <div className={styles.balanceHead}>
                    <span className={styles.balanceLabel}>{t('credit_limit')}</span>
                    <Badge tone='orange'>{t('postpaid')}</Badge>
                </div>

                <div className={`${styles.balanceValue} tnum`}>
                    {formatCompactSum(finance.creditLimit)}
                    <span className={styles.balanceUnit}>{t('currency')}</span>
                </div>

                <div className={`${styles.balanceFoot} tnum`}>
                    {t('used')} {formatCompactSum(finance.creditUsed, true)} ·{' '}
                    {formatCompactSum(finance.creditRemaining, true)} {t('remaining')}
                </div>

                <div className={styles.bar}>
                    <MiniBar value={finance.creditShare} width='100%' thick />
                </div>

                <div className={`${styles.warning} tnum`}>
                    {formatPercent(finance.creditShare, 0)} — {t('limit_warning')}
                </div>
            </Card>
        </div>
    );
};

export default BalanceCards;
