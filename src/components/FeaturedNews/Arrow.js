import styles from './featuredNews.module.css';

const Arrow = () => {
  return (
    <div className={styles.arrow}>
      <svg
        width='16'
        height='12'
        viewBox='0 0 16 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_261_590)'>
          <path
            d='M10.0123 0L8.75945 1.25501L12.6039 5.10387H0V6.89398H12.6039L8.75945 10.745L10.0123 12L16 6L10.0123 0Z'
            fill='#172532'
          />
        </g>
        <defs>
          <clipPath id='clip0_261_590'>
            <rect
              width='16'
              height='12'
              fill='white'
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Arrow;
