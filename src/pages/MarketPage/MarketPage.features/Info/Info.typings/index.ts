export interface IMarketInfo {
    className?: string;

    previews: string[];
    exists: boolean;
    title: string
    isNew: boolean;
    isHit: boolean;
    stars: number;
    starsUsers: number;
    price: number;
    inFavorite: boolean;
    article: string;
    description: string;
}
