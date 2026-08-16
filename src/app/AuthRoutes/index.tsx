import { Navigate, Route, Routes } from 'react-router-dom';
import AcceptInvitePage from '~pages/AcceptInvite';
import LoginPage from '~pages/Login';

const AuthRoutes = () => (
    <Routes>
        <Route path='/login' element={<LoginPage />} />
        {/* Taklif havolasi: /accept-invite?token=… — sessiyasiz ochiladi */}
        <Route path='/accept-invite' element={<AcceptInvitePage />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
);

export default AuthRoutes;
