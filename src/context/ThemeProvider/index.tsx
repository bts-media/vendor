/* eslint-disable react-refresh/only-export-components -- context + provider + hook bitta faylda (§8) */
import { ConfigProvider, theme as antdTheme } from 'antd';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { appTheme, darkTheme } from '~theme/index';
import { IThemeContextData, ThemeMode } from './types';

export const ThemeContext = createContext({} as IThemeContextData);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') return stored;
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', mode);
        document.body.setAttribute('data-theme', mode); // ← CSS shu atributga tayanadi
    }, [mode]);

    return (
        <ThemeContext.Provider
            value={{ mode, setMode, toggle: () => setMode(m => (m === 'dark' ? 'light' : 'dark')) }}
        >
            <ConfigProvider
                theme={{
                    ...(mode === 'dark' ? darkTheme : appTheme),
                    algorithm:
                        mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
