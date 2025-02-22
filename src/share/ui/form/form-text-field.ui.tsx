import {Flex, Text, TextField} from "@radix-ui/themes";

export type FormTextFieldProps = TextField.RootProps & {
    label: string;
    error?: string;
    direction?: 'vertical' | 'horizontal';
}

export function FormTextField({label, error, direction = 'horizontal', ...props}: FormTextFieldProps) {
    const labelElement = <Text weight="medium" size="2">{label}</Text>;
    const errorElement = error && <Text size="1" color="crimson">{error}</Text>
    const inputElement = <TextField.Root {...props}/>

    return (
        <label>
            {direction === 'horizontal' ? (
                <>
                    <Flex align="baseline" justify="between">
                        {labelElement}
                        {errorElement}
                    </Flex>
                    {inputElement}
                </>
            ) : (
                <>
                    {labelElement}
                    {inputElement}
                    {errorElement}
                </>
            )}
        </label>
    )
}