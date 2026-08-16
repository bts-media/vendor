import { Alert, Button, Form, Input } from 'antd';
import { Lock } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageTitle } from '~components/index';
import { useThemeContext } from '~context/ThemeProvider';
import useLanguage from '~hooks/useLanguage';
import { useAcceptInvite } from '~services/auth';
import styles from '../Login/Login.module.css';

/** Backend `assertPasswordPolicy` bilan bir xil: 12+ belgi, kichik, katta harf va raqam. */
const PASSWORD_MIN_LENGTH = 12;
const PASSWORD_CLASSES = [/\p{Ll}/u, /\p{Lu}/u, /\d/];

type FormValues = { password: string; confirm: string };

/**
 * Taklif havolasi: `/accept-invite?token=…`
 *
 * Token BTS menejeri mijoz kartochkasida yaratganda bir marta ko'rsatiladi va
 * havola orqali mijozga yetkaziladi. Mijoz shu yerda o'z parolini qo'yadi —
 * parol hech qachon menejerdan o'tmaydi.
 */
const AcceptInvitePage = () => {
    const { t } = useLanguage();
    const { mode } = useThemeContext();
    const [params] = useSearchParams();
    const { acceptInvite, isAccepting } = useAcceptInvite();

    const token = params.get('token') ?? '';

    return (
        <div className={styles.wrapper}>
            <PageTitle title={t('accept_invite_title')} />

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

                <h1 className={styles.title}>{t('accept_invite_title')}</h1>
                <p className={styles.subtitle}>{t('accept_invite_subtitle')}</p>

                {!token ? (
                    <Alert type='error' showIcon message={t('invite_token_missing')} />
                ) : (
                    <Form<FormValues>
                        layout='vertical'
                        onFinish={values => acceptInvite({ token, password: values.password })}
                        requiredMark={false}
                    >
                        <Form.Item
                            name='password'
                            label={t('new_password')}
                            rules={[
                                { required: true, message: t('required') },
                                {
                                    min: PASSWORD_MIN_LENGTH,
                                    message: t('password_too_short'),
                                },
                                {
                                    validator: (_, value: string) =>
                                        !value || PASSWORD_CLASSES.every(rule => rule.test(value))
                                            ? Promise.resolve()
                                            : Promise.reject(new Error(t('password_too_weak'))),
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<Lock size={16} color='var(--text-subtle)' />}
                                size='large'
                                autoComplete='new-password'
                            />
                        </Form.Item>

                        <Form.Item
                            name='confirm'
                            label={t('confirm_password')}
                            dependencies={['password']}
                            rules={[
                                { required: true, message: t('required') },
                                ({ getFieldValue }) => ({
                                    validator: (_, value: string) =>
                                        !value || value === getFieldValue('password')
                                            ? Promise.resolve()
                                            : Promise.reject(new Error(t('password_mismatch'))),
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<Lock size={16} color='var(--text-subtle)' />}
                                size='large'
                                autoComplete='new-password'
                            />
                        </Form.Item>

                        <Button
                            type='primary'
                            htmlType='submit'
                            size='large'
                            block
                            loading={isAccepting}
                        >
                            {t('accept_invite_submit')}
                        </Button>
                    </Form>
                )}

                <div className={styles.hint}>{t('accept_invite_hint')}</div>
            </div>
        </div>
    );
};

export default AcceptInvitePage;
