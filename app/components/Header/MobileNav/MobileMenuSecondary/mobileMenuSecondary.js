'use client';

import Link from 'next/link';
import styles from './mobileMenuSecondary.module.css';

const MobileMenuSecondary = ({ link, secondaryNav, setIsMobileMenuOpen }) => {
  const links = secondaryNav.fields.menuItem;

  return (
    <div className={styles.menuSecondary}>
      <ul>
        {links.map(link => {
          return (
            <li
              key={link.sys.id}
              onClick={() => setIsMobileMenuOpen(false)}>
              <Link href={link.fields.url}>{link.fields.title}</Link>
            </li>
          );
        })}
      </ul>
      <button
        className={styles.menuSecondaryBtn}
        onClick={() => setIsMobileMenuOpen(false)}>
        <Link href={link.fields.url}>{link.fields.title}</Link>
      </button>
    </div>
  );
};

export default MobileMenuSecondary;
