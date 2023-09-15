import CTALink from '../UI/Button/Button';
import Image from 'next/image';
import styles from './sidebarContent.module.css';

const SidebarContent = ({ content }) => {
  const { contentCard } = content;
  return (
    <section className={styles.block}>
      {contentCard.map((content, i) => {
        return (
          <div
            key={i}
            className={styles.item}>
            <div className={styles.imageContainer}>
              <Image
                src={`https:${content.fields.image.fields.file.url}`}
                className={styles.heroImage}
                alt={content.fields.image.fields.description}
                placeholder='blur'
                blurDataURL={`https:${content.fields.image.fields.file.url}`}
                width='323'
                height='169'
              />
            </div>
            <div className={styles.ctaBody}>
              <h3 className={styles.title}>{content.fields.title}</h3>
              <p className={styles.description}>{content.fields.description}</p>
              <div>
                <CTALink
                  text={content.fields.button.fields.title}
                  href={content.fields.button.fields.url}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SidebarContent;
