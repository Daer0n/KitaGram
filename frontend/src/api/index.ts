import { User } from '@types';
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
};
