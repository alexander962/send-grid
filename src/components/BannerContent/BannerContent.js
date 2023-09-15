import CTALink from '../UI/Button/Button';
import styles from './bannerContent.module.css';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BannerContent = ({ content }) => {
  const { title, description, button, backgroundImage, icon } = content;

  return (
    <section className={styles.bannerCta}>
      {backgroundImage && (
        <Image
          src={`https:${backgroundImage.fields.file.url}`}
          className={styles.backgroundImage}
          alt={backgroundImage.fields.description}
          placeholder='blur'
          blurDataURL={`https:${backgroundImage.fields.file.url}`}
          sizes='(max-width: 1200px)'
          fill
        />
      )}
      {icon && (
        <Image
          src={`https:${icon.fields.file.url}`}
          className={styles.icon}
          alt={icon.fields.description}
          placeholder='blur'
          blurDataURL={`https:${icon.fields.file.url}`}
          width='49'
          height='49'
        />
      )}
      <div className={styles.content}>
        <h3 className={`${icon ? styles.titleWithIcon : styles.titleWithOutIcon}`}>{title}</h3>
        {description && <div className={styles.description}>{documentToReactComponents(description)}</div>}
        {button && (
          <div className={styles.btnWrapper}>
            <CTALink
              text={button.fields.title}
              href={button.fields.url}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerContent;
