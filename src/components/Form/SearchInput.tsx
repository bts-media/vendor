import { Input } from 'antd';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '~hooks/useDebounce';
import useLanguage from '~hooks/useLanguage';
import useWindowSize from '~hooks/useWindowSize';

interface SearchInputProps {
    /** URL query-string kaliti — filtr holati URL'da saqlanadi */
    paramKey?: string;
    placeholder?: string;
    width?: number;
}

const SearchInput = ({ paramKey = 'search', placeholder, width = 260 }: SearchInputProps) => {
    const { t } = useLanguage();
    const { isMobile } = useWindowSize();
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get(paramKey) ?? '');
    const debounced = useDebounce(value);

    useEffect(() => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (debounced) next.set(paramKey, debounced);
            else next.delete(paramKey);
            next.delete('page'); // qidiruv o'zgarsa 1-sahifaga qaytamiz
            return next;
        });
    }, [debounced, paramKey, setSearchParams]);

    return (
        <Input
            allowClear
            // Mobil ekranda sarlavha amallari ustma-ust tushadi — maydon qatorni to'liq egallaydi
            style={{ width: isMobile ? '100%' : width }}
            value={value}
            onChange={e => setValue(e.target.value)}
            prefix={<Search size={16} color='var(--gray-400)' />}
            placeholder={placeholder ?? t('search')}
        />
    );
};

export default SearchInput;
