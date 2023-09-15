import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import styles from './announcement.module.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Banner = ({ announcement }) => {
  return (
    <div className={styles.banner}>
      <MaxWidth>
        <div className={styles.announcement}>
          <section className={styles.announcementText}>{documentToReactComponents(announcement.fields.description)}</section>
        </div>
      </MaxWidth>
    </div>
  );
};

export default Banner;
