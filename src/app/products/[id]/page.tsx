import Breadcrump from '@/app/_Components/Breadcrump/Breadcrump';
import ProductImagesSlider from '../../_Components/Sliders/ProductImagesSlider/ProductImagesSlider';
import { getProductDetails } from '@/lib/services/products.service'
import { Star } from 'lucide-react';
import AddToCardBtn from '@/app/_Components/Buttons/AddToCardBtn';
import AddToWishlistBtn from '@/app/_Components/Buttons/AddToWishlistBtn';


export default async function ProductDetails({ params }: { params: { id: string } }) {
    const { id } = await params;
    const productData = await getProductDetails(id)

    return <section className="w-full md:px-24 px-4 my-8">
        <Breadcrump />
        <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-2xl font-bold">
                Product Details
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
        </div>
        <main className='flex lg:flex-row flex-col items-center'>
            <ProductImagesSlider images={productData.data.images} />
            <div className='lg:w-2/3 w-full p-4 flex flex-col gap-4 relative'>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        {productData.data.title}
                    </h2>
                    <div className="flex items-center gap-1">
                        <Star size={16} fill="yellow" stroke="yellow" />
                        <p className="text-sm">{productData.data.ratingsAverage}</p>
                    </div>

                </div>
                <p className="text-gray-500">
                    {productData.data.description}
                </p>
                <p className="font-medium text-lg">
                    Price:  {productData.data.price}$
                </p>
                <div className="flex relative gap-3">
                    <div className='w-full'>
                    <AddToCardBtn productId={productData.data._id} />
                    </div>
                    <div className=''>
                    <AddToWishlistBtn productId={productData.data._id} />
                    </div>
                </div>

            </div>
        </main>

    </section>
}
