import * as React from 'react';
import {Breadcrumbs, Link, Typography} from "@material-ui/core";
import {IMarketBreadcrumbsProps} from "./Breadcrumbs.typings";

class MarketBreadcrumbs extends React.Component<IMarketBreadcrumbsProps> {
    render(): React.ReactNode {
        const {
            className,
            items,
            last,
        } = this.props;

        return (
            <Breadcrumbs separator="›" aria-label="Breadcrumb" className={className}>
                {items.map(text=>
                    <Link key={text + 'breadcrumb'} color="inherit" href="#">
                        {text}
                    </Link>
                )}
                <Typography color="textPrimary">{last}</Typography>
            </Breadcrumbs>
        );
    }
}

export default MarketBreadcrumbs;
