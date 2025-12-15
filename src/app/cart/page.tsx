'use client'
import { Loader2, Trash2 } from "lucide-react";
import Breadcrump from "../_Components/Breadcrump/Breadcrump";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { deleteCartItem, deleteUserCart, updateCartItem } from "@/lib/services/cart.service";
import { ICartApiResponse } from "@/lib/interfaces/ICart";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cart() {
  const { refreshCart , cartItems, cartItemsNumber, totalPrice } = useContext(CartContext)
  const [loadingId, setLoadingId] = useState("");
  const [updateingId, setUpdateingId] = useState("");
  const [clearCart , setClearCart] = useState(false);
  const deleteItem = async (id: string) => {
    setLoadingId(id);
    const cartItems : ICartApiResponse | null = await deleteCartItem(id);
    if(cartItems && cartItems.status === "success"){
      await refreshCart();
      toast.success("Item deleted successfully 🎉");
    }
    setLoadingId("");    
  }

  const updateCounter = async (id: string, counter: number) => {
    setUpdateingId(id);
    const cartItems : ICartApiResponse | null = await updateCartItem(id, counter);
    if(cartItems && cartItems.status === "success"){
      await refreshCart();
      // toast.success("Item deleted successfully 🎉");
    }
    setUpdateingId("");
  }

  const clearCartItems = async () =>{
    setClearCart(true);
    const clearCart = await deleteUserCart();
    if(clearCart)
    {

      await refreshCart();
      toast.success("Cart cleared successfully 🎉");
    }else{
      toast.error("Something went wrong")
    }
    setClearCart(false);
  }

  return (
    <main className="w-full md:px-24 px-4 my-8">
      <Breadcrump />
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl font-bold">
            Shopping Cart ({cartItemsNumber})
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <Button disabled={clearCart || cartItemsNumber === 0} onClick={clearCartItems} variant="destructive" className="flex items-center gap-2 cursor-pointer">
          Clear Cart
        </Button>
      </div>
      
      <div className=" justify-center  lg:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg lg:w-2/3 w-full">

          {
            ( cartItems && cartItems?.products.length > 0) ? (
              cartItems.products.map((product)=>(
                <div key={product._id} className="justify-between mb-6 rounded-lg bg-white p-6 border sm:flex sm:justify-start">
                  <div className="rounded-3xl flex justify-center">
                    <Image src={product?.product?.imageCover} alt="logo" width={100} height={80} className="rounded-3xl" />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0 flex flex-col justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">{product?.product?.title}</h2>
                        <p className="mt-1 text-xs text-gray-700">{product?.product?.category?.name}</p>
                      </div>
                      <p className="text-md font-bold">
                        {product?.count * product?.price} EGP
                      </p>
                    </div>
                    <div className="flex flex-col justify-between relative mt-5 sm:mt-0">
                      <div className="flex items-end justify-end sm:relative sm:top-auto sm:end-auto absolute top-1/4 end-0">
                        {
                          loadingId === product?.product?.id ? (
                            <Loader2 className="animate-spin text-gray-500" size={20} />
                          ) :
                          (
                            <Trash2 onClick={() => { deleteItem(product?.product?.id)}} size={20} className="cursor-pointer duration-150 hover:text-red-500" />
                          )
                        }
                      </div>
                      <div className="flex items-center border-gray-100">
                        <Button disabled={product?.count === 1 || updateingId === product?.product?.id} onClick={()=>{
                          updateCounter(product?.product?.id, product?.count - 1)
                        }} className="cursor-pointer rounded-l-lg border-0 rounded-r-none bg-gray-100 text-black py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </Button>
                        <input className="h-8 w-8 border bg-white text-center text-xs outline-none" readOnly type="number" value={product?.count} />
                        <Button disabled={product?.count === product?.product?.quantity || updateingId === product?.product?.id} onClick={()=>{
                          updateCounter(product?.product?.id, product?.count + 1)
                        }} className="cursor-pointer rounded-r-lg border-0 rounded-l-none bg-gray-100 text-black py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
              :
              (
                <div className="flex flex-col gap-2 mb-8">
                  <h1 className="text-2xl font-bold">
                    Your Cart is Empty
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              )
          }



        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 lg:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-blue-600">Free</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{totalPrice} EGP</p>
            </div>
          </div>
          <Link href="/checkout" className="mt-6 w-full block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Checkout</Link>
        </div>
      </div>
    </main>
  )
}
