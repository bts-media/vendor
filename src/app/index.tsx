import { useAuthContext } from '~context/AuthProvider';
import ThemeProvider from '~context/ThemeProvider';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';

function App() {
    const { isAuthenticated } = useAuthContext();

    return <ThemeProvider>{isAuthenticated ? <AppRoutes /> : <AuthRoutes />}</ThemeProvider>;
}

export default App;
