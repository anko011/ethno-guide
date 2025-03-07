import {Content, type ContentProps} from "./content.ui";
import {Root, type RootProps} from "./root.ui";
import {Toolbar} from "./toolbar.ui";

export const Editor = {Root, Content, Toolbar};
export type Editor = { ContentProps: ContentProps, RootProps: RootProps };
export {type EditorContentItem} from "./editor";
export {contentItemsToHtml} from "./utils";

export {TextContent, HeadingContent, ListContent, ImageContent, LinkContent} from "./components.ui";