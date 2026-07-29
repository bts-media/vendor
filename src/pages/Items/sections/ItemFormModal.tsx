import { Button, Flex, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { STATUS_OPTIONS } from '~constants/data';
import useLanguage from '~hooks/useLanguage';
import { CreateItemBody, ItemType } from '~services/items/type';

interface ItemFormModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: CreateItemBody) => void;
    loading: boolean;
    editingItem: ItemType | null;
}

const ItemFormModal = ({ open, onCancel, onSubmit, loading, editingItem }: ItemFormModalProps) => {
    const [form] = Form.useForm<CreateItemBody>();
    const { t } = useLanguage();
    const isEditing = Boolean(editingItem);

    useEffect(() => {
        if (!open) return;
        if (editingItem) {
            form.setFieldsValue({
                name: editingItem.name,
                description: editingItem.description,
                status: editingItem.status,
                price: editingItem.price,
                order: editingItem.order,
            });
        } else {
            form.setFieldsValue({ status: 'draft', order: 1 }); // create uchun default
        }
    }, [open, editingItem, form]);

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={isEditing ? t('item_edit') : t('item_add')}
            open={open}
            onCancel={handleCancel}
            footer={null} // footer'ni Form ichida o'zimiz chizamiz
            centered
            destroyOnHidden // eski qiymatlar qolib ketmasin
            width={480}
        >
            <Form form={form} layout='vertical' onFinish={onSubmit} autoComplete='off'>
                <Form.Item
                    name='name'
                    label={t('name')}
                    rules={[{ required: true, message: t('required') }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name='description' label={t('description')}>
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Flex gap={12}>
                    <Form.Item name='price' label={t('price')} style={{ flex: 1 }}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name='order'
                        label={t('order')}
                        style={{ flex: 1 }}
                        rules={[{ required: true, message: t('required') }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Flex>

                <Form.Item
                    name='status'
                    label={t('status')}
                    rules={[{ required: true, message: t('required') }]}
                >
                    <Select
                        options={STATUS_OPTIONS.map(({ value, label }) => ({
                            value,
                            label: t(label),
                        }))}
                    />
                </Form.Item>

                <Flex gap={8} justify='end'>
                    <Button onClick={handleCancel}>{t('cancel')}</Button>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        {isEditing ? t('save') : t('add')}
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
};

export default ItemFormModal;
