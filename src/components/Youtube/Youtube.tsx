import * as React from 'react';
import YouTubeBase from 'react-youtube';
import {IYoutubeProps} from "./Youtube.typings";

class Youtube extends React.Component<IYoutubeProps> {
    render() {
        const {
            id,
            width,
            height,
            autoplay,
        } = this.props;

        const opts = {
            height,
            width,
            playerVars: {
                autoplay: Number(Boolean(autoplay)),
            }
        };

        return (
            <YouTubeBase
                videoId={parseYoutubeId(id)}
                opts={opts as any}
                onReady={this._onReady}
            />
        );
    }

    private _onReady(event: any) {
        event.target.pauseVideo();
    }
}

export function parseYoutubeId(str: string) {
    const index = str.indexOf('v=');

    return index === -1 ? str : str.slice(str.indexOf('v=') + 2);
}

export default Youtube;
