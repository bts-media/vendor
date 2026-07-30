/**
 * BTS Media rang palitrasi — styles/globals/tokens.css bilan sinxron turishi SHART.
 * Manba: brand/DESIGN-SYSTEM.md
 *
 * Diqqat: yashil (#16A34A), amber (#F59E0B), binafsha (#7C3AED) brenddan tashqari —
 * ular faqat uchinchi tomon reklama beruvchisining o'z brendi sifatida (avatar, kreativ
 * eskizi) ishlatilishi mumkin, BTS interfeysining o'zida emas.
 */
const Colors = {
    orange: '#EC691F',
    teal: '#00A396',
    sky: '#00A0E3',
    navy: '#244082',
    gray: '#898989',

    or: {
        50: '#FEF3EC',
        100: '#FBE0CE',
        200: '#F7C0A0',
        300: '#F39B6B',
        400: '#F07E42',
        500: '#EC691F',
        600: '#C9530F',
        700: '#A3410C',
    },
    tl: {
        50: '#E6F7F5',
        100: '#C2ECE8',
        300: '#4DC4BA',
        500: '#00A396',
        600: '#008377',
        700: '#00655C',
    },
    sk: {
        50: '#E6F6FD',
        100: '#C2E9F9',
        300: '#4DBEEB',
        500: '#00A0E3',
        600: '#0080B6',
        700: '#00618A',
    },
    nv: {
        950: '#0A1020',
        900: '#0F1729',
        850: '#141F38',
        800: '#182647',
        700: '#1E3468',
        600: '#244082',
        500: '#35569E',
        300: '#8296C1',
        200: '#C7D0E4',
        100: '#E4E9F3',
        50: '#F2F5FA',
    },
    ink: {
        900: '#0F1729',
        800: '#1B2540',
        700: '#2E3A52',
        600: '#4A5468',
        500: '#6E7688',
        400: '#898989',
        300: '#B6BAC4',
        200: '#DCDFE6',
        150: '#E7E9EF',
        100: '#F1F3F7',
        50: '#F7F8FB',
    },

    white: '#FFFFFF',
    danger: '#D9432F',
    danger700: '#A32B1C',
    warn: '#F07E42',
} as const;

export const FONT_FAMILY =
    "'Proxima Nova', 'Figtree', 'Arial', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";

export default Colors;
