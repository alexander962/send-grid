import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './imageText.module.css';
import CTALink from '../UI/Button/Button';

const TextBlock = ({ content }) => {
  const { heading, title, description, accordion, button } = content;
  return (
    <div className={styles.textSide}>
      <div className={styles.textInner}>
        {heading && <p className={'headerWithLine'}>{heading}</p>}
        <h2 className={styles.title}>{title}</h2>
        <div className={`richText ${styles.richText}`}>{documentToReactComponents(description)}</div>
        {accordion && (
          <div className={styles.accordion}>
            {accordion.map(s => {
              return (
                <details
                  key={s.sys.id}
                  className={styles.tab}>
                  <summary className={styles.accordionTitle}>{s.fields.title}</summary>
                  <p className={styles.accordionDesc}>{s.fields.description}</p>
                </details>
              );
            })}
          </div>
        )}
        {button && (
          <div className={styles.buttonWrapper}>
            <CTALink
              text={button.fields.title}
              href={button.fields.url}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextBlock;
