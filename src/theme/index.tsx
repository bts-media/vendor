import type { ThemeConfig } from 'antd/es/config-provider/context';
import Colors from './Colors';

export const appTheme: ThemeConfig = {
    token: {
        colorPrimary: Colors.primary,
        colorSuccess: Colors.success,
        colorWarning: Colors.warning,
        colorError: Colors.error,
        colorInfo: Colors.info,
        borderRadius: 8,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
        fontSize: 14,
    },
    components: {
        Table: { headerBg: Colors.gray[25], headerColor: Colors.gray[500] },
        Layout: { siderBg: Colors.white, headerBg: Colors.white, bodyBg: '#f9f9f9' },
        Menu: { itemSelectedBg: Colors.primaryLight, itemSelectedColor: Colors.primary },
        Button: { controlHeight: 40 },
        Input: { controlHeight: 40 },
        Select: { controlHeight: 40 },
    },
};

export const darkTheme: ThemeConfig = {
    ...appTheme,
    token: {
        ...appTheme.token,
        colorBgContainer: '#1f1f1f',
    },
    components: {
        ...appTheme.components,
        Table: { headerBg: '#1f1f1f', headerColor: Colors.gray[300] },
        Layout: { siderBg: '#1f1f1f', headerBg: '#1f1f1f', bodyBg: '#141414' },
        Menu: { itemSelectedBg: '#312e81', itemSelectedColor: '#c7d2fe' },
    },
};

/** Status → { backgroundColor, color }. Badge/Tag'larda bir xil ko'rinish uchun. */
export const statusColors: Record<string, { backgroundColor: string; color: string }> = {
    active: { backgroundColor: '#e5f7ed', color: '#01ab56' },
    published: { backgroundColor: '#e5f7ed', color: '#01ab56' },
    inactive: { backgroundColor: '#fef1ea', color: '#eb3d4d' },
    rejected: { backgroundColor: '#fef1ea', color: '#eb3d4d' },
    pending: { backgroundColor: '#d5f0ff', color: '#2086bf' },
    moderation: { backgroundColor: '#fdf3e3', color: '#e19133' },
    draft: { backgroundColor: '#f0f1f3', color: '#667085' },
};

export const statusColorsDark: Record<string, { backgroundColor: string; color: string }> = {
    active: { backgroundColor: '#0b2e1e', color: '#4ade80' },
    published: { backgroundColor: '#0b2e1e', color: '#4ade80' },
    inactive: { backgroundColor: '#3b1618', color: '#f87171' },
    rejected: { backgroundColor: '#3b1618', color: '#f87171' },
    pending: { backgroundColor: '#0c2c3d', color: '#60a5fa' },
    moderation: { backgroundColor: '#3a2a10', color: '#fbbf24' },
    draft: { backgroundColor: '#26272b', color: '#a3a9b6' },
};
