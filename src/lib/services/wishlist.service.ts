import { getMyToken } from "@/utilities/getMyToken";
import { IWishlistAddApiResponse, IWishlistResponse } from "../interfaces/IWishlist";

export async function getWishlist(){
    const token = await getMyToken();
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
        method:"GET",
        headers:{
            token:token as string
        }
    })
    if(!res.ok) console.log("Failed to fetch data");
    const data : IWishlistResponse = await res.json();
    return data
}

export async function addToWishlist(productId:string){
    const token = await getMyToken();
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            token:token as string
        },
        body: JSON.stringify({productId:productId})
    })
    if(!res.ok) return null;
    const data : IWishlistAddApiResponse = await res.json();
    return data
}

export async function removeFromWishlist(productId:string){
    const token = await getMyToken();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        method: "DELETE",
        headers: {
            token:token as string
        }
    })
    if(!res.ok) return null;
    const data : IWishlistAddApiResponse = await res.json();
    return data
}