import styles from './testimonials.module.css';
import Image from 'next/image';
import CTALink from '../UI/Button/Button';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import MaxWidth from '../Layout/MaxWidthContainer';

const Testimonials = ({ content }) => {
  const { testimonial, title, button } = content;

  return (
    <MaxWidth>
      <section className={styles.testimonials}>
        <div className={styles.titleSide}>
          <h3 className={styles.heading}>{title}</h3>
        </div>
        <div className={styles.testimonialList}>
          {testimonial.map(s => {
            return (
              <div
                key={s.sys.id}
                className={styles.testimonial}>
                <div className={styles.imageSide}>
                  <Image
                    src={`https:${s.fields.image.fields.file.url}`}
                    className={styles.image}
                    alt={s.fields.image.fields.description}
                    placeholder='blur'
                    blurDataURL={`https:${s.fields.image.fields.file.url}`}
                    width='389'
                    height='219'
                  />
                </div>
                <div className={styles.textSide}>
                  <div className={styles.textInner}>
                    <div className={styles.statement}>{documentToReactComponents(s.fields.statement)}</div>
                    <div className={styles.writersInfo}>
                      <p className={styles.writersName}>{s.fields.name}</p>
                      <p className={styles.writersDesc}>{s.fields.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {button && (
            <div className={styles.button}>
              <CTALink
                text={button.fields.title}
                href={button.fields.url}
              />
            </div>
          )}
        </div>
      </section>
    </MaxWidth>
  );
};

export default Testimonials;
