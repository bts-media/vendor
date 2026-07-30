import { useMockMutation, useMockQuery } from '~api/mock';
import { useNotify } from '~components/NotificationProvider';
import useLanguage from '~hooks/useLanguage';
import { CallbackType } from '~types/index';
import { mockFinance, mockInvoices, mockPayments } from './mock';
import { TopUpBody } from './type';

const FINANCE_KEY = 'finance';

/** Balans, kredit limiti, hisob-fakturalar va to'lovlar — bitta sahifada ishlatiladi. */
export const useFinance = () => {
    const { t } = useLanguage();
    const notify = useNotify();

    // Backend: useCustomGetQuery<FinanceOverviewType>(FINANCE_KEY, urls.finance.overview)
    const { data, isLoading, refetch, isRefetching } = useMockQuery(FINANCE_KEY, mockFinance);
    const { data: invoices, isLoading: isInvoicesLoading } = useMockQuery(
        `${FINANCE_KEY}-invoices`,
        mockInvoices,
    );
    const { data: payments, isLoading: isPaymentsLoading } = useMockQuery(
        `${FINANCE_KEY}-payments`,
        mockPayments,
    );

    // Backend: useCreate<TopUpBody, { redirectUrl: string }>(urls.finance.topUp)
    const { mutate: topUpMutate, isLoading: isToppingUp } = useMockMutation<TopUpBody, boolean>(
        () => true,
    );

    const topUp = (body: TopUpBody, callback?: CallbackType) => {
        topUpMutate(body, {
            onSuccess: () => {
                refetch();
                notify.success({ type: 'success', message: t('top_up_success') });
                callback?.();
            },
            onError: () => notify.error({ type: 'error', message: t('error') }),
        });
    };

    return {
        finance: data,
        invoices: invoices ?? [],
        payments: payments ?? [],
        isLoading: isLoading || isRefetching || isInvoicesLoading || isPaymentsLoading,
        refetchFinance: refetch,
        topUp,
        isToppingUp,
    };
};
