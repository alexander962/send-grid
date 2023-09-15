import styles from './maxWidth.module.css';

const MaxWidth = ({ children }) => {
  return <div className={styles.maxWidth}>{children}</div>;
};

export default MaxWidth;
