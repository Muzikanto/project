export interface ICommonEntity extends ICommonEntityNoName{
    name: string;
}

export interface ICommonEntityNoName {
    id?: string
    parent_id?: string;
}