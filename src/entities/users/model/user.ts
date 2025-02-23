export enum Role {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    AUTHOR = 'AUTHOR',
}

export type User = {
    id: string;
    fullName: string;
    email: string;
    role: Role;
}