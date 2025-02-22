import {formSchema} from "./populatoin-from-schema";

type Result = { isSuccess: true, areaId: string, count: number } | {
    isSuccess: false,
    areaId?: string[],
    count?: string[]
};


export function validatePopulationForm(formData?: FormData): Result {
    const result = formSchema.safeParse({
        areaId: formData?.get('areaId'),
        count: formData?.get('count'),
    })

    if (!result.success)
        return {isSuccess: false, ...result.error.flatten().fieldErrors}

    return {
        isSuccess: true,
        areaId: result.data.areaId,
        count: result.data.count,
    };

}