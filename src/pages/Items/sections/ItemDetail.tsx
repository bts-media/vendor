import { Button, Descriptions, Result, Skeleton } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, PageTitle, StatusBadge } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { useItemDetail } from '~services/items';
import { formatDateTime, formatPrice } from '~utils/helpers';
import styles from '../Items.module.css';

const ItemDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { item, isLoading } = useItemDetail(id);

    const backButton = (
        <Button icon={<ArrowLeft size={16} />} onClick={() => navigate('/items')}>
            {t('back')}
        </Button>
    );

    if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

    if (!item) {
        return (
            <Result
                status='404'
                title={t('item_not_found')}
                extra={
                    <Button type='primary' onClick={() => navigate('/items')}>
                        {t('back')}
                    </Button>
                }
            />
        );
    }

    return (
        <div>
            <PageTitle title={item.name} />
            <PageHeader title={item.name} subtitle={t('item_detail')} extra={backButton} />

            <div className={styles.detailGrid}>
                <section className='card'>
                    <Descriptions column={1} size='small' colon={false}>
                        <Descriptions.Item label={t('status')}>
                            <StatusBadge status={item.status} />
                        </Descriptions.Item>
                        <Descriptions.Item label={t('price')}>
                            {formatPrice(item.price)}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('order')}>{item.order}</Descriptions.Item>
                        <Descriptions.Item label={t('created_at')}>
                            {formatDateTime(item.createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('updated_at')}>
                            {formatDateTime(item.updatedAt)}
                        </Descriptions.Item>
                    </Descriptions>
                </section>

                <section className='card'>
                    <Descriptions column={1} size='small' colon={false}>
                        <Descriptions.Item label={t('description')}>
                            {item.description || '—'}
                        </Descriptions.Item>
                    </Descriptions>
                </section>
            </div>
        </div>
    );
};

export default ItemDetailPage;
