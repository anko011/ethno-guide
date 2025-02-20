import {Dialog} from "@radix-ui/themes";

export function Title({children, ...props}: Dialog.TitleProps) {
    return (
        <Dialog.Title {...props}>{children}</Dialog.Title>
    )
}