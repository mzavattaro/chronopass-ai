'use client';

import { useRef, useState } from 'react';
import type { FC } from 'react';
import Toast from '@/app/components/Toast';
import { getVideo } from '@/app/utils/getVideo';
import { paintToCanvas } from '@/app/utils/paintToCanvas';

const ImageCapture: FC = () => {
  const [response, setResponse] = useState<string | null>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

  const takePhoto = async () => {
    const photo = photoRef.current;
    const base64Image = photo?.toDataURL('image/jpeg', 1.0);

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
      <Toast message="File uploaded successfully!" type="success" />;
    } catch (error) {
      console.error('Error: ', error);
      <Toast message="File upload error! Please try again later." type="error" />;
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div>response: {response}</div>
        <button type="button" onClick={() => getVideo(videoRef)}>
          Authorize
        </button>
        <button type="button" onClick={() => takePhoto()}>
          Take a photo
        </button>
        <video onCanPlay={() => paintToCanvas(videoRef, photoRef, colorRef)} ref={videoRef} />
        <canvas ref={photoRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default ImageCapture;
