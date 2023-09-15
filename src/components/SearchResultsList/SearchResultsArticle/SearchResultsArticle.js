'use client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import styles from '../searchResultsList.module.css';
import Link from 'next/link';
import Date from '../../Date/Date'


const SearchResultsArticle = ({ item }) => {
  return (
    <div className={styles.searchResultInner}>
      {item?.fields?.image?.fields?.file?.url && (
        <div className={styles.imageContainer}>
          <Image
            src={`https:${item?.fields?.image?.fields?.file?.url}`}
            className={styles.image}
            alt={item?.fields?.image?.fields?.description}
            placeholder='blur'
            blurDataURL={`https:${item?.fields?.image?.fields?.file?.url}`}
            sizes='(max-width: 300px)'
            fill
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <Link href={`/news/${item.fields.slug}`}>
          <h2 className={styles.title}>{item?.fields?.title}</h2>
        </Link>
        <p className={styles.date}>
          <Date dateString={item?.fields?.publishDate} />
        </p>
        <p className={styles.excerpt}>{item?.fields?.excerpt}</p>
      </div>
    </div>
  );
};

export default SearchResultsArticle;
