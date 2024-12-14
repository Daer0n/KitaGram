export type Room = {
    name: string;
};

export type User = {
    email: string;
    nickname: string;
    password: string;
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
