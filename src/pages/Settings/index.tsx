import { Descriptions, Segmented, Select } from 'antd';
import { Badge, Card, PageHeader, PageTitle, SectionTitle } from '~components/index';
import { LANGUAGES } from '~constants/data';
import { useAuthContext } from '~context/AuthProvider';
import { useThemeContext } from '~context/ThemeProvider';
import useLanguage from '~hooks/useLanguage';
import { LangType } from '~types/index';
import styles from './Settings.module.css';

const SettingsPage = () => {
    const { t, lang, setLang } = useLanguage();
    const { mode, setMode } = useThemeContext();
    const { advertiserName, role, billingType } = useAuthContext();

    return (
        <div>
            <PageTitle title={t('settings')} />
            <PageHeader title={t('settings')} subtitle={t('settings_desc')} />

            <div className={styles.grid}>
                <Card padded>
                    <SectionTitle title={t('appearance')} />

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
                </Card>

                <Card padded>
                    <SectionTitle title={t('account')} />

                    <Descriptions column={1} size='small' colon={false}>
                        <Descriptions.Item label={t('advertiser_name')}>
                            {advertiserName ?? '—'}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('role')}>
                            {role ? t('portal_name') : '—'}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('billing_type')}>
                            <Badge tone={billingType === 'prepaid' ? 'teal' : 'orange'}>
                                {t(billingType)}
                            </Badge>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        </div>
    );
};

export default SettingsPage;
