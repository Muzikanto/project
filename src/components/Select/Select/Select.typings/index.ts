import {IFilmsFilterSort} from "../../../../reducers/Films/Films.typings";

export interface ISelectProps {
    current: string;
    label: string;
    arr: string[];
    className?: string;

    onChange: (current: IFilmsFilterSort) => void;
}

export interface ISelectState {
    current: string;
}
