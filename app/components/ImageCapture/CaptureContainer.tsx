'use client';

import { useRef, useState } from 'react';
import type { FC } from 'react';
import AnchorLink from '../Anchor/AnchorLink';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import Header from './Header';
import Footer from './Footer';
import VideoStream from './VideoStream';
import VerificationResponse from '../VerificationResponse/VerificationResponse';
import { getVideo } from '@/app/utils/getVideo';

import styles from './CaptureContainer.module.css';

const CaptureContainer: FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLCanvasElement | null>(null);

  const takeImage = async () => {
    const image = imageRef.current;
    const base64Image = image?.toDataURL('image/jpeg', 1.0);

    try {
      setIsLoading(true);
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Image }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      getVideo(videoRef, setIsVideoActive);
      setIsLoading(false);
    }
  };

  console.log('response: ', response);

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={isLoading} />
      <Header />

      {response ? (
        <VerificationResponse className={styles.verificationWrapper}>
          {response === '1' ? 'successful verification' : 'access denied'}
        </VerificationResponse>
      ) : (
        <>
          <VideoStream isVideoActive={isVideoActive} videoRef={videoRef} imageRef={imageRef} />
          <AnchorLink className={styles.anchorLink} href="https://google.com/">
            <span>camera not working?</span>
          </AnchorLink>
        </>
      )}

      <Footer
        response={response}
        isVideoActive={isVideoActive}
        setIsVideoActive={setIsVideoActive}
        takeImage={takeImage}
        isLoading={isLoading}
        videoRef={videoRef}
      />
    </div>
  );
};

export default CaptureContainer;
