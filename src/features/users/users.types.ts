export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password?: string; // optionnel à l'affichage
}

export type CreateUserPayload = {
    name: string;
    username: string;
    email: string;
    password: string;
};

export type UpdateUserPayload = {
    id: number;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
};
