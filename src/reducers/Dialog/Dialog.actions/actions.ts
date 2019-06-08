import {IDialogOptions} from "../Dialog.typings";
import {DIALOG_ACTIONS} from "./keys";

export const actionDialogProps = (data: Partial<IDialogOptions>) => ({
    data,
    type: DIALOG_ACTIONS.SET,
} as const);
