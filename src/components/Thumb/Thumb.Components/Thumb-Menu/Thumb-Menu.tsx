import * as React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {IThumbMenuProps} from "./Thumb-Menu.typings";
import {IconButton} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class ThumbMenu extends React.Component<IThumbMenuProps> {
    state = {
        anchorEl: null,
    };

    protected handleClick = (event: any) => {
        this.setState({anchorEl: event.currentTarget});
    };

    protected handleClose = () => {
        this.setState({anchorEl: null});
    };

    protected clickItem = (action: () => void) => () => {
        action();
        this.handleClose();
    };

    render(): React.ReactNode {
        const {items} = this.props;

        return (
            <>
                <div onClick={this.handleClick}>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 48 * 4.5,
                            width: 150,
                        },
                    }}
                >
                    {
                        items.map(el =>
                            <MenuItem key={'Menu-Item-' + el.text} selected={false} onClick={this.clickItem(el.action)}>
                                {el.text}
                            </MenuItem>
                        )
                    }
                </Menu>
            </>

        );
    }
}

export default ThumbMenu;
