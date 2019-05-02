import {IStore} from "../../reducers/typings";
import {actionChessSend} from "../../actions/Chess";
import {connect} from "react-redux";
import Chess from "./Chess";

const mapStateToProps = (store: IStore) => ({
    state: store.Chess,
});

const mapActionsToProps = {
    actionChessSend
};

export default connect(mapStateToProps, mapActionsToProps)(Chess);
