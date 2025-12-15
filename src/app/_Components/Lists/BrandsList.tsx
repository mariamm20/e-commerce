import { IApiResponse } from "@/lib/interfaces/IApiResponse";
import BrandsCard from "../Cards/BrandsCard";
import { IBrand } from "@/lib/interfaces/IBrand";
import { getAllBrands } from "@/lib/services/brands.service";
import { IMetadata } from "@/lib/interfaces/IMetadata";
import PaginationComponent from "../Pagination/PaginationComponent";


export default async function BrandsList({searchParams} : {searchParams : Record<string, unknown>}) {
  const params = await searchParams;
  const paramsCustom = {
    ...params,
    limit: "10"
  }

  const res: IApiResponse<IBrand[]> = await getAllBrands(paramsCustom);
  const data = res.data as IBrand[];
  const meta = res.metadata as IMetadata;
  return (
    <>
      <div className="flex flex-wrap gap-24 my-8">
        {
          data.length > 0 ?
            data.map((brand) => (
              <BrandsCard key={brand._id} data={brand} />
            )) :
            <div className="">
              <h2 className="text-md font-semibold text-gray-500">
                No Brands Available
              </h2>
            </div>
        }
      </div>
      <PaginationComponent meta={meta}/>
    </>
  )
}
