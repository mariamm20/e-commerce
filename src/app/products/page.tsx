import { IApiResponse } from "@/lib/interfaces/IApiResponse";
import { IProduct } from "@/lib/interfaces/IProduct";
import PaginationComponent from "../_Components/Pagination/PaginationComponent";
import { getProducts } from "@/lib/services/products.service";
import ProductsCard from "../_Components/Cards/ProductsCard";
import Breadcrump from "../_Components/Breadcrump/Breadcrump";
import ProductsFilter from "../_Components/Filters/ProductsFilter";


export default async function Products({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const params = await searchParams;
  const paramsCustom = {
    ...params,
    limit: "10"
  }
  const data: IApiResponse<IProduct[]> = await getProducts(paramsCustom);


  return (
    <main className="w-full md:px-24 px-4 my-8">
      <Breadcrump />
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold">
          All Products
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className=" justify-center  lg:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg lg:w-1/5 w-full">
        <ProductsFilter/>
        </div>
        <div className=" rounded-lg lg:w-4/5 w-full">
          <div className="flex flex-wrap">
            {
              (data && data.data.length > 0) ?
                (
                  data.data.map((product) => (
                    <div key={product._id} className="xl:w-1/3 lg:w-1/2  w-full flex justify-center">
                      <ProductsCard data={product} />
                    </div>
                  ))
                )
                :
                (
                  <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-2xl font-bold">
                      No Products Found
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                )

            }
          </div>
          <PaginationComponent meta={data.metadata} />
        </div>
      </div>
    </main>
  );
}


