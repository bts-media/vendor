import { useEffect } from 'react';
import useLanguage from '~hooks/useLanguage';

/** Sahifa <title> ini boshqaradi: <PageTitle title={t('items')} /> */
const PageTitle = ({ title }: { title: string }) => {
    const { t } = useLanguage();

    useEffect(() => {
        document.title = `${title} — ${t('app_name')}`;
    }, [title, t]);

    return null;
};

export default PageTitle;
