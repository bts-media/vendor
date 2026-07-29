import { Descriptions, Segmented, Select } from 'antd';
import { PageHeader, PageTitle } from '~components/index';
import { LANGUAGES } from '~constants/data';
import { useAuthContext } from '~context/AuthProvider';
import { useThemeContext } from '~context/ThemeProvider';
import useLanguage from '~hooks/useLanguage';
import { LangType } from '~types/index';
import styles from './Settings.module.css';

const SettingsPage = () => {
    const { t, lang, setLang } = useLanguage();
    const { mode, setMode } = useThemeContext();
    const { vendorName, role } = useAuthContext();

    return (
        <div>
            <PageTitle title={t('settings')} />
            <PageHeader title={t('settings')} subtitle={t('settings_subtitle')} />

            <div className={styles.grid}>
                <section className='card'>
                    <h2 className={styles.sectionTitle}>{t('appearance')}</h2>

                    <div className={styles.row}>
                        <span className={styles.label}>{t('theme')}</span>
                        <Segmented
                            value={mode}
                            onChange={value => setMode(value as typeof mode)}
                            options={[
                                { value: 'light', label: t('theme_light') },
                                { value: 'dark', label: t('theme_dark') },
                            ]}
                        />
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>{t('interface_language')}</span>
                        <Select
                            value={lang}
                            onChange={value => setLang(value as LangType)}
                            options={LANGUAGES.map(({ value, label }) => ({ value, label }))}
                            style={{ width: 160 }}
                        />
                    </div>
                </section>

                <section className='card'>
                    <h2 className={styles.sectionTitle}>{t('account')}</h2>

                    <Descriptions column={1} size='small' colon={false}>
                        <Descriptions.Item label={t('vendor_name')}>
                            {vendorName ?? '—'}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('role')}>{role ?? '—'}</Descriptions.Item>
                    </Descriptions>
                </section>
            </div>
        </div>
    );
};

export default SettingsPage;
