'use client';

import { useEffect } from 'react';
import cl from 'classnames';
import MobileMenuHeader from '@/app/components/Header/MobileNav/MobileNavHeader/MobileNavHeader';
import MobileMenuMain from '@/app/components/Header/MobileNav/MobileMenuMain/mobileMenuMain';
import MobileMenuSecondary from '@/app/components/Header/MobileNav/MobileMenuSecondary/mobileMenuSecondary';
import styles from './mobileNav.module.css';

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, secondaryNav, primaryNav, setOpenSearch }) => {
  const { menuItem } = primaryNav[0].fields;
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={cl(styles.mobileMenu, isMobileMenuOpen && styles.mobileMenuShow)}>
      <MobileMenuHeader
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setOpenSearch={setOpenSearch}
      />
      <MobileMenuMain
        links={menuItem}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <MobileMenuSecondary
        secondaryNav={secondaryNav}
        link={menuItem[menuItem.length - 1]}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  );
};

export default MobileMenu;
