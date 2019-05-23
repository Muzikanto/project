import * as React from 'react';
import './Progress.css';
import {IProgressProps} from "./Progress.typings";
import {cn} from "@bem-react/classname";
import LinearProgress from '@material-ui/core/LinearProgress';
import {connect} from "react-redux";
import {IStore} from "../../reducers/typings";

const cnProgress = cn('LineProgress');

class Progress extends React.Component<IProgressProps>{
    render(): React.ReactNode {
        const {show} = this.props;

        return (<LinearProgress className={cnProgress({show})}/>)
    }
}

const mapStateToProps = (store: IStore) => ({
    show: store.OtherReducer.showProgress,
});

export default connect(mapStateToProps, {})(Progress);
