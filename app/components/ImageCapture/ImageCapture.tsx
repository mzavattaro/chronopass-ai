'use client';

import { useRef, useState } from 'react';
import type { FC } from 'react';
import { getVideo } from '@/app/utils/getVideo';
import { paintToCanvas } from '@/app/utils/paintToCanvas';

const ImageCapture: FC = () => {
  const [response, setResponse] = useState<string | null>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLCanvasElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

  const takeImage = async () => {
    const image = imageRef.current;
    const base64Image = image?.toDataURL('image/jpeg', 1.0);

    try {
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
      // setIsLoading(false);
    }
  };

  return (
    <>
      <div>response: {response}</div>
      <button type="button" onClick={() => getVideo(videoRef)}>
        Authorize
      </button>
      <button type="button" onClick={() => takeImage()}>
        Take a image
      </button>
      <video onCanPlay={() => paintToCanvas(videoRef, imageRef, colorRef)} ref={videoRef}>
        <track kind="captions" />
      </video>
      <canvas ref={imageRef} style={{ display: 'none' }} />
    </>
  );
};

export default ImageCapture;
