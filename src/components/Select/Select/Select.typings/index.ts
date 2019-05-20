export interface ISelectProps {
    current: string;
    label: string;
    arr: string[];
    className?: string;

    onChange: (current: string) => void;
}

export interface ISelectState {
    current: string;
}
