'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import styles from './secondaryNav.module.css';

const SecondaryNav = ({ secondaryNavigation }) => {
  const pathname = usePathname()
  const { menuItem } = secondaryNavigation.fields;
  return (
    <div className={styles.secondaryNav}>
      <MaxWidth>
        <nav className={styles.secondaryNav}>
          <ul className={styles.navList}>
            {menuItem.map(link => {
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

export default SecondaryNav;
