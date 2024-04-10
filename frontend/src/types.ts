export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
}

export type CreateUserRequest = {
    username: string;
    email: string;
    password: string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}