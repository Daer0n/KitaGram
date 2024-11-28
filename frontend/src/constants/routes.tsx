import { Auth } from '@pages/Auth';
import { Registration } from '@pages/Registration';
import { Home } from '@pages/Home';
import { Options } from '@pages/Options';

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
    options: {
        route: '/options',
        element: <Options />,
    },
};
