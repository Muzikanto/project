export interface IThumbBottomProps {
    isLiked: boolean;
    share: number;
    stars: number;
    name: string

    onStarClick: () => void;
}
