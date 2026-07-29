import { DispatchType } from '~types/index';

export type ThemeMode = 'light' | 'dark';

export interface IThemeContextData {
    mode: ThemeMode;
    setMode: DispatchType<ThemeMode>;
    toggle: () => void;
}
