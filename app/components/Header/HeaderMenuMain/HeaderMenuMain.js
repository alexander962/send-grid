'use client';

import { useState } from 'react';
import MainNav from './../MainNav/MainNav';
import Logo from './../Logo/Logo';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import SearchIcon from './../Search/SearchIcon';
import Hamburger from './../MainNav/Hamburger/Hamburger';
import MobileMenu from '@/app/components/Header/MobileNav/MobileNav';
import SearchModal from '@/app/components/Header/Search/SearchModal/SearchModal';
import styles from './headerMenuMain.module.css';

const HeaderMenuMain = ({ secondaryNav, primaryNav }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <MaxWidth>
      <div className={styles.main}>
        <Hamburger setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <Logo />
        <MainNav {...{ primaryNav }} />
        <SearchIcon
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
        />
        <SearchModal
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
        />
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          secondaryNav={secondaryNav}
          primaryNav={primaryNav}
          setOpenSearch={setOpenSearch}
        />
      </div>
    </MaxWidth>
  );
};

export default HeaderMenuMain;
