export interface ICommonDialogActionProps extends ICommonDialogActionState{
    btnText: string;
    onSubmit: () => void;
    handleChange: (value: Partial<ICommonDialogActionState>) => void;
}

export interface ICommonDialogActionState {
    name: string;
    date: Date;
    genres: string[];
    image_src?: string;
    trailer_id?: string;
}
