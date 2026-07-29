import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // avtomatik qayta urinish yo'q — xato darhol ko'rinsin
            refetchOnWindowFocus: false, // kabinetda keraksiz so'rovlarni oldini oladi
        },
    },
});

const QueryContextProvider = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryContextProvider;
