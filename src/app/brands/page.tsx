import Breadcrump from "../_Components/Breadcrump/Breadcrump";
import BrandsList from "../_Components/Lists/BrandsList";

export const metadata = {
  title: "Brands",
  description: "Browse all brands",
}

export default async function Brands({searchParams} : {searchParams : Record<string, unknown>}) {
  const params = await searchParams;
  return (
    <main className="w-full md:px-24 px-4 my-8">
      <Breadcrump/>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold">
          All Brands
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <BrandsList searchParams={params}/>

    </main>
  )
}
