import styles from './social.module.css';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Twitter from './Twitter';
import Youtube from './Youtube';
import Linkedin from './Linkedin';

const Social = ({ social, fill }) => {
  const { facebook, instagram, twitter, youtube, linkedin } = social;
  return (
    <div className={styles.social}>
      {instagram && (
        <a
          href={instagram}
          target='_blank'
          rel='noreferrer noopener'>
          <Instagram {...{ fill }} />
        </a>
      )}
      {facebook && (
        <a
          href={facebook}
          target='_blank'
          rel='noreferrer noopener'>
          <Facebook {...{ fill }} />
        </a>
      )}
      {twitter && (
        <a
          href={twitter}
          target='_blank'
          rel='noreferrer noopener'>
          <Twitter {...{ fill }} />
        </a>
      )}
      {youtube && (
        <a
          href={youtube}
          target='_blank'
          rel='noreferrer noopener'>
          <Youtube {...{ fill }} />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target='_blank'
          rel='noreferrer noopener'>
          <Linkedin {...{ fill }} />
        </a>
      )}
    </div>
  );
};

export default Social;
