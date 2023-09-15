'use client';

import styles from './searchResultsTestimonial.module.css';
import Image from 'next/image';

const SearchResultsTestimonial = ({ item }) => {
  return (
    <>
      <h4>{item?.fields?.name}</h4>
      <p>{item?.fields?.title}</p>
      {item?.fields?.image?.fields?.file?.url && (
        <div className={styles.imageContainer}>
          <Image
            src={`https:${item?.fields?.image?.fields?.file?.url}`}
            className={styles.image}
            alt={item?.fields?.image?.fields?.description}
            placeholder="blur"
            blurDataURL={`https:${item?.fields?.image?.fields?.file?.url}`}
            sizes="(max-width: 800px)"
            fill
          />
        </div>
      )}
    </>
  );
};

export default SearchResultsTestimonial;
