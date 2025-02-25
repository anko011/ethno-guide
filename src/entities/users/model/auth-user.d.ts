import {type User as AppUser} from "@/entities/users";

declare module "next-auth" {

    interface Session {
        user: AppUser
    }

    // eslint-disable-next-line
    interface User extends AppUser {
    }
}