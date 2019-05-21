export interface IThumbMenuProps {
    items: IThumbMenuitems;
}

export type IThumbMenuitems = Array<{ text: string, action: () => void }>;
