import * as React from 'react';
import * as Loadable from 'react-loadable';

export default Loadable.Map({
    loader: {
        chunk: () => import('./FrontPage'),
    },
    loading: () => <i>Loading...</i>,
    render: ({ chunk }) => {
        const Page = chunk.default;

        return <Page/>;
    }
});