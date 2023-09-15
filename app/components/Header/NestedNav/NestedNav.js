'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './nestedNav.module.css';

const NestedNav = ({ link, pathname }) => {
  const isActive = pathname.startsWith(link.fields.url)

  const [showSubnav, updateShowSubnav] = useState(false);
  const subNavRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClick = () => {
    updateShowSubnav(showSubnav => !showSubnav);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      handleClick()
    }
  }

  const handleOutsideClick = event => {
    if (buttonRef.current == event.target) {
      return
    }
    else if (subNavRef.current && !subNavRef.current.contains(event.target)) {
      updateShowSubnav(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = event => {
      if (subNavRef.current && subNavRef.current.contains(event.target)) {
        return;
      }

      handleOutsideClick(event);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <li
      className={styles.nestedNav}
      key={link.sys.id}>
      <div className={styles.parent}>
        <Link
          className={isActive ? styles.activeMenuItem : ''}
          href={link.fields.url}
        >
          {link.fields.title}
        </Link>
        <button
          className={styles.button}
          onKeyDown={handleKeyDown}
        >
          <Image
            onClick={handleClick}
            ref={buttonRef}
            className='arrow-img'
            width='22'
            height='22'
            alt='dropdown'
            src='/dropdown.svg'
          />
        </button>
      </div>
      {showSubnav && (
        <ul
          className={styles.subNav}
          ref={subNavRef}>
          {link.fields.subMenu.map(link => {
            const isActive = link.fields.url === pathname
            return (
              <li key={link.sys.id}>
                <Link
                  onClick={handleClick}
                  className={isActive ? styles.activeMenuItem : ''}
                  href={link.fields.url}>
                  {link.fields.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default NestedNav;
