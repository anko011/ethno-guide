import {Dialog as RadixDialog} from "@radix-ui/themes/components/index";
import {Dialog} from "@radix-ui/themes";
import {VisuallyHidden} from "radix-ui";

export type ContentProps = Dialog.ContentProps;

export function Content({children, ...props}: ContentProps) {
    return (
        <RadixDialog.Content  {...props}>
            <VisuallyHidden.Root>
                <RadixDialog.Description/>
            </VisuallyHidden.Root>
            {children}
        </RadixDialog.Content>
    )
}