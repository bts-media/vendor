import { Button, Dropdown } from 'antd';
import { Globe, Menu as MenuIcon, Moon, Sun } from 'lucide-react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { LANGUAGES } from '~constants/data';
import { useHeaderSlot } from '~context/HeaderSlotProvider';
import { useThemeContext } from '~context/ThemeProvider';
import useLanguage from '~hooks/useLanguage';
import { LangType } from '~types/index';
import { cn } from '~utils/cn';
import styles from '../AppRoutesLayout.module.css';

export interface CrumbItem {
    labelKey: string;
    to?: string;
}

interface AppHeaderProps {
    crumbs: CrumbItem[];
    isMobile: boolean;
    onOpenDrawer: () => void;
}

const AppHeader = ({ crumbs, isMobile, onOpenDrawer }: AppHeaderProps) => {
    const { t, lang, setLang } = useLanguage();
    const { mode, toggle } = useThemeContext();
    const { extra } = useHeaderSlot();
    const navigate = useNavigate();

    return (
        <header className={styles.topbar}>
            {isMobile && (
                <Button
                    className={styles.burger}
                    type='text'
                    icon={<MenuIcon size={20} />}
                    onClick={onOpenDrawer}
                    aria-label={t('collapse_sidebar')}
                />
            )}

            <div className={styles.crumb}>
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <Fragment key={crumb.labelKey}>
                            {index > 0 && ' / '}
                            <span
                                className={cn(
                                    isLast ? styles.crumbCurrent : crumb.to && styles.crumbLink,
                                )}
                                onClick={!isLast && crumb.to ? () => navigate(crumb.to!) : undefined}
                            >
                                {t(crumb.labelKey)}
                            </span>
                        </Fragment>
                    );
                })}
            </div>

            {/* Sahifa joylashtiradigan element (masalan sehrgar qadamlari) */}
            <div className={styles.headerSlot}>{extra}</div>

            <div className={styles.headerActions}>
                <Dropdown
                    trigger={['click']}
                    menu={{
                        selectedKeys: [lang],
                        items: LANGUAGES.map(({ value, label }) => ({ key: value, label })),
                        onClick: ({ key }) => setLang(key as LangType),
                    }}
                >
                    <Button type='text' icon={<Globe size={18} />} aria-label={t('language')}>
                        {LANGUAGES.find(item => item.value === lang)?.short}
                    </Button>
                </Dropdown>

                <Button
                    type='text'
                    onClick={toggle}
                    aria-label={mode === 'dark' ? t('theme_light') : t('theme_dark')}
                    icon={mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                />
            </div>
        </header>
    );
};

export default AppHeader;
