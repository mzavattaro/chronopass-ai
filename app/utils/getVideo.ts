import { streamQuality } from './const';

export const getVideo = (
  videoRef: React.RefObject<HTMLVideoElement>,
  setIsVideoActive: (isVideoActive: boolean) => void
) => {
  const { width, height, frameRate } = streamQuality;

  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: { ideal: width },
        height: { ideal: height },
        frameRate: { ideal: frameRate },
      },
    })
    .then((stream: MediaStream) => {
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.onloadeddata = () => {
          setIsVideoActive(video.readyState === 4);
        };
        video.play();
      }
    })
    .catch((error: Error) => {
      console.error('error:', error);
    });
};
