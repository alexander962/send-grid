import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './searchInput.module.css';

const SearchInput = ({ setOpenSearch }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    event.preventDefault();
    setOpenSearch(false);
    router.push(`/search-results?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter keywords here"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.searchButton} onClick={handleSearchClick}>
        <Image width="25" height="25" alt="dropdown" src="/search-white.svg" />
      </button>
    </div>
  );
};

export default SearchInput;
