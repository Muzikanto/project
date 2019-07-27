import {IFilmTypings} from "../../../../reducers/Films/Films.typings";

export interface ISelectProps {
    current: string;
    label: string;
    arr: string[];
    className?: string;

    onChange: (current: IFilmTypings.Sort) => void;
}
