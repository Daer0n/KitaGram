import { Auth } from '@pages/Auth';
import { Registration } from '@pages/Registration';
import { Home } from '@pages/Home';
import { Options } from '@pages/Options';
import { CreateRoom } from '@pages/CreateRoom';
import { Account } from '@pages/Account';

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
    account: {
        route: '/options/account',
        element: <Account />,
    },
    createRoom: {
        route: '/create-room',
        element: <CreateRoom />,
    },
};
