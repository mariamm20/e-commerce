'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartContext } from "@/context/CartContext"
import { WishlistContext } from "@/context/WishlistContext"
import { Heart, ShoppingCart, User, Menu } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useContext } from "react"

export default function Navbar() {

  const x = useSession();
  const {cartItemsNumber} = useContext(CartContext)
  const {wishlistItemsNumber} = useContext(WishlistContext)
  console.log(cartItemsNumber)
  return (
    <nav className="w-full bg-gray-100 py-3 md:px-24 px-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        E-Commerce
      </Link>

      <div className="hidden md:flex flex-1 justify-center">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <Link href="/">Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products">Products</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/categories">Categories</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/brands">Brands</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="hidden md:flex gap-4 items-center">



        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex gap-4">
            {
              x.data?.token ?
                <>

                  <NavigationMenuItem asChild>
                    <Link href="/cart" className="relative">
                    
                    <ShoppingCart />
                    <Badge className="absolute -top-1.5 -end-2 size-4" variant={"destructive"}>{cartItemsNumber}</Badge>
                    </Link>

                  </NavigationMenuItem>
                  <NavigationMenuItem asChild>
                    <Link href="/wishlist">
                      <Heart />
                      <Badge className="absolute -top-1.5 -end-2 size-4" variant={"destructive"}>{wishlistItemsNumber}</Badge>

                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent p-0">
                      <User />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-10 whitespace-nowrap">
                      <NavigationMenuLink asChild>
                        <Link href="/allorders">All Orders</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/profile/setting">Setting</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink>
                        <Button variant={"ghost"} className="text-start p-0 h-auto font-normal" onClick={()=> {signOut({callbackUrl:"/login"})}}>Logout</Button>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </> :
                <>
                  <NavigationMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </NavigationMenuItem>

                </>
            }


          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu (Sheet Drawer) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6 ms-4">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/brands">Brands</Link>
              <hr className="my-2" />
              <Link href="/cart" className="flex items-center gap-2"><ShoppingCart /> Cart</Link>
              <Link href="/wishlist" className="flex items-center gap-2"><Heart /> Wishlist</Link>
              <Link href="/profile" className="flex items-center gap-2"><User /> Profile</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
