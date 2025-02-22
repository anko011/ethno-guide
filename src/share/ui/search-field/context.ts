'use client'

import {createContext, useContext} from "react";

export type SearchFieldContext = {
    query: string;
    focused: boolean;
}

export const SearchFieldContext = createContext<SearchFieldContext | null>(null);

export function useSearchFieldContext() {
    const ctx = useContext(SearchFieldContext);
    if (!ctx) throw new Error("Not provided SearchFieldContext");
    return ctx;
}