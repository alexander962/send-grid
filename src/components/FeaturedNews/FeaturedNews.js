import MaxWidth from '../Layout/MaxWidthContainer';
import CTALink from '../UI/Button/Button';
import styles from './featuredNews.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Arrow from './Arrow';
import Date from '../Date/Date';

const FeaturedNews = ({ content }) => {
  const { title, article, button } = content;
  return (
    <MaxWidth>
      <section className={styles.featuredNews}>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.articles}>
          {article.map(article => {
            return (
              <div
                key={article.sys.id}
                className={styles.articleCard}>
                <Link
                  className={styles.imageWrapper}
                  href={`/news/${article.fields.slug}`}>
                  <Image
                    src={`https:${article.fields.image.fields.file.url}`}
                    className={styles.heroImage}
                    alt={article.fields.image.fields.description}
                    placeholder='blur'
                    blurDataURL={`https:${article.fields.image.fields.file.url}`}
                    height='203'
                    width='305'
                  />
                </Link>
                <div className={styles.textWrapper}>
                  <p className={styles.date}>
                    <Date dateString={article.fields.publishDate} />
                  </p>
                  <Link href={`/news/${article.fields.slug}`}>
                    <p className={styles.title}>{article.fields.title}</p>
                  </Link>
                  <p className={styles.excerpt}>{article.fields.excerpt}</p>
                </div>
                <Link
                  href={`/news/${article.fields.slug}`}
                  className={styles.arrowWrapper}>
                  <Arrow />
                </Link>
              </div>
            );
          })}
        </div>
        {button && (
          <div className={styles.button}>
            <CTALink
              text={button.fields.title}
              href={button.fields.url}
            />
          </div>
        )}
      </section>
    </MaxWidth>
  );
};

export default FeaturedNews;
