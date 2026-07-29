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
import { IAuthContextData, LoginPayload } from './types';

export const AuthContext = createContext({} as IAuthContextData);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => getLocalstorage('accessToken'));
    const [role, setRole] = useState<string | null>(() => getLocalstorage('role'));
    const [vendorName, setVendorName] = useState<string | null>(() =>
        getLocalstorage('vendorName'),
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
                setVendorName(null);
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
        if (payload.vendorName) setLocalstorage('vendorName', payload.vendorName);
        setToken(payload.accessToken);
        setRole(payload.role ?? null);
        setVendorName(payload.vendorName ?? null);
    }, []);

    const logout = useCallback(() => {
        clearLocalStorage();
        setToken(null);
        setRole(null);
        setVendorName(null);
    }, []);

    const value = useMemo<IAuthContextData>(
        () => ({
            isAuthenticated: Boolean(token),
            isChecking,
            role,
            vendorName,
            login,
            logout,
        }),
        [token, isChecking, role, vendorName, login, logout],
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
