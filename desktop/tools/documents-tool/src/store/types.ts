export enum DTPageType {
    Home,
    Word,
    Markdown,
    Translation,
    Mind,
    Flow,
}

export enum DTSidebarShowType {
    Hidden,
    Minimize,
    Small,
    Normal,
}

export interface DTSidebarState {
    showType: DTSidebarShowType;
}

export interface DTRootState {
    Page: DTPageType;
    Sidebar: DTSidebarState;
}