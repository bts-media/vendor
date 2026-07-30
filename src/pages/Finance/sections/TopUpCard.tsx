import { Button, InputNumber } from 'antd';
import { useState } from 'react';
import { Card, SectionTitle, SelectableCard } from '~components/index';
import { PAYMENT_METHODS } from '~constants/data';
import useLanguage from '~hooks/useLanguage';
import { PaymentMethodKey } from '~services/finance/type';
import styles from '../Finance.module.css';

interface TopUpCardProps {
    isLoading: boolean;
    onSubmit: (method: PaymentMethodKey, amount: number) => void;
}

const DEFAULT_AMOUNT = 10_000_000;

const TopUpCard = ({ isLoading, onSubmit }: TopUpCardProps) => {
    const { t } = useLanguage();
    const [method, setMethod] = useState<PaymentMethodKey>('payme');
    const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);

    return (
        <Card padded className={styles.section}>
            <SectionTitle title={t('top_up_title')} sub={t('top_up_sub')} />

            <div className={styles.methodGrid}>
                {PAYMENT_METHODS.map(item => (
                    <SelectableCard
                        key={item.key}
                        name={t(item.labelKey)}
                        desc={t(item.descKey)}
                        icon={item.icon}
                        tone={item.key === 'bank' ? 'gray' : 'sky'}
                        selected={method === item.key}
                        onToggle={() => setMethod(item.key)}
                    />
                ))}
            </div>

            <div className={styles.topUpRow}>
                <div>
                    <div className={styles.fieldLabel}>{t('top_up_amount')}</div>
                    <InputNumber
                        value={amount}
                        onChange={value => setAmount(value ?? 0)}
                        min={100_000}
                        step={1_000_000}
                        style={{ width: 220 }}
                        // Kirituvchi maydonda ham probelli format (PRODUCT-SPEC §1)
                        formatter={value => String(value ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                        parser={value => Number(String(value ?? '').replace(/\s/g, '')) || 0}
                        addonAfter={t('currency')}
                    />
                </div>

                <Button
                    type='primary'
                    loading={isLoading}
                    disabled={!amount}
                    onClick={() => onSubmit(method, amount)}
                >
                    {t('top_up')}
                </Button>
            </div>
        </Card>
    );
};

export default TopUpCard;
