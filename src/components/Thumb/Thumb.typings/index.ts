import {IThumbHeaderProps} from "../Thumb.Components/Thumb-Header/Thumb-Header.typings";
import {IThumbBottomProps} from "../Thumb.Components/Thumb-Bottom/Thumb-Bottom.typings";
import {IThumbContentProps} from "../Thumb.Components/Thumb-Content/Thumb-Content.typings";

export interface IThumbProps extends IThumbHeaderProps, IThumbBottomProps, IThumbContentProps{
    id: string;
}
