/* eslint-disable react-refresh/only-export-components -- route massivi ma'lumot fayli, komponent moduli emas (§9) */
import { Spin } from 'antd';
import { lazy, ReactNode, Suspense } from 'react';

const DashboardPage = lazy(() => import('~pages/Dashboard'));
const CampaignsPage = lazy(() => import('~pages/Campaigns'));
const CampaignBuilderPage = lazy(() => import('~pages/CampaignBuilder'));
const CreativesPage = lazy(() => import('~pages/Creatives'));
const AnalyticsPage = lazy(() => import('~pages/Analytics'));
const FinancePage = lazy(() => import('~pages/Finance'));
const SettingsPage = lazy(() => import('~pages/Settings'));

export interface RoutesI {
    id: number;
    path?: string;
    index?: boolean;
    component: ReactNode;
    children?: RoutesI[];
}

const LoadingComponent = ({ children }: { children: ReactNode }) => (
    <Suspense
        fallback={
            <div className='flex-center' style={{ padding: 48 }}>
                <Spin />
            </div>
        }
    >
        {children}
    </Suspense>
);

export const routes: RoutesI[] = [
    {
        id: 1,
        index: true, // "/" — layout ichidagi index route
        component: (
            <LoadingComponent>
                <DashboardPage />
            </LoadingComponent>
        ),
    },
    {
        // Diqqat: "/campaigns/new" "/campaigns/:id" dan OLDIN turishi kerak emas —
        // react-router v6 aniqroq segmentni o'zi tanlaydi, lekin o'qishga qulay bo'lsin.
        id: 2,
        path: '/campaigns/new',
        component: (
            <LoadingComponent>
                <CampaignBuilderPage />
            </LoadingComponent>
        ),
    },
    {
        id: 3,
        path: '/campaigns',
        component: (
            <LoadingComponent>
                <CampaignsPage />
            </LoadingComponent>
        ),
    },
    {
        id: 4,
        path: '/creatives',
        component: (
            <LoadingComponent>
                <CreativesPage />
            </LoadingComponent>
        ),
    },
    {
        id: 5,
        path: '/analytics',
        component: (
            <LoadingComponent>
                <AnalyticsPage />
            </LoadingComponent>
        ),
    },
    {
        id: 6,
        path: '/finance',
        component: (
            <LoadingComponent>
                <FinancePage />
            </LoadingComponent>
        ),
    },
    {
        // Sidebar'da yo'q — profil menyusidan ochiladi
        id: 7,
        path: '/settings',
        component: (
            <LoadingComponent>
                <SettingsPage />
            </LoadingComponent>
        ),
    },
];

export default routes;
