import { Badge } from "@/components/ui/badge";
import { IProduct } from "@/lib/interfaces/IProduct";
import { Star } from "lucide-react";
import Image from "next/image";
import AddToCardBtn from "../Buttons/AddToCardBtn";
import AddToWishlistBtn from "../Buttons/AddToWishlistBtn";
import ViewProductBtn from "../Buttons/ViewProductBtn";

export default function ProductsCard({data , type} : {data: IProduct; type?:string}) {

  return (
    <div className="w-[288px] border border-gray-200 rounded-2xl mb-4 overflow-hidden group">
        <div className="flex justify-center items-center relative p-4 border-b-1 border-gray-200">
            <Image src={data.imageCover} alt="logo" width={160} height={160} className="object-contain group-hover:scale-110 transition-all duration-300 ease-in-out" />
            <AddToCardBtn productId={data._id}/>
            <ViewProductBtn productId={data._id}/>

            <AddToWishlistBtn productId={data._id}/>
            {
                type === "new" &&
                <Badge variant="secondary" className="absolute top-4 left-4">NEW</Badge>

            }
            {
                type === "BestSeller" &&
                <Badge variant="destructive" className="absolute top-4 left-4">Hot</Badge>

            }
            {
                type === "TopRated" &&
                <Badge variant="default" className="absolute top-4 left-4">Top</Badge>

            }
        </div>
        <div className="p-4">
            <div className="mb-3 flex items-center justify-between w-full">
                <div className="w-3/4">
                    <p className="text-xs text-gray-500 truncate">
                        {data.category.name}
                    </p>
                    <p className="text-lg font-semibold truncate">
                        {data.title}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <Star size={16} fill="yellow" stroke="yellow" />
                    <p className="text-sm">{data.ratingsAverage}</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                    <p className="text-sm"><span className="font-bold text-black text-xl">{data.price}</span> LE</p>
                    <p className="text-sm">{data.quantity} in stock</p>
                
            </div>


        </div>

    </div>
  )
}
