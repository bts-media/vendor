import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IHeaderSlotData {
    extra: ReactNode;
    setExtra: Dispatch<SetStateAction<ReactNode>>;
}
