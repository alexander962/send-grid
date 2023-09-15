'use client';

import Image from 'next/image';
import styles from './searchIcon.module.css';

const SearchIcon = ({ setOpenSearch }) => {
  return (
    <>
      <div className={styles.searchIcon}>
        {/* ... */}
        <button onClick={() => setOpenSearch(true)}>
          <Image width="25" height="25" alt="dropdown" src="/search.svg" />
        </button>
      </div>
    </>
  );
};

export default SearchIcon;
