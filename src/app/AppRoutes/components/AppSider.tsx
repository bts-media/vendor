import { Drawer, Dropdown, Menu } from 'antd';
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrandMark } from '~components/index';
import { menuSider } from '~constants/MenuSider';
import { useAuthContext } from '~context/AuthProvider';
import { useThemeContext } from '~context/ThemeProvider';
import useLanguage from '~hooks/useLanguage';
import { initialOf } from '~utils/helpers';
import styles from '../AppRoutesLayout.module.css';

interface AppSiderProps {
    isMobile: boolean;
    drawerOpen: boolean;
    onDrawerClose: () => void;
    /** Joriy tanlangan menyu kaliti */
    selectedKey: string;
}

const AppSider = ({ isMobile, drawerOpen, onDrawerClose, selectedKey }: AppSiderProps) => {
    const { t } = useLanguage();
    const { mode } = useThemeContext();
    const { advertiserName, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleNavigate = (key: string) => {
        navigate(key);
        if (isMobile) onDrawerClose();
    };

    const content = (
        <>
            <div className={styles.brand}>
                {/* Brendbuk: to'q fonda mark-white, yorug'da mark — qayta ranglash taqiqlangan */}
                <img
                    className={styles.mark}
                    src={mode === 'dark' ? '/brand/mark-white.png' : '/brand/mark.png'}
                    alt='BTS Media'
                />
                <div>
                    <div className={styles.brandName}>{t('app_name')}</div>
                    <div className={styles.brandSub}>{t('portal_name')}</div>
                </div>
            </div>

            <div className={styles.nav}>
                <Menu
                    mode='inline'
                    selectedKeys={[selectedKey]}
                    onClick={({ key }) => handleNavigate(key)}
                    style={{ borderInlineEnd: 'none', background: 'transparent' }}
                    items={menuSider.map(({ key, labelKey, icon }) => ({
                        key,
                        icon,
                        label: t(labelKey),
                    }))}
                />
            </div>

            <div className={styles.foot}>
                <Dropdown
                    trigger={['click']}
                    placement='topLeft'
                    menu={{
                        items: [
                            {
                                key: 'settings',
                                label: t('settings'),
                                icon: <Settings size={14} />,
                                onClick: () => handleNavigate('/settings'),
                            },
                            { type: 'divider' },
                            {
                                key: 'logout',
                                label: t('logout'),
                                icon: <LogOut size={14} />,
                                danger: true,
                                onClick: logout,
                            },
                        ],
                    }}
                >
                    <button type='button' className={styles.account}>
                        {/* Reklama beruvchining o'z brend rangi — DESIGN-SYSTEM §5 */}
                        <BrandMark
                            label={initialOf(advertiserName ?? 'K')}
                            color='#16A34A'
                            size={30}
                            fontSize={12}
                            radius={7}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className={styles.accountName}>{advertiserName ?? 'Korzinka'}</div>
                            <div className={styles.accountPlan}>{t('portal_name')}</div>
                        </div>
                        <ChevronsUpDown size={14} color='var(--text-subtle)' />
                    </button>
                </Dropdown>
            </div>
        </>
    );

    if (isMobile) {
        return (
            <Drawer
                placement='left'
                open={drawerOpen}
                onClose={onDrawerClose}
                width={260}
                closable={false}
                styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column' } }}
            >
                {content}
            </Drawer>
        );
    }

    return <aside className={styles.sidebar}>{content}</aside>;
};

export default AppSider;
