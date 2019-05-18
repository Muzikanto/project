import {IStore} from "../../../../reducers/typings";
import {actionDialogOpen} from "../../../../actions/Dialog";
import {connect} from "react-redux";
import * as React from "react";
import {IThumbBottomContainerProps} from "./Thumb-Bottom.typings";
import UI from "./Thumb-Bottom";

class ThumbBottom extends React.Component<IThumbBottomContainerProps> {
    render(): React.ReactNode {
        const {stars, share, isLiked} = this.props;

        return (
            <UI
                isLiked={isLiked}
                share={share}
                stars={stars}
                setIsFavorite={this.setIsFavorite}
            />
        );
    }

    private setIsFavorite = () => {
        if (!this.props.isLiked) {
            this.props.actionDialogOpen({open: true, value: this.props.stars, id: this.props.id});
        }
    };
}


const mapStateToProps = (_: IStore) => ({});

const mapDispatchesToProps = {
    actionDialogOpen
};

export default connect(mapStateToProps, mapDispatchesToProps)(ThumbBottom);
