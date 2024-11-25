import { Auth } from "@pages/Auth";
import { Registration } from "@pages/Registration";

export const ROUTES = {
    auth: {
        route: "/",
        element: <Auth />,
    },
    registration: {
        route: "/registration",
        element: <Registration />,
    },
};
