import { client } from '@/src/utils';
import ContentModuleRenderer from '../src/ContentModuleRenderer';

const getContentful = async () => {
  return await client.getEntry(process.env.CONTENTFUL_INDEX_ID, {
    include: 5,
  });
};

const Home = async () => {
  const getHome = await getContentful();
  const { content } = getHome.fields;
  return (
    <>
      {content.map(module => {
        return (
          <ContentModuleRenderer
            key={module.sys.id}
            {...{ module }}
          />
        );
      })}
    </>
  );
};

export default Home;
