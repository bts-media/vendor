/* eslint-disable react-refresh/only-export-components -- context + provider + hook bitta faylda (§8) */
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { IHeaderSlotData } from './types';

const HeaderSlotContext = createContext<IHeaderSlotData>({
    extra: null,
    setExtra: () => undefined,
});

/**
 * Sahifa topbar'ga o'z elementini joylashi uchun (mockupda kampaniya sehrgarining
 * qadamlar indikatori topbar ichida turadi). Global holat emas — faqat app shell doirasida.
 *
 * Ishlatilishi:
 *   const { setExtra } = useHeaderSlot();
 *   useEffect(() => { setExtra(<Steps />); return () => setExtra(null); }, [step]);
 */
export const useHeaderSlot = () => useContext(HeaderSlotContext);

const HeaderSlotProvider = ({ children }: { children: ReactNode }) => {
    const [extra, setExtra] = useState<ReactNode>(null);
    const value = useMemo(() => ({ extra, setExtra }), [extra]);

    return <HeaderSlotContext.Provider value={value}>{children}</HeaderSlotContext.Provider>;
};

export default HeaderSlotProvider;
