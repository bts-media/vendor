import type { ThemeConfig } from 'antd/es/config-provider/context';
import Colors, { FONT_FAMILY } from './Colors';

/**
 * antd ThemeConfig — mockupdagi o'lchamlarga sozlangan.
 * Asosiy tugma (`type='primary'`) = brend CTA: orange fon + to'q navy matn (btn-brand).
 * Oddiy tugma = oq fon + ink-200 chegara (btn-ghost).
 */
export const appTheme: ThemeConfig = {
    token: {
        colorPrimary: Colors.or[500],
        colorSuccess: Colors.tl[500],
        colorInfo: Colors.sk[500],
        colorWarning: Colors.warn,
        colorError: Colors.danger,
        colorLink: Colors.or[700],
        colorText: Colors.ink[700],
        colorTextHeading: Colors.ink[900],
        colorTextSecondary: Colors.ink[500],
        colorTextTertiary: Colors.ink[400],
        colorBorder: Colors.ink[200],
        colorBorderSecondary: Colors.ink[150],
        colorBgLayout: Colors.ink[50],
        borderRadius: 10,
        borderRadiusLG: 14,
        borderRadiusSM: 8,
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        controlHeight: 40,
    },
    components: {
        Layout: {
            siderBg: Colors.white,
            headerBg: Colors.white,
            bodyBg: Colors.ink[50],
            headerHeight: 60,
            headerPadding: '0 28px',
        },
        Menu: {
            itemBg: 'transparent',
            itemColor: Colors.ink[600],
            itemHoverBg: Colors.ink[50],
            itemSelectedBg: Colors.or[50],
            itemSelectedColor: Colors.or[700],
            itemBorderRadius: 8,
            itemHeight: 36,
            itemMarginInline: 0,
            itemMarginBlock: 2,
            // 230px sidebar'da "Mening kampaniyalarim" to'liq sig'sin
            itemPaddingInline: 8,
            iconMarginInlineEnd: 10,
            fontSize: 13.5,
        },
        Button: {
            fontWeight: 600,
            primaryShadow: 'none',
            defaultShadow: 'none',
            // brend CTA: orange fonda to'q matn (brendbuk bo'yicha orange — to'ldirish rangi)
            primaryColor: Colors.ink[900],
            paddingInline: 14,
        },
        Table: {
            headerBg: Colors.ink[50],
            headerColor: Colors.ink[400],
            headerSplitColor: 'transparent',
            borderColor: Colors.ink[100],
            rowHoverBg: Colors.ink[50],
            cellPaddingBlock: 13,
            cellPaddingInline: 18,
            fontSize: 13,
            headerBorderRadius: 0,
        },
        Card: { borderRadiusLG: 14 },
        Modal: { borderRadiusLG: 14 },
        Segmented: { itemSelectedBg: Colors.white, borderRadius: 8 },
        Progress: { defaultColor: Colors.or[500] },
        Tooltip: { colorBgSpotlight: Colors.ink[900] },
    },
};

export const darkTheme: ThemeConfig = {
    ...appTheme,
    token: {
        ...appTheme.token,
        colorText: Colors.nv[200],
        colorTextHeading: Colors.nv[50],
        colorTextSecondary: Colors.nv[300],
        colorTextTertiary: Colors.nv[300],
        colorBorder: Colors.nv[700],
        colorBorderSecondary: Colors.nv[800],
        colorBgContainer: Colors.nv[900],
        colorBgElevated: Colors.nv[850],
        colorBgLayout: Colors.nv[950],
        colorLink: Colors.or[300],
    },
    components: {
        ...appTheme.components,
        Layout: {
            siderBg: Colors.nv[900],
            headerBg: Colors.nv[900],
            bodyBg: Colors.nv[950],
            headerHeight: 60,
            headerPadding: '0 28px',
        },
        Menu: {
            ...appTheme.components?.Menu,
            itemColor: Colors.nv[200],
            itemHoverBg: Colors.nv[850],
            itemSelectedBg: 'rgba(236, 105, 31, 0.14)',
            itemSelectedColor: Colors.or[300],
        },
        Table: {
            ...appTheme.components?.Table,
            headerBg: Colors.nv[850],
            headerColor: Colors.nv[300],
            borderColor: Colors.nv[800],
            rowHoverBg: Colors.nv[850],
        },
        // Oq fon to'q rejimda o'qilmaydi — tanlangan element navy sirtga o'tadi
        Segmented: {
            itemSelectedBg: Colors.nv[700],
            itemSelectedColor: Colors.nv[50],
            itemColor: Colors.nv[300],
            borderRadius: 8,
        },
    },
};

/** Badge tonlari — ranglar CSS o'zgaruvchilaridan olinadi, shuning uchun dark rejim avtomatik. */
export type BadgeTone = 'teal' | 'orange' | 'sky' | 'gray' | 'danger';

/**
 * Statuslarni ton bilan bog'lash. Statuslar backend qiymatlari (ingliz), matn esa i18n'dan.
 * Topilmagan status — kulrang (hech qachon bo'sh ko'rinmaydi).
 */
export const statusTone: Record<string, BadgeTone> = {
    // kampaniya
    active: 'teal',
    completed: 'gray',
    draft: 'gray',
    moderation: 'orange',
    paused: 'orange',
    rejected: 'danger',
    // kreativ
    approved: 'teal',
    pending: 'orange',
    // hisob-faktura
    new: 'orange',
    paid: 'teal',
    partial: 'orange',
    overdue: 'danger',
    // to'lov
    succeeded: 'teal',
    processing: 'orange',
    failed: 'danger',
    // kanal
    parcel: 'orange',
    screen: 'sky',
    both: 'gray',
};

export const toneOf = (status: string): BadgeTone => statusTone[status] ?? 'gray';
