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
import { ensureValidAccessToken } from '~api/tokenManager';
import { clearLocalStorage, getLocalstorage, setLocalstorage } from '~utils/helpers';
import { BillingType, IAuthContextData, LoginPayload } from './types';

export const AuthContext = createContext({} as IAuthContextData);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => getLocalstorage('accessToken'));
    const [role, setRole] = useState<string | null>(() => getLocalstorage('role'));
    const [advertiserName, setAdvertiserName] = useState<string | null>(() =>
        getLocalstorage('advertiserName'),
    );
    const [billingType, setBillingType] = useState<BillingType>(
        () => (getLocalstorage('billingType') as BillingType) || 'postpaid',
    );
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const valid = await ensureValidAccessToken();
            if (cancelled) return;
            if (!valid) {
                clearLocalStorage();
                setRole(null);
                setAdvertiserName(null);
            }
            setToken(valid);
            setIsChecking(false);
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const login = useCallback((payload: LoginPayload) => {
        setLocalstorage('accessToken', payload.accessToken);
        setLocalstorage('refreshToken', payload.refreshToken);
        if (payload.role) setLocalstorage('role', payload.role);
        if (payload.advertiserName) setLocalstorage('advertiserName', payload.advertiserName);
        if (payload.billingType) setLocalstorage('billingType', payload.billingType);
        setToken(payload.accessToken);
        setRole(payload.role ?? null);
        setAdvertiserName(payload.advertiserName ?? null);
        setBillingType(payload.billingType ?? 'postpaid');
    }, []);

    const logout = useCallback(() => {
        clearLocalStorage();
        setToken(null);
        setRole(null);
        setAdvertiserName(null);
    }, []);

    const value = useMemo<IAuthContextData>(
        () => ({
            isAuthenticated: Boolean(token),
            isChecking,
            role,
            advertiserName,
            billingType,
            login,
            logout,
        }),
        [token, isChecking, role, advertiserName, billingType, login, logout],
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
