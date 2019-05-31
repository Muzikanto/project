import * as React from 'react';
import {IMarketInfo} from "./Info.typings";
import {cn} from "@bem-react/classname";
import MarketPreview from "./Info.components/Preview/Preview";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import MessIcon from '@material-ui/icons/RateReview'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CopyIcon from '@material-ui/icons/FileCopy'
import Hexagon from "../../MarketPage.components/Hexagon/Hexagon";
import Stars from "../../MarketPage.components/Stars/Stars";
import IconLink from "../../MarketPage.components/IconLink/IconLink";
import './Info.scss';
import MarketPrice from "./Info.components/Price/Price";

const cnMarketInfo = cn('MarketInfo');
const cnMarketInfoHeader = cn('MarketInfoHeader');

class MarketInfo extends React.Component<IMarketInfo> {
    render(): React.ReactNode {
        const {
            className,
            previews,
        } = this.props;

        return (
            <div className={cnMarketInfo('', [className])}>
                <MarketPreview className={cnMarketInfo('Preview')}
                               items={previews}
                />
                <div className={cnMarketInfo('Info')}>
                    {this.getHeader()}
                    {this.getRate()}
                    {this.getActions()}
                    {this.getDescription()}
                </div>
            </div>
        );
    }

    protected getHeader(): React.ReactNode {
        const {
            exists,
            title,
            isNew,
            isHit,
        } = this.props;

        return (
            <div className={cnMarketInfoHeader()}>
                <div className={cnMarketInfoHeader('Left')}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={exists}
                                color="primary"
                            />
                        }
                        label="В наличии"
                    />
                    <span className={cnMarketInfoHeader('Title')}>{title}</span>
                </div>
                <div className={cnMarketInfoHeader('Right')}>
                    {isNew && <Hexagon text={'New'} className={cnMarketInfoHeader('HexagonMargin')}/>}
                    {isHit && <Hexagon text={'Хит'} gold/>}
                </div>
            </div>
        );
    }

    protected getRate(): React.ReactNode {
        const {
            stars,
            starsUsers,
        } = this.props;

        return (
            <div className={cnMarketInfo('RateBlock')}>
                <Stars count={5} value={stars} text={starsUsers.toString()}/>
                <IconLink icon={<MessIcon/>} text={'Оставить отзыв'}/>
            </div>
        );
    }

    protected getActions(): React.ReactNode {
        const {
            price,
            inFavorite,
        } = this.props;

        return (
            <div className={cnMarketInfo('Actions')}>
                <MarketPrice value={price}/>
                <IconLink icon={<FavoriteIcon/>} text={inFavorite ? 'Убрать Из избр.' : 'В избранное'}/>
                <IconLink icon={<CopyIcon/>} text={'Сравнить'}/>
            </div>
        );
    }

    protected getDescription(): React.ReactNode {
        const {
            article,
            description,
        } = this.props;

        return (
            <>
                <span className={cnMarketInfo('Description')}>
                    <span className={cnMarketInfo('Description', {gray: true})}>Подобные </span>
                    <span className={cnMarketInfo('Description', {dotted: true})}>
                        <b>условия доставки</b><span
                        className={cnMarketInfo('Description', {gray: true})}> и </span>
                    <b>оплаты</b>
                    </span>
                </span>
                <span className={cnMarketInfo('Description', {dotted: true})}><b>Гарантия на бытовую технику 5 лет!</b></span>
                <span className={cnMarketInfo('Description', {gray: true})}>{description}</span>
                <span className={cnMarketInfo('Description')}><b>Артикул: </b>{article}</span>
            </>
        )
    }
}

export default MarketInfo;
