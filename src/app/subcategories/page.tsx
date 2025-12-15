import SubCategoryList from "../_Components/Lists/SubCategoryList";
export const metadata = {
  title: "All Sub Categories",
  description: "Browse all sub categories",
}


export default async function Subcategories() {


  return (
    <main className="w-full md:px-24 px-4 my-8">

      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold">
          All Sub Categories
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <SubCategoryList />

    </main>
  )
}
