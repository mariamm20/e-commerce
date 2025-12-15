'use client'
import { Button } from "@/components/ui/button";
import Breadcrump from "../_Components/Breadcrump/Breadcrump";
import { useContext } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import ProductsCard from "../_Components/Cards/ProductsCard";

export default function Wishlist() {
  const { wishlistItemsNumber, wishlistItems } = useContext(WishlistContext)
  console.log(wishlistItemsNumber)
  console.log(wishlistItems)
  return (
    <main className="w-full md:px-24 px-4 my-8">
      <Breadcrump />
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold">
          Wishlist ({wishlistItemsNumber})
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>


      <div className="flex flex-wrap">
        {wishlistItems && wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <div
              key={product._id}
              className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-full flex lg:justify-start justify-center"
            >
              <ProductsCard data={product} />
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-2xl font-bold">
              Your Wishlist is Empty
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        )}
      </div>




    </main>
  )
}
