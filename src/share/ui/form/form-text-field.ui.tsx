import {Flex, Text, TextField} from "@radix-ui/themes";

export type FormTextFieldProps = TextField.RootProps & {
    label: string;
    error?: string;
}

export function FormTextField({label, error, ...props}: FormTextFieldProps) {
    return (
        <label>
            <Flex align="baseline" justify="between">
                <Text weight="medium">{label}</Text>
                {error && <Text size="1" color="crimson">{error}</Text>}
            </Flex>
            <TextField.Root {...props}/>
        </label>
    )
}