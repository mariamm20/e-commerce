'use client'

import { Button } from "@/components/ui/button"
import { WishlistContext } from "@/context/WishlistContext"
import { IWishlistAddApiResponse } from "@/lib/interfaces/IWishlist"
import { addToWishlist, removeFromWishlist } from "@/lib/services/wishlist.service"
import clsx from "clsx"
import { Heart } from "lucide-react"
import { usePathname } from "next/navigation"
import { useContext, useState } from "react"
import { toast } from "sonner"

export default function AddToWishlistBtn({ productId }: { productId: string }) {
  const { refreshWishlist, wishlistItems } = useContext(WishlistContext);
  const [likedLoading, setLikedLoading] = useState(false)
  const pathname = usePathname()

  const isDetailsPage = pathname.startsWith("/products/")

  const handleAddToWishlist = async (e: React.MouseEvent, productId: string) => {
    if (wishlistItems?.some((item) => item._id === productId)) {
      setLikedLoading(true)
      const wishlistData: IWishlistAddApiResponse | null = await removeFromWishlist(productId)
      if (!wishlistData) {
        toast.error("Something went wrong")
        setLikedLoading(false)
        return
      }
      if (wishlistData.status === "success") {
        toast.success("Removed from wishlist 🎉")
        await refreshWishlist();
      }
      else {
        toast.error("Something went wrong")
      }
      setLikedLoading(false)
    }
    else {
      setLikedLoading(true)
      const wishlistData: IWishlistAddApiResponse | null | { status: string } = await addToWishlist(productId)
      if (wishlistData.status === "unauthenticated") {
        toast.error("Login first to add to wishlist")
        setLikedLoading(false)
        return
      }
      if (wishlistData.status === "error") {
        toast.error("Something went wrong")
        setLikedLoading(false)
        return
      }
      if (wishlistData.status === "success") {
        toast.success("Added to wishlist 🎉")
        await refreshWishlist();
      }
      else {
        toast.error("Something went wrong")
      }
      setLikedLoading(false)
    }


  }

  return (
    <Button
      disabled={likedLoading}
      onClick={(e) => handleAddToWishlist(e, productId)}
      variant="secondary"
      size="icon"
      className={
        clsx(
          isDetailsPage
            ?
            "relative rounded-md opacity-100 cursor-pointer p-1 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 hover:[&>svg]:fill-current hover:[&>svg]:text-red-600"
            :
            "cursor-pointer absolute top-14 right-2 rounded-full p-1  translate-x-full transition-all duration-300 ease-in-out opacity-0 group-hover:translate-x-0 group-hover:opacity-100 hover:[&>svg]:fill-current hover:[&>svg]:text-red-600"
        )
      }
    >
      <Heart
        size={16}
        stroke="currentColor"
        fill={(productId && wishlistItems?.some((item) => item._id === productId)) ? "currentColor" : "transparent"}
        className={(productId && wishlistItems?.some((item) => item._id === productId)) ? "text-red-600" : "text-gray-500"}
      />
    </Button>
  )
}
