import { getMyToken } from "@/utilities/getMyToken";
import { ICheckout } from "../interfaces/ICheckout";

export async function cashCheckout(cartId:string , form: ICheckout){
    const token = await getMyToken();
   const data =  await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: token as string
        },
        body: JSON.stringify({"shippingAddress": form})
    }) 

    const response = await data.json(); 
    return response;

}
export async function onlineCheckout(cartId:string , form: ICheckout){
    const token = await getMyToken();
   const data =  await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: token as string
        },
        body: JSON.stringify({"shippingAddress": form})
    }) 

    const response = await data.json(); 
    return response;

}

export async function getUserOrder(userId : string){
    const token = await getMyToken();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        method: "GET",
        headers: {
            token: token as string
        }
    })
    const data = await res.json();
    return data
    
}