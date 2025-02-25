import {ZodError} from "zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {type Role, type User} from "@/entities/users/model/user";
import {findUser} from "@/entities/users/api/repository";

import {signInSchema} from "./sign-in-schema";
import {NotFoundUserError} from "./user-not-fount-error";


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
                    const {email, password} = await signInSchema.parseAsync(credentials);
                    user = await findUser(email, password);
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
