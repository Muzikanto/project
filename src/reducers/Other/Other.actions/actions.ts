import {OTHER_ACTIONS} from "./keys";
import {IOtherOptions} from "../Other.typings";

export const actionOtherProps = (data: Partial<IOtherOptions>) => ({
    data,
    type: OTHER_ACTIONS.SET
} as const);

export const actionCommonShowProgressProps = (progress_show: boolean) => ({
    data: {
        progress_show,
    },
    type: OTHER_ACTIONS.SET
} as const);

export const actionShowSnackBarErrorProps = (snack_text: string) => ({
    data: {
        snack_variant: 'error',
        snack_open: true,
        snack_text,
    },
    type: OTHER_ACTIONS.SET,
} as const);

export const actionShowSnackBarWarningProps = (snack_text: string) => ({
    data: {
        snack_variant: 'warning',
        snack_open: true,
        snack_text,
    },
    type: OTHER_ACTIONS.SET,
} as const);

export const actionShowSnackBarSuccessProps = (snack_text: string) => ({
    data: {
        snack_variant: 'success',
        snack_open: true,
        snack_text,
    },
    type: OTHER_ACTIONS.SET,
} as const);


