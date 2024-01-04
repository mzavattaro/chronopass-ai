import type { FC } from 'react';
import { Button } from '@mantine/core';
import AnchorLink from '../Anchor/AnchorLink';
import UserFocus from '@/app/icons/UserFocus';
import Authorize from '@/app/icons/Authorize';
import { getVideo } from '@/app/utils/getVideo';

import styles from './ImageCaptureFooter.module.css';

type ImageCaptureFooterProps = {
  response: string | null;
  isVideoActive: boolean;
  setIsVideoActive: (value: boolean) => void;
  takeImage: () => void;
  isLoading: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
};

const ButtonGroup: FC<ImageCaptureFooterProps> = ({
  response,
  isVideoActive,
  setIsVideoActive,
  takeImage,
  isLoading,
  videoRef,
}) => {
  if (!response) {
    return (
      <div className={styles.buttonGroup}>
        {isVideoActive ? (
          <Button leftSection={<UserFocus />} color="#3300FF" onClick={() => takeImage()}>
            {isLoading ? 'Verifying...' : 'Snap'}
          </Button>
        ) : (
          <Button
            leftSection={<Authorize />}
            color="#3300FF"
            onClick={() => getVideo(videoRef, setIsVideoActive)}
          >
            Authorize
          </Button>
        )}
      </div>
    );
  }

  return null;
};

const ImageCaptureFooter: FC<ImageCaptureFooterProps> = ({
  response,
  isVideoActive,
  setIsVideoActive,
  takeImage,
  isLoading,
  videoRef,
}) => (
  <div className={styles.footer}>
    <div className={styles.anchorLinkGroup}>
      <AnchorLink className={styles.anchorLink} href="https://google.com/">
        <span>privacy policy</span>
      </AnchorLink>
      <AnchorLink className={styles.anchorLink} href="https://google.com/">
        <span>learn more about chronopass ai</span>
      </AnchorLink>
    </div>

    <ButtonGroup
      response={response}
      isVideoActive={isVideoActive}
      setIsVideoActive={setIsVideoActive}
      takeImage={takeImage}
      isLoading={isLoading}
      videoRef={videoRef}
    />
  </div>
);

export default ImageCaptureFooter;
