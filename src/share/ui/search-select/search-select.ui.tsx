'use client'

import {startTransition, useMemo, useState} from "react";
import {Combobox, ComboboxItem, ComboboxList, ComboboxProvider} from "@ariakit/react";
import * as RadixSelect from "@radix-ui/react-select";
import {CheckIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {ChevronDownIcon, Text} from "@radix-ui/themes";
import {matchSorter} from "match-sorter";
import cn from "classnames";

import styles from './styles.module.css';


export type SearchSelectProps<T> = {
    data: T,
    placeholder?: string,
    name?: string;
    disabled?: boolean;
    defaultValue?: string;
};

export function SearchSelect<T extends { value: string; label: string }>(
    {
        data,
        placeholder,
        defaultValue,
        ...props
    }: SearchSelectProps<T[]>) {
    const [value, setValue] = useState(defaultValue ?? '');
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const matches = useMemo(() => {
        if (!searchValue) return data;
        const keys = ["label", "value"];
        const matches = matchSorter(data, searchValue, {keys});
        const selected = data.find((lang) => lang.value === value);
        if (selected && !matches.includes(selected)) {
            matches.push(selected);
        }
        return matches;
    }, [data, searchValue, value]);

    return (
        <RadixSelect.Root
            value={value}
            onValueChange={setValue}
            open={open}
            onOpenChange={setOpen}
            {...props}
        >
            <ComboboxProvider
                open={open}
                setOpen={setOpen}
                resetValueOnHide
                includesBaseElement={false}
                setValue={(value) => {
                    startTransition(() => {
                        setSearchValue(value);
                    });
                }}
            >
                <RadixSelect.Trigger className={cn(styles.select, !!value && styles.selectHolder)}>
                    <RadixSelect.Value placeholder={placeholder}/>
                    <RadixSelect.Icon className={styles.selectIcon}>
                        <ChevronDownIcon/>
                    </RadixSelect.Icon>
                </RadixSelect.Trigger>
                <RadixSelect.Content
                    role="dialog"
                    position="popper"
                    className={styles.popover}
                    sideOffset={4}
                    alignOffset={-16}
                >
                    <div className={styles.comboboxWrapper}>
                        <div className={styles.comboboxIcon}>
                            <MagnifyingGlassIcon/>
                        </div>
                        <Combobox
                            autoSelect
                            placeholder={placeholder}
                            className={styles.combobox}
                            onBlurCapture={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                            }}
                        />
                    </div>
                    <ComboboxList className={styles.listbox}>
                        {matches.map(({label, value}) => (
                            <RadixSelect.Item
                                key={value}
                                value={value}
                                asChild
                                className={styles.item}
                            >
                                <ComboboxItem>
                                    <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                                    <RadixSelect.ItemIndicator className={styles.itemIndicator}>
                                        <CheckIcon/>
                                    </RadixSelect.ItemIndicator>
                                </ComboboxItem>
                            </RadixSelect.Item>
                        ))}
                        {matches.length === 0 && <Text>Ничего не найдено...</Text>}
                    </ComboboxList>
                </RadixSelect.Content>
            </ComboboxProvider>
        </RadixSelect.Root>
    );
}
