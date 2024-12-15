import { User } from '@types';
import Cookies from 'js-cookie';

export const UserAPI = {
    baseUrl: 'http://localhost:8000/',

    generateRandomPhoneNumber(): string {
        const countryCode = '+375';
        const operatorCode = '33';
        const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');

        return `${countryCode}${operatorCode}${number}`;
    },

    async signIn(user: Pick<User, 'nickname' | 'password'>) {
        const formData = new FormData();
        formData.append('username', user.nickname);
        formData.append('password', user.password);

        const signInRequest = {
            method: 'POST',
            body: formData,
        };

        return fetch(`${this.baseUrl}auth/login`, signInRequest)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error during login:', error);
                throw error;
            });
    },

    async signUp(user: User) {
        const signUpRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.nickname,
                surname: user.nickname,
                name: user.nickname,
                role: 'ADMIN',
                img_path: 'https://example.com',
                group_name: '1',
                phone_number: this.generateRandomPhoneNumber(),
                email: user.email,
                password: user.password,
            }),
        };

        return fetch(`${this.baseUrl}auth/singup`, signUpRequest)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Error during sign up:', error);
                throw error;
            });
    },

    async getInfo() {
        const accessToken = Cookies.get('access_token');
        const getInfoRequest = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        };
        return fetch(`${this.baseUrl}user/me`, getInfoRequest)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Error during info about me:', error);
                throw error;
            });
    },

    async uploadPhoto(file: File) {
        const accessToken = Cookies.get('access_token');
        const formData = new FormData();
        formData.append('photo', file);

        const uploadPhotoRequest = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        };

        try {
            const response = await fetch(`${UserAPI.baseUrl}user/me/photo`, uploadPhotoRequest);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during upload photo:', error);
        }
    },

    async deleteUser() {
        const accessToken = Cookies.get('access_token');

        const deleteUserRequest = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            await fetch(`${this.baseUrl}user/me`, deleteUserRequest);
        } catch (error) {
            console.error('Error during deleting user:', error);
            throw error;
        }
    },

    async updateUsername(newUsername: string) {
        const accessToken = Cookies.get('access_token');

        const updateUserRequest = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                username: newUsername,
            }),
        };
        console.log(updateUserRequest);
        try {
            await fetch(`${this.baseUrl}user/me`, updateUserRequest);
        } catch (error) {
            console.error('Error during deleting user:', error);
            throw error;
        }
    },

    async updateEmail(newEmail: string) {
        const accessToken = Cookies.get('access_token');

        const updateUserRequest = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                email: newEmail,
            }),
        };

        try {
            await fetch(`${this.baseUrl}user/me`, updateUserRequest);
        } catch (error) {
            console.error('Error during deleting user:', error);
            throw error;
        }
    },
};
