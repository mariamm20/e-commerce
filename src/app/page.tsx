import { ICategory } from "@/lib/interfaces/ICategory"
import { getAllCategories } from "@/lib/services/categories.service"
import MainSlider from "./_Components/Sliders/MainSlider/MainSlider";
import CategorySlider from "./_Components/Sliders/CategorySlider/CategorySlider";
import NewArrivalProducts from "./_Components/Home/NewArrivalProducts/NewArrivalProducts";
import BestSellerProducts from "./_Components/Home/BestSellerProducts/BestSellerProducts";
import TopRatedProducts from "./_Components/Home/TopRatedProducts/TopRatedProducts";

export const metadata = {
  title: "Home",
  description: "E-commerce Home Page",
}

export default async function Home({searchParams} : {searchParams : Record<string, unknown>}) {

  const {data} : {data: ICategory[]} = await getAllCategories()

  return (
    <div className="w-full md:px-24 px-4">
      <MainSlider/>
      <CategorySlider data={data}/>
      <NewArrivalProducts searchParams={searchParams}/>
      <BestSellerProducts searchParams={searchParams}/>
      <TopRatedProducts searchParams={searchParams}/>
    </div>
  );
}
