
export * from './room.ts';
export type User = {
    deviceToken: string;
    email: string;
    nickname: string;
    password: string;
    registrationToken: string;
    surname: string;
    telephoneNumber: string;
    username: string;
};

export type Tag = {
    ID: string;
    Name: string;
};

export type Category = {
    id: string;
    name: string;
    have_subcategory: boolean;
};
