'use client'

import {ReactNode, useActionState} from "react";
import {Flex, Text} from "@radix-ui/themes";

import {type Area} from "@/entities/areas";
import {SearchSelect} from "@/share/ui/search-select";
import {FormTextField} from "@/share/ui/form";

export type PopulationFormState = {
    isSuccess: false;
    areaId?: string[];
    count?: string[];
} | {
    isSuccess: true;
    area: Area;
    count: number;
}

export type PopulationFormResult = { area: Area; count: number }

type PopulationFormProps = {
    areas: Area[];
    children?: ReactNode;
    action: (state: PopulationFormState, formData?: FormData) => Promise<PopulationFormState> | PopulationFormState;
    onSave?: (result: PopulationFormResult) => void;
    population?: PopulationFormResult | null
}

function toSelectValue(area: Area) {
    return {
        value: area.id,
        label: area.title
    }
}

export function PopulationForm({action, population, areas, children, onSave}: PopulationFormProps) {
    async function formAction(state: PopulationFormState, formData?: FormData) {
        const result = await action(state, formData)
        if (result.isSuccess) onSave?.(result)
        return result
    }

    const [formResult, act, isPending] = useActionState<PopulationFormState>(formAction, {isSuccess: false});

    return (
        <form action={act}>
            <Flex direction="column" asChild mb="2">
                <label>
                    <Text weight="medium">Регион</Text>
                    <SearchSelect data={areas.map(toSelectValue)}
                                  placeholder="Выберите регион"
                                  name="areaId"
                                  defaultValue={population?.area?.id}
                                  disabled={isPending}
                    />
                    {!formResult?.isSuccess && <Text color="crimson" size="1">{formResult?.areaId?.at(0)}</Text>}
                </label>
            </Flex>

            <FormTextField label="Количество людей"
                           placeholder="Введите количество людей"
                           name="count"
                           type="number"
                           direction="vertical"
                           defaultValue={population?.count}
                           disabled={isPending}
                           error={!formResult?.isSuccess ? formResult?.count?.at(0) : undefined}
            />

            {children}
        </form>
    )
}
