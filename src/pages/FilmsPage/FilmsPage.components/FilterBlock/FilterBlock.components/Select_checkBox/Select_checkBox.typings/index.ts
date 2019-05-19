export interface ISelectCheckBoxProps {
    className?: string;

    arr: string[];
    label: string;
    current: string[];

    onChange: (current: string[]) => void;
}

export interface ISelectCheckBoxState {
    current: string[];
}
