import { EnumValue } from '~api/types';

export type InvoiceStatusKey = 'new' | 'paid' | 'partial' | 'overdue';
export type PaymentStatusKey = 'succeeded' | 'processing' | 'failed';
export type PaymentMethodKey = 'payme' | 'click' | 'uzum' | 'bank';

// ─── Backend javob shakllari (`[ADVERTISER] Finance`) ───

export type FinanceOverviewResponse = {
    billingMode: EnumValue;
    balanceMinor: string | null;
    lowThresholdMinor: string | null;
    estimatedDaysRemaining: number | null;
    creditLimitMinor: string;
    /** Hisob-faktura chiqarilmagan, lekin yetkazilgan xarajat */
    unbilledMinor: string;
    creditRemainingMinor: string;
    dailyBurnMinor: string;
    spendLast30dMinor: string;
    outstandingMinor: string;
    outstandingCount: number;
    overdueMinor: string;
    overdueCount: number;
};

export type InvoiceResponse = {
    id: string;
    number: string;
    periodStart: string;
    periodEnd: string;
    netMinor: string;
    vatPercent: number;
    vatMinor: string;
    grossMinor: string;
    paidMinor: string;
    dueMinor: string;
    status: EnumValue;
    issuedAt: string;
    dueAt: string;
    paidAt: string | null;
};

/** Bir qator = bitta kampaniya × bitta o'rin */
export type InvoiceLineResponse = {
    campaignId: string;
    campaignName: string;
    channel: EnumValue;
    placement: EnumValue | null;
    /** Posilka qatorida tasdiqlangan posilkalar; belgilangan qatorda 0 */
    impressions: number;
    /** Hisoblangan birliklar: posilka, filial-oy, oy yoki post */
    quantity: number;
    /** Bir birlik narxi, tiyin (nomi tarixiy — endi ×1000 emas) */
    cpmMinor: string;
    amountMinor: string;
    /** Masalan `SCREEN_TV × 2`; posilka qatorida null */
    description: string | null;
};

export type InvoiceDetailResponse = InvoiceResponse & { lines: InvoiceLineResponse[] };

export type PaymentResponse = {
    id: string;
    method: EnumValue;
    amountMinor: string;
    status: EnumValue;
    isTopUp: boolean;
    invoiceId: string | null;
    invoiceNumber: string | null;
    externalRef: string | null;
    paidAt: string | null;
    note: string | null;
    createdAt: string;
};

export type TopUpRequest = {
    amountMinor: string;
    methodId: number;
    note?: string;
};

// ─── Ekran modellari ───

export type FinanceOverviewType = {
    billingType: 'prepaid' | 'postpaid';

    /** Prepaid balans */
    balance: number;
    dailyBurn: number;
    /** Balans necha kunga yetadi — backend hisoblaydi */
    estimatedDays: number | null;
    lowThreshold: number;

    /** Postpaid kredit limiti */
    creditLimit: number;
    creditUsed: number;
    creditRemaining: number;
    creditShare: number;

    /** Oxirgi 30 kundagi sof xarajat */
    totalSpend: number;
    outstanding: number;
    outstandingCount: number;
    overdue: number;
    overdueCount: number;
};

export type InvoiceType = {
    id: string;
    number: string;
    period: string;
    net: number;
    vat: number;
    gross: number;
    paid: number;
    due: number;
    dueDate: string;
    status: InvoiceStatusKey;
};

export type InvoiceLineType = {
    key: string;
    campaign: string;
    /** Backend `Placement` nomi (`SCREEN_TV`), null — eski qator */
    placement: string | null;
    quantity: number;
    description: string | null;
    /** Bir birlik narxi, so'm */
    unitPrice: number;
    amount: number;
};

export type PaymentType = {
    id: string;
    date: string;
    invoiceNumber?: string;
    isTopUp: boolean;
    method: PaymentMethodKey;
    amount: number;
    status: PaymentStatusKey;
};

export type TopUpBody = {
    method: PaymentMethodKey;
    amount: number;
};
