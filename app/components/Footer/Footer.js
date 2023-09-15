import styles from './footer.module.css';
import FooterLogo from './FooterLogo/FooterLogo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import { client } from '@/src/utils';
import Social from '@/src/components/Social/Social';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import FooterNav from './FooterNav/FooterNav'

const getContentful = async () => {
  const data = await client.getEntry(process.env.FOOTER_ID, { include: 3 });
  return data;
};

const Footer = async () => {
  const getFooter = await getContentful();
  const social = getFooter.fields.socialMedia.fields;
  const footerMenu = getFooter.fields.footerMenu.fields;
  return (
    <footer className={styles.footer}>
      <MaxWidth>
        <div className={styles.footerInner}>
          <div className={styles.contactColumn}>
            <FooterLogo />
            {documentToReactComponents(getFooter.fields.contactInformation)}
          </div>
          <div className={styles.footerNavWrapper}>
            <FooterNav {...{ footerMenu }} />
          </div>
          <div className={styles.socialColumn}>
            <Social
              className={styles.social}
              fill='#fff'
              {...{ social }}
            />
          </div>
        </div>
      </MaxWidth>
    </footer>
  );
};

export default Footer;
