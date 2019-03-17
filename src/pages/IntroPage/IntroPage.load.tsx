import * as React from 'react';
import * as Loadable from 'react-loadable';


export default Loadable.Map({
    loader: {
        chunk: () => import('./IntroPage'),
    },
    loading: () => <i>Loading...</i>,
    render: ({ chunk }) => {
        const Intro = chunk.default;
        return <Intro/>;
    }
});