import styles from './social.module.css';

const Facebook = props => {
  const fill = props.fill ? props.fill : '#000';
  return (
    <div className={styles.svgWrapper}>
      <svg
        width='33'
        height='33'
        viewBox='0 0 33 33'
        fill={fill}
        xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_212_602)'>
          <path
            d='M16.4997 0C7.38562 0 0 7.43219 0 16.6008C0 24.8869 6.03402 31.7539 13.9219 33V21.3997H9.73265V16.6008H13.9219V12.9432C13.9219 8.78101 16.3853 6.48463 20.1537 6.48463C21.9591 6.48463 23.8478 6.8098 23.8478 6.8098V10.8946H21.7671C19.7174 10.8946 19.0781 12.1745 19.0781 13.4876V16.6015H23.6539L22.9228 21.3997H19.0768V33C26.966 31.7546 33 24.8869 33 16.6008C33 7.43219 25.6124 0 16.4997 0Z'
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id='clip0_212_602'>
            <rect
              width='33'
              height='33'
              fill={fill}
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Facebook;
