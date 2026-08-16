import { Button, Form, Input } from 'antd';
import { Lock, Mail } from 'lucide-react';
import { PageTitle } from '~components/index';
import { useThemeContext } from '~context/ThemeProvider';
import useLanguage from '~hooks/useLanguage';
import { useAuth } from '~services/auth';
import { LoginBody } from '~services/auth/type';
import styles from './Login.module.css';

const LoginPage = () => {
    const { t } = useLanguage();
    const { mode } = useThemeContext();
    const { login, isLoggingIn } = useAuth();

    return (
        <div className={styles.wrapper}>
            <PageTitle title={t('login')} />

            <div className={styles.card}>
                <div className={styles.brand}>
                    <img
                        className={styles.mark}
                        src={mode === 'dark' ? '/brand/mark-white.png' : '/brand/mark.png'}
                        alt='BTS Media'
                    />
                    <div>
                        <div className={styles.brandName}>{t('app_name')}</div>
                        <div className={styles.brandSub}>{t('portal_name')}</div>
                    </div>
                </div>

                <h1 className={styles.title}>{t('login_title')}</h1>
                <p className={styles.subtitle}>{t('login_subtitle')}</p>

                <Form<LoginBody>
                    layout='vertical'
                    onFinish={values => login(values)}
                    autoComplete='on'
                    requiredMark={false}
                >
                    <Form.Item
                        name='email'
                        label={t('username')}
                        rules={[
                            { required: true, message: t('required') },
                            { type: 'email', message: t('username') },
                        ]}
                    >
                        <Input
                            prefix={<Mail size={16} color='var(--text-subtle)' />}
                            size='large'
                            autoComplete='username'
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        label={t('password')}
                        rules={[{ required: true, message: t('required') }]}
                    >
                        <Input.Password
                            prefix={<Lock size={16} color='var(--text-subtle)' />}
                            size='large'
                            autoComplete='current-password'
                        />
                    </Form.Item>

                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        block
                        loading={isLoggingIn}
                    >
                        {t('login')}
                    </Button>
                </Form>

                {/* Backend ulanmagunicha demo rejimi */}
                <p className={styles.hint}>{t('login_demo_hint')}</p>
            </div>
        </div>
    );
};

export default LoginPage;
