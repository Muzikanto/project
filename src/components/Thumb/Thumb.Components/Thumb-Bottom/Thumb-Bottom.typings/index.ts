export interface IThumbBottomProps {
    is_favorite: boolean;
    set_star: boolean;
    name: string
    stars: number;

    onStarClick: () => void;
}
