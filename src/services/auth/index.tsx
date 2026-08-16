import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { Api } from '~api/axios';
import { ApiErrorBody } from '~api/types';
import { useNotify } from '~components/NotificationProvider';
import { urls } from '~constants/urls';
import { useAuthContext } from '~context/AuthProvider';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import { getApiErrorMessage } from '~utils/helpers';
import { AcceptInviteBody, LoginBody, LoginResponseType } from './type';

/**
 * Reklama beruvchi kirishi — `POST /advertiser/auth/login`.
 * Javob tokenlar bilan birga hisob ma'lumotini (nom, billing turi, balans)
 * qaytaradi, shuning uchun kirgandan keyin qo'shimcha profil so'rovi ketmaydi.
 */
export const useAuth = () => {
    const { t } = useLanguage();
    const notify = useNotify();
    const { login: setSession, logout } = useAuthContext();

    const { mutate, isLoading } = useMutation<
        LoginResponseType,
        AxiosError<ApiErrorBody>,
        LoginBody
    >(async body => (await Api.post(urls.auth.login, body)) as unknown as LoginResponseType);

    const login = (body: LoginBody, callback?: CallbackType) => {
        mutate(body, {
            onSuccess: res => {
                setSession({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    role: res.role,
                    advertiser: res.advertiser,
                });
                notify.success({ type: 'success', message: t('login_success') });
                callback?.();
            },
            onError: err =>
                notify.error({
                    type: 'error',
                    message: getApiErrorMessage(err, t('login_error')),
                }),
        });
    };

    return { login, logout, isLoggingIn: isLoading };
};

/**
 * Taklifni qabul qilish — `POST /advertiser/auth/accept-invite`.
 *
 * Havola BTS menejeri yaratgan bir martalik token bilan keladi. Mijoz o'z parolini
 * shu yerda qo'yadi va DARHOL sessiya ochiladi — javob login bilan bir xil shaklda
 * tokenlar va hisob ma'lumotini qaytaradi, shuning uchun qayta kirish so'ralmaydi.
 */
export const useAcceptInvite = () => {
    const { t } = useLanguage();
    const notify = useNotify();
    const { login: setSession } = useAuthContext();

    const { mutate, isLoading } = useMutation<
        LoginResponseType,
        AxiosError<ApiErrorBody>,
        AcceptInviteBody
    >(async body => (await Api.post(urls.auth.acceptInvite, body)) as unknown as LoginResponseType);

    const acceptInvite = (body: AcceptInviteBody, callback?: CallbackType) => {
        mutate(body, {
            onSuccess: res => {
                setSession({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    role: res.role,
                    advertiser: res.advertiser,
                });
                notify.success({ type: 'success', message: t('invite_accepted') });
                callback?.();
            },
            onError: err =>
                notify.error({
                    type: 'error',
                    message: getApiErrorMessage(err, t('invite_error')),
                }),
        });
    };

    return { acceptInvite, isAccepting: isLoading };
};
