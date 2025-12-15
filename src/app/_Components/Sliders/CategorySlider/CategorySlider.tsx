'use client'
import { ICategory } from "@/lib/interfaces/ICategory"
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import styles from './CategorySlider.module.css'
import Link from "next/link";
export default function CategorySlider({data} : {data: ICategory[]}) {

  return (
    <section className="flex flex-col my-8">
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                Categories
                </h1>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <Link href="/categories" className="text-sm text-gray-700 font-bold underline">View All</Link>
        </div>

        <div className={`h-full my-8  ${styles.sliderWrapper}`} >
            <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={4}
            navigation
            loop
            autoplay={{
                delay:2500,
                disableOnInteraction: false
            }}
            className='w-full h-full'
            >
                {
                data.map((category : ICategory) => (
                    <SwiperSlide key={category._id}>
                        <Link href={`/categories/${category._id}`} className="flex flex-col gap-3 items-center justify-center h-[280px] w-[288px] shadow-md">
                            <div className="relative h-[180px] w-full">
                                <Image src={category.image} alt="logo" fill className="object-contain" /> 
                            </div>
                            <h2 className="text-2xl font-bold">{category.name}</h2>
                        </Link>
                    </SwiperSlide>
                ))
                }


            </Swiper>
        </div>
    </section>
  )
}
