import { Modal, TablePaginationConfig } from 'antd';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader, PageTitle, SearchInput } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import useModalState from '~hooks/useModalState';
import { useItems } from '~services/items';
import { CreateItemBody, ItemType } from '~services/items/type';
import ItemFormModal from './sections/ItemFormModal';
import ItemTable from './sections/ItemTable';

/**
 * Sahifa — orkestrator: service hookini chaqiradi, holat va handlerlarni boshqaradi,
 * bo'laklarni prop bilan yig'adi. UI detallari `sections/` ichida.
 */
const ItemsPage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();
    const { open, onOpen, onClose } = useModalState();
    const [editingItem, setEditingItem] = useState<ItemType | null>(null);

    const {
        itemsData,
        pagination,
        isLoading,
        refetchItems,
        createItem,
        updateItem,
        deleteItem,
        isCreating,
        isUpdating,
    } = useItems();

    // Sahifalash holati URL query-string'da — refresh/link ulashish to'g'ri ishlaydi
    const handleChangePage = (p: TablePaginationConfig) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set('page', String(p.current ?? 1));
            next.set('limit', String(p.pageSize ?? pagination.limit));
            return next;
        });
    };

    const handleOpenCreate = () => {
        setEditingItem(null);
        onOpen();
    };

    const handleEdit = (item: ItemType) => {
        setEditingItem(item);
        onOpen();
    };

    const handleCloseModal = () => {
        onClose();
        setEditingItem(null);
    };

    const handleSubmit = (values: CreateItemBody) => {
        if (editingItem) updateItem(editingItem.id, values, handleCloseModal);
        else createItem(values, handleCloseModal);
    };

    const handleDelete = (item: ItemType) => {
        Modal.confirm({
            title: t('item_delete_confirm'),
            content: item.name,
            okText: t('delete'),
            okType: 'danger',
            cancelText: t('cancel'),
            centered: true,
            onOk: () => deleteItem(item.id),
        });
    };

    return (
        <div>
            <PageTitle title={t('items')} />

            <PageHeader
                title={t('items')}
                subtitle={t('items_subtitle')}
                refreshButton
                onRefresh={refetchItems}
                isRefreshing={isLoading}
                isBtnIsVisible
                buttonText={t('item_add')}
                handleClick={handleOpenCreate}
                extra={<SearchInput placeholder={t('item_search_placeholder')} />}
            />

            <ItemTable
                data={itemsData}
                loading={isLoading}
                pagination={pagination}
                onChangePage={handleChangePage}
                onView={item => navigate(`/items/${item.id}`)}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ItemFormModal
                open={open}
                onCancel={handleCloseModal}
                onSubmit={handleSubmit}
                loading={isCreating || isUpdating}
                editingItem={editingItem}
            />
        </div>
    );
};

export default ItemsPage;
