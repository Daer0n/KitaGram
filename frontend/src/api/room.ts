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

    async createRoom(room: Room) {
        const accessToken = this.getAuthToken();
        const createRoomRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                name: room.name,
                description: room.description,
                image_url: room.image_url,
                category: room.category,
                tags: room.tags,
                datetime: room.datetime,
                location: room.location,
                participants_limit: room.participants_limit,
            }),
        };
        return fetch(`${this.baseUrl}/rooms/`, createRoomRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during get tags', error);
                throw error;
            });
    },

    async uploadPhoto(file: File) {
        const accessToken = Cookies.get('access_token');
        const formData = new FormData();
        formData.append('image', file);

        const uploadPhotoRequest = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        };

        try {
            const response = await fetch(
                `${RoomsAPI.baseUrl}/photos/upload_photo/`,
                uploadPhotoRequest,
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during upload photo:', error);
        }
    },

    async getJoinedRooms() {
        const authToken = this.getAuthToken();

        if (!authToken) {
            throw new Error('Authorization token is missing.');
        }

        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        };

        return fetch(`${this.baseUrl}/rooms/joined/`, request)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
                console.error('Error during fetching rooms:', error);
                throw error;
            });
    },

    async joinIntoRoom(roomID: number) {
        const authToken = this.getAuthToken();

        if (!authToken) {
            throw new Error('Authorization token is missing.');
        }

        const request = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        };

        return fetch(`${this.baseUrl}/rooms/${roomID}/join/`, request)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
                console.error('Error during joining into the room:', error);
                throw error;
            });
    },

    async leaveRoom(roomID: number) {
        const authToken = this.getAuthToken();

        if (!authToken) {
            throw new Error('Authorization token is missing.');
        }

        const request = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        };

        return fetch(`${this.baseUrl}/rooms/${roomID}/leave/`, request)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
                console.error('Error during joining into the room:', error);
                throw error;
            });
    },

    async getRoomParticipants(roomId: any) {
        const authToken = this.getAuthToken();

        if (!authToken) {
            throw new Error('Authorization token is missing.');
        }

        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        };

        return fetch(`${this.baseUrl}/rooms/${roomId}/participants/`, request)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
                console.error('Error during fetching rooms:', error);
                throw error;
            });
    },
};
