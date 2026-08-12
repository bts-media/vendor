import { Button, Flex, Form, Input, Modal, Segmented, Select, Upload } from 'antd';
import { UploadCloud } from 'lucide-react';
import { useEffect } from 'react';
import useLanguage from '~hooks/useLanguage';
import { useCampaigns } from '~services/campaigns';
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
    // Kreativ doim kampaniyaga biriktiriladi — backend `campaignId` ni talab qiladi
    const { allCampaigns, isLoading: isCampaignsLoading } = useCampaigns();

    useEffect(() => {
        if (open) form.setFieldsValue({ kind: 'parcel' });
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
                    name='campaignId'
                    label={t('campaign')}
                    rules={[{ required: true, message: t('required') }]}
                >
                    <Select
                        loading={isCampaignsLoading}
                        placeholder={t('campaign')}
                        options={allCampaigns.map(campaign => ({
                            value: campaign.id,
                            label: campaign.name,
                        }))}
                    />
                </Form.Item>

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
                    name='file'
                    label={t('creative_upload')}
                    valuePropName='file'
                    getValueFromEvent={event => event?.file}
                    rules={[{ required: true, message: t('required') }]}
                >
                    <Upload.Dragger
                        multiple={false}
                        showUploadList={{ showRemoveIcon: false }}
                        accept='image/png,image/jpeg,video/mp4'
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        <UploadCloud size={22} />
                        <div style={{ marginTop: 6, fontSize: 13 }}>{t('creative_upload_hint')}</div>
                    </Upload.Dragger>
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
