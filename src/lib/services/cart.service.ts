import { getMyToken } from "@/utilities/getMyToken"
import { ICartApiResponse } from "../interfaces/ICart";

export async function getLoggedUserCart() {
    const token = await getMyToken();
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: "GET",
        headers: {
            token: token as string,
        }
    })

    
    const data: ICartApiResponse = await res.json();
    if (!res.ok) return null;
    console.log(data)
    return data
}

export async function addToCart(productId:string) {
    const token = await getMyToken();

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: token as string,
        },
        body: JSON.stringify({ productId: productId })
    })

    const data: ICartApiResponse = await res.json();
    if (!res.ok) return null;
    console.log(data)
    return data
}

export async function deleteCartItem(productId:string) {
    const token = await getMyToken();
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId, {
        method: "Delete",
        headers: {
            token: token as string,
        },
    })

    const data: ICartApiResponse = await res.json();
    if (!res.ok) return null;
    return data
}

export async function updateCartItem(productId:string, quantity:number) {
    const token = await getMyToken();
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: token as string,
        },
        body: JSON.stringify({ count: quantity.toString() })
    })

    const data: ICartApiResponse = await res.json();
    if (!res.ok) return null;
    return data
}

export async function deleteUserCart(){
    const token = await getMyToken();
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: "Delete",
        headers: {
            token: token as string,
        },
    })

    const data: ICartApiResponse = await res.json();
    if (!res.ok) return null;
    return data
}