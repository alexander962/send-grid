'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import NestedNav from '../NestedNav/NestedNav';
import styles from './mainNav.module.css';

const MainNav = ({ primaryNav }) => {
  const pathname = usePathname()
  const { menuItem } = primaryNav[0].fields;
  const formatNestedLinks = link => {
    return (
      <NestedNav
        key={link.sys.id}
        pathname={pathname}
        {...{ link }}
      />
    );
  };
  return (
    <nav className={styles.mainNav}>
      <ul className={styles.navList}>
        {menuItem.map(link => {
          const isActive = pathname.startsWith(link.fields.url)
          if (link.sys.contentType.sys.id === 'menuItemWithSubMenu') {
            return formatNestedLinks(link);
          } else {
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
          }
        })}
      </ul>
    </nav>
  );
};

export default MainNav;
