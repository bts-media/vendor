export type InvoiceStatus = 'new' | 'paid' | 'partial' | 'overdue';
export type PaymentStatus = 'succeeded' | 'processing' | 'failed';
export type PaymentMethodKey = 'payme' | 'click' | 'uzum' | 'bank';

export type FinanceOverviewType = {
    /** Prepaid balans */
    balance: number;
    dailyBurn: number;
    /** Balans necha kunga yetadi (balans ÷ kunlik sarf) */
    estimatedDays: number;
    /** Boshlang'ich to'ldirishga nisbatan qolgan ulush, % — progress chizig'i uchun */
    balanceShare: number;

    /** Postpaid kredit limiti */
    creditLimit: number;
    creditUsed: number;
    creditRemaining: number;
    creditShare: number;

    /** Joriy yil bo'yicha sof xarajat (QQSsiz) */
    totalSpend: number;
    outstanding: number;
    outstandingCount: number;
    overdue: number;
    overdueInvoiceNumber: string;
    overduePeriod: string;
};

export type InvoiceType = {
    id: string;
    number: string;
    period: string;
    net: number;
    vat: number;
    gross: number;
    dueDate: string;
    status: InvoiceStatus;
};

export type PaymentType = {
    id: string;
    date: string;
    /** "INV-2026-0118 to'lovi" yoki "Balansni to'ldirish" */
    subtitleKey?: string;
    invoiceNumber?: string;
    method: PaymentMethodKey;
    amount: number;
    status: PaymentStatus;
};

export type TopUpBody = {
    method: PaymentMethodKey;
    amount: number;
};
