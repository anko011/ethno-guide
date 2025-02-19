import {userFormSchema} from "./user-form-schema";

export function validateUserForm(formData?: FormData) {
    return userFormSchema.safeParse({
        fullName: formData?.get('fullName'),
        email: formData?.get('email'),
        role: formData?.get('role'),
    });
}