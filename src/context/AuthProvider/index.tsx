/* eslint-disable react-refresh/only-export-components -- context + provider + hook bitta faylda (§8) */
import { Spin } from 'antd';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Api } from '~api/axios';
import { ensureValidAccessToken } from '~api/tokenManager';
import { AdvertiserAccount, AdvertiserProfile } from '~api/types';
import { urls } from '~constants/urls';
import { clearLocalStorage, getLocalstorage, setLocalstorage } from '~utils/helpers';
import { BillingType, IAuthContextData, LoginPayload } from './types';

export const AuthContext = createContext({} as IAuthContextData);

export const useAuthContext = () => useContext(AuthContext);

const billingOf = (advertiser: AdvertiserAccount | null): BillingType =>
    advertiser?.billingMode?.name === 'PREPAID' ? 'prepaid' : 'postpaid';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => getLocalstorage('accessToken'));
    const [role, setRole] = useState<string | null>(() => getLocalstorage('role'));
    const [advertiser, setAdvertiser] = useState<AdvertiserAccount | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    /**
     * Mount'da token bor bo'lsa profil o'qiladi: hisob nomi, billing turi va balans
     * shundan keladi. Token yaroqsiz bo'lsa sessiya yopiladi.
     */
    useEffect(() => {
        let cancelled = false;

        (async () => {
            const valid = await ensureValidAccessToken();
            if (cancelled) return;

            if (!valid) {
                clearLocalStorage();
                setToken(null);
                setRole(null);
                setIsChecking(false);
                return;
            }

            try {
                const profile = (await Api.get(urls.auth.me)) as unknown as AdvertiserProfile;
                if (cancelled) return;
                setAdvertiser(profile.advertiser);
                setRole(profile.role);
                setToken(valid);
            } catch {
                if (!cancelled) {
                    clearLocalStorage();
                    setToken(null);
                }
            } finally {
                if (!cancelled) setIsChecking(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const login = useCallback((payload: LoginPayload) => {
        setLocalstorage('accessToken', payload.accessToken);
        setLocalstorage('refreshToken', payload.refreshToken);
        if (payload.role) setLocalstorage('role', payload.role);
        if (payload.advertiser) setLocalstorage('advertiserName', payload.advertiser.name);
        setToken(payload.accessToken);
        setRole(payload.role ?? null);
        setAdvertiser(payload.advertiser ?? null);
    }, []);

    const logout = useCallback(() => {
        // Serverdagi refresh tokenlarni ham bekor qilamiz; javobni kutmaymiz
        void Api.post(urls.auth.logout).catch(() => undefined);
        clearLocalStorage();
        setToken(null);
        setRole(null);
        setAdvertiser(null);
    }, []);

    const value = useMemo<IAuthContextData>(
        () => ({
            isAuthenticated: Boolean(token),
            isChecking,
            role,
            advertiser,
            advertiserName: advertiser?.name ?? getLocalstorage('advertiserName'),
            billingType: billingOf(advertiser),
            login,
            logout,
        }),
        [token, isChecking, role, advertiser, login, logout],
    );

    if (isChecking) {
        return (
            <div className='flex-center full-height'>
                <Spin size='large' />
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
