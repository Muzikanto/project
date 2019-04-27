import * as React from 'react';
import {cn} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './NotFoundPage.css';

const cnNotFound = cn('NotFoundPage');

const NotFoundPage = () => (
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

export default NotFoundPage;
