'use client'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import styles from './ProductImagesSlider.module.css'
export default function ProductImagesSlider({images}: {images:string[]}) {
  return (
    <section className="lg:w-1/3 w-full h-[50vh] relative z-n1">
      
        <div className={`h-full  ${styles.sliderWrapper}`} >

          <Swiper
            modules={[Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            className='w-full h-full border border-gray-300 rounded-lg'
          >
            {
              images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <Image src={img} alt="logo" fill className="object-contain" />
                </SwiperSlide>
              ))
            }

          </Swiper>
        </div>
      
    </section>

  )
}
