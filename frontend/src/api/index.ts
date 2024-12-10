import { User } from '@types';

export const API = {
    baseUrl: 'http://158.220.107.252/',

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
};
