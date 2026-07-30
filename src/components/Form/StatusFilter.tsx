import { Select } from 'antd';
import { useSearchParams } from 'react-router-dom';
import useLanguage from '~hooks/useLanguage';
import { Option } from '~types/index';

interface StatusFilterProps {
    options: Option[];
    /** URL query-string kaliti */
    paramKey?: string;
    width?: number;
}

/** Holat filtri — qiymat URL'da saqlanadi, shuning uchun sahifa yangilansa ham qoladi. */
const StatusFilter = ({ options, paramKey = 'status', width = 170 }: StatusFilterProps) => {
    const { t } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (value?: string) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (value) next.set(paramKey, value);
            else next.delete(paramKey);
            next.delete('page'); // filtr o'zgarsa 1-sahifaga qaytamiz
            return next;
        });
    };

    return (
        <Select
            allowClear
            style={{ width }}
            value={searchParams.get(paramKey) ?? undefined}
            onChange={handleChange}
            placeholder={t('status')}
            options={options.map(({ value, label }) => ({
                value: String(value),
                label: t(label),
            }))}
        />
    );
};

export default StatusFilter;
