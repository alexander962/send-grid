import MaxWidth from '../Layout/MaxWidthContainer';
import Arrow from './Arrow';
import CTALink from '../UI/Button/Button';
import styles from './jobs.module.css';

const Jobs = ({ content }) => {
  const { title, job, button } = content;
  return (
    <MaxWidth>
      <section className={styles.jobsSection}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.jobs}>
          {job.map(s => {
            return (
              <div
                key={s.sys.id}
                className={styles.jobCard}>
                <div>
                  <div className={styles.jobTitle}>{s.fields.title}</div>
                  <p className={styles.jobSalary}>{s.fields.description}</p>
                </div>
                <div className={styles.linkWrapper}>
                  <a
                    href='#'
                    className={styles.link}>
                    <Arrow />
                    Apply
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {button && (
          <div className={styles.button}>
            <CTALink
              text={button.fields.title}
              href={button.fields.url}
            />
          </div>
        )}
      </section>
    </MaxWidth>
  );
};

export default Jobs;
