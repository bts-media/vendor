import { useLayoutEffect, useState } from 'react';

export type WindowSizeState = {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
};

/** Breakpointlar: 576 / 768 / 992 — CSS media query'lar bilan mos bo'lsin. */
const useWindowSize = (): WindowSizeState => {
    const [size, setSize] = useState<WindowSizeState>({
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
    });

    // useEffect emas — birinchi paint'da noto'g'ri layout ko'rinmasligi uchun
    useLayoutEffect(() => {
        const handleSize = () =>
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth <= 768,
                isTablet: window.innerWidth > 768 && window.innerWidth <= 992,
            });

        handleSize();
        window.addEventListener('resize', handleSize);
        return () => window.removeEventListener('resize', handleSize);
    }, []);

    return size;
};

export default useWindowSize;
