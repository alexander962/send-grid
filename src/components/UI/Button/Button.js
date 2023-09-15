import Link from 'next/link';
import styles from './button.module.css';

const CTALink = (props) => {
  const { href, text } = props;
  return <Link href={href} className={styles.link}>{text}</Link>;
};

export default CTALink;
