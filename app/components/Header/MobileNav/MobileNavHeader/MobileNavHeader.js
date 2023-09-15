'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './mobileNavHeader.module.css';

const MobileMenuHeader = ({ setIsMobileMenuOpen, setOpenSearch }) => {
  return (
    <div className={styles.modalHeader}>
      <button className={styles.modalHeaderSearch} onClick={() => setOpenSearch(true)}>
        <Image width="20" height="20" alt="dropdown" src="/search-white.svg" />
      </button>
      <Link href="/">
        <Image
          width="206"
          height="30"
          src="/mh-logo-white.svg"
          alt="Martin Horn Logo"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </Link>
      <button className={styles.modalHeaderSearch} onClick={() => setIsMobileMenuOpen(false)}>
        <Image width="20" height="20" alt="dropdown" src="/x.svg" />
      </button>
    </div>
  );
};

export default MobileMenuHeader;
