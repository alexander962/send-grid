import styles from './social.module.css';

const Twitter = props => {
  const fill = props.fill ? props.fill : '#000';
  return (
    <div className={styles.svgWrapper}>
      <svg viewBox="0 0 75.71 75.71" xmlns="http://www.w3.org/2000/svg"><g fill={fill}><path d="m38.26 34.41-10.79-15.43h-5.75l13.37 19.12 1.68 2.4 11.44 16.36h5.75l-14.02-20.05z"/><path d="m37.86 0c-20.91 0-37.86 16.95-37.86 37.86s16.95 37.86 37.86 37.86 37.86-16.95 37.86-37.86-16.95-37.86-37.86-37.86zm8.59 59.56-11.58-16.85-14.5 16.85h-3.75l16.58-19.27-16.58-24.13h12.65l10.96 15.96 13.73-15.96h3.75l-15.81 18.38 17.19 25.02h-12.65z"/></g></svg>
    </div>
  );
};

export default Twitter;
