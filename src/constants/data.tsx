import { Banknote, CreditCard, Landmark, Wallet } from 'lucide-react';
import { ReactNode } from 'react';
import { LangType, Option } from '~types/index';

export const LANGUAGES: { value: LangType; label: string; short: string }[] = [
    { value: 'uz', label: "O'zbekcha", short: 'UZ' },
    { value: 'ru', label: 'Русский', short: 'RU' },
    { value: 'en', label: 'English', short: 'EN' },
];

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';

/** PRODUCT-SPEC: QQS 12% barcha hisob-fakturalarga qo'shiladi */
export const VAT_RATE = 0.12;

/** Kampaniya standart davomiyligi (kun) — sehrgarda boshlang'ich qiymat */
export const DEFAULT_CAMPAIGN_DAYS = 30;

/** Kampaniya holatlari — filtr uchun. Matn i18n'dan: t(`status_${value}`) */
export const CAMPAIGN_STATUS_OPTIONS: Option[] = [
    { value: 'active', label: 'status_active' },
    { value: 'moderation', label: 'status_moderation' },
    { value: 'paused', label: 'status_paused' },
    { value: 'draft', label: 'status_draft' },
    { value: 'completed', label: 'status_completed' },
];

export const CREATIVE_STATUS_OPTIONS: Option[] = [
    { value: 'approved', label: 'status_approved' },
    { value: 'moderation', label: 'status_moderation' },
    { value: 'draft', label: 'status_draft' },
    { value: 'rejected', label: 'status_rejected' },
];

/** To'lov usullari — PRODUCT-SPEC §"To'lov usullari": bank + Payme / Click / Uzum */
export interface PaymentMethodI {
    key: 'payme' | 'click' | 'uzum' | 'bank';
    labelKey: string;
    descKey: string;
    icon: ReactNode;
}

export const PAYMENT_METHODS: PaymentMethodI[] = [
    {
        key: 'payme',
        labelKey: 'method_payme',
        descKey: 'method_payme_desc',
        icon: <CreditCard size={20} />,
    },
    {
        key: 'click',
        labelKey: 'method_click',
        descKey: 'method_click_desc',
        icon: <Wallet size={20} />,
    },
    {
        key: 'uzum',
        labelKey: 'method_uzum',
        descKey: 'method_uzum_desc',
        icon: <Banknote size={20} />,
    },
    {
        key: 'bank',
        labelKey: 'method_bank',
        descKey: 'method_bank_desc',
        icon: <Landmark size={20} />,
    },
];
