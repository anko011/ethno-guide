import {Flex, Select, Text} from "@radix-ui/themes";

export type FormSelectorFieldProps = Select.RootProps & {
    items: { value: string; label: string }[];
    label: string;
    error?: string;

}

export function FormSelectorField({label, error, items, ...props}: FormSelectorFieldProps) {
    return (
        <Flex align="baseline" gap="2" asChild>
            <label>
                <Text weight="medium">{label}</Text>

                <Select.Root {...props} >
                    <Select.Trigger/>
                    <Select.Content>
                        {items.map(({label, value}) => (
                            <Select.Item key={value} value={value}>{label}</Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>

                {error && <Text size="1" color="crimson">{error}</Text>}
            </label>
        </Flex>
    )
}