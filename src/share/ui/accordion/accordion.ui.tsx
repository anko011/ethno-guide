import React, {ComponentProps} from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import {Box, Flex} from '@radix-ui/themes';

import styles from './accordion.module.css';

const AccordionRoot = AccordionPrimitive.Root;

function AccordionItem({children, ...props}: ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item className={styles.AccordionItem} {...props}>
            {children}
        </AccordionPrimitive.Item>
    )
}

function AccordionTrigger({children, ...props}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className={styles.AccordionTrigger} {...props} >
                <Flex justify="between" align="center" width="100%">
                    {children}
                    <ChevronDownIcon className={styles.AccordionChevron} aria-hidden/>
                </Flex>
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
}

function AccordionContent({children, ...props}: ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content className={styles.AccordionContent} {...props}>
            <Box pb="2">
                {children}
            </Box>
        </AccordionPrimitive.Content>
    )
}

export const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Content: AccordionContent,
    Trigger: AccordionTrigger
};

