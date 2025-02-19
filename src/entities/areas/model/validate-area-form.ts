import {areaFormSchema} from "./area-form-schema";

export function validateAreaForm(formData?: FormData) {
    return areaFormSchema.safeParse({
        title: formData?.get('title'),
        d: formData?.get('d'),
    });
}