import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EmptyTable } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { useInvoiceDetail } from '~services/finance';
import { InvoiceLineType } from '~services/finance/type';
import { formatNumber } from '~utils/helpers';
import styles from '../Finance.module.css';

interface InvoiceLinesProps {
    invoiceId: string;
}

/** Hisob-faktura qatorlari — jadvalda qator ochilganda so'raladi (`GET /invoices/:id`). */
const InvoiceLines = ({ invoiceId }: InvoiceLinesProps) => {
    const { t } = useLanguage();
    const { lines, isLoading } = useInvoiceDetail(invoiceId);

    const columns: ColumnsType<InvoiceLineType> = [
        {
            title: t('campaign'),
            key: 'campaign',
            render: (_, record) => <span className={styles.cellStrong}>{record.campaign}</span>,
        },
        {
            title: t('placement'),
            key: 'placement',
            render: (_, record) => (record.placement ? t(`placement_${record.placement}`) : '—'),
        },
        {
            title: t('quantity'),
            key: 'quantity',
            align: 'right',
            render: (_, record) => <span className='tnum'>{formatNumber(record.quantity)}</span>,
        },
        {
            title: t('description'),
            key: 'description',
            responsive: ['md'],
            render: (_, record) => record.description ?? '—',
        },
        {
            title: t('unit_price'),
            key: 'unitPrice',
            align: 'right',
            render: (_, record) => <span className='tnum'>{formatNumber(record.unitPrice)}</span>,
        },
        {
            title: t('amount'),
            key: 'amount',
            align: 'right',
            render: (_, record) => (
                <span className={`${styles.cellStrong} tnum`}>{formatNumber(record.amount)}</span>
            ),
        },
    ];

    return (
        <Table<InvoiceLineType>
            columns={columns}
            dataSource={lines}
            rowKey='key'
            loading={isLoading}
            pagination={false}
            size='small'
            locale={{ emptyText: <EmptyTable /> }}
        />
    );
};

export default InvoiceLines;
