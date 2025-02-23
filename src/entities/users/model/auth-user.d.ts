import {type User as AppUser} from "@/entities/users";

declare module "next-auth" {

    interface Session {
        user: AppUser
    }

    interface User extends AppUser {
    }
}