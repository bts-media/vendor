import { useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { menuSider } from '~constants/MenuSider';
import { routes } from '~constants/routes';
import HeaderSlotProvider from '~context/HeaderSlotProvider';
import useWindowSize from '~hooks/useWindowSize';
import NotFoundPage from '~pages/NotFound';
import styles from './AppRoutesLayout.module.css';
import AppHeader, { CrumbItem } from './components/AppHeader';
import AppSider from './components/AppSider';

/** Sahifa yo'li → non (breadcrumb). Oxirgi element joriy sahifa. */
const CRUMBS: Record<string, CrumbItem[]> = {
    '/': [{ labelKey: 'dashboard' }],
    '/campaigns': [{ labelKey: 'campaigns_mine' }],
    '/campaigns/new': [{ labelKey: 'campaigns', to: '/campaigns' }, { labelKey: 'campaign_new' }],
    '/creatives': [{ labelKey: 'creatives' }],
    '/analytics': [{ labelKey: 'analytics' }],
    '/finance': [{ labelKey: 'finance' }],
    '/settings': [{ labelKey: 'settings' }],
};

const AppLayout = () => {
    const { isMobile, width } = useWindowSize();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { pathname } = useLocation();

    // Sidebar 980px dan pastda yashiriladi (CSS bilan mos)
    const isCompact = isMobile || (width > 0 && width < 980);

    // "/campaigns/new" → eng uzun mos keluvchi kalit tanlanadi
    const selectedKey =
        menuSider
            .map(item => item.key)
            .filter(key => key !== '/' && pathname.startsWith(key))
            .sort((a, b) => b.length - a.length)[0] ?? '/';

    const crumbs = CRUMBS[pathname] ?? CRUMBS['/'];

    return (
        <div className={styles.app}>
            <AppSider
                isMobile={isCompact}
                drawerOpen={drawerOpen}
                onDrawerClose={() => setDrawerOpen(false)}
                selectedKey={selectedKey}
            />

            <div className={styles.main}>
                <AppHeader
                    crumbs={crumbs}
                    isMobile={isCompact}
                    onOpenDrawer={() => setDrawerOpen(true)}
                />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const AppRoutes = () => (
    <HeaderSlotProvider>
        <Routes>
            <Route path='/' element={<AppLayout />}>
                {/* index route va path route'ning propslari turlicha — shuning uchun alohida shox */}
                {routes.map(({ id, path, index, component, children }) =>
                    index ? (
                        <Route key={id} index element={component} />
                    ) : (
                        <Route key={id} path={path} element={component}>
                            {children?.map(child =>
                                child.index ? (
                                    <Route key={child.id} index element={child.component} />
                                ) : (
                                    <Route
                                        key={child.id}
                                        path={child.path}
                                        element={child.component}
                                    />
                                ),
                            )}
                        </Route>
                    ),
                )}
            </Route>
            {/* Kirgan foydalanuvchi /login ga qaytsa — 404 emas, bosh sahifa */}
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </HeaderSlotProvider>
);

export default AppRoutes;
