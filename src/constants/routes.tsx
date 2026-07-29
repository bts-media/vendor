/* eslint-disable react-refresh/only-export-components -- route massivi ma'lumot fayli, komponent moduli emas (§9) */
import { Spin } from 'antd';
import { lazy, ReactNode, Suspense } from 'react';

const DashboardPage = lazy(() => import('~pages/Dashboard'));
const ItemsPage = lazy(() => import('~pages/Items'));
const ItemDetailPage = lazy(() => import('~pages/Items/sections/ItemDetail'));
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
        id: 2,
        path: '/items',
        component: (
            <LoadingComponent>
                <ItemsPage />
            </LoadingComponent>
        ),
    },
    {
        id: 3,
        path: '/items/:id',
        component: (
            <LoadingComponent>
                <ItemDetailPage />
            </LoadingComponent>
        ),
    },
    {
        id: 4,
        path: '/settings',
        component: (
            <LoadingComponent>
                <SettingsPage />
            </LoadingComponent>
        ),
    },
];

export default routes;
