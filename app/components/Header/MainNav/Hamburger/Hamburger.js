'use client';

import Image from 'next/image';
import styles from './hamburger.module.css';

const Hamburger = ({ setIsMobileMenuOpen }) => {
  const handleClickOpen = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <>
      <div className={styles.hamburger}>
        <button onClick={() => handleClickOpen()}>
          <Image width="25" height="25" alt="hamburger" src="/hamburger.svg" />
        </button>
      </div>
    </>
  );
};

export default Hamburger;
