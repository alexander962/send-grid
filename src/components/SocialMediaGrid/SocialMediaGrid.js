import Image from 'next/image';
import styles from './socialMediaGrid.module.css';
import MaxWidth from '../Layout/MaxWidthContainer';
import Social from '@/src/components/Social/Social';

const SocialMediaGrid = ({ content }) => {
  const { title, icons, images } = content;
  return (
    <MaxWidth>
      <section className={styles.SocialMediaGrid}>
        <h5 className={styles.title}>{title}</h5>
        <div className={styles.icons}>
           {icons && (
              <Social
                social={icons.fields}
                fill='#979696'
              />
            )}
        </div>
        <div className={styles.imageGrid}>
          {images.map((image, i) => {
            return (
              <div
                className={styles.image}
                key={i}>
                <Image
                  src={`https:${image.fields.file.url}`}
                  width='272'
                  height='272'
                  alt={image.fields.description}
                />
              </div>
            );
          })}
        </div>
      </section>
    </MaxWidth>
  );
};

export default SocialMediaGrid;



