'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cl from 'classnames';
import styles from './mobileMenuMain.module.css';

const MobileMenuMain = ({ links, setIsMobileMenuOpen }) => {
  const [openSubLinks, setOpenSubLinks] = useState(false);
  return (
    <div className={styles.menuMain}>
      <ul className={styles.menuMainLinks}>
        {links.map((link, index) => {
          return (
            index < links.length - 1 && (
              <li key={link.sys.id}>
                <Link
                  href={link?.fields?.url}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {link?.fields?.title}
                </Link>
                {index === 0 && (
                  <button
                    className={cl(styles.menuMainArrow)}
                    onClick={() => setOpenSubLinks(true)}>
                    <Image
                      width='8'
                      height='15'
                      alt='arrow'
                      src='/arrow.svg'
                    />
                  </button>
                )}
              </li>
            )
          );
        })}
      </ul>

      <ul className={cl(styles.menuMainLinks, styles.menuMainLinksClose, openSubLinks && styles.menuMainLinksShow)}>
        {links[0].fields.subMenu.map((link, index) => {
          return (
            <li key={link.sys.id}>
              {index === 0 && (
                <button
                  className={cl(styles.menuMainArrow, styles.menuMainArrowLeft)}
                  onClick={() => setOpenSubLinks(false)}>
                  <Image
                    width='8'
                    height='15'
                    alt='arrow'
                    src='/arrow.svg'
                  />
                </button>
              )}
              <Link
                href={link?.fields?.url}
                onClick={() => setIsMobileMenuOpen(false)}>
                {link?.fields?.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileMenuMain;
