import { useEffect, useState } from 'react';

/** Qidiruv inputlari uchun: const debouncedQuery = useDebounce(query); */
function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}

export default useDebounce;
