import { client } from '@/src/utils';
import ContentModuleRenderer from '@/src/ContentModuleRenderer';

export const dynamicParams = false;

const getContentful = async slug => {
  return await client.getEntries({
    content_type: 'page',
    'fields.slug': slug,
    include: 3,
  });
};

const CustomPage = async ({ params }) => {
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  const space = process.env.CONTENTFUL_SPACE_ID;
  const getPage = await getContentful(params.slug);
  const { content, title, showPageTitle } = getPage.items[0].fields;
  return (
    <div>
      {showPageTitle && <h1 className='pageTitle'>{title}</h1>}
      {content.map(module => {
        return (
          <ContentModuleRenderer
            token={token}
            space={space}
            key={module.sys.id}
            module={module}
          />
        );
      })}
    </div>
  );
};

export default CustomPage;

export async function generateStaticParams() {
  const paths = await client.getEntries({
    content_type: 'page',
    include: 3,
  });
  return paths.items.map(path => ({
    slug: path.fields.slug,
  }));
}
