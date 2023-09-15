import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import MaxWidth from '../Layout/MaxWidthContainer';
import styles from './textBlock.module.css';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';

const TextBlock = ({ content }) => {
  const { displayTitle, useMaxWidthContainer, centerText, title } = content;
  return (
    <MaxWidth>
      <section className={styles.richText}>
        <div
          className={`${useMaxWidthContainer ? styles.addMaxWidth : styles.noMaxWidth} ${
            centerText ? styles.alignedCenter : styles.AlignedLeft
          }`}>
          {displayTitle && <h2 className={title}>{title}</h2>}
          {documentToReactComponents(content.content, {
            renderNode: {
              [BLOCKS.EMBEDDED_ASSET]: node => (
                <div className={styles.imageWrapper}>
                  <Image
                    src={'https:' + node.data.target.fields.file.url}
                    className={styles.image}
                    alt={node.data.target.fields.description}
                    placeholder='blur'
                    blurDataURL={'https:' + node.data.target.fields.file.url}
                    width='389'
                    height='219'
                  />
                </div>
              ),
            },
          })}
        </div>
      </section>
    </MaxWidth>
  );
};

export default TextBlock;
