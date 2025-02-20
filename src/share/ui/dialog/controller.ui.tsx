import {Flex, FlexProps} from "@radix-ui/themes";
import {Dialog} from "@/share/ui/dialog/index";

export type ControllerProps = Omit<FlexProps, 'children'>;

export function Controller({...props}: ControllerProps) {
    return (
        <Flex gap="3" justify="end" mt="4" {...props}>
            <Dialog.CancelButton/>
            <Dialog.SubmitButton/>
        </Flex>
    )
}