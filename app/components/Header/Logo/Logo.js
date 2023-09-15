import Link from 'next/link';
import Image from 'next/image';
import styles from './logo.module.css';
const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Image width="328" height="48" src="/mh-logo.svg" alt="Martin Horn Logo" />
    </Link>
  );
};

export default Logo;
