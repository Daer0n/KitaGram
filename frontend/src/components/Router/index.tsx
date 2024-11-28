import { ROUTES } from '@constants';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {Object.values(ROUTES).map((route, index) => (
                    <Route key={index} path={route.route} element={route.element} />
                ))}
            </Routes>
        </BrowserRouter>
    );
};
