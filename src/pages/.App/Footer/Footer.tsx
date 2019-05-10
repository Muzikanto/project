import { cn } from '@bem-react/classname';
import * as React from 'react';
import './Footer.css'

const cnFooter = cn('Footer');

class Footer extends React.Component {
    public render() {
        return (<footer className={cnFooter()}>
            <div className={cnFooter('Left')}>
                <a href="#">Помощь</a>
                <a href="#">Обратная связь</a>
                <a href="#">Разработчикам</a>
                <a href="#">Условия использования</a>
            </div>
            <div className={cnFooter('Right')}>
                <a href="#">2001-2017 ООО "Яндекс"</a>
            </div>
        </footer>)
    }
}

export default Footer;
