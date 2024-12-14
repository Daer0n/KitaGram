import { User } from '@types';
import { Room } from '@types';
import Cookies from 'js-cookie';

export const API = {
    baseUrl: 'http://158.220.107.252/',

    getAuthToken() {
        return Cookies.get('access_token');
    },

    async signIn(user: Pick<User, 'nickname' | 'password'>) {
        const signInRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: user.nickname,
                password: user.password,
            }),
        };

        return fetch(`${this.baseUrl}auth/sign_in`, signInRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during login:', error);
            });
    },

    async signUp(user: Pick<User, 'nickname' | 'email' | 'password'>) {
        const signUpRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceToken: 'a6195f35-e874-448c-b603-a22e70b7755a',
                email: user.email,
                nickname: user.nickname,
                password: user.password,
            }),
        };

        return fetch(`${this.baseUrl}auth/sign_up`, signUpRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during sign up:', error);
            });
    },
    async rooms() {
        const authToken = this.getAuthToken();

        if (!authToken) {
            throw new Error('Authorization token is missing.');
        }

        const roomsRequest = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
                deviceToken: 'a6195f35-e874-448c-b603-a22e70b7755a',
            },
        };

        return fetch(`${this.baseUrl}opRoom/get_open_rooms`, roomsRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during fetching rooms:', error);
                throw error
            });
    },
    async roomsByName(room: Pick<Room, 'name'>) {
        const authToken = this.getAuthToken();

        if (!authToken) {
            throw new Error('Authorization token is missing.');
        }

        const roomsRequest = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
                deviceToken: 'a6195f35-e874-448c-b603-a22e70b7755a',
            },
        };

        // TODO: change url
        return fetch(`${this.baseUrl}opRoom/get_open_rooms&name=${room.name}`, roomsRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during fetching rooms:', error);
                throw error
            });
    },
    async roomsByCategory(room: Pick<Room, 'name'>) {
        const authToken = this.getAuthToken();

        if (!authToken) {
            throw new Error('Authorization token is missing.');
        }

        const roomsRequest = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
                deviceToken: 'a6195f35-e874-448c-b603-a22e70b7755a',
            },
        };

        // TODO: change url
        return fetch(`${this.baseUrl}opRoom/get_open_rooms&category=${room.name}`, roomsRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during fetching rooms:', error);
                throw error

    async getTags() {
        const accessToken = Cookies.get('access_token');
        const getTagsRequest = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        return fetch(`${this.baseUrl}tags/get_tags`, getTagsRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during get tags', error);
            });
    },

    async getCategories() {
        const accessToken = Cookies.get('access_token');
        const getCategoriesRequest = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     categoriesID: [
            //         'cca7c4b2-f3ac-4caa-9b72-2df4f6e91f93',
            //         '8c6f025f-b414-481d-b57b-5e226e90f105',
            //     ],
            // }),
        };
        return fetch(`${this.baseUrl}categories/get_open_room_categories`, getCategoriesRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during get tags', error);
            });
    },

    async getOpenRooms() {
        const accessToken = Cookies.get('access_token');
        const getTagsRequest = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        return fetch(`${this.baseUrl}opRoom/get_open_rooms`, getTagsRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during get rooms', error);
            });
    },
};
