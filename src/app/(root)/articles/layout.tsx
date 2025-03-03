import {ReactNode} from "react";

import {Box, ScrollArea, Text} from "@radix-ui/themes";

import {getAllPopulationsByArea, Nation, NationsNavigationList} from "@/entities/nations";
import {Accordion} from "@/share/ui/accordion";

import {Sidebar} from "../sidebar.ui";
import {Area, getAllAreas} from "@/entities/areas";


async function getNationsByAreas(): Promise<Map<Area, Nation[]>> {
    const nationsByAreaMap = new Map<Area, Nation[]>();
    const areas = await getAllAreas();

    const populationsPromises = areas.map(async (area) => {
        const populations = await getAllPopulationsByArea(area.id);
        nationsByAreaMap.set(area, populations.map(({nation}) => nation));
    });

    await Promise.all(populationsPromises);

    return nationsByAreaMap;
}

export default async function ArticlesLayout({children}: { children: ReactNode }) {
    const areasMap = await getNationsByAreas();
    const areas = Array.from(areasMap.keys());
    return (
        <>
            <Box gridArea="n">
                <Sidebar>
                    <Box pr="3" asChild>
                        <ScrollArea>
                            <Accordion.Root type="single" defaultValue="item-1" collapsible>
                                {areas.map((area) => (
                                    <Accordion.Item key={area.id} value={area.id}>
                                        <Accordion.Trigger>
                                            <Text style={{height: '100%'}}>
                                                {area.title}
                                            </Text>
                                        </Accordion.Trigger>
                                        <Accordion.Content>
                                            <NationsNavigationList nations={areasMap.get(area) ?? []} slug="/articles"/>
                                        </Accordion.Content>
                                    </Accordion.Item>
                                ))}
                            </Accordion.Root>
                        </ScrollArea>
                    </Box>
                </Sidebar>
            </Box>
            <Box gridArea="c">
                {children}
            </Box>
        </>
    )
}