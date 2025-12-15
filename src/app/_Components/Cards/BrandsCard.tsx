import { IBrand } from "@/lib/interfaces/IBrand";
import Image from "next/image";


export default function BrandsCard({data} : {data: IBrand}) {
  return (
    <div className="flex items-center gap-4 flex-col group">
        <div className="w-40 h-40 rounded-full relative border-2 border-black p-4 group-hover:border-red-800">
            <Image src={data.image} alt="logo" fill className="object-contain rounded-full" />
        </div>
        <h2 className="text-lg font-bold text-black group-hover:text-red-800">
            {data.name}
        </h2>
    </div>
  )
}
