import {IFilmTypings} from "../../../../../../reducers/Films/Films.typings";
import {IDialogProps} from "../../../../../../components/Dialog/Dialog.typings";

export interface IDialogContentProps extends IDialogProps {
    film: IFilmTypings.Item;
    filmData: IFilmTypings.ItemPart2 | null;
}
