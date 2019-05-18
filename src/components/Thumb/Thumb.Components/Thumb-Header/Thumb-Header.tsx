import Avatar from "@material-ui/core/Avatar";
import {IconButton} from "@material-ui/core";
import * as React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import {IThumbHeaderProps} from "./Thumb-Header.typings";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class ThumbHeader extends React.Component<IThumbHeaderProps> {
    state = {
        anchorEl: null,
    };

    handleClick = (event: any) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render(): React.ReactNode {
        const {
            title,
            date,
            avatar,
            className,
        } = this.props;

        const {anchorEl} = this.state;

        return (
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe">
                        {avatar.slice(0, 1).toUpperCase()}
                    </Avatar>
                }
                action={
                    <>
                        <div onClick={this.handleClick}>
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        </div>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: 150,
                                },
                            }}
                        >
                            {['test1', 'test2'].map(option => (
                                <MenuItem key={option} selected={option === 'test1'} onClick={this.handleClose}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                }
                titleTypographyProps={{variant: 'h5'}}
                title={title}
                subheader={date}
                className={className}
            />
        )
    }
}

export default ThumbHeader;
