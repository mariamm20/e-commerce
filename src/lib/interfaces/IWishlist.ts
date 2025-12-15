import { IProduct } from "./IProduct";

export interface IWishlistResponse {
    status: string,
    count: number,
    data: IProduct[],
}

export interface IWishlistAddApiResponse {
    status: string,
    message?: string,
    data : string[]
}