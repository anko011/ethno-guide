'use client'
import {Dialog, Dialog as RadixDialog} from "@radix-ui/themes";
import {useRouter} from "next/navigation";

export type DialogProps = Dialog.RootProps & {
    backWhenClose?: boolean
}

export function Root({children, backWhenClose = true, ...props}: DialogProps) {
    const router = useRouter();

    function handleOpen(isOpen: boolean) {
        if (!isOpen && backWhenClose) router.back();
    }

    return (
        <RadixDialog.Root onOpenChange={handleOpen} defaultOpen {...props}>
            {children}
        </RadixDialog.Root>
    )
}