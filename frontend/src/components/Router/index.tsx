import { ROUTES } from '@constants';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.auth.route} element={ROUTES.auth.element} />
                <Route path={ROUTES.registration.route} element={ROUTES.registration.element} />
            </Routes>
        </BrowserRouter>
    );
};
