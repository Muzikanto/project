import * as React from 'react';
import YouTubeBase from 'react-youtube';

class Youtube extends React.Component<{id: string}> {
    render() {
        const {id} = this.props;
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1
            }
        };

        return (
            <YouTubeBase
                videoId={id}
                opts={opts as any}
                onReady={this._onReady}
            />
        );
    }

    _onReady(event: any) {
        event.target.pauseVideo();
    }
}

export default Youtube;
