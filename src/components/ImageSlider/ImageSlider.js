'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Thumbs, FreeMode } from 'swiper';
import './imageSlider.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Thumbs]);

const ImageSlider = ({ content }) => {
  let { image } = content;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className='imageSlider'>
      <Swiper
        className='imageSliderMain'
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        spaceBetween={10}
        navigation={true}
        loop={true}>
        {image.map((image, i) => {
          return (
            <SwiperSlide key={i}>
              <div className='imageSliderThumbWrapper'>
                <Image
                  src={`https:${image.fields.file.url}`}
                  width='720'
                  height='400'
                  placeholder='blur'
                  blurDataURL={`https:${image.fields.file.url}`}
                  alt={image.fields.description}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesProgress={true}
        spaceBetween={10}
        slidesPerView={6}
        loopedSlides={10}
        className='imageSliderThumbs'>
        {image.map((image, i) => {
          return (
            <SwiperSlide
              className='imageSliderThumb'
              key={i}>
              <div className='imageSliderThumbWrapper'>
                <Image
                  src={`https:${image.fields.file.url}`}
                  width='75'
                  height='75'
                  alt={image.fields.description}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ImageSlider;
