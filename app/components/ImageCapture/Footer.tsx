import type { FC } from 'react';
import { Button } from '@mantine/core';
import AnchorLink from '../Anchor/AnchorLink';
import UserFocus from '@/app/icons/UserFocus';
import Authorize from '@/app/icons/Authorize';
import { getVideo } from '@/app/utils/getVideo';

import styles from './Footer.module.css';

type FooterProps = {
  response: string | null;
  isVideoActive: boolean;
  setIsVideoActive: (value: boolean) => void;
  takeImage: () => void;
  isLoading: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  showManualVerification: boolean;
};

const Footer: FC<FooterProps> = ({
  response,
  isVideoActive,
  setIsVideoActive,
  takeImage,
  isLoading,
  videoRef,
  showManualVerification,
}) => {
  const renderButton = () => {
    if (!response) {
      if (isVideoActive) {
        return (
          <Button leftSection={<UserFocus />} color="#3300FF" onClick={takeImage}>
            {isLoading ? 'Verifying...' : 'Snap'}
          </Button>
        );
      }

      if (showManualVerification) {
        return (
          <Button leftSection={<Authorize />} color="#3300FF">
            Submit
          </Button>
        );
      }

      return (
        <Button
          data-autofocus
          leftSection={<Authorize />}
          color="#3300FF"
          onClick={() => getVideo(videoRef, setIsVideoActive)}
        >
          Authorize
        </Button>
      );
    }

    return null;
  };

  return (
    <div className={styles.footer}>
      <div className={styles.anchorLinkGroup}>
        <AnchorLink className={styles.anchorLink} href="https://google.com/">
          <span>privacy policy</span>
        </AnchorLink>
        <AnchorLink className={styles.anchorLink} href="https://google.com/">
          <span>learn more about chronopass ai</span>
        </AnchorLink>
      </div>

      <div className={styles.buttonGroup}>{renderButton()}</div>
    </div>
  );
};

export default Footer;
