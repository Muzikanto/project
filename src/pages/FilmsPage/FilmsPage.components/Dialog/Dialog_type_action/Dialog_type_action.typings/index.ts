export interface ICommonDialogActionProps extends ICommonDialogActionState{
    btnText: string;
    onSubmit: () => void;
    handleChange: (value: Partial<ICommonDialogActionState>) => void;
}

export interface ICommonDialogActionState {
    id: string;
    name: string;
    date: Date;
    genres: string[];
    preview?: string;
}
