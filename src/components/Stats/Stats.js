import MaxWidth from '../Layout/MaxWidthContainer';
import styles from './stats.module.css';

const Stats = ({ content }) => {
  const { stat, title, description, useBlueBackground, displayTitle } = content;
  const showTitle = displayTitle ? <h2 className={styles.title}>{title}</h2> : <></>
  return (
    <section className={`${styles.statsContainer} ${useBlueBackground ? styles.background : styles.noBackground}`}>
      <MaxWidth>
       {showTitle}
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.stats}>
          {stat.map(s => {
            return (
              <div
                key={s.sys.id}
                className={styles.stat}>
                <div className={styles.stat__value}>{s.fields.value}</div>
                <p className={styles.stat__label}>{s.fields.label}</p>
              </div>
            );
          })}
        </div>
      </MaxWidth>
    </section>
  );
};

export default Stats;