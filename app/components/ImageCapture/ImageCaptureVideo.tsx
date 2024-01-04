import { useRef, type FC } from 'react';
import Image from 'next/image';
import { paintToCanvas } from '@/app/utils/paintToCanvas';
import Caption from '../Caption/Caption';

import styles from './ImageCaptureVideo.module.css';

type ImageCaptureVideoProps = {
  isVideoActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  imageRef: React.RefObject<HTMLCanvasElement>;
};

const ImageCaptureVideo: FC<ImageCaptureVideoProps> = ({ isVideoActive, videoRef, imageRef }) => {
  const colorRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.videoContainer}>
      <div
        className={styles.imageContainer}
        style={{
          display: isVideoActive ? 'none' : 'block',
        }}
      >
        <Image
          className={styles.placeholderImage}
          src="/images/placeholder.jpg"
          width={320}
          height={180}
          alt="placeholder"
        />
        <Caption>Braydon Anderson</Caption>
      </div>

      <div
        className={styles.videoWrapper}
        style={{
          display: isVideoActive ? 'block' : 'none',
        }}
      >
        <video
          className={styles.video}
          onCanPlay={() => paintToCanvas(videoRef, imageRef, colorRef)}
          ref={videoRef}
        >
          <track kind="captions" />
        </video>
        <Caption>You</Caption>
        <canvas className={styles.canvas} ref={imageRef} />
      </div>
    </div>
  );
};

export default ImageCaptureVideo;
