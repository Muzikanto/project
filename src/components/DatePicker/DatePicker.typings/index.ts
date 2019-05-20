export interface IDatePicker {
    label: string;
    onChange: (date: Date) => void;
    value: Date;
    className?: string;
}
