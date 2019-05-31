import * as React from "react";
import {cn} from "@bem-react/classname";
import MarketDescription from "./MarketPage.features/Description/Description";
import MarketBreadcrumbs from "./MarketPage.features/Breadcrumbs/Breadcrumbs";
import MarketFilters from "./MarketPage.features/Filters/Filters";
import MarketContacts from "./MarketPage.features/Contacts/Contacts";
import MarketInfo from "./MarketPage.features/Info/Info";
import './MarketPage.scss';

const cnMarketPage = cn('MarketPage');

class MarketPage extends React.Component {
    public render() {
        return (
            <div className={cnMarketPage()}>
                <MarketContacts className={cnMarketPage('Contacts')}/>
                <MarketFilters className={cnMarketPage('Filters')}/>
                <MarketBreadcrumbs className={cnMarketPage('BreadCrumbs')}
                                   items={['Главная', 'Home & Garden', 'Бытовые пылесосы']}
                                   last={'BreadCrumbs'}
                />
                <MarketDescription
                    className={cnMarketPage('Description')}
                    title={'ПЫЛЕСОС С ВОДЯНЫМ ФИЛЬТРОМ'}
                    description={'Высочайшая сила всасывания и многоступенчатая система фильтрации, реализованная в пылесосе DS 6000 Meduclean, делают воздух в помещение до 99,99% чище. Аллергики могут вздохнуть спокойно! Пылесос с аквафильтром DS 6 000 Meduclean рекомендован Российской Ассоциацией Аллергологов и Клинических иммунологов (РААКИ).'}
                />
                <MarketInfo className={cnMarketPage('Info')}
                            previews={['https://www.e-katalog.ru/jpg_zoom1/827249.jpg',
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT60t-A9i4lPB2OauFfIRLMF5Kp5N9MlcWGmxSPsWNedzs6yGHN',
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs3HDnOKgHtueqlgoMcCbv4jw25m_Go8dRBO8g3OmmYm4Nq0ek']}
                            title={'KARCHER DS 6.000 DEMICLEAN'}
                            isHit={true}
                            isNew={true}
                            exists={true}
                            description={'Качественная чистка полов, ковровых покрытий и мягкой мебели. Благодаря дополнительному фильтру. HEPA 13 очищает возрух в помещении от мелких частиц пыли, спор и пыльцы, вызывающих аллергию, а система Perma Power увлажняет его. Лёгкий, удобный в эксплуатации. Рекомендован для использования в медецинских учреждениях'}
                            article={'1.195-202.0'}
                            price={21190}
                            stars={4}
                            starsUsers={123}
                            inFavorite={false}
                />
            </div>
        );
    }
}

export default MarketPage;
