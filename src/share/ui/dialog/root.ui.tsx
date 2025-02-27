'use client'

import {useRouter} from "next/navigation";

import {Dialog, Dialog as RadixDialog} from "@radix-ui/themes";

export type DialogProps = Dialog.RootProps & {
    backWhenClose?: boolean
}

export function Root({children, backWhenClose = true, ...props}: DialogProps) {
    const router = useRouter();

    function handleOpen(isOpen: boolean) {
        if (!isOpen && backWhenClose) {
            router.back();
            router.refresh();
        }
    }

    return (
        <RadixDialog.Root onOpenChange={handleOpen} defaultOpen {...props}>
            {children}
        </RadixDialog.Root>
    )
}