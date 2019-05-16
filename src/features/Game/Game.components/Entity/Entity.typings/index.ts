export interface ICommonEntity extends ICommonEntity_noName{
    name: string;
}

export interface ICommonEntity_noName {
    id?: string
    parent_id?: string;
}