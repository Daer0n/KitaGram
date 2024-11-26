import { Auth } from '@pages/Auth';
import { Registration } from '@pages/Registration';
import { Home } from '@pages/Home';

export const ROUTES = {
    auth: {
        route: '/',
        element: <Auth />,
    },
    registration: {
        route: '/registration',
        element: <Registration />,
    },
    home: {
        route: '/home',
        element: <Home />,
    },
};
