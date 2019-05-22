import Avatar from "@material-ui/core/Avatar";
import * as React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import {IThumbHeaderProps} from "./Thumb-Header.typings";
import ThumbMenu from "../Thumb-Menu/Thumb-Menu";
import {parseDate} from "../../../../utils/parseDate";

class ThumbHeader extends React.Component<IThumbHeaderProps> {
    render(): React.ReactNode {
        const {
            name,
            date,
            avatar,
            className,
            menuItems,
        } = this.props;

        return (
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe">
                        {avatar.slice(0, 1).toUpperCase() || 'T'}
                    </Avatar>
                }
                action={<ThumbMenu items={menuItems}/>}
                titleTypographyProps={{variant: 'h5'}}
                title={name}
                subheader={parseDate(date)}
                className={className}
            />
        )
    }
}

export default ThumbHeader;
