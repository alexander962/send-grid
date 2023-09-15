import styles from './archive.module.css';
import Link from 'next/link';
import Date from '../Date/Date';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Archive = ({ content, perPage, usePagination }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [content]);
  
  if (content == null) return;
  const { items } = content;

  const handlePagination = async pageNumber => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = perPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pagedData = items.slice(startIndex, endIndex);


  return (
    <div className={styles.cards}>
      {pagedData.map(c => {
        if (c.sys.contentType.sys.id === 'article') {
          return (
            <Link
              className={styles.card}
              href={`/news/${c.fields.slug}`}
              key={c.sys.id}>
              <div className={styles.imageWrapper}>
                <Image
                  className={styles.articleImage}
                  src={`https:${c.fields.image.fields.file.url}`}
                  alt={c.fields.image.fields.description}
                  placeholder='blur'
                  blurDataURL={`https:${c.fields.image.fields.file.url}`}
                  width='675'
                  height='450'
                />
              </div>
              <div className={styles.textInner}>
                <p className={styles.publishDate}>
                  <Date dateString={c.fields.publishDate} />
                </p>
                <h4 className={styles.articleTitle}>{c.fields.title}</h4>
                <p className={styles.excerpt}>{c.fields.excerpt}</p>
              </div>
            </Link>
          );
        }
        if (c.sys.contentType.sys.id === 'principal') {
          return (
            <div
              className={styles.principalCard}
              key={c.sys.id}>
              <div className={styles.imageWrapper}>
                <Image
                  className={styles.articleImage}
                  src={`https:${c.fields.image.fields.file.url}`}
                  alt={c.fields.image.fields.description}
                  placeholder='blur'
                  blurDataURL={`https:${c.fields.image.fields.file.url}`}
                  width='150'
                  height='150'
                />
              </div>
              <div className={styles.textInner}>
                <h4 className={styles.principalName}>{c.fields.firstName} {c.fields.lastName}</h4>
                <p className={styles.principalTitle}><i>{c.fields.title}</i></p>
                <div>
                  {documentToReactComponents(c.fields.bio)}
                </div>
              </div>
            </div>
          );
        }
        if (c.sys.contentType.sys.id === 'project') {
          return (
            <Link
              data-filter='health'
              className={styles.card}
              href={`/project/${c.fields.slug}`}
              key={c.sys.id}>
              {c.fields.image && (
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.projectImage}
                    src={`https:${c.fields.image.fields.file.url}`}
                    alt={c.fields.image.fields.description}
                    placeholder='blur'
                    blurDataURL={`https:${c.fields.image.fields.file.url}`}
                    width='675'
                    height='450'
                  />
                </div>
              )}
              <div className={styles.textInner}>
                <h4 className={styles.projectTitle}>{c.fields.title}</h4>
              </div>
            </Link>
          );
        }
      })}
      {items.map(c => {
        if (c.sys.contentType.sys.id === 'projectType') {
          return (
            <Link
              href={`/project-type/${c.fields.slug}`}
              data-filter={c.fields.title}
              className={styles.projectType}
              key={c.sys.id}>
              <p className={styles.projectTypeTitle}>{c.fields.title}</p>
            </Link>
          );
        }
      })}
      {pagedData[0].sys.contentType.sys.id !== 'projectType' && usePagination && items.length > itemsPerPage &&
        <ul className={styles.pagination}>
          {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, index) => (
            <li key={index + 1}
              className={((index + 1) === currentPage ? styles.paginationActive : '')}
            >
              <button onClick={() => handlePagination(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>}
    </div>
  );
};

export default Archive;
