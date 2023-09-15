'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cl from 'classnames';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import SearchInput from '@/app/components/Header/Search/SearchInput/SearchInput';
import styles from './searchModal.module.css';

const SearchModal = ({ openSearch, setOpenSearch }) => {
  const modalRef = useRef(null);
  const firstTabbableElementRef = useRef(null);
  const lastTabbableElementRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setOpenSearch(false);
      } else if (event.key === 'Tab') {
        handleTabKey(event);
      }
    };

    const handleTabKey = event => {
      if (event.shiftKey && document.activeElement === firstTabbableElementRef.current) {
        event.preventDefault();
        lastTabbableElementRef.current.focus();
      } else if (!event.shiftKey && document.activeElement === lastTabbableElementRef.current) {
        event.preventDefault();
        firstTabbableElementRef.current.focus();
      }
    };

    const handleFocusOut = event => {
      if (!modalRef.current.contains(event.relatedTarget)) {
        event.preventDefault();
        firstTabbableElementRef.current.focus();
      }
    };

    const modalElement = modalRef.current;
    modalElement.addEventListener('keydown', handleKeyDown);
    modalElement.addEventListener('focusout', handleFocusOut);

    return () => {
      modalElement.removeEventListener('keydown', handleKeyDown);
      modalElement.removeEventListener('focusout', handleFocusOut);
    };
  }, [setOpenSearch]);

  const closeModal = () => {
    setOpenSearch(false);
  };

  return (
    <div
      className={cl(styles.searchModal, openSearch && styles.mobileMenuShow)}
      ref={modalRef}
      tabIndex={openSearch ? -1 : undefined}
    >
      <MaxWidth>
        <div
          ref={firstTabbableElementRef}
          className={styles.searchModalPlug}
          tabIndex={openSearch ? -1 : undefined}
        ></div>
        <div className={styles.searchModalHeader}>
          <button className={styles.searchModalBtn} onClick={closeModal}>
            <Image width="20" height="20" alt="dropdown" src="/search-white.svg" />
          </button>
          <Link href="/">
            <Image width="328" height="48" src="/mh-logo-white.svg" alt="Martin Horn Logo" />
          </Link>
          <button className={styles.searchModalClose} onClick={closeModal}>
            <Image width="40" height="40" alt="dropdown" src="/x.svg" />
          </button>
        </div>
        <SearchInput setOpenSearch={setOpenSearch} />
        <div
          ref={lastTabbableElementRef}
          className={styles.searchModalPlug}
          tabIndex={openSearch ? -1 : undefined}
        ></div>
      </MaxWidth>
    </div>
  );
};

export default SearchModal;
