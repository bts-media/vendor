import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import NotificationProvider from '~components/NotificationProvider';
import AuthProvider from '~context/AuthProvider';
import LanguageProvider from '~context/LanguageProvider';
import QueryContextProvider from '~context/QueryProvider';
import App from './app';
import './styles/globals/index.css';

// Provider tartibi muhim — pastdagilar yuqoridagilarga tayanadi.
ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <QueryContextProvider>
            <BrowserRouter>
                <NotificationProvider>
                    <LanguageProvider>
                        <App />
                    </LanguageProvider>
                </NotificationProvider>
            </BrowserRouter>
        </QueryContextProvider>
    </AuthProvider>,
);
