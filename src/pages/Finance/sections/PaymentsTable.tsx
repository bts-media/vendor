import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Card, EmptyTable, StatusBadge } from '~components/index';
import { PAYMENT_METHODS } from '~constants/data';
import useLanguage from '~hooks/useLanguage';
import useWindowSize from '~hooks/useWindowSize';
import { PaymentType } from '~services/finance/type';
import { formatDate, formatSum } from '~utils/helpers';
import styles from '../Finance.module.css';

interface PaymentsTableProps {
    payments: PaymentType[];
    isLoading: boolean;
}

const PaymentsTable = ({ payments, isLoading }: PaymentsTableProps) => {
    const { t } = useLanguage();
    const { isMobile } = useWindowSize();

    const columns: ColumnsType<PaymentType> = [
        {
            title: t('date'),
            key: 'date',
            render: (_, record) => (
                <div>
                    <div className={`${styles.cellStrong} tnum`}>{formatDate(record.date)}</div>
                    <div className={styles.cellSub}>
                        {record.invoiceNumber
                            ? `${record.invoiceNumber} ${t('payment_for_invoice')}`
                            : t(record.subtitleKey ?? 'payment_top_up')}
                    </div>
                </div>
            ),
        },
        {
            title: t('payment_method'),
            key: 'method',
            responsive: ['md'],
            render: (_, record) =>
                t(PAYMENT_METHODS.find(item => item.key === record.method)?.labelKey ?? '—'),
        },
        {
            title: t('payment_amount'),
            key: 'amount',
            align: 'right',
            render: (_, record) => (
                <span className={`${styles.cellStrong} tnum`}>{formatSum(record.amount)}</span>
            ),
        },
        {
            title: t('status'),
            key: 'status',
            width: 160,
            render: (_, record) => <StatusBadge status={record.status} />,
        },
    ];

    return (
        <Card className={styles.section} title={t('payments_history')}>
            <Table<PaymentType>
                columns={columns}
                dataSource={payments}
                rowKey='id'
                loading={isLoading}
                pagination={false}
                size={isMobile ? 'small' : 'middle'}
                scroll={{ x: 'max-content' }}
                locale={{ emptyText: <EmptyTable /> }}
            />
        </Card>
    );
};

export default PaymentsTable;
