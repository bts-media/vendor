import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Card, EmptyTable, StatusBadge } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import useWindowSize from '~hooks/useWindowSize';
import { InvoiceType } from '~services/finance/type';
import { formatDate, formatNumber } from '~utils/helpers';
import styles from '../Finance.module.css';

interface InvoicesTableProps {
    invoices: InvoiceType[];
    isLoading: boolean;
}

const InvoicesTable = ({ invoices, isLoading }: InvoicesTableProps) => {
    const { t } = useLanguage();
    const { isMobile } = useWindowSize();

    const columns: ColumnsType<InvoiceType> = [
        {
            title: t('invoice_no'),
            key: 'number',
            render: (_, record) => <span className={styles.cellStrong}>{record.number}</span>,
        },
        { title: t('period'), dataIndex: 'period', key: 'period', responsive: ['md'] },
        {
            title: t('net_amount'),
            key: 'net',
            align: 'right',
            responsive: ['lg'],
            render: (_, record) => <span className='tnum'>{formatNumber(record.net)}</span>,
        },
        {
            title: t('vat'),
            key: 'vat',
            align: 'right',
            responsive: ['lg'],
            render: (_, record) => <span className='tnum'>{formatNumber(record.vat)}</span>,
        },
        {
            title: t('gross_amount'),
            key: 'gross',
            align: 'right',
            render: (_, record) => (
                <span className={`${styles.cellStrong} tnum`}>{formatNumber(record.gross)}</span>
            ),
        },
        {
            title: t('due_date'),
            key: 'dueDate',
            responsive: ['md'],
            render: (_, record) => <span className='tnum'>{formatDate(record.dueDate)}</span>,
        },
        {
            title: t('status'),
            key: 'status',
            width: 150,
            render: (_, record) => <StatusBadge status={record.status} />,
        },
    ];

    return (
        <Card
            className={styles.section}
            title={t('invoices')}
            extra={<span className={styles.headNote}>{t('vat_included_note')}</span>}
        >
            <Table<InvoiceType>
                columns={columns}
                dataSource={invoices}
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

export default InvoicesTable;
