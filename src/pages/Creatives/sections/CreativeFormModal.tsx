import { Button, Flex, Form, Input, Modal, Segmented } from 'antd';
import { useEffect } from 'react';
import useLanguage from '~hooks/useLanguage';
import { CreateCreativeBody } from '~services/creatives/type';

interface CreativeFormModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onSubmit: (values: CreateCreativeBody) => void;
}

const CreativeFormModal = ({ open, loading, onCancel, onSubmit }: CreativeFormModalProps) => {
    const [form] = Form.useForm<CreateCreativeBody>();
    const { t } = useLanguage();

    useEffect(() => {
        if (open) form.setFieldsValue({ kind: 'parcel', badge: '' });
    }, [open, form]);

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={t('creative_add')}
            open={open}
            onCancel={handleCancel}
            footer={null}
            centered
            destroyOnHidden
            width={460}
        >
            <Form form={form} layout='vertical' onFinish={onSubmit} autoComplete='off'>
                <Form.Item
                    name='name'
                    label={t('creative_name_field')}
                    rules={[{ required: true, message: t('required') }]}
                >
                    <Input maxLength={60} />
                </Form.Item>

                <Form.Item name='kind' label={t('creative_type')}>
                    <Segmented
                        options={[
                            { value: 'parcel', label: t('creative_type_parcel') },
                            { value: 'screen', label: t('creative_type_screen') },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name='badge'
                    label={t('creative_preview_label')}
                    rules={[{ required: true, message: t('required') }]}
                >
                    <Input maxLength={12} placeholder='−20%' />
                </Form.Item>

                <p
                    style={{
                        fontSize: 12,
                        color: 'var(--text-subtle)',
                        marginBottom: 16,
                        lineHeight: 1.4,
                    }}
                >
                    {t('creative_moderation_note')}
                </p>

                <Flex gap={8} justify='end'>
                    <Button onClick={handleCancel}>{t('cancel')}</Button>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        {t('add')}
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
};

export default CreativeFormModal;
