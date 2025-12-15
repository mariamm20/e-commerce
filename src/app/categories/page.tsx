import { ICategory } from "@/lib/interfaces/ICategory";
import { getAllCategories } from "@/lib/services/categories.service";
import CategoryCard from "../_Components/Cards/CategoryCard";
import Link from "next/link";
import Breadcrump from "../_Components/Breadcrump/Breadcrump";
export const metadata = {
  title: "Categories",
  description: "Browse all categories",
}
export default async function Categories() {
  const { data }: { data: ICategory[] } = await getAllCategories()
  return (
    <main className="w-full md:px-24 px-4 my-8">
      <Breadcrump/>
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            Categories
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <Link href="/products/subcategories" className="text-sm text-gray-700 font-bold underline">Discover Sub Categories</Link>

      </div>

      <div className="grid grid-cols-4 gap-4">
        {
          data &&
          data.map((category) => (
            <CategoryCard key={category._id} data = { category } />
        ))
      }
      </div>


    </main>
  )
}
