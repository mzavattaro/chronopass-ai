'use client';

import { useRef, useState } from 'react';
import type { FC } from 'react';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import Header from './Header';
import Footer from './Footer';
import VideoStream from './VideoStream';
import ManualVerification from '../ManualVerification/ManualVerification';
import LinkButton from '../LinkButton/LinkButton';
import VerificationResponse from '../VerificationResponse/VerificationResponse';
import { getVideo } from '@/app/utils/getVideo';

import styles from './CaptureContainer.module.css';

type VerificationTypeProps = {
  showManualVerification: boolean;
  setShowManualVerification: React.Dispatch<React.SetStateAction<boolean>>;
  response: string | null;
  isVideoActive: boolean;
  setIsVideoActive: (value: boolean) => void;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  imageRef: React.MutableRefObject<HTMLCanvasElement | null>;
};

const VerificationType: FC<VerificationTypeProps> = ({
  showManualVerification,
  response,
  isVideoActive,
  setIsVideoActive,
  videoRef,
  imageRef,
  setShowManualVerification,
}) => {
  const handleOnClick = () => {
    if (showManualVerification || isVideoActive) {
      getVideo(videoRef, setIsVideoActive);
    }

    setShowManualVerification(!showManualVerification);
  };

  if (showManualVerification) {
    return (
      <div className={styles.manualVerificationWrapper}>
        <ManualVerification
          showManualVerification={showManualVerification}
          setShowManualVerification={setShowManualVerification}
        />
      </div>
    );
  }

  return (
    <>
      {response ? (
        <VerificationResponse className={styles.verificationWrapper}>
          {response === '1' ? 'successful verification' : 'access denied'}
        </VerificationResponse>
      ) : (
        <>
          <VideoStream isVideoActive={isVideoActive} videoRef={videoRef} imageRef={imageRef} />
          <LinkButton onClick={handleOnClick}>Camera not working?</LinkButton>
        </>
      )}
    </>
  );
};

const CaptureContainer: FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [showManualVerification, setShowManualVerification] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLCanvasElement | null>(null);

  const takeImage = async () => {
    const image = imageRef.current;
    const base64Image = image?.toDataURL('image/jpeg', 1.0);

    try {
      setIsLoading(true);

      getVideo(videoRef, setIsVideoActive);
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
      setIsLoading(false);
    }
  };

  console.log('response: ', response);

  return (
    <div className={styles.container}>
      <LoadingOverlay isLoading={isLoading} />
      <Header />

      <VerificationType
        response={response}
        showManualVerification={showManualVerification}
        setShowManualVerification={setShowManualVerification}
        isVideoActive={isVideoActive}
        videoRef={videoRef}
        imageRef={imageRef}
        setIsVideoActive={setIsVideoActive}
      />

      <Footer
        showManualVerification={showManualVerification}
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
