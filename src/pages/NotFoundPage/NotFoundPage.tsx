import * as React from 'react';
import {cn} from "@bem-react/classname";
import './NotFoundPage.css';
import {Link} from "react-router-dom";

const cnNotFound = cn('NotFoundPage');

export const NotFound = () => (
    <div className={cnNotFound('Container')}>
        <div className={cnNotFound()}>
            <div className={cnNotFound('404')}>
                <h1>404</h1>
                <h2>Page not found</h2>
            </div>
            <Link to={'/'}>HomePage</Link>
        </div>
    </div>
);
