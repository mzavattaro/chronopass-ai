'use client';

import { useEffect, useRef } from 'react';
import type { FC } from 'react';

const ImageCapture: FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const stripRef = useRef(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 60 } },
      })
      .then((stream: MediaStream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((error: Error) => {
        console.error('error:', error);
      });
  };

  useEffect(() => {
    getVideo();
  }, []);

  const paintToCanvas = () => {
    const video = videoRef.current;
    const photo = photoRef.current;
    const ctx = photo?.getContext('2d');

    const width = 1280;
    const height = 720;

    if (photo) {
      photo.width = width;
      photo.height = height;
    }

    return setInterval(() => {
      const color = colorRef.current;

      if (video) {
        ctx?.drawImage(video, 0, 0, width, height);
      }

      const pixels = ctx?.getImageData(0, 0, width, height);

      if (color) {
        color.style.backgroundColor = `rgb(${pixels?.data[0]},${pixels?.data[1]},${pixels?.data[2]})`;
      }
    }, 0);
  };

  const takePhoto = () => {
    const photo = photoRef.current;
    const strip = stripRef.current;

    const data = photo?.toDataURL('image/jpeg', 1.0);

    console.warn(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'myWebcam');
    link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    strip.insertBefore(link, strip.firstChild);
  };

  return (
    <div className="container">
      <div className="webcam-video">
        <button onClick={() => takePhoto()}>Take a photo</button>
        <video onCanPlay={() => paintToCanvas()} ref={videoRef} className="player" />
        <canvas ref={photoRef} className="photo" style={{ display: 'none' }} />
        <div className="photo-booth">
          <div ref={stripRef} className="strip" />
        </div>
      </div>
    </div>
  );
};

export default ImageCapture;
