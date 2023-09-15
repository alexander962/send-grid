import { client } from '@/src/utils';
import SecondaryNav from './SecondaryNav/SecondaryNav';
import Banner from './Announcement/Announcement';
import HeaderMenuMain from '@/app/components/Header/HeaderMenuMain/HeaderMenuMain';
import styles from './header.module.css';

const getContentful = async () => {
  return await client.getEntry(process.env.HEADER_ID, { include: 3 });
};

const Header = async () => {
  const getHeader = await getContentful();
  const { announcement, primaryNavigation, secondaryNavigation } = getHeader.fields;
  return (
    <header className={styles.header}>
      {announcement && <Banner announcement={announcement} />}
      <SecondaryNav {...{ secondaryNavigation }} />
      <HeaderMenuMain
        secondaryNav={secondaryNavigation}
        primaryNav={primaryNavigation}
      />
    </header>
  );
};

export default Header;
