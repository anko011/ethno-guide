import {Dialog} from "@radix-ui/themes";

export type TriggerProps = Dialog.TriggerProps;

export function Trigger({children, ...props}: TriggerProps) {
    return (
        <Dialog.Trigger {...props}>{children}</Dialog.Trigger>
    )
}