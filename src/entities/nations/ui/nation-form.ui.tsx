'use client'

import {type DetailedHTMLProps, type FormHTMLAttributes, useActionState, useState} from "react";

import {Pencil1Icon, PlusIcon, TrashIcon} from "@radix-ui/react-icons";
import {Flex, IconButton, Inset, ScrollArea, Text, Tooltip} from "@radix-ui/themes";

import {type Area} from "@/entities/areas";
import {FormTextField} from "@/share/ui/form";
import {Dialog} from "@/share/ui/dialog";

import {type Population} from "../model/population";
import {type Nation} from "../model/nation";

import {PopulationForm, PopulationFormResult} from "./population-form.ui";
import {PopulationsTable} from "./population-table.ui";
import {populationAction} from "./population-action";

export type NationFormState = {
    isSuccess: false;
    name?: string[];
    populations?: string[];
} | {
    isSuccess: true;
}

export type NationFormProps =
    Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'action'>
    & {
    action: (state: NationFormState, formData?: FormData) => Promise<NationFormState> | NationFormState;
    areas: Area[];
    nation?: Nation;
    populations?: Population[];
}


export function NationForm(
    {
        areas,
        nation,
        children,
        action,
        populations: defaultPopulations,
        ...props
    }: NationFormProps) {
    async function formAction(prevState: NationFormState, formData?: FormData): Promise<NationFormState> {
        populations.forEach(population => {
            formData?.append(`population:${population.area.id}`, population.count.toString());
        })

        return action(prevState, formData);
    }

    const [formResult, act, pending] = useActionState<NationFormState>(formAction, {isSuccess: false});
    const [isOpenPopulationDialog, setIsOpenPopulationDialog] = useState<boolean>(false);
    const [populations, setPopulations] = useState<{ area: Area; count: number }[]>(defaultPopulations ?? []);
    const [editPopulation, setEditPopulation] = useState<PopulationFormResult | null>(null);

    function handleSavePopulationForm(population: PopulationFormResult) {
        setPopulations(
            (prev) => {
                if (prev.map(({area}) => area.id).includes(population.area.id)) {
                    return prev.map(
                        (item) => item.area.id === population.area.id ? population : item);
                }

                return [...prev, population]
            }
        );
        setIsOpenPopulationDialog(false);
    }

    function handleEditPopulation(population: PopulationFormResult) {
        return () => {
            setEditPopulation(population);
            setIsOpenPopulationDialog(true);
        }
    }

    function handleDeletePopulation(deletablePopulation: PopulationFormResult) {
        const key = `${deletablePopulation.area.id}:${deletablePopulation.count}`;
        return () => {
            setPopulations((prev) => prev.filter((population) => `${population.area.id}:${population.count}` !== key));
        }
    }

    return (
        <Flex direction="column" gap="2" asChild>
            <form action={act} {...props}>
                <FormTextField label="Название"
                               name="name"
                               placeholder="Введите название нации"
                               type="text"
                               defaultValue={nation?.name}
                               error={!formResult.isSuccess ? formResult?.name?.at(0) : undefined}
                               disabled={pending}
                />
                <Flex justify="between" align="baseline">
                    <Text weight="medium">Население по регионам</Text>
                    {!formResult.isSuccess && <Text size="1" color="crimson">{formResult.populations?.at(0)}</Text>}
                </Flex>
                <Flex direction="column" gap="2">

                    <Dialog.Root open={isOpenPopulationDialog}
                                 onOpenChange={setIsOpenPopulationDialog}
                                 backWhenClose={false}
                                 defaultOpen={false}
                    >

                        <Tooltip content="Добавить позицию">
                            <Dialog.Trigger>
                                <IconButton onClick={() => setEditPopulation(null)}>
                                    <PlusIcon/>
                                </IconButton>
                            </Dialog.Trigger>
                        </Tooltip>
                        <Inset side="x">
                            <ScrollArea style={{maxHeight: 512}}>
                                <PopulationsTable populations={populations}
                                                  actions={(population) => (
                                                      <Flex gap="2">
                                                          <Tooltip content="Редактировать позицию">
                                                              <Dialog.Trigger>
                                                                  <IconButton
                                                                      onClick={handleEditPopulation(population)}>
                                                                      <Pencil1Icon/>
                                                                  </IconButton>
                                                              </Dialog.Trigger>
                                                          </Tooltip>

                                                          <Tooltip content="Удалить позицию">
                                                              <IconButton type="button"
                                                                          color="crimson"
                                                                          onClick={handleDeletePopulation(population)}>
                                                                  <TrashIcon/>
                                                              </IconButton>
                                                          </Tooltip>
                                                      </Flex>
                                                  )}
                                />
                            </ScrollArea>
                        </Inset>

                        <Dialog.Content width="370px">
                            <Dialog.Title>{editPopulation ? "Редактирование позиции" : "Создание позиции"}</Dialog.Title>
                            <PopulationForm areas={areas}
                                            population={editPopulation}
                                            action={populationAction}
                                            onSave={handleSavePopulationForm}
                            >
                                <Dialog.Controller/>
                            </PopulationForm>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>

                {children}
            </form>
        </Flex>
    )
}