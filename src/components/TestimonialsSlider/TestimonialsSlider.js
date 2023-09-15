'use client';

import styles from './testimonialsSlider.module.css';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './sliderTestimonial.css';

SwiperCore.use([Navigation, Pagination, A11y]);

const TestimonialsSlider = ({ content }) => {
  const { testimonial, title, useNegativeMarginForMobileView } = content;

  return (
    <section className={`${styles.testimonials} ${useNegativeMarginForMobileView ? styles.addNegativeMargin : styles.noNegativeMargin}`}>
      <div className={styles.headingWrapperMobile}>
        <h3 className={styles.heading}>{title}</h3>
      </div>
      <Swiper
        className='testimonialsSlider'
        navigation={true}
        autoHeight={true}
        pagination={{ clickable: true }}>
        {testimonial.map(s => {
          return (
            <SwiperSlide
              key={s.sys.id}
              className={styles.testimonial}>
              <div className={styles.testimonialList}>
                <div className={styles.textSide}>
                  <div className={styles.headingWrapperDesktop}>
                    <h3 className={styles.heading}>{title}</h3>
                  </div>
                  <div className={styles.textInner}>
                    <div className={styles.statement}>{documentToReactComponents(s.fields.statement)}</div>
                    <div className={styles.writersInfo}>
                      <p className={styles.writersName}>{s.fields.name}</p>
                      <p className={styles.writersDesc}>{s.fields.title}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.imageSide}>
                  <Image
                    src={`https:${s.fields.image.fields.file.url}`}
                    className={styles.image}
                    alt={s.fields.image.fields.description}
                    placeholder='blur'
                    blurDataURL={`https:${s.fields.image.fields.file.url}`}
                    width='687'
                    height='458'
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default TestimonialsSlider;
