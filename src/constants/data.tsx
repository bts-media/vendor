import { LangType, Option } from '~types/index';

export const STATUS_OPTIONS: Option[] = [
    { value: 'draft', label: 'draft' },
    { value: 'moderation', label: 'moderation' },
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' },
];

export const LANGUAGES: { value: LangType; label: string; short: string }[] = [
    { value: 'uz', label: "O'zbekcha", short: 'UZ' },
    { value: 'ru', label: 'Русский', short: 'RU' },
    { value: 'en', label: 'English', short: 'EN' },
];

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';
