import { Drawer, Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuSider } from '~constants/MenuSider';
import useLanguage from '~hooks/useLanguage';
import styles from '../AppRoutesLayout.module.css';

const { Sider } = Layout;

interface AppSiderProps {
    collapsed: boolean;
    isMobile: boolean;
    drawerOpen: boolean;
    onDrawerClose: () => void;
}

const AppSider = ({ collapsed, isMobile, drawerOpen, onDrawerClose }: AppSiderProps) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // "/items/42" → "/items" ni tanlangan qilib ko'rsatish
    const selectedKey =
        menuSider
            .map(item => item.key)
            .filter(key => key !== '/' && pathname.startsWith(key))
            .sort((a, b) => b.length - a.length)[0] ?? '/';

    const items = menuSider.map(({ key, labelKey, icon }) => ({
        key,
        icon,
        label: t(labelKey),
    }));

    const handleClick = ({ key }: { key: string }) => {
        navigate(key);
        if (isMobile) onDrawerClose();
    };

    const logo = (
        <div className={styles.logo}>
            <span className={styles.logoMark}>BTS</span>
            {!collapsed && <span>{t('portal_name')}</span>}
        </div>
    );

    const menu = (
        <Menu
            mode='inline'
            selectedKeys={[selectedKey]}
            items={items}
            onClick={handleClick}
            style={{ borderInlineEnd: 'none', padding: '0 var(--space-3)' }}
        />
    );

    if (isMobile) {
        return (
            <Drawer
                placement='left'
                open={drawerOpen}
                onClose={onDrawerClose}
                width={250}
                closable={false}
                styles={{ body: { padding: 0 } }}
            >
                {logo}
                {menu}
            </Drawer>
        );
    }

    return (
        <Sider
            className={styles.sider}
            collapsible
            collapsed={collapsed}
            trigger={null}
            width={250}
            collapsedWidth={80}
        >
            {logo}
            {menu}
        </Sider>
    );
};

export default AppSider;
