import { User } from '@types';
import { Room } from '@types';
import Cookies from 'js-cookie';


export const RoomsAPI = {
    baseUrl: 'http://localhost:8001',

    getAuthToken() {
        return Cookies.get('access_token');
    },

    async rooms(params?: { name?: string; tags?: number[] }) {
        const authToken = this.getAuthToken();

        if (!authToken) {
            throw new Error('Authorization token is missing.');
        }

        const searchParams: Record<string, string> = {};
        if (params?.name) searchParams.name = params.name;
        if (params?.tags) searchParams.tags = params.tags.join(','); 
        const url = `${this.baseUrl}/feed/?${new URLSearchParams(searchParams).toString()}`;

        const roomsRequest: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        };

        return fetch(url, roomsRequest)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error fetching rooms: ${response.statusText}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Error during fetching rooms:', error);
                throw error;
            });
    },

    async tags() {
        const accessToken = this.getAuthToken();
        const getTagsRequest = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        return fetch(`${this.baseUrl}/tags/`, getTagsRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during get tags', error);
                throw error; 
            });
    },
};


// TODO: remove
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
                throw error; // Обработка ошибки
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
                throw error; // Обработка ошибки
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
                throw error; // Обработка ошибки
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

        return fetch(`${this.baseUrl}opRoom/get_open_rooms?name=${room.name}`, roomsRequest) // Исправлено: добавлен символ ?
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during fetching rooms:', error);
                throw error; // Обработка ошибки
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

        return fetch(`${this.baseUrl}opRoom/get_open_rooms?category=${room.name}`, roomsRequest) // Исправлено: добавлен символ ?
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during fetching rooms:', error);
                throw error; // Обработка ошибки
            });
    },

    async getTags() {
        const accessToken = this.getAuthToken();
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
                throw error; // Обработка ошибки
            });
    },

    async getCategories() {
        const accessToken = this.getAuthToken();
        const getCategoriesRequest = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        return fetch(`${this.baseUrl}categories/get_open_room_categories`, getCategoriesRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during get categories', error);
                throw error; // Обработка ошибки
            });
    },

    async getOpenRooms() {
        const accessToken = this.getAuthToken();
        const getRoomsRequest = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        return fetch(`${this.baseUrl}opRoom/get_open_rooms`, getRoomsRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during get rooms', error);
                throw error; // Обработка ошибки
            });
    },
};
