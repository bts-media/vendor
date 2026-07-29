import { LayoutDashboard, Package, Settings } from 'lucide-react';
import { ReactNode } from 'react';

export interface MenuItemI {
    id: number;
    /** Route path — Menu key sifatida ham ishlatiladi */
    key: string;
    /** i18n kaliti */
    labelKey: string;
    icon: ReactNode;
    children?: MenuItemI[];
}

export const menuSider: MenuItemI[] = [
    {
        id: 1,
        key: '/',
        labelKey: 'dashboard',
        icon: <LayoutDashboard size={18} />,
    },
    {
        id: 2,
        key: '/items',
        labelKey: 'items',
        icon: <Package size={18} />,
    },
    {
        id: 3,
        key: '/settings',
        labelKey: 'settings',
        icon: <Settings size={18} />,
    },
];

export default menuSider;
