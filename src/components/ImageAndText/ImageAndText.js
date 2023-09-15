import styles from './imageText.module.css';
import ImageBlock from './ImageBlock';
import TextBlock from './TextBlock';

const ImageAndText = ({ content }) => {
  const { imagePosition, image, useBackgroundColor } = content;
  return (
    <section className={useBackgroundColor ? styles.imageTextWithBg : styles.imageTextWithOutBg}>
      <div className={`${styles.imageTextContainer}`}>
        {imagePosition === 'Left' ? (
          <div className={`${styles.imageText} ${styles.imageLeft}`}>
            <ImageBlock {...{ image }} />
            <TextBlock {...{ content }} />
          </div>
        ) : (
          <div className={`${styles.imageText} ${styles.imageRight}`}>
            <TextBlock {...{ content }} />
            <ImageBlock {...{ image }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageAndText;
