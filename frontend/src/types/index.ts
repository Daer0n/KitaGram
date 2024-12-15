export type Room = {
    name: string;
    description: string;
    image_url: string;
    category: string;
    tags: number[];
    datetime: string;
    location: string;
    participants_limit: number;
};

export type User = {
    email: string;
    nickname: string;
    password: string;
};

export type Tag = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};
