import {ZodError} from "zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// import {type Role, type User} from "@/entities/users/model/user"; - заккоментил для теста
import {Role, type User} from "@/entities/users/model/user";
//import {findUser} from "@/entities/users/api/repository"; - заккоментил для теста

import {signInSchema} from "./sign-in-schema";
import {NotFoundUserError} from "./user-not-fount-error";


// Моковые данные для тестирования
const mockUsers: Record<string, User> = {
    "test-author": {
        id: "1",
        fullName: "Test Author",
        email: "author@example.com",
        role: Role.AUTHOR,
        // password: "password", // Простой пароль для теста
    },
    "test-moderator": {
        id: "2",
        fullName: "Test Moderator",
        email: "moderator@example.com",
        role: Role.MODERATOR,
        // password: "password", // Простой пароль для теста
    },
};

const handler = NextAuth({
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.fullName = user.fullName;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id as string;
                session.user.fullName = token.fullName as string;
                session.user.email = token.email as string;
                session.user.role = token.role as Role
            }
            return session;
        },
    },
    providers: [
        Credentials({
            credentials: {
                fullName: {},
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user: User | undefined = undefined;

                try {
                    const {email} = await signInSchema.parseAsync(credentials);
                    // const {email, password} = await signInSchema.parseAsync(credentials);
                    // user = await findUser(email, password);
                    // Вместо findUser используем моковые данные
                    user = Object.values(mockUsers).find(
                        u => u.email === email
                        //  && u.password === password
                    );
                } catch (error) {
                    if (error instanceof ZodError)
                        return null;
                }

                if (!user) throw new NotFoundUserError();

                return user;
            },
        }),
    ],
})

export const {signIn, signOut, auth, handlers} = handler;
