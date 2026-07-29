import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useWindowSize, { WindowSizeState } from '~hooks/useWindowSize';
import PageHeader from './PageHeader';

type StubButtonProps = {
    children?: ReactNode;
    onClick?: () => void;
    size?: string;
    icon?: ReactNode;
};

type StubFlexProps = { children?: ReactNode; className?: string };

const DESKTOP: WindowSizeState = { width: 1440, height: 900, isMobile: false, isTablet: false };
const MOBILE: WindowSizeState = { width: 375, height: 812, isMobile: true, isTablet: false };

// Hook mock — real window o'lchamiga bog'lanib qolmaslik uchun
vi.mock('~hooks/useWindowSize', () => ({
    default: vi.fn<() => WindowSizeState>(() => ({
        width: 1440,
        height: 900,
        isMobile: false,
        isTablet: false,
    })),
}));

// t() kalitning o'zini qaytaradi — tarjima fayliga bog'liq bo'lmaymiz
vi.mock('~hooks/useLanguage', () => ({
    default: () => ({
        t: (key: string) => key,
        translate: () => '',
        lang: 'uz',
        setLang: vi.fn(),
    }),
}));

// Og'ir UI kutubxonani yengil stub bilan almashtirish — test tez va barqaror bo'ladi
vi.mock('antd', () => ({
    Button: ({ children, onClick, size, icon }: StubButtonProps) => (
        <button onClick={onClick} data-size={size}>
            {icon}
            {children}
        </button>
    ),
    Flex: ({ children, className }: StubFlexProps) => <div className={className}>{children}</div>,
}));

describe('PageHeader', () => {
    beforeEach(() => {
        const mock = vi.mocked(useWindowSize);
        mock.mockReset();
        mock.mockReturnValue(DESKTOP);
    });

    it('sarlavha va tavsifni ko\'rsatadi', () => {
        render(<PageHeader title='items' subtitle='items_subtitle' />);

        expect(screen.getByRole('heading', { name: 'items' })).toBeInTheDocument();
        expect(screen.getByText('items_subtitle')).toBeInTheDocument();
    });

    it('yangilash tugmasi bosilganda onRefresh chaqiriladi', async () => {
        const user = userEvent.setup();
        const onRefresh = vi.fn();

        render(<PageHeader title='items' refreshButton onRefresh={onRefresh} />);
        await user.click(screen.getByRole('button', { name: /refresh/i }));

        expect(onRefresh).toHaveBeenCalledTimes(1);
    });

    it("isBtnIsVisible berilmasa asosiy tugma ko'rinmaydi", () => {
        render(<PageHeader title='items' buttonText='item_add' />);

        expect(screen.queryByRole('button', { name: 'item_add' })).not.toBeInTheDocument();
    });

    it('asosiy tugma bosilganda handleClick chaqiriladi', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <PageHeader
                title='items'
                isBtnIsVisible
                buttonText='item_add'
                handleClick={handleClick}
            />,
        );
        await user.click(screen.getByRole('button', { name: 'item_add' }));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('mobile holatda tugmalar size="small" bo\'ladi', () => {
        vi.mocked(useWindowSize).mockReturnValue(MOBILE);

        render(<PageHeader title='items' isBtnIsVisible buttonText='item_add' />);

        expect(screen.getByRole('button', { name: 'item_add' })).toHaveAttribute(
            'data-size',
            'small',
        );
    });
});
