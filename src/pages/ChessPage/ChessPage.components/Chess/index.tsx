import {IStore} from "../../../../reducers/typings";
import {actionChessSend, actionChessJoin, actionChessStartGame} from "../../../../actions/Chess";
import {connect} from "react-redux";
import Chess from "./Chess";

const mapStateToProps = (store: IStore) => ({
    state: store.Chess.state,
    users: store.Chess.users,
});

const mapActionsToProps = {
    actionChessSend,
    actionChessStartGame,
    actionChessJoin
};

export default connect(mapStateToProps, mapActionsToProps)(Chess);
