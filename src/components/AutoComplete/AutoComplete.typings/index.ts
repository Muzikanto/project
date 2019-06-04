import {ChangeEvent} from "react";

export interface IAutoCompleteProps {
    items: string[];
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    filterSuggestions?: boolean;
}
