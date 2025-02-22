import {formSchema, itemSchema} from "./nation-form-schema";

type Return = {
    isSuccess: true,
    name: string,
    populations: { areaId: string, count: number }[]
} | {
    isSuccess: false,
    name?: string[],
    populations?: string[]
}



export function validateNationForm(formData?: FormData): Return {
    if (!formData) return {isSuccess: false};

    const nameResult = formSchema.safeParse({name: formData.get('name')});
    formData.delete('name');

    const populations: { areaId: string, count: number }[] = [];
    const errors: Record<string, string[]> = {};

    for (const [key, value] of formData.entries()) {
        if (formData.getAll(key).length !== 1) {
            errors.populations = ['Значения должны быть уникальными'];
            continue;
        }

        const areaId = key.split(':').at(-1);
        const count = value;

        const result = itemSchema.safeParse({areaId, count});

        if (!result.success) {
            Object.assign(errors, result.error.flatten().fieldErrors);
        } else {
            populations.push(result.data);
        }
    }

    if (!nameResult.success) {
        Object.assign(errors, nameResult.error.flatten().fieldErrors);
    }

    if (Object.keys(errors).length > 0) {
        return {isSuccess: false, ...errors};
    }

    return nameResult.success ? {
        isSuccess: true,
        name: nameResult.data.name,
        populations
    } : {isSuccess: false, ...errors};
}