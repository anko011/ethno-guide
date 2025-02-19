'use client'
import {ReactNode, useState} from "react";
import {Dialog as RadixDialog} from "@radix-ui/themes";
import {useRouter} from "next/navigation";

export type DialogProps = {
    children?: ReactNode;
    title: string;
}

export function Root({children, title}: DialogProps) {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    function handleOpen(isOpen: boolean) {
        setIsOpen(isOpen);
        if (!isOpen) router.back();
    }

    return (
        <RadixDialog.Root open={isOpen} onOpenChange={handleOpen}>
            <RadixDialog.Content aria-describedby={undefined}>
                <RadixDialog.Title>{title}</RadixDialog.Title>
                {children}
            </RadixDialog.Content>
        </RadixDialog.Root>
    )
}