import { IProduct } from "@/lib/interfaces/IProduct";
import { getProducts } from "@/lib/services/products.service";
import Link from "next/link";
import ProductsCard from "../../Cards/ProductsCard";
import { IApiResponse } from "@/lib/interfaces/IApiResponse";

export default async function BestSellerProducts({searchParams} : {searchParams : Record<string, unknown>}) {
  const params = await searchParams;
  const paramsCustom = {
    ...params,
    sort: '-sold',
    limit: "4"
  } 
  const data: IApiResponse<IProduct[]>= await getProducts(paramsCustom); 

  return (
    <section className="flex flex-col my-8">
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                Best Seller Products
                </h1>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <Link href="/products?sort=-ratingsAverage" className="text-sm text-gray-700 font-bold underline">View All</Link>
        </div>

        <div className="flex flex-wrap justify-between  my-8">
            {
                data.data.length > 0 ?
                data.data.map((product)=>(
                    <ProductsCard key={product._id} data={product} type="BestSeller" />
                )) :
                <div>
                    <h2 className="text-md font-semibold text-gray-500">
                        No Products Available
                    </h2>
                </div>
            }
        </div>
    </section>
  )
}
