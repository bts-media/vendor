import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '~pages/Login';

const AuthRoutes = () => (
    <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
);

export default AuthRoutes;
