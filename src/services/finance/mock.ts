import { FinanceOverviewType, InvoiceType, PaymentType } from './type';

/**
 * Raqamlar o'zaro muvofiq (PRODUCT-SPEC §3):
 * qarzdorlik 252 mln = INV-0142 (159.04) + INV-0071 qoldig'i (41.44) + INV-0045 (51.52)
 */
export const mockFinance: FinanceOverviewType = {
    balance: 12_400_000,
    dailyBurn: 690_000,
    estimatedDays: 18,
    balanceShare: 36,

    creditLimit: 500_000_000,
    creditUsed: 486_000_000,
    creditRemaining: 14_000_000,
    creditShare: 97,

    totalSpend: 486_000_000,
    outstanding: 252_000_000,
    outstandingCount: 3,
    overdue: 51_520_000,
    overdueInvoiceNumber: 'INV-2026-0045',
    overduePeriod: 'Mart 2026',
};

export const mockInvoices: InvoiceType[] = [
    {
        id: 'inv-142',
        number: 'INV-2026-0142',
        period: 'Iyul 2026',
        net: 142_000_000,
        vat: 17_040_000,
        gross: 159_040_000,
        dueDate: '2026-08-05',
        status: 'new',
    },
    {
        id: 'inv-118',
        number: 'INV-2026-0118',
        period: 'Iyun 2026',
        net: 128_000_000,
        vat: 15_360_000,
        gross: 143_360_000,
        dueDate: '2026-07-05',
        status: 'paid',
    },
    {
        id: 'inv-094',
        number: 'INV-2026-0094',
        period: 'May 2026',
        net: 96_000_000,
        vat: 11_520_000,
        gross: 107_520_000,
        dueDate: '2026-06-05',
        status: 'paid',
    },
    {
        id: 'inv-071',
        number: 'INV-2026-0071',
        period: 'Aprel 2026',
        net: 74_000_000,
        vat: 8_880_000,
        gross: 82_880_000,
        dueDate: '2026-05-05',
        status: 'partial',
    },
    {
        id: 'inv-045',
        number: 'INV-2026-0045',
        period: 'Mart 2026',
        net: 46_000_000,
        vat: 5_520_000,
        gross: 51_520_000,
        dueDate: '2026-04-05',
        status: 'overdue',
    },
];

export const mockPayments: PaymentType[] = [
    {
        id: 'pay-1',
        date: '2026-07-05',
        invoiceNumber: 'INV-2026-0118',
        method: 'bank',
        amount: 143_360_000,
        status: 'succeeded',
    },
    {
        id: 'pay-2',
        date: '2026-06-06',
        invoiceNumber: 'INV-2026-0094',
        method: 'payme',
        amount: 107_520_000,
        status: 'succeeded',
    },
    {
        id: 'pay-3',
        date: '2026-07-20',
        subtitleKey: 'payment_top_up',
        method: 'click',
        amount: 12_400_000,
        status: 'succeeded',
    },
    {
        id: 'pay-4',
        date: '2026-05-08',
        invoiceNumber: 'INV-2026-0071',
        method: 'bank',
        amount: 41_440_000,
        status: 'succeeded',
    },
    {
        id: 'pay-5',
        date: '2026-07-21',
        subtitleKey: 'payment_top_up',
        method: 'uzum',
        amount: 5_000_000,
        status: 'processing',
    },
];
