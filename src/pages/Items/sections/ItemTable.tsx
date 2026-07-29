import { Button, Dropdown, Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { EmptyTable, StatusBadge, TextClamp } from '~components/index';
import { PAGE_SIZE_OPTIONS } from '~constants/data';
import useLanguage from '~hooks/useLanguage';
import useWindowSize from '~hooks/useWindowSize';
import { ItemType } from '~services/items/type';
import { formatDate, formatPrice } from '~utils/helpers';
import styles from '../Items.module.css';

interface ItemTableProps {
    data: ItemType[];
    loading: boolean;
    pagination: { total: number; limit: number; page: number };
    onChangePage: (pagination: TablePaginationConfig) => void;
    onView: (item: ItemType) => void;
    onEdit: (item: ItemType) => void;
    onDelete: (item: ItemType) => void;
}

const ItemTable = ({
    data,
    loading,
    pagination,
    onChangePage,
    onView,
    onEdit,
    onDelete,
}: ItemTableProps) => {
    const { t } = useLanguage();
    const { isMobile } = useWindowSize();

    const columns: ColumnsType<ItemType> = [
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <span className={styles.name}>{record.name}</span>,
        },
        {
            title: t('description'),
            dataIndex: 'description',
            key: 'description',
            responsive: ['lg'],
            render: (_, record) => <TextClamp text={record.description} />,
        },
        {
            title: t('price'),
            dataIndex: 'price',
            key: 'price',
            width: 160,
            responsive: ['md'],
            render: (_, record) => formatPrice(record.price),
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: 'status',
            width: 140,
            render: (_, record) => <StatusBadge status={record.status} />,
        },
        {
            title: t('created_at'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 130,
            responsive: ['md'],
            render: (_, record) => formatDate(record.createdAt),
        },
        {
            title: '',
            key: 'actions',
            width: 60,
            align: 'right',
            render: (_, record) => (
                <Dropdown
                    trigger={['click']}
                    menu={{
                        items: [
                            {
                                key: 'view',
                                label: t('view'),
                                icon: <Eye size={14} />,
                                onClick: () => onView(record),
                            },
                            {
                                key: 'edit',
                                label: t('edit'),
                                icon: <Pencil size={14} />,
                                onClick: () => onEdit(record),
                            },
                            { type: 'divider' },
                            {
                                key: 'delete',
                                label: t('delete'),
                                icon: <Trash2 size={14} />,
                                danger: true,
                                onClick: () => onDelete(record),
                            },
                        ],
                    }}
                >
                    <Button type='text' icon={<MoreHorizontal size={16} />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <div className={styles.tableCard}>
            <Table<ItemType>
                columns={columns}
                dataSource={data}
                rowKey='id'
                loading={loading}
                size={isMobile ? 'small' : 'middle'}
                scroll={{ x: 'max-content' }}
                locale={{ emptyText: <EmptyTable /> }}
                onChange={onChangePage}
                pagination={{
                    current: pagination.page,
                    pageSize: pagination.limit,
                    total: pagination.total,
                    showSizeChanger: true,
                    pageSizeOptions: PAGE_SIZE_OPTIONS,
                    size: isMobile ? 'small' : 'default',
                    style: { padding: '0 var(--space-4)' },
                }}
            />
        </div>
    );
};

export default ItemTable;
