import { useMockMutation } from '~api/mock';
import { useNotify } from '~components/NotificationProvider';
import { useAuthContext } from '~context/AuthProvider';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import { mockLogin } from './mock';
import { LoginBody, LoginResponseType } from './type';

export const useAuth = () => {
    const { t } = useLanguage();
    const notify = useNotify();
    const { login: setSession, logout } = useAuthContext();

    // Backend: useCreate<LoginBody, LoginResponseType>(urls.auth.login)
    const { mutate, isLoading } = useMockMutation<LoginBody, LoginResponseType>(mockLogin);

    const login = (body: LoginBody, callback?: CallbackType) => {
        mutate(body, {
            onSuccess: res => {
                setSession({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    role: res.role,
                    advertiserName: res.advertiser?.name,
                    billingType: res.advertiser?.billingType,
                });
                notify.success({ type: 'success', message: t('login_success') });
                callback?.();
            },
            onError: () => notify.error({ type: 'error', message: t('login_error') }),
        });
    };

    return { login, logout, isLoggingIn: isLoading };
};
