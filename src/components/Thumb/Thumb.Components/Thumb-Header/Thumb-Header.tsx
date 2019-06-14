import Avatar from "@material-ui/core/Avatar";
import * as React from "react";
import {IThumbHeaderProps} from "./Thumb-Header.typings";
import ThumbMenu from "../Thumb-Menu/Thumb-Menu";
import {parseDate} from "../../../../utils/parseDate";
import {Tooltip, CardHeader} from "@material-ui/core";

class ThumbHeader extends React.Component<IThumbHeaderProps> {
    public render(): React.ReactNode {
        const {
            film: {
                name,
                date,
                studio,
            },
            className,
            menuItems,
        } = this.props;

        return (
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe">
                        {studio && typeof studio !== 'object' ? studio.slice(0, 1).toUpperCase() : 'T'}
                    </Avatar>
                }
                action={<ThumbMenu items={menuItems}/>}
                titleTypographyProps={{variant: 'h5'}}
                title={<Tooltip placement={"top"} title={name}><span>{name}</span></Tooltip>}
                subheader={date && typeof date !== 'object' ? parseDate(date) : undefined}
                className={className}
            />
        )
    }
}

export default ThumbHeader;
