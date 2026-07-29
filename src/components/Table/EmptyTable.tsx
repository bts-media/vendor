import { Empty } from 'antd';
import useLanguage from '~hooks/useLanguage';

const EmptyTable = ({ description }: { description?: string }) => {
    const { t } = useLanguage();

    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={description ?? t('no_data')}
            style={{ padding: 'var(--space-8) 0' }}
        />
    );
};

export default EmptyTable;
