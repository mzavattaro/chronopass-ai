import { streamQuality } from './const';

export const getVideo = (
  videoRef: React.RefObject<HTMLVideoElement>,
  setIsVideoActive: (isVideoActive: boolean) => void
) => {
  const video = videoRef.current;

  if (video && video.srcObject) {
    // If video.srcObject already exists, stop all tracks on the stream
    const stream = video.srcObject as MediaStream;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    // Set video.srcObject to null and isVideoActive to false
    video.srcObject = null;
    setIsVideoActive(false);
  } else {
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
  }
};
