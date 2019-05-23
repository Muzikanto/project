export interface ISnackBarProps {
    text: string;
    open: boolean;

    handleClose: () => void;
}