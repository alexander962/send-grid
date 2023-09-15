'use client';

import CTALink from '../UI/Button/Button';
import Image from 'next/image';
import styles from './heroSlider.module.css';
import './slide.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Navigation]);

const HeroSlider = ({ content }) => {
  const { hero, addNegativeMargin } = content;
  return (
    <section className={`${addNegativeMargin ? styles.addNegativeMargin : styles.noNegativeMargin}`}>
      <Swiper
        className='heroSlider'
        navigation={true}
        loop={true}>
        {hero.map((hero, i) => {
          return (
            <SwiperSlide key={i}>
              <div className={styles.hero}>
                <Image
                  src={`https:${hero.fields.image.fields.file.url}`}
                  className={styles.heroImage}
                  alt={hero.fields.image.fields.description}
                  placeholder='blur'
                  blurDataURL={`https:${hero.fields.image.fields.file.url}`}
                  sizes='(max-width: 1400px) 100vw'
                  fill
                />
                <div className={styles.gradient}></div>
                <div className={styles.ctaContainer}>
                  <div className={styles.cta}>
                    <h2 className={styles.title}>{hero.fields.title}</h2>
                    <p className={styles.description}>{hero.fields.description}</p>
                    {hero.fields.button && (
                      <div className={styles.btnWrapper}>
                        <CTALink
                          text={hero.fields.button.fields.title}
                          href={hero.fields.button.fields.url}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
