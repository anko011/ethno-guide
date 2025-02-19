'use client'

import {type DetailedHTMLProps, type FormHTMLAttributes, useActionState} from "react";
import {Flex} from "@radix-ui/themes";

import {FormTextAreaField, FormTextField} from "@/share/ui/form";

import {type Area} from "../model/area";

export type AreaFormState = {
    areaId?: string;
    title?: string[];
    d?: string[];
} | null

export type AreaFormProps = Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'action'> & {
    action: (state: AreaFormState) => Promise<AreaFormState> | AreaFormState;
    area?: Area;
}

export function AreaForm({area, children, action, ...props}: AreaFormProps) {
    const [formResult, act, pending] = useActionState<AreaFormState>(action, null);
    return (
        <Flex direction="column" gap="2" asChild>
            <form action={act} {...props}>
                <FormTextField label="Название"
                               name="title"
                               placeholder="Введите название региона"
                               type="text"
                               defaultValue={area?.title}
                               error={formResult?.title?.at(0)}
                               disabled={pending}
                />

                <FormTextAreaField label="Контур карты"
                                   name="d"
                                   placeholder="Введите параметры 'd' svg представления региона..."
                                   defaultValue={area?.d}
                                   error={formResult?.d?.at(0)}
                                   disabled={pending}
                />

                {children}
            </form>
        </Flex>
    )
}