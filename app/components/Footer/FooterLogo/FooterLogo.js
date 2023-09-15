import Link from 'next/link';
import styles from './logo.module.css';
import Image from 'next/image';
const FooterLogo = () => {
  return (
    <Link
      href='/'
      className={styles.logo}>
      <Image
        src='/mh-logo-white.svg'
        alt='Martin Horn Logo'
        width='252'
        height='38'
      />
    </Link>
  );
};

export default FooterLogo;
