import React from 'react';

/** Ko'ptilli matn — backend shu shaklda qaytarsa */
export type TValue = { uz: string; ru: string; en: string };

export type LangType = keyof TValue;

export interface ITranslateData {
    [key: string]: TValue;
}

export type TDataResponse<T> = {
    success: boolean;
    data: T;
    error: string | null;
};

export type PaginationType = {
    limit?: number;
    page?: number | null;
    total?: number;
};

export type TResponseWithPagination<T> = PaginationType & { data: T[] };

/** TResponse<Item> → Item | TResponse<Item, true> → sahifalangan ro'yxat */
export type TResponse<T, U extends boolean = false> = U extends true
    ? TResponseWithPagination<T>
    : T;

export type Option = { value: number | string; label: string };
export type CallbackType = () => void;
export type DispatchType<T> = React.Dispatch<React.SetStateAction<T>>;
