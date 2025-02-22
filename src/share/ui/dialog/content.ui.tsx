import {Dialog as RadixDialog} from "@radix-ui/themes/components/index";
import {Dialog} from "@radix-ui/themes";

export type ContentProps = Dialog.ContentProps;

export function Content({children, ...props}: ContentProps) {
    return (
        <RadixDialog.Content aria-describedby={undefined} {...props}>
            {children}
        </RadixDialog.Content>
    )
}