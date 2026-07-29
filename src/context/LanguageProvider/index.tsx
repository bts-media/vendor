/* eslint-disable react-refresh/only-export-components -- context + provider bitta faylda (§8) */
import { createContext, ReactNode, useEffect, useState } from 'react';
import { LangType } from '~types/index';
import { ILanguageContextData } from './types';

const DEFAULT_LANG: LangType = 'uz';
const SUPPORTED: LangType[] = ['uz', 'ru', 'en'];

export const LanguageContext = createContext<ILanguageContextData>({
    lang: DEFAULT_LANG,
    setLang: () => undefined,
});

const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<LangType>(() => {
        const stored = localStorage.getItem('lang') as LangType | null;
        return stored && SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
    });

    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
    );
};

export default LanguageProvider;
