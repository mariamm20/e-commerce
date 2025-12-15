import Breadcrump from "@/app/_Components/Breadcrump/Breadcrump";
import { ICategory } from "@/lib/interfaces/ICategory";
import { ISubCategory } from "@/lib/interfaces/ISubCategory";
import { getCategory } from "@/lib/services/categories.service"
import { getAllSubCategoriesOnCategory } from "@/lib/services/subCategories.service";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Categories",
  description: "Browse all sub categories in specific category",
}
export default async function CategorySubCategories({params} : {params: { id: string }}) {

    const { id } = await params;
    // Category
    const category : ICategory = await getCategory(id)
    // All sub categories in this category
    const subCategories : ISubCategory[] = await getAllSubCategoriesOnCategory(id)
    

  return (
    <main className="w-full md:px-24 px-4 my-8">
        <Breadcrump/>
        <div className="flex items-center gap-4 mb-8 border-b-2 pb-8">
            <div className="w-24 h-24 rounded-full relative">
                <Image src={category.image} alt="logo" fill className="object-cover rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">
                    {category.name}
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
        </div>

        <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl font-bold">
                Sub Categories ({subCategories.length})
            </h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis exercitationem fugiat nihil repellat voluptate sequi dolores quisquam, placeat quo. Optio repellat molestiae, laudantium consequatur earum harum voluptatem perferendis voluptas neque!
            </p>
        </div>
        <div className="flex flex-wrap gap-14">
            {
                subCategories.length> 0 ? 
                subCategories.map((subCategory) => (
                    <div key={subCategory._id} className="bg-gray-100 w-48 h-48 p-4 flex justify-center items-center text-center mb-2 shadow-md rounded-full">
                            <Link href={`/products?subcategory[in]=${subCategory._id}`} className="text-md font-semibold">
                                {subCategory.name}
                            </Link>
                    </div>
                )) :
                <div className="">
                    <h2 className="text-md font-semibold text-gray-500">
                        No Sub Categories Available
                    </h2>
                </div>
            }

        </div>
    </main>
  )
}
