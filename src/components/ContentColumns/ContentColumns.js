import Button from '../UI/Button/Button';
import Image from 'next/image';
import styles from './contentColumns.module.css';
import MaxWidth from '../Layout/MaxWidthContainer';

const ContentColumns = ({ content }) => {
  const { cardContent } = content;
  return (
    <MaxWidth>
      <section className={styles.block}>
        {cardContent.map((content, i) => {
          return (
            <div
              key={i}
              className={styles.item}>
              <div className={styles.imageContainer}>
                <Image
                  src={`https:${content.fields.image.fields.file.url}`}
                  className={styles.image}
                  alt={content.fields.image.fields.description}
                  placeholder='blur'
                  blurDataURL={`https:${content.fields.image.fields.file.url}`}
                  width='547'
                  height='310'
                />
              </div>
              <div className={styles.ctaBody}>
                <h3 className={styles.title}>{content.fields.title}</h3>
                <p className={styles.description}>{content.fields.description}</p>
                <div className={styles.buttonWrapepr}>
                  {content.fields.button ? (
                    <Button
                      text={content.fields.button.fields.title}
                      href={content.fields.button.fields.url}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </MaxWidth>
  );
};

export default ContentColumns;
