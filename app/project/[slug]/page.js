import { client } from '@/src/utils';
import ContentModuleRenderer from '@/src/ContentModuleRenderer';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import Social from '@/src/components/Social/Social';

export const dynamicParams = false;

const getContentful = async slug => {
  return await client.getEntries({
    content_type: 'project',
    'fields.slug': slug,
    include: 5,
  });
};

const ProjectPage = async ({ params }) => {
  const getProjects = await getContentful(params.slug);
  const { content, title, image, slug, socialMedia, projectType } = getProjects.items[0].fields;

  return (
    <MaxWidth>
      <div className={styles.article}>
        <div className={styles.articleWrapper}>
          <ul className={'breadcrumbs'}>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/projects'>Projects</Link>
            </li>
            <li>
              <Link
                className='current'
                href={`/project/${slug}`}>
                {title}
              </Link>
            </li>
          </ul>
          <h1 className={styles.title}>{title}</h1>
          {socialMedia && (
            <div className={styles.socialMediaIcons}>
              <Social
                social={socialMedia.fields}
                fill='#979696'
              />
            </div>
          )}
          {content && (
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
          )}
          <ul className={styles.projectCat}>
            {projectType.map((project, i) => {
              return (
                <li
                  key={i}
                  className={styles.projectCatWrapper}>
                  <Link
                    className={styles.projectTypeLink}
                    href={`/project-type/${project.fields.slug}`}>
                    {project.fields.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </MaxWidth>
  );
};

export default ProjectPage;

export async function generateStaticParams() {
  const paths = await client.getEntries({
    content_type: 'project',
    include: 5,
  });
  return paths.items.map(path => ({
    slug: path.fields.slug,
  }));
}
