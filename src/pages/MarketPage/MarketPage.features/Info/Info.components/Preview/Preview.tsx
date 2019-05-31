import * as React from 'react';
import {IMarketPreviewProps} from "./Preview.typings";
import {cn} from "@bem-react/classname";
import IconScale from '@material-ui/icons/LoopOutlined';
import './Preview.scss';

const cnMarketPreview = cn('MarketPreview');

class MarketPreview extends React.Component<IMarketPreviewProps> {
    state: { current: number };

    constructor(props: IMarketPreviewProps) {
        super(props);

        this.state = {current: 0};
    }

    render(): React.ReactNode {
        const {
            className,
            items,
        } = this.props;

        return (
            <div className={className}>
                <div className={cnMarketPreview('Items')}>
                    {items.map((url, i) =>
                        <img
                            onClick={() => {
                                this.setState({current: i});
                            }}
                            key={'preview' + i}
                            src={url} alt={'preview'}
                            className={cnMarketPreview('Image_litle', {current: this.state.current === i})}
                        />)}
                </div>
                <div className={cnMarketPreview('Image')}
                     style={{backgroundImage: `url(${items[this.state.current]})`}}
                ><IconScale className={cnMarketPreview('ScaleBtn')}/></div>
            </div>
        );
    }
}

export default MarketPreview;
