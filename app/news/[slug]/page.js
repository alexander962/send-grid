import { client } from '@/src/utils';
import ContentModuleRenderer from '@/src/ContentModuleRenderer';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import Image from 'next/image';
import styles from './page.module.css';
import Social from '@/src/components/Social/Social';
import Link from 'next/link';
import Date from '@/src/components/Date/Date';

export const dynamicParams = false;

const getContentful = async slug => {
  return await client.getEntries({
    content_type: 'article',
    'fields.slug': slug,
    include: 5,
  });
};

const Article = async ({ params }) => {
  const getNews = await getContentful(params.slug);
  const { sidebarContent, content, title, publishDate, image, socialMedia, slug } = getNews.items[0].fields;
  return (
    <MaxWidth>
      <div className={styles.article}>
        <div className={styles.articleWrapper}>
          <ul className='breadcrumbs'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/news'>News</Link>
            </li>
            <li>
              <Link
                className='current'
                href={`/News/${slug}`}>
                {title}
              </Link>
            </li>
          </ul>
          <div className={styles.articleInfo}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.date}><Date dateString={publishDate} /></p>
            <div className={styles.socialMediaIcons}>
              {socialMedia && (
                <Social
                  social={socialMedia.fields}
                  fill='#979696'
                />
              )}
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={`https:${image.fields.file.url}`}
              className={styles.image}
              alt={image.fields.description}
              placeholder='blur'
              blurDataURL={`https:${image.fields.file.url}`}
              width='663'
              height='442'
            />
          </div>
          <div className={styles.content}>
            {content.map(module => {
              return (
                <ContentModuleRenderer
                  key={module.sys.id}
                  {...{ module }}
                />
              );
            })}
          </div>
        </div>
        {sidebarContent && (
          <div className={styles.sidebarContent}>
            {sidebarContent.map(module => {
              return (
                <ContentModuleRenderer
                  key={module.sys.id}
                  {...{ module }}
                />
              );
            })}
          </div>
        )}
      </div>
    </MaxWidth>
  );
};

export default Article;

export async function generateStaticParams() {
  const paths = await client.getEntries({
    content_type: 'article',
    include: 5,
  });
  return paths.items.map(path => ({
    slug: path.fields.slug,
  }));
}
