'use client'

import { Button } from "@/components/ui/button"
import { CartContext } from "@/context/CartContext"
import { addToCart } from "@/lib/services/cart.service"
import { useContext, useState } from "react"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export default function AddToCardBtn({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)
  const { refreshCart } = useContext(CartContext)
  const pathname = usePathname()

  const isDetailsPage = pathname.startsWith("/products/")

  async function AddToCard() {
    setLoading(true)

    const data = await addToCart(productId)

    if (!data) {
      toast.error("Failed to add to cart")
      setLoading(false)
      return
    }

    await refreshCart()

    toast.success("Added to cart 🎉", {
      description: `You now have ${data.numOfCartItems} items in your cart.`,
    })

    setLoading(false)
  }

  return (
    <Button
      disabled={loading}
      onClick={AddToCard}
      className={clsx(
        "cursor-pointer w-full",
        isDetailsPage
          ?
            "relative rounded-md opacity-100 translate-y-0"
          : 
            "absolute bottom-0 left-0 rounded-none translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
