import * as React from 'react';
import YouTubeBase, {Options} from 'react-youtube';
import {IYoutubeProps} from "./Youtube.typings";
import {parseYoutubeId} from "./Youtube.helpers";

class Youtube extends React.Component<IYoutubeProps> {
    render() {
        const {
            id,
            width,
            height,
            autoplay,
            className,
        } = this.props;

        const opts: Options = {
            height: height.toString(),
            width: width.toString(),
            playerVars: {
                autoplay: Number(Boolean(autoplay)) as 0 | 1,
            }
        };

        return (
            <YouTubeBase
                className={className}
                videoId={parseYoutubeId(id)}
                opts={opts}
                onReady={this._onReady}
            />
        );
    }

    private _onReady(event: any) {
        event.target.pauseVideo();
    }
}

export default Youtube;
