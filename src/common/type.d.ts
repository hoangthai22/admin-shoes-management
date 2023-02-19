export interface ICategory {
    _id: string;
    name: string;
    status: boolean;
}
export interface IProduct {
    _id: string;
    name: string;
    category: ICategory;
    price: number;
    image: string;
    quantity: number;
    status: boolean;
}
export interface ModalInfo {
    id: string;
    name: string;
}
export interface Option {
    label: string;
    value: string;
}
export interface GetCategoryResponse {
    categories: ICategoriesList,
    limit: number,
    page: number,
    total: number,
}
export interface IUser {
   userName:string,
   name:string
}

export interface IProductsList extends Array<IProduct> { }
export interface ICategoriesList extends Array<ICategory> { }

