import { IProduct } from "./IProduct"


export interface ICartApiResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: ICart
}

export interface ICart {
  _id: string
  cartOwner: string
  products: ICartProducts[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface ICartProducts {
  count: number
  _id: string
  product: IProduct
  price: number
}

