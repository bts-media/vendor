import { Avatar, Button, Dropdown, Layout } from 'antd';
import { ChevronDown, Globe, LogOut, Menu as MenuIcon, Moon, Sun, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LANGUAGES } from '~constants/data';
import { useAuthContext } from '~context/AuthProvider';
import { useThemeContext } from '~context/ThemeProvider';
import useLanguage from '~hooks/useLanguage';
import { LangType } from '~types/index';
import styles from '../AppRoutesLayout.module.css';

const { Header } = Layout;

interface AppHeaderProps {
    collapsed: boolean;
    onToggleSider: () => void;
}

const AppHeader = ({ collapsed, onToggleSider }: AppHeaderProps) => {
    const { t, lang, setLang } = useLanguage();
    const { mode, toggle } = useThemeContext();
    const { logout, role, vendorName } = useAuthContext();
    const navigate = useNavigate();

    return (
        <Header className={styles.header}>
            <Button
                type='text'
                icon={<MenuIcon size={20} />}
                onClick={onToggleSider}
                aria-label={collapsed ? 'expand sidebar' : 'collapse sidebar'}
            />

            <div className={styles.headerActions}>
                <Dropdown
                    trigger={['click']}
                    menu={{
                        selectedKeys: [lang],
                        items: LANGUAGES.map(({ value, label }) => ({ key: value, label })),
                        onClick: ({ key }) => setLang(key as LangType),
                    }}
                >
                    <Button type='text' icon={<Globe size={18} />}>
                        {LANGUAGES.find(l => l.value === lang)?.short}
                    </Button>
                </Dropdown>

                <Button
                    type='text'
                    onClick={toggle}
                    aria-label={mode === 'dark' ? t('theme_light') : t('theme_dark')}
                    icon={mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                />

                <Dropdown
                    trigger={['click']}
                    menu={{
                        items: [
                            {
                                key: 'profile',
                                label: t('profile'),
                                icon: <User size={14} />,
                                onClick: () => navigate('/settings'),
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
                    <Button type='text' style={{ height: 'auto', padding: '4px 8px' }}>
                        <Avatar size={28} icon={<User size={16} />} />
                        <span className={styles.userName}>{vendorName ?? role ?? 'Vendor'}</span>
                        <ChevronDown size={14} />
                    </Button>
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;
