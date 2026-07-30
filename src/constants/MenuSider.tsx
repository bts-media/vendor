import { Activity, Image, LayoutDashboard, LineChart, Plus, Wallet } from 'lucide-react';
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

/** Tartib mockupdagidek: advertiser.html → aside.sidebar > nav */
export const menuSider: MenuItemI[] = [
    { id: 1, key: '/', labelKey: 'dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 2, key: '/campaigns/new', labelKey: 'campaign_new', icon: <Plus size={16} /> },
    { id: 3, key: '/campaigns', labelKey: 'campaigns_mine', icon: <LineChart size={16} /> },
    { id: 4, key: '/creatives', labelKey: 'creatives', icon: <Image size={16} /> },
    { id: 5, key: '/analytics', labelKey: 'analytics', icon: <Activity size={16} /> },
    { id: 6, key: '/finance', labelKey: 'finance', icon: <Wallet size={16} /> },
];

export default menuSider;
