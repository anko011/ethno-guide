import {Flex, Text, TextArea, TextAreaProps} from "@radix-ui/themes";

export type FormTextAreaFieldProps = TextAreaProps & {
    label: string;
    error?: string;
}

export function FormTextAreaField({label, error, ...props}: FormTextAreaFieldProps) {
    return (
        <label>
            <Flex align="baseline" justify="between">
                <Text weight="medium">{label}</Text>
                {error && <Text size="1" color="crimson">{error}</Text>}
            </Flex>
            <TextArea {...props}/>
        </label>
    )
}