import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Api } from '~api/axios';
import { useApiQuery } from '~api/index';
import { ApiErrorBody, Paginated } from '~api/types';
import { useNotify } from '~components/NotificationProvider';
import {
    INVOICE_STATUS_KEY,
    PAYMENT_METHOD_ID,
    PAYMENT_METHOD_KEY,
    PAYMENT_STATUS_KEY,
} from '~constants/enums';
import { urls } from '~constants/urls';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import { fromMinor, getApiErrorMessage, toMinor } from '~utils/helpers';
import {
    FinanceOverviewResponse,
    FinanceOverviewType,
    InvoiceDetailResponse,
    InvoiceResponse,
    InvoiceType,
    PaymentResponse,
    PaymentType,
    TopUpBody,
} from './type';

const FINANCE_KEY = 'finance';
const LIST_LIMIT = 100;

const toInvoice = (row: InvoiceResponse): InvoiceType => ({
    id: row.id,
    number: row.number,
    period: `${dayjs(row.periodStart).format('DD.MM')} – ${dayjs(row.periodEnd).format('DD.MM.YYYY')}`,
    net: fromMinor(row.netMinor),
    vat: fromMinor(row.vatMinor),
    gross: fromMinor(row.grossMinor),
    paid: fromMinor(row.paidMinor),
    due: fromMinor(row.dueMinor),
    dueDate: row.dueAt,
    status: (INVOICE_STATUS_KEY[row.status?.name] ?? 'new') as InvoiceType['status'],
});

const toPayment = (row: PaymentResponse): PaymentType => ({
    id: row.id,
    date: row.paidAt ?? row.createdAt,
    invoiceNumber: row.invoiceNumber ?? undefined,
    isTopUp: row.isTopUp,
    method: (PAYMENT_METHOD_KEY[row.method?.name] ?? 'bank') as PaymentType['method'],
    amount: fromMinor(row.amountMinor),
    status: (PAYMENT_STATUS_KEY[row.status?.name] ?? 'processing') as PaymentType['status'],
});

/** Balans, kredit limiti, hisob-fakturalar va to'lovlar — bitta sahifada ishlatiladi. */
export const useFinance = () => {
    const { t } = useLanguage();
    const notify = useNotify();
    const queryClient = useQueryClient();

    const overview = useApiQuery<FinanceOverviewResponse>(
        [FINANCE_KEY, 'overview'],
        urls.finance.overview,
    );
    const invoices = useApiQuery<Paginated<InvoiceResponse>>(
        [FINANCE_KEY, 'invoices'],
        urls.finance.invoices,
        { limit: LIST_LIMIT },
    );
    const payments = useApiQuery<Paginated<PaymentResponse>>(
        [FINANCE_KEY, 'payments'],
        urls.finance.payments,
        { limit: LIST_LIMIT },
    );

    const finance = useMemo<FinanceOverviewType | undefined>(() => {
        const data = overview.data;
        if (!data) return undefined;

        const creditLimit = fromMinor(data.creditLimitMinor);
        const creditRemaining = fromMinor(data.creditRemainingMinor);
        const creditUsed = Math.max(0, creditLimit - creditRemaining);

        return {
            billingType: data.billingMode?.name === 'PREPAID' ? 'prepaid' : 'postpaid',
            balance: fromMinor(data.balanceMinor),
            dailyBurn: fromMinor(data.dailyBurnMinor),
            estimatedDays: data.estimatedDaysRemaining,
            lowThreshold: fromMinor(data.lowThresholdMinor),
            creditLimit,
            creditUsed,
            creditRemaining,
            creditShare: creditLimit > 0 ? Math.round((creditRemaining / creditLimit) * 100) : 0,
            totalSpend: fromMinor(data.spendLast30dMinor),
            outstanding: fromMinor(data.outstandingMinor),
            outstandingCount: data.outstandingCount,
            overdue: fromMinor(data.overdueMinor),
            overdueCount: data.overdueCount,
        };
    }, [overview.data]);

    const { mutate: topUpMutate, isLoading: isToppingUp } = useMutation<
        PaymentResponse,
        AxiosError<ApiErrorBody>,
        { amountMinor: string; methodId: number }
    >(async body => (await Api.post(urls.finance.topUp, body)) as unknown as PaymentResponse);

    /**
     * To'ldirish niyati qayd etiladi va to'lov PENDING holatida turadi — pul
     * kelganini BTS moliya bo'limi tasdiqlaydi, balans o'shanda oshadi.
     */
    const topUp = (body: TopUpBody, callback?: CallbackType) => {
        topUpMutate(
            { amountMinor: toMinor(body.amount), methodId: PAYMENT_METHOD_ID[body.method] },
            {
                onSuccess: () => {
                    void queryClient.invalidateQueries(FINANCE_KEY);
                    notify.success({ type: 'success', message: t('top_up_success') });
                    callback?.();
                },
                onError: err =>
                    notify.error({ type: 'error', message: getApiErrorMessage(err, t('error')) }),
            },
        );
    };

    return {
        finance,
        invoices: useMemo(() => (invoices.data?.data ?? []).map(toInvoice), [invoices.data]),
        payments: useMemo(() => (payments.data?.data ?? []).map(toPayment), [payments.data]),
        isLoading: overview.isLoading || invoices.isLoading || payments.isLoading,
        refetchFinance: overview.refetch,
        topUp,
        isToppingUp,
    };
};

/** Hisob-faktura qatorlari — faqat tafsilot endpointida keladi. */
export const useInvoiceDetail = (id?: string) => {
    const detail = useApiQuery<InvoiceDetailResponse>(
        [FINANCE_KEY, 'invoice', id ?? ''],
        id ? urls.finance.invoiceById(id) : '',
        undefined,
        { enabled: Boolean(id) },
    );

    return {
        invoice: detail.data ? toInvoice(detail.data) : undefined,
        lines: (detail.data?.lines ?? []).map(line => ({
            campaign: line.campaignName,
            channel: line.channel?.name === 'SCREEN' ? 'screen' : 'parcel',
            impressions: line.impressions,
            cpm: fromMinor(line.cpmMinor),
            amount: fromMinor(line.amountMinor),
        })),
        isLoading: detail.isLoading,
    };
};
