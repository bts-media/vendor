import { Button } from 'antd';
import { SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import styles from './NotFound.module.css';

/**
 * antd `Result` ning tayyor illyustratsiyasi ishlatilmaydi — undagi ranglar
 * (ko'k/yashil) brendbukdan tashqarida. Sodda, brend tokenlariga tayangan blok.
 */
const NotFoundPage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <PageTitle title={t('not_found_title')} />

            <div className={styles.icon}>
                <SearchX size={26} />
            </div>

            <div>
                <div className={styles.code}>404</div>
                <div className={styles.title}>{t('not_found_title')}</div>
            </div>

            <p className={styles.subtitle}>{t('not_found_subtitle')}</p>

            <Button type='primary' onClick={() => navigate('/', { replace: true })}>
                {t('go_home')}
            </Button>
        </div>
    );
};

export default NotFoundPage;
