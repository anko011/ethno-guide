import {Item, type ItemProps} from "./item.ui";
import {Root, type RootProps} from "./root.ui";

export const Navigation = {Root, Item};
export type Navigation = { RootProps: RootProps, ItemProps: ItemProps };