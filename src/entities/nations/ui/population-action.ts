'use server'

import {getArea} from "@/entities/areas";
import {validatePopulationForm} from "../model/validate-population-form";
import {type PopulationFormState} from "./population-form.ui";

export async function populationAction(_: PopulationFormState, formData?: FormData): Promise<PopulationFormState> {
    const result = validatePopulationForm(formData);
    if (!result.isSuccess) return result;
    const area = await getArea(result.areaId)
    return {isSuccess: true, area, count: result.count};
}
