import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '~components/index';
import useLanguage from '~hooks/useLanguage';

const NotFoundPage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className='flex-center full-height' style={{ minHeight: '100vh' }}>
            <PageTitle title={t('not_found_title')} />

            <Result
                status='404'
                title={t('not_found_title')}
                subTitle={t('not_found_subtitle')}
                extra={
                    <Button type='primary' onClick={() => navigate('/', { replace: true })}>
                        {t('go_home')}
                    </Button>
                }
            />
        </div>
    );
};

export default NotFoundPage;
