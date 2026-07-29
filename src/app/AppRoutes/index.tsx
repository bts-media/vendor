import { Layout } from 'antd';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { routes } from '~constants/routes';
import useWindowSize from '~hooks/useWindowSize';
import NotFoundPage from '~pages/NotFound';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import styles from './AppRoutesLayout.module.css';

const { Content } = Layout;

const AppLayout = () => {
    const { isMobile } = useWindowSize();
    const [collapsed, setCollapsed] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Layout className={styles.layout}>
            <AppSider
                collapsed={collapsed}
                isMobile={isMobile}
                drawerOpen={drawerOpen}
                onDrawerClose={() => setDrawerOpen(false)}
            />

            <Layout>
                <AppHeader
                    collapsed={collapsed}
                    onToggleSider={() =>
                        isMobile ? setDrawerOpen(prev => !prev) : setCollapsed(prev => !prev)
                    }
                />
                <Content className={styles.content}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

const AppRoutes = () => (
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
                                <Route key={child.id} path={child.path} element={child.component} />
                            ),
                        )}
                    </Route>
                ),
            )}
        </Route>
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
);

export default AppRoutes;
