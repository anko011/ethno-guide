import {CredentialsSignin} from "next-auth";

export class NotFoundUserError extends CredentialsSignin {
    constructor() {
        super();
        this.message = `User not found`;
    }
}
