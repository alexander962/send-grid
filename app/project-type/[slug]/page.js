import { client } from '@/src/utils';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import Image from 'next/image';
import archiveStyles from '@/src/components/Archive/archive.module.css';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamicParams = false;

const fetchTitle = async slug => {
  return await client.getEntries({
    content_type: 'projectType',
    'fields.slug': slug,
    include: 5,
  });
};

const fetchAllProjects = async () => {
  return await client.getEntries({
    content_type: 'project'
  });
};

const ProjectTypes = async ({ params }) => {
  const getTitle = await fetchTitle(params.slug);
  const { title } = getTitle.items[0].fields;

  const { items } = await fetchAllProjects();
  const projects = items.filter(project => project.fields.projectType.some(el => el.fields.slug === params.slug))

  return (
    <MaxWidth>
      <section className={archiveStyles.article}>
      <Link href='/projects' className={styles.backTo}>Back to Projects</Link>
        <h2 className={archiveStyles.archiveTitle}>{title}</h2>
        <div className={archiveStyles.cards}>

          {projects && projects.length > 0 ? (
            projects.map(c => (
              <Link
                className={archiveStyles.card}
                href={`/project/${c.fields.slug}`}
                key={c.sys.id}>
                {c.fields.image && (
                  <div className={archiveStyles.imageWrapper}>
                    <Image
                      className={archiveStyles.projectImage}
                      src={`https:${c.fields.image.fields.file.url}`}
                      alt={c.fields.image.fields.description}
                      placeholder='blur'
                      blurDataURL={`https:${c.fields.image.fields.file.url}`}
                      width='675'
                      height='450'
                    />
                  </div>
                )}
                <div className={archiveStyles.textInner}>
                  <h4 className={archiveStyles.projectTitle}>{c.fields.title}</h4>
                </div>
              </Link>
            ))
          ) : (
            <span>No results found.</span>
          )}
        </div>
      </section>
    </MaxWidth>
  );
};

export default ProjectTypes;

export async function generateStaticParams() {
  const paths = await client.getEntries({
    content_type: 'projectType',
    include: 5,
  });
  return paths.items.map(path => ({
    slug: path.fields.slug,
  }));
}
