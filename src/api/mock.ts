import { useMutation, useQuery } from 'react-query';

/**
 * Vaqtinchalik mock qatlami — backend (`backend/`) hali yozilmagan.
 *
 * Maqsad: sahifalar real service hooklariga tayanadi, hooklar esa hozircha shu yerdan
 * ma'lumot oladi. Backend tayyor bo'lganda service ichidagi bitta qator almashadi:
 *
 *   const { data } = useMockQuery(KEY, mockCampaigns);        // ← olib tashlanadi
 *   const { data } = useGetList<TResponse<CampaignType, true>>([KEY, search], urls.campaigns.get);
 *
 * Sahifa va komponentlarga umuman tegilmaydi.
 */

const MOCK_DELAY = 320;

const resolveAfter = <T>(data: T, delay = MOCK_DELAY): Promise<T> =>
    new Promise(resolve => {
        setTimeout(() => resolve(data), delay);
    });

/** Mock GET — react-query holatlari (isLoading, refetch) haqiqiydek ishlaydi. */
export const useMockQuery = <T>(
    key: string | string[],
    data: T,
    options?: { enabled?: boolean; delay?: number },
) =>
    useQuery<T>(key, () => resolveAfter(data, options?.delay), {
        enabled: options?.enabled,
    });

/** Mock POST/PATCH — mutatsiya oqimi (isLoading, onSuccess, onError) o'zgarmaydi. */
export const useMockMutation = <TBody, TResult>(
    handler: (body: TBody) => TResult,
    delay = 600,
) => useMutation<TResult, Error, TBody>(body => resolveAfter(handler(body), delay));
