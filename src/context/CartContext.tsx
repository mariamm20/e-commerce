'use client'

import { ICart, ICartApiResponse } from "@/lib/interfaces/ICart"
import { getLoggedUserCart } from "@/lib/services/cart.service"
import { createContext, useEffect, useState } from "react"

interface ICartContext {
  cartItemsNumber: number
  setCartItemsNumber: (num: number) => void
  cartID: string
  setCartID: (num: string) => void
  cartItems: ICart | undefined
  setCartItems: (cart: ICart | undefined) => void
  totalPrice: number
  setTotalPrice: (price: number) => void
  refreshCart: () => Promise<void>  
}

export const CartContext = createContext<ICartContext>({
  cartItemsNumber: 0,
  setCartItemsNumber: () => {},
  cartID: "",
  setCartID: () => {},
  cartItems: undefined,
  setCartItems: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  refreshCart: async () => {}
})

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cartItemsNumber, setCartItemsNumber] = useState(0)
  const [cartID, setCartID] = useState("")
  const [cartItems, setCartItems] = useState<ICart>()
  const [totalPrice, setTotalPrice] = useState(0)


  async function refreshCart() {
    const cartRes: ICartApiResponse | null = await getLoggedUserCart()
    console.log(cartRes)
    if (cartRes && cartRes.status === "success") {
      setCartItemsNumber(cartRes.numOfCartItems)
      setCartID(cartRes.cartId)
      setCartItems(cartRes.data) 
      setTotalPrice(cartRes.data.totalCartPrice)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <CartContext.Provider value={{ cartItemsNumber, setCartItemsNumber, cartID, setCartID, cartItems, setCartItems, totalPrice, setTotalPrice, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}
