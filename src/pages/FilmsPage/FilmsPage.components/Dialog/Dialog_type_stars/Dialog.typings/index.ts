export interface IDialogProps {
    value: number;
    open: boolean;

    handleClose: () => void;
    handleChange: (value: number) => () => void;
}
