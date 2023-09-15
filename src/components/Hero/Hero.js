import Image from 'next/image';
import CTALink from '../UI/Button/Button';
import styles from './hero.module.css';

const Hero = ({ content }) => {
  const { title, description, button, image, addNegativeMargin } = content;

  return (
    <section className={`${styles.hero} ${addNegativeMargin ? styles.addNegativeMargin : styles.noNegativeMargin}`}>
      <Image
        src={`https:${image.fields.file.url}`}
        className={styles.heroImage}
        alt={image.fields.description}
        placeholder='blur'
        blurDataURL={`https:${image.fields.file.url}`}
        sizes="(max-width: 1400px) 100vw"
        fill
      />
      <div className={styles.gradient}></div>
      <div className={styles.ctaContainer}>
        <div className={styles.cta}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          {button && (
            <CTALink
              text={button.fields.title}
              href={button.fields.url}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
