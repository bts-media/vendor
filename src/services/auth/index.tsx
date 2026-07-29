import { useCreate } from '~api/index';
import { useNotify } from '~components/NotificationProvider';
import { urls } from '~constants/urls';
import { useAuthContext } from '~context/AuthProvider';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import { LoginBody, LoginResponseType } from './type';

export const useAuth = () => {
    const { t } = useLanguage();
    const notify = useNotify();
    const { login: setSession, logout } = useAuthContext();

    const { mutate, isLoading } = useCreate<LoginBody, LoginResponseType>(urls.auth.login);

    const login = (body: LoginBody, callback?: CallbackType) => {
        mutate(body, {
            onSuccess: res => {
                setSession({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    role: res.role,
                    vendorName: res.vendor?.name,
                });
                notify.success({ type: 'success', message: t('login_success') });
                callback?.();
            },
            onError: err =>
                notify.error({
                    type: 'error',
                    message: err?.response?.data?.message || t('login_error'),
                }),
        });
    };

    return { login, logout, isLoggingIn: isLoading };
};
