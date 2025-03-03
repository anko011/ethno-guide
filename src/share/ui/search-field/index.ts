import {Content, type ContentProps} from "./content.ui";
import {Root, type RootProps} from "./root.ui";

export const SearchField = {Root, Content};

export namespace SearchFieldProps {
    export type Root = RootProps;
    export type Content = ContentProps;
}
