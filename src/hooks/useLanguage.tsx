import { useContext } from 'react';
import { LanguageContext } from '~context/LanguageProvider';
import { translateData } from '~i18n/index';
import { TValue } from '~types/index';

function useLanguage() {
    const { lang, setLang } = useContext(LanguageContext);

    /** Kalit topilmasa kalitning o'zini qaytaradi — UI hech qachon bo'sh qolmaydi. */
    const t = (key: string) => translateData[key]?.[lang] ?? key;

    /** Backend'dan kelgan ko'ptilli obyekt uchun: translate(item, 'title') */
    const translate = (obj: Record<string, unknown> | null | undefined, name: string) => {
        const value = obj?.[name] as TValue | undefined;
        return value?.[lang] ?? '';
    };

    return { t, translate, lang, setLang };
}

export default useLanguage;
