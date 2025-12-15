import { ICategory } from "@/lib/interfaces/ICategory";
import Link from "next/link";

export default function CategoryCard({data } : {data: ICategory}) {
  
  return (
    <Link href={`/categories/${data._id}`} className={`w-[288px] h-[280px] group bg-black/50 bg-blend-overlay bg-cover bg-center flex justify-center items-center`} style={{ backgroundImage: `url(${data.image})` }}>
      <h1 className="text-2xl font-bold text-white group-hover:scale-110 group-hover:transition-all">
        {data.name}
      </h1>
    </Link>
  )
}
