'use client'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import styles from './MainSlider.module.css'
export default function MainSlider() {
  return (

    <section className="flex h-[50vh] relative z-n1">
      <div className="w-3/4">
        <div className={`h-full  ${styles.sliderWrapper}`} >

          <Swiper
            modules={[ Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            className='w-full h-full'
          >
            <SwiperSlide>
              <Image src="/three.jpg" alt="logo" fill className="object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/four.jpg" alt="logo" fill className="object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/five.jpg" alt="logo" fill className="object-cover" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="w-1/4 flex flex-col">
        <div className="relative w-full h-1/2">
          <Image src="/one.jpg" alt="logo" fill className="object-cover" />
        </div>

        <div className="relative w-full h-1/2">
          <Image src="/two.jpg" alt="logo" fill className="object-cover" />
        </div>
      </div>
    </section>




  )
}
