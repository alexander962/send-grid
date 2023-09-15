'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import styles from './footerNav.module.css';

const FooterNav = ({ footerMenu }) => {
  const pathname = usePathname()
  const { menuItem } = footerMenu;
  return (
    <div className={styles.footerNav}>
      <MaxWidth>
        <nav className={styles.footerNav}>
          <ul className={styles.navList}>
            {menuItem.map((link) => {
              const isActive = pathname.startsWith(link.fields.url)
              return (
                <li key={link.sys.id}>
                  <Link
                    className={isActive ? styles.activeMenuItem : ''}
                    href={link.fields.url}
                  >
                    {link.fields.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </MaxWidth>
    </div>
  );
};

export default FooterNav;
