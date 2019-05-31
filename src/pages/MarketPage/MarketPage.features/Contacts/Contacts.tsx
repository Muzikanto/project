import * as React from 'react';
import {Button, Typography} from '@material-ui/core';
import {cn} from "@bem-react/classname";
import './Contacts.scss';
import IconLocation from '@material-ui/icons/LocationCity';
import IconMobile from '@material-ui/icons/MobileFriendly';
import IconClock from '@material-ui/icons/Watch';
import MarketContact from "./Contacts.components/ContactItem/ContactItem";

const cnMarketContacts = cn('MarketContacts');

class MarketContacts extends React.Component<IMarketContactsProps> {
    render(): React.ReactNode {
        const {className} = this.props;

        return (
            <div className={cnMarketContacts('', [className])}>
                <div className={cnMarketContacts('LogoContainer')}>
                    <Typography
                        variant={'h4'}
                        className={cnMarketContacts('Logo')}>
                        ЮВЕНТА-КРЫМ
                    </Typography>
                    <div className={cnMarketContacts('Logo-Line')}/>
                    <span className={cnMarketContacts('Logo-Text')}>
                            Официальный дистребьютер в Крыму с 2005 года
                        </span>
                </div>
                <MarketContact icon={IconLocation}>
                    <span>Ближайщий магазин</span>
                    <span><b>Симферополь</b></span>
                    <span>ул. Маяковского 14-Э</span>
                </MarketContact>
                <MarketContact icon={IconClock}>
                    <span>Пн. - Пт.</span>
                    <span><b>09:00 - 18:00</b></span>
                    <span>Выходные:</span>
                    <span>Сб. - Вс.</span>
                </MarketContact>
                <MarketContact icon={IconMobile}>
                    <span>+7(978) <b>729-02-15</b></span>
                    <span>(3652) <b>24-82-31</b></span>
                    <Button className={cnMarketContacts('BtnCall')}>Обратный звонок</Button>
                </MarketContact>
            </div>
        )
    }
}

export default MarketContacts;
