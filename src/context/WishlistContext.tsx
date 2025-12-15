'use client'
import { IProduct } from "@/lib/interfaces/IProduct";
import { IWishlistResponse } from "@/lib/interfaces/IWishlist";
import { getWishlist } from "@/lib/services/wishlist.service";
import { createContext, useEffect, useState } from "react";

interface IWishlistContext {
    wishlistItems : IProduct[] | undefined,
    refreshWishlist : () => Promise<void>,
    wishlistItemsNumber : number
}
export const WishlistContext = createContext<IWishlistContext>({
    wishlistItems : [],
    refreshWishlist : async () => {},
    wishlistItemsNumber : 0

})

export function WishlistContextProvider({children} : {children: React.ReactNode}) {

    const [wishlistItems, setwishlistItems] = useState<IProduct[]>()
    const [wishlistItemsNumber, setwishlistItemsNumber] = useState(0)
    console.log(wishlistItemsNumber)
    async function refreshWishlist() {
        const res : IWishlistResponse = await getWishlist();
        if(res && res.status === "success"){
            setwishlistItems(res.data);
            setwishlistItemsNumber(res.data.length);
        }
    }

    useEffect(() => {
        refreshWishlist();
    }, [])


    return <WishlistContext.Provider value={{wishlistItems, wishlistItemsNumber , refreshWishlist}}>{children}</WishlistContext.Provider>
}