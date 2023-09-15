import styles from './imageText.module.css';
import Image from 'next/image';
const ImageBlock = ({ image }) => {
  return (
    <div className={styles.imageSide}>
      <Image
        src={`https:${image.fields.file.url}`}
        className={styles.image}
        alt={image.fields.description}
        placeholder='blur'
        blurDataURL={`https:${image.fields.file.url}`}
        height='636'
        width='424'
      />
    </div>
  );
};

export default ImageBlock;
